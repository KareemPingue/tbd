from flask import Blueprint, request, jsonify
from ..models import EmailTemplate
from ..extensions import db

email_template_bp = Blueprint("email_template", __name__, url_prefix='/email_templates')

@email_template_bp.route("", methods=["GET"])
def get_email_templates():
    email_templates = EmailTemplate.query.all()
    return jsonify([{"id": et.id, "name": et.name} for et in email_templates])
