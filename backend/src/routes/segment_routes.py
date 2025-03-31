from flask import Blueprint, request, jsonify
from ..models.segment import Segment
from ..server import db

segment_bp = Blueprint("segment", __name__)

@segment_bp.route("/segments", methods=["GET"])
def get_segments():
    segments = Segment.query.all()
    return jsonify([{"id": s.id, "name": s.name} for s in segments])
