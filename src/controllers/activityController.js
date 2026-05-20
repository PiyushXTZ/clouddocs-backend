const { getActivitiesByProject, getRecentByUser } = require('../models/activityModel');

const projectActivities = async (req, res) => {
  try {
    const activities = await getActivitiesByProject(req.params.id);
    res.json(activities);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const recentActivities = async (req, res) => {
  try {
    const activities = await getRecentByUser(req.user.id);
    res.json(activities);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { projectActivities, recentActivities };