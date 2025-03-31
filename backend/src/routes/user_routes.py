from flask import Blueprint, request, jsonify
from ..models import User
from ..extensions import db

user_bp = Blueprint('user', __name__, url_prefix='/users')
