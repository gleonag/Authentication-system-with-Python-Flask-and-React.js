"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_acces_token, jwt_required, get_jwt_identity  
from sqlalchemy.orm import validates
import re



api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/signup', methods=['POST'])
def create_user():
    data.request.get_json()
    if validate_email(data['email']):
        user = User(email=data['email'], password=data['password'], is_active=True)
        db.session.add(user)
        db.session.commit()
        token = create_acces_token(identity=user.id)
        return
    


@api.route('/login', methods=['POST'])
def login_user():
    data = request.get_json()
    if validate_email(data['email']):

        user = User.query.filter_by(email=data['email']).filter_by(password=data['password']).first()
        print("USER",user)
    
        token = create_acces_token(identity=user.id)
        return jsonify({"message": "el usuario se ha logeado con exito", "user": user.serialize(), "token":token}),200
print('Error')

@api.route('/private', methods=['POST'])
@jwt_required()
def handle_private():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    return jsonify({"message": "el usuario es el que dice que es", "user": user.serialize()}), 200

@validates('email')
def validate_email(email):
    if not email:
        raise AssertionError('Email not provided')
    if not re.match("[^@]+@[^@]+.[^@]+", email):
        raise AssertionError('Invalid format email')
    return email

    

    


