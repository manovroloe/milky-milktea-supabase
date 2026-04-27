from datetime import datetime
from typing import Dict, List
from models import Payment


class PaymentProcessor:
    def generate_transaction_id(self) -> str:
        payment_count = Payment.query.count() + 1
        return f"TXN{payment_count:04d}"

    def build_payment_data(self, order_id: str, total_amount: float, payment_method: str, amount_paid=None) -> Dict:
        total_amount = float(total_amount)
        if payment_method == "Cash":
            if amount_paid is None:
                raise ValueError("Cash amount is required for Cash payment.")
            amount_paid = float(amount_paid)
            if amount_paid < total_amount:
                raise ValueError("Cash amount is not enough.")
        else:
            amount_paid = total_amount

        return {
            "id": self.generate_transaction_id(),
            "datetime": datetime.now(),
            "total_amount": total_amount,
            "method": payment_method,
            "amount_paid": amount_paid,
            "change_amount": amount_paid - total_amount,
            "status": "Completed",
        }

    def get_payment_history(self) -> List[Dict]:
        payments = Payment.query.order_by(Payment.datetime.desc()).all()
        return [{
            "id": p.id, "order_id": p.order_id, "datetime": p.datetime.strftime("%Y-%m-%d %H:%M:%S"),
            "total_amount": p.total_amount, "method": p.method, "amount_paid": p.amount_paid,
            "change": p.change_amount, "status": p.status
        } for p in payments]
