from flask import Flask, request, jsonify
from datetime import datetime

app = Flask(__name__)

# In a real application, you would use a database here.
# For this example, we'll use a simple in-memory list.
campaigns = []
next_campaign_id = 1


@app.route('/api/campaigns', methods=['POST', 'GET'])
def handle_campaigns():
    global next_campaign_id
    if request.method == 'POST':
        data = request.get_json()
        # Adds a unique ID to the campaign
        data['id'] = next_campaign_id
        next_campaign_id += 1
        campaigns.append(data)
        print(data)
        return jsonify({'message': 'Campaign created successfully', 'campaign': data}), 201
    elif request.method == 'GET':
        return jsonify(campaigns)
    else:
        return jsonify({'message': 'Method not allowed'}), 405


@app.route('/api/campaigns/<int:campaign_id>', methods=['GET', 'PUT', 'DELETE'])
def handle_campaign(campaign_id):
    global campaigns
    campaign = next((c for c in campaigns if c['id'] == campaign_id), None)
    if campaign is None:
        return jsonify({'message': 'Campaign not found'}), 404

    if request.method == 'GET':
        return jsonify(campaign)
    elif request.method == 'PUT':
        data = request.get_json()
        campaign.update(data)
        return jsonify({'message': 'Campaign updated successfully', 'campaign': campaign})
    elif request.method == 'DELETE':
        campaigns = [c for c in campaigns if c['id'] != campaign_id]
        return jsonify({'message': 'Campaign deleted successfully'})
    else:
        return jsonify({'message': 'Method not allowed'}), 405

if __name__ == '__main__':
    app.run(debug=True)

