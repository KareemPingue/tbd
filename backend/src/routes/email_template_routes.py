from flask import Blueprint, request, jsonify
from ..models.email_template import EmailTemplate
from ..server import db

email_template_bp = Blueprint("email_template", __name__)

@email_template_bp.route("/email_templates", methods=["GET"])
def get_email_templates():
    email_templates = EmailTemplate.query.all()
    return jsonify([{"id": et.id, "name": et.name} for et in email_templates])
