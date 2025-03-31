import logging
from flask import Blueprint, request, jsonify, abort
from ..extensions import db
from ..models import Campaign
from sqlalchemy.exc import SQLAlchemyError

# Configure logging
logging.basicConfig(level=logging.DEBUG)

campaign_bp = Blueprint('campaign', __name__, url_prefix='/campaigns')

@campaign_bp.route('', methods=['POST'])
def create_campaign():
    """Creates a new campaign."""
    try:
        data = request.get_json()
        logging.debug(f"Received data: {data}")
        if not data or 'name' not in data:
            logging.warning("Name is required")
            abort(400, description="Name is required")

        name = data['name']
        description = data.get('description')

        if not isinstance(name, str) or not (description is None or isinstance(description, str)):
            logging.warning("Invalid data types for name or description")
            abort(400, description="Invalid data types for name or description")

        new_campaign = Campaign(name=name, description=description)
        db.session.add(new_campaign)
        db.session.commit()
        logging.info(f"Campaign created: {new_campaign}")
        return jsonify({"id": new_campaign.id, "name": new_campaign.name, "description": new_campaign.description}), 201
    except SQLAlchemyError as e:
        db.session.rollback()
        logging.error(f"Database error: {str(e)}")
        abort(500, description=f"Database error: {str(e)}")
    except Exception as e:
        logging.error(f"An unexpected error occurred: {str(e)}")
        abort(500, description=f"An unexpected error occurred: {str(e)}")

@campaign_bp.route('', methods=['GET'])
def get_all_campaigns():
    """Retrieves all campaigns."""
    try:
        campaigns = Campaign.query.all()
        return jsonify([{"id": c.id, "name": c.name, "description": c.description} for c in campaigns])
    except SQLAlchemyError as e:
        logging.error(f"Database error: {str(e)}")
        abort(500, description=f"Database error: {str(e)}")
    except Exception as e:
        logging.error(f"An unexpected error occurred: {str(e)}")
        abort(500, description=f"An unexpected error occurred: {str(e)}")

@campaign_bp.route('/<int:id>', methods=['GET'])
def get_campaign(id):
    """Retrieves a specific campaign by ID."""
    try:
        campaign = Campaign.query.get_or_404(id)
        return jsonify({"id": campaign.id, "name": campaign.name, "description": campaign.description})
    except SQLAlchemyError as e:
        logging.error(f"Database error: {str(e)}")
        abort(500, description=f"Database error: {str(e)}")
    except Exception as e:
        logging.error(f"An unexpected error occurred: {str(e)}")
        abort(500, description=f"An unexpected error occurred: {str(e)}")

@campaign_bp.route('/<int:id>', methods=['PUT'])
def update_campaign(id):
    """Updates a specific campaign by ID."""
    try:
        campaign = Campaign.query.get_or_404(id)
        data = request.get_json()

        if data is None:
            logging.warning("No data provided for update")
            abort(400, description="No data provided for update")

        name = data.get('name', campaign.name)
        description = data.get('description', campaign.description)

        if not isinstance(name, str) or not (description is None or isinstance(description, str)):
            logging.warning("Invalid data types for name or description")
            abort(400, description="Invalid data types for name or description")

        campaign.name = name
        campaign.description = description
        db.session.commit()
        return jsonify({"id": campaign.id, "name": campaign.name, "description": campaign.description})
    except SQLAlchemyError as e:
        db.session.rollback()
        logging.error(f"Database error: {str(e)}")
        abort(500, description=f"Database error: {str(e)}")
    except Exception as e:
        logging.error(f"An unexpected error occurred: {str(e)}")
        abort(500, description=f"An unexpected error occurred: {str(e)}")

@campaign_bp.route('/<int:id>', methods=['DELETE'])
def delete_campaign(id):
    """Deletes a specific campaign by ID."""
    try:
        campaign = Campaign.query.get_or_404(id)
        db.session.delete(campaign)
        db.session.commit()
        return jsonify({"message": "Campaign deleted"}), 200
    except SQLAlchemyError as e:
        db.session.rollback()
        logging.error(f"Database error: {str(e)}")
        abort(500, description=f"Database error: {str(e)}")
    except Exception as e:
        logging.error(f"An unexpected error occurred: {str(e)}")
        abort(500, description=f"An unexpected error occurred: {str(e)}")
