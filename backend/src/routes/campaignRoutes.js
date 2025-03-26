const express = require("express");
const Campaign = require("../models/Campaign");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Create a new campaign
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name, description, budget, startDate, endDate } = req.body;
    const campaign = new Campaign({ 
      name, 
      description, 
      budget, 
      startDate, 
      endDate, 
      createdBy: req.user.id 
    });
    await campaign.save();
    res.status(201).json(campaign);
  } catch (error) {
    res.status(500).json({ error: "Error creating campaign" });
  }
});

// Get all campaigns (for the dashboard)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const campaigns = await Campaign.find({ createdBy: req.user.id });
    res.json(campaigns);
  } catch (error) {
    res.status(500).json({ error: "Error fetching campaigns" });
  }
});

// Update a campaign
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const updatedCampaign = await Campaign.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedCampaign);
  } catch (error) {
    res.status(500).json({ error: "Error updating campaign" });
  }
});

// Delete a campaign
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Campaign.findByIdAndDelete(req.params.id);
    res.json({ message: "Campaign deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting campaign" });
  }
});

module.exports = router;
