from flask import Flask

# creating the Flask application
app = Flask(__name__)

@app.route('/')
def hello():
    return '<h1> Hello! Welcome to Entertainment Scheduler </h1>'


