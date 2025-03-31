from flask import Blueprint, request, jsonify
from ..models.analytics import Traffic
from ..server import db

analytics_bp = Blueprint("analytics", __name__)

@analytics_bp.route("/traffic", methods=["GET"])
def get_traffic():
    traffic = Traffic.query.all()
    return jsonify([{"id": t.id, "timestamp": t.timestamp} for t in traffic])
