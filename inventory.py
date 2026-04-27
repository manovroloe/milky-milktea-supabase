from typing import Any, Dict, List, Optional
from models import Product, db


class InventoryManager:
    @staticmethod
    def _serialize_product(product: Product) -> Dict[str, Any]:
        item = {
            "id": product.id,
            "name": product.name,
            "category": product.category,
            "description": product.description or "",
            "image": product.image or "default",
            "has_sizes": bool(product.has_sizes),
        }
        if product.has_sizes:
            item["prices"] = {"S": float(product.price_s or 0), "M": float(product.price_m or 0), "L": float(product.price_l or 0)}
            item["stocks"] = {"S": int(product.stock_s or 0), "M": int(product.stock_m or 0), "L": int(product.stock_l or 0)}
        else:
            item["price"] = float(product.price or 0)
            item["stock"] = int(product.stock or 0)
        return item

    def get_all_products(self) -> List[Dict[str, Any]]:
        products = Product.query.order_by(Product.category.asc(), Product.name.asc()).all()
        return [self._serialize_product(product) for product in products]

    def get_product_by_id(self, product_id: str) -> Optional[Dict[str, Any]]:
        product = Product.query.filter_by(id=product_id).first()
        return self._serialize_product(product) if product else None

    def check_stock(self, product_id: str, quantity: int, size: Optional[str] = None) -> bool:
        product = Product.query.filter_by(id=product_id).first()
        if not product:
            return False
        if product.has_sizes:
            size = (size or "").upper()
            stocks = {"S": int(product.stock_s or 0), "M": int(product.stock_m or 0), "L": int(product.stock_l or 0)}
            return stocks.get(size, 0) >= quantity
        return int(product.stock or 0) >= quantity

    def update_stock(self, product_id: str, quantity: int, size: Optional[str] = None) -> None:
        product = Product.query.filter_by(id=product_id).first()
        if not product:
            raise ValueError(f"Product {product_id} not found")

        if product.has_sizes:
            size = (size or "").upper()
            if size == "S":
                if int(product.stock_s or 0) < quantity: raise ValueError(f"Not enough stock for {product.name} size S")
                product.stock_s = int(product.stock_s or 0) - quantity
            elif size == "M":
                if int(product.stock_m or 0) < quantity: raise ValueError(f"Not enough stock for {product.name} size M")
                product.stock_m = int(product.stock_m or 0) - quantity
            elif size == "L":
                if int(product.stock_l or 0) < quantity: raise ValueError(f"Not enough stock for {product.name} size L")
                product.stock_l = int(product.stock_l or 0) - quantity
            else:
                raise ValueError("Size is required for this product")
        else:
            if int(product.stock or 0) < quantity: raise ValueError(f"Not enough stock for {product.name}")
            product.stock = int(product.stock or 0) - quantity

        db.session.flush()
