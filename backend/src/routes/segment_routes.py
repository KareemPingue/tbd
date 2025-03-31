from flask import Blueprint, request, jsonify
from ..models import Segment
from ..extensions import db

segment_bp = Blueprint("segment", __name__, url_prefix='/segments')

@segment_bp.route("", methods=["GET"])
def get_segments():
    segments = Segment.query.all()
    return jsonify([{"id": s.id, "name": s.name} for s in segments])
