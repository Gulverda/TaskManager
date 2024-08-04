from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_pymongo import PyMongo
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/taskdb"
app.config["JWT_SECRET_KEY"] = "your_jwt_secret_key"
CORS(app)
mongo = PyMongo(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if mongo.db.users.find_one({'username': username}):
        return jsonify({"msg": "Username already exists"}), 409

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    mongo.db.users.insert_one({'username': username, 'password': hashed_password})
    return jsonify({"msg": "User created successfully"}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    user = mongo.db.users.find_one({'username': username})

    if user and bcrypt.check_password_hash(user['password'], password):
        access_token = create_access_token(identity=username)
        return jsonify(access_token=access_token), 200

    return jsonify({"msg": "Bad username or password"}), 401

@app.route('/signout', methods=['POST'])
@jwt_required()
def signout():
    return jsonify({"msg": "Signout successful"}), 200

@app.route('/tasks', methods=['POST'])
@jwt_required()
def add_task():
    data = request.get_json()
    title = data.get('title')
    description = data.get('description')
    user = get_jwt_identity()  # Get the current user's username

    mongo.db.tasks.insert_one({'title': title, 'description': description, 'user': user})
    return jsonify({"msg": "Task added successfully"}), 201

@app.route('/tasks', methods=['GET'])
@jwt_required()
def get_tasks():
    user = get_jwt_identity()  # Get the current user's username
    tasks = list(mongo.db.tasks.find({'user': user}))
    for task in tasks:
        task['_id'] = str(task['_id'])  # Convert ObjectId to string
    return jsonify(tasks), 200

if __name__ == '__main__':
    app.run(debug=True)
