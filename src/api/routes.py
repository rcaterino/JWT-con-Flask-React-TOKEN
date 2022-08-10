"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import jwt_required, get_jwt_identity

api = Blueprint('api', __name__)

#---------------------------------------------------------------------------
# Crea una ruta para autenticar a los usuarios y devolver el token JWT.
# La función create_access_token() se utiliza para generar el JWT.
@app.route("/token", methods=["POST"])
def create_token():
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    # Consulta la base de datos por el nombre de usuario y la contraseña
    user = User.filter.query(username=username, password=password).first()
    if User is None:
          # el usuario no se encontró en la base de datos
        return jsonify({"msg": "Bad username or password"}), 401
    # crea un nuevo token con el id de usuario dentro
    access_token = create_access_token(identity=user.id)
    return jsonify({ "token": access_token, "user_id": user.id })

#----------------------------------------------------------------------------
# Protege una ruta con jwt_required, bloquea las peticiones
# sin un JWT válido presente.
@app.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    # Accede a la identidad del usuario actual con get_jwt_identity
    current_user_id = get_jwt_identity()
    user = User.filter.get(current_user_id)
    
    return jsonify({"id": user.id, "username": user.username }), 200

#----------------------------------------------------------------------------
#get all users in db
@api.route('/users', methods=['GET'])
def getAllPeople():
    people_query = User.query.all()
    all_people = list(map(lambda x: x.serialize(), people_query))
    return jsonify(all_people)

#----------------------------------------------------------------------------
#get only one user in db
@api.route('/users/<int:id>', methods=['GET'])
def getUser(id):
    people_query = User.query.get(id)
    return jsonify(people_query.serialize())

#----------------------------------------------------------------------------
#create a new user in db
@api.route('/register', methods=['POST'])
def createUser():
    info_request = request.get_json()
    newUser = User(id = info_request['id'], email = info_request['email'], password = info_request['password'], is_active = info_request['is_active'])
    db.session.add(newUser)
    db.session.commit()
    return "Usuario creado", 201

#----------------------------------------------------------------------------
@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200