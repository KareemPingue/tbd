from flask import Blueprint, request, jsonify
from models import campaigns
from bson import ObjectId

campaign_routes = Blueprint("campaign_routes", __name__)

# Create a new campaign
@campaign_routes.route("/api/campaigns", methods=["POST"])
def create_campaign():
    data = request.json
    campaign_id = campaigns.insert_one({
        "name": data["name"],
        "description": data.get("description", ""),
        "budget": data["budget"],
        "startDate": data["startDate"],
        "endDate": data["endDate"],
        "createdBy": data["createdBy"]
    }).inserted_id
    return jsonify({"message": "Campaign created", "id": str(campaign_id)}), 201

# Get all campaigns
@campaign_routes.route("/api/campaigns", methods=["GET"])
def get_campaigns():
    user_id = request.args.get("userId")
    campaign_list = list(campaigns.find({"createdBy": user_id}))
    for campaign in campaign_list:
        campaign["_id"] = str(campaign["_id"])
    return jsonify(campaign_list)

# Update a campaign
@campaign_routes.route("/api/campaigns/<campaign_id>", methods=["PUT"])
def update_campaign(campaign_id):
    data = request.json
    campaigns.update_one({"_id": ObjectId(campaign_id)}, {"$set": data})
    return jsonify({"message": "Campaign updated"})

# Delete a campaign
@campaign_routes.route("/api/campaigns/<campaign_id>", methods=["DELETE"])
def delete_campaign(campaign_id):
    campaigns.delete_one({"_id": ObjectId(campaign_id)})
    return jsonify({"message": "Campaign deleted"})
