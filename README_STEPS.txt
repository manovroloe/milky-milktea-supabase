1. Create a Supabase project.
2. Copy the database connection string from Supabase Connect > URI.
3. Create .env from .env.example and set DATABASE_URL. If password has @, use %40.
4. Run: python -m venv .venv
5. Run: .venv\Scripts\activate
6. Run: pip install -r requirements.txt
7. Run: python seed_db.py
8. Run: python app.py
9. Open: http://127.0.0.1:5000
10. For online hosting, push to GitHub and deploy on Render with Start Command: gunicorn app:app
