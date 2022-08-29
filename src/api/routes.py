"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required



#Create flask app
api = Blueprint('api', __name__)

# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.
@api.route("/token", methods=["POST"])
def create_token():
    
    info_request = request.get_json()
    query = User.query.filter_by(email = info_request['email'], password = info_request['password']).first()
    user = query.serialize()
    access_token = create_access_token(identity=user['email'])
    return jsonify(access_token=access_token), 200

#----------------------------------------------------------------------------
# #get all users in db
@api.route('/users', methods=['GET'])
def getAllPeople():
    people_query = User.query.all()
    all_people = list(map(lambda x: x.serialize(), people_query))
    return jsonify(all_people)

#----------------------------------------------------------------------------
# #get only one user in db
@api.route('/user/<int:id>', methods=['GET'])
def getUser(id):
    people_query = User.query.get(id)
    return jsonify(people_query.serialize())

#----------------------------------------------------------------------------
# #create a new user in db
@api.route('registro', methods=['POST'])
def createUser():
    info_request = request.get_json()
    newUser = User(nombre = info_request['nombre'], apellidos = info_request['apellidos'], email = info_request['email'], password = info_request['password'], is_active = info_request['is_active'])
    db.session.add(newUser)
    db.session.commit()
    return jsonify("usuario creado"), 200
    
#----------------------------------------------------------------------------
@api.route('/user/<int:id>', methods=['DELETE'])
def deleteUser(id):
    user1 = User.query.get(id)
    if user1 is None:
        raise APIException('User not found', status_code=404)
    db.session.delete(user1)
    db.session.commit()
    return jsonify("usuario eliminado"), 200
#----------------------------------------------------------------------------
@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200