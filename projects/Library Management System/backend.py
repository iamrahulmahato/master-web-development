from flask import Flask, render_template, request, redirect, url_for, flash
import mysql.connector
from mysql.connector import Error

app = Flask(__name__)
app.secret_key = "your_secret_key"  # Required for flashing messages

# Database connection parameters
DATABASE_CONFIG = {
    "host": "localhost",  # Usually 'localhost'
    "user": "root",  # Update with your MySQL username
    "password": "ananyavastare2345",  # Update with your MySQL password
    "database": "library",  # Update with your database name
}


@app.route("/")
def hello():
    return render_template("Frontpage.html")


@app.route("/login")
def Login():
    return render_template("Login.html")


@app.route("/Submit", methods=["POST"])
def Submit():
    email = request.form.get("Email")
    password = request.form.get("Password")

    # Initialize cursor to None
    cursor = None

    # Connect to the MySQL database
    try:
        conn = mysql.connector.connect(**DATABASE_CONFIG)
        cursor = conn.cursor()

        # Execute the SELECT query
        cursor.execute(
            "SELECT * FROM login WHERE email = %s AND password = %s", (email, password)
        )
        result = cursor.fetchone()  # Fetches one matching row (if it exists)

    except Error as e:
        flash(f"Database error: {e}", "error")
        return redirect(url_for("Login"))

    finally:
        if cursor:  # Check if cursor is initialized
            cursor.close()  # Close the cursor
        if conn:  # Ensure conn is not None
            conn.close()  # Always close the database connection

    # Check if result is found
    if result is not None:  # Use 'is not None' to check if result is valid
        # Login successful
        flash("Login successful!", "success")
        return redirect(url_for("borrow"))  # Redirect to the borrow route
    else:
        # Login failed
        flash("Invalid email or password!", "error")
        return redirect(url_for("Login"))  # Redirect back to the login page


@app.route("/borrow")  # Define this route
def borrow():
    return render_template(
        "Borrow.html"
    )  # Ensure this file exists in your templates folder


@app.route("/view_users")
def view_users():
    # Initialize cursor to None
    cursor = None

    # Connect to the MySQL database
    try:
        conn = mysql.connector.connect(**DATABASE_CONFIG)
        cursor = conn.cursor()

        # Execute the SELECT query to fetch all users
        cursor.execute("SELECT * FROM login")
        users = cursor.fetchall()  # Fetch all matching rows

    except Error as e:
        flash(f"Database error: {e}", "error")
        users = []  # Fallback to empty list if there's an error

    finally:
        if cursor:  # Check if cursor is initialized
            cursor.close()  # Close the cursor
        if conn:  # Ensure conn is not None
            conn.close()  # Always close the database connection

    return render_template(
        "view_users.html", users=users
    )  # Pass the users to the template


if __name__ == "__main__":
    app.run(debug=True)  # Run the app
