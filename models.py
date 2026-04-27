from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class Product(db.Model):
    __tablename__ = "products"

    id = db.Column(db.String(20), primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    category = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(255))
    image = db.Column(db.Text)
    has_sizes = db.Column(db.Boolean, nullable=False, default=True)
    price = db.Column(db.Float)
    stock = db.Column(db.Integer)
    price_s = db.Column(db.Float)
    price_m = db.Column(db.Float)
    price_l = db.Column(db.Float)
    stock_s = db.Column(db.Integer)
    stock_m = db.Column(db.Integer)
    stock_l = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)


class Order(db.Model):
    __tablename__ = "orders"

    id = db.Column(db.String(20), primary_key=True)
    datetime = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    total_amount = db.Column(db.Float, nullable=False)
    status = db.Column(db.String(50), nullable=False, default="Pending")
    payment_method = db.Column(db.String(50))
    amount_paid = db.Column(db.Float)
    change_amount = db.Column(db.Float)

    items = db.relationship("OrderItem", backref="order", cascade="all, delete-orphan", lazy=True)
    payments = db.relationship("Payment", backref="order", cascade="all, delete-orphan", lazy=True)


class OrderItem(db.Model):
    __tablename__ = "order_items"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    order_id = db.Column(db.String(20), db.ForeignKey("orders.id", ondelete="CASCADE"), nullable=False)
    product_id = db.Column(db.String(20), nullable=False)
    product_name = db.Column(db.String(100), nullable=False)
    size = db.Column(db.String(10))
    quantity = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Float, nullable=False)
    total = db.Column(db.Float, nullable=False)


class Payment(db.Model):
    __tablename__ = "payments"

    id = db.Column(db.String(20), primary_key=True)
    order_id = db.Column(db.String(20), db.ForeignKey("orders.id", ondelete="CASCADE"), nullable=False)
    datetime = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    total_amount = db.Column(db.Float, nullable=False)
    method = db.Column(db.String(50), nullable=False)
    amount_paid = db.Column(db.Float, nullable=False)
    change_amount = db.Column(db.Float, nullable=False)
    status = db.Column(db.String(50), nullable=False, default="Completed")
