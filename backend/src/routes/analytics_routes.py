from flask import Blueprint, request, jsonify
from ..models import Traffic
from ..extensions import db

analytics_bp = Blueprint("analytics", __name__, url_prefix='/analytics')

@analytics_bp.route("/traffic", methods=["GET"])
def get_traffic():
    traffic = Traffic.query.all()
    return jsonify([{"id": t.id, "timestamp": t.timestamp} for t in traffic])
