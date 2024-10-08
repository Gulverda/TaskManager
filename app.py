from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from flask_pymongo import PyMongo
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from bson import ObjectId
import os

app = Flask(__name__, static_folder='frontend/build', static_url_path='')
app.config["MONGO_URI"] = "mongodb://localhost:27017/taskdb"
app.config["JWT_SECRET_KEY"] = "JWT_SECRET_KEY"
CORS(app)
mongo = PyMongo(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_frontend(path):
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

# User Signup
@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    phone_number = data.get('phoneNumber')

    if mongo.db.users.find_one({'username': username}):
        return jsonify({"msg": "Username already exists"}), 409

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    mongo.db.users.insert_one({
        'username': username, 
        'password': hashed_password, 
        'phoneNumber': phone_number,
    })
    return jsonify({"msg": "User created successfully"}), 201

# User Login
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

# User Signout
@app.route('/signout', methods=['POST'])
@jwt_required()
def signout():
    return jsonify({"msg": "Signout successful"}), 200

# Add Task
@app.route('/tasks', methods=['POST'])
@jwt_required()
def add_task():
    data = request.get_json()
    title = data.get('title')
    description = data.get('description')
    user = get_jwt_identity()  # Get the current user's username

    mongo.db.tasks.insert_one({'title': title, 'description': description, 'user': user})
    return jsonify({"msg": "Task added successfully"}), 201

# Get Tasks
@app.route('/tasks', methods=['GET'])
@jwt_required()
def get_tasks():
    user = get_jwt_identity()  # Get the current user's username
    tasks = list(mongo.db.tasks.find({'user': user}))
    for task in tasks:
        task['_id'] = str(task['_id'])  # Convert ObjectId to string
    return jsonify(tasks), 200

# Update Task
@app.route('/tasks/<task_id>', methods=['PUT'])
@jwt_required()
def update_task(task_id):
    data = request.get_json()
    title = data.get('title')
    description = data.get('description')

    result = mongo.db.tasks.update_one(
        {'_id': ObjectId(task_id), 'user': get_jwt_identity()},
        {'$set': {'title': title, 'description': description}}
    )
    if result.matched_count == 0:
        return jsonify({"msg": "Task not found"}), 404

    return jsonify({"msg": "Task updated successfully"}), 200

# Delete Task
@app.route('/tasks/<task_id>', methods=['DELETE'])
@jwt_required()
def delete_task(task_id):
    result = mongo.db.tasks.delete_one({'_id': ObjectId(task_id), 'user': get_jwt_identity()})
    if result.deleted_count == 0:
        return jsonify({"msg": "Task not found"}), 404

    return jsonify({"msg": "Task deleted successfully"}), 200

if __name__ == '__main__':
    app.run(debug=True)
