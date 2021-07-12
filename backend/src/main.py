from flask import Flask, render_template

# creating the Flask application
app = Flask(__name__,static_url_path='',static_folder='../../frontend/dist',template_folder='../../frontend/dist')

@app.route('/')
def hello():
    return render_template('index.html');


