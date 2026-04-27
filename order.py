from datetime import datetime
from typing import Dict, List
from models import Order, OrderItem, Payment, db


class OrderSystem:
    def save_order_from_cart(self, cart: List[Dict], order_id: str, payment_info: Dict, inventory_manager) -> str:
        try:
            total_amount = sum(float(item["price"]) * int(item["quantity"]) for item in cart)
            order = Order(
                id=order_id,
                datetime=datetime.now(),
                total_amount=total_amount,
                status=payment_info.get("status", "Completed"),
                payment_method=payment_info.get("method"),
                amount_paid=float(payment_info.get("amount_paid", 0)),
                change_amount=float(payment_info.get("change_amount", 0)),
            )
            db.session.add(order)

            for item in cart:
                item_total = float(item["price"]) * int(item["quantity"])
                db.session.add(OrderItem(
                    order_id=order_id, product_id=item["id"], product_name=item["name"], size=item.get("size"),
                    quantity=int(item["quantity"]), price=float(item["price"]), total=item_total
                ))
                inventory_manager.update_stock(item["id"], int(item["quantity"]), item.get("size"))

            db.session.add(Payment(
                id=payment_info["id"], order_id=order_id, datetime=payment_info.get("datetime", datetime.now()),
                total_amount=total_amount, method=payment_info.get("method"),
                amount_paid=float(payment_info.get("amount_paid", 0)),
                change_amount=float(payment_info.get("change_amount", 0)),
                status=payment_info.get("status", "Completed")
            ))

            db.session.commit()
            return order_id
        except Exception:
            db.session.rollback()
            raise

    def get_order_history(self):
        orders = Order.query.order_by(Order.datetime.desc()).all()
        return [{"id": o.id, "datetime": o.datetime.strftime("%Y-%m-%d %H:%M:%S"), "total_amount": o.total_amount, "status": o.status} for o in orders]
