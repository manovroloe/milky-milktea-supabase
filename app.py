import os
import uuid
from flask import Flask, jsonify, render_template, request, session
from database import configure_database, create_tables
from inventory import InventoryManager
from models import db
from order import OrderSystem
from payment import PaymentProcessor

app = Flask(__name__)
app.secret_key = os.getenv("FLASK_SECRET_KEY", "change-this-secret-key")

configure_database(app)
create_tables(app)

inventory_manager = InventoryManager()
order_system = OrderSystem()
payment_processor = PaymentProcessor()


def normalize_size(size):
    if not size: return None
    return {"Small":"S","Medium":"M","Large":"L","small":"S","medium":"M","large":"L","s":"S","m":"M","l":"L"}.get(size, str(size).upper())


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/api/health")
def health_check():
    return jsonify({"success": True, "message": "Milky Milktea API is running"})


@app.route("/api/menu")
def get_menu():
    products = inventory_manager.get_all_products()
    categories = {}
    for product in products:
        categories.setdefault(product["category"], []).append(product)
    return jsonify({"success": True, "categories": categories})


@app.route("/api/cart/add", methods=["POST"])
def add_to_cart():
    data = request.get_json(silent=True) or {}
    product_id = data.get("product_id")
    quantity = int(data.get("quantity", 1))
    size = normalize_size(data.get("size"))

    if not product_id or quantity <= 0:
        return jsonify({"success": False, "message": "Invalid cart data"})

    product = inventory_manager.get_product_by_id(product_id)
    if not product:
        return jsonify({"success": False, "message": "Product not found"})

    if product.get("has_sizes"):
        if not size:
            return jsonify({"success": False, "message": "Please select a size."})
        stock_available = int(product["stocks"].get(size, 0))
        price = float(product["prices"].get(size, 0))
    else:
        stock_available = int(product.get("stock", 0))
        price = float(product.get("price", 0))

    if stock_available < quantity:
        return jsonify({"success": False, "message": f"Out of stock or insufficient stock. Only {stock_available} left."})

    cart = session.get("cart", [])
    for item in cart:
        if item["id"] == product_id and item.get("size") == (size if product.get("has_sizes") else None):
            new_quantity = int(item["quantity"]) + quantity
            if new_quantity > stock_available:
                return jsonify({"success": False, "message": f"Only {stock_available} item(s) available in stock."})
            item["quantity"] = new_quantity
            break
    else:
        cart.append({"id": product_id, "name": product["name"], "price": price, "quantity": quantity, "size": size if product.get("has_sizes") else None})

    session["cart"] = cart
    session.modified = True
    return jsonify({"success": True, "message": f"Added {quantity}x {product['name']}"})


@app.route("/api/cart/remove", methods=["POST"])
def remove_from_cart():
    data = request.get_json(silent=True) or {}
    product_id = data.get("product_id")
    size = normalize_size(data.get("size"))
    cart = session.get("cart", [])
    session["cart"] = [item for item in cart if not (item["id"] == product_id and item.get("size") == size)]
    session.modified = True
    return jsonify({"success": True})


@app.route("/api/cart/update", methods=["POST"])
def update_cart():
    data = request.get_json(silent=True) or {}
    product_id = data.get("product_id")
    quantity = int(data.get("quantity", 0))
    size = normalize_size(data.get("size"))
    cart = session.get("cart", [])

    for item in list(cart):
        if item["id"] == product_id and item.get("size") == size:
            if quantity <= 0:
                cart.remove(item)
            else:
                if not inventory_manager.check_stock(product_id, quantity, size):
                    return jsonify({"success": False, "message": "Out of stock or insufficient stock."})
                item["quantity"] = quantity
            break

    session["cart"] = cart
    session.modified = True
    return jsonify({"success": True})


@app.route("/api/cart/clear", methods=["POST"])
def clear_cart():
    session["cart"] = []
    session.modified = True
    return jsonify({"success": True})


@app.route("/api/cart")
def get_cart():
    cart = session.get("cart", [])
    for item in cart:
        product = inventory_manager.get_product_by_id(item["id"])
        if product: item["image"] = product.get("image", "default")
    total = sum(float(item["price"]) * int(item["quantity"]) for item in cart)
    return jsonify({"success": True, "cart": cart, "total": total})


@app.route("/api/checkout", methods=["POST"])
def checkout():
    data = request.get_json(silent=True) or {}
    payment_method = data.get("payment_method", "Cash")
    amount_paid = data.get("amount_paid")
    cart = session.get("cart", [])

    if not cart:
        return jsonify({"success": False, "message": "Cart is empty"})

    for item in cart:
        if not inventory_manager.check_stock(item["id"], int(item["quantity"]), item.get("size")):
            return jsonify({"success": False, "message": f"{item['name']} is out of stock or insufficient."})

    total_amount = sum(float(item["price"]) * int(item["quantity"]) for item in cart)
    order_id = f"ORD{uuid.uuid4().hex[:8].upper()}"

    try:
        payment_info = payment_processor.build_payment_data(order_id, total_amount, payment_method, amount_paid)
        order_system.save_order_from_cart(cart, order_id, payment_info, inventory_manager)
        session["cart"] = []
        session.modified = True
        return jsonify({
            "success": True, "order_id": order_id, "total_amount": total_amount,
            "payment_info": {
                "id": payment_info["id"], "method": payment_info["method"],
                "amount_paid": payment_info["amount_paid"], "change": payment_info["change_amount"],
                "status": payment_info["status"]
            },
            "cart": cart
        })
    except Exception as exc:
        db.session.rollback()
        return jsonify({"success": False, "message": str(exc)})


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=int(os.getenv("PORT", 5000)))
