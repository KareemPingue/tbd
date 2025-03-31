from flask import Blueprint, request, jsonify
from ..extensions import db  

user_bp = Blueprint('user', __name__, url_prefix='/users')
