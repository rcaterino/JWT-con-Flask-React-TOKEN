"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)

#get all users in db
@api.route('/users', methods=['GET'])
def getAllPeople():
    people_query = User.query.all()
    all_people = list(map(lambda x: x.serialize(), people_query))
    return jsonify(all_people)

@api.route('/users/<int:id>', methods=['GET'])
def getUser(id):
    people_query = User.query.get(id)
    return jsonify(people_query.serialize())

@api.route('/register', methods=['POST'])
def createUser():
    info_request = request.get_json()
    newUser = User(id = info_request['id'], email = info_request['email'], password = info_request['password'], is_active = info_request['is_active'])
    db.session.add(newUser)
    db.session.commit()
    return "Usuario creado", 201

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200