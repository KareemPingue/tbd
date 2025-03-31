from flask import Blueprint, request, jsonify
from ..extensions import db  

campaign_bp = Blueprint('campaign', __name__, url_prefix='/campaigns')
