const { addMember, getMembers, updateRole, removeMember } = require('../models/memberModel');
const { findByEmail } = require('../models/userModel');
const logActivity = require('../utils/activityLogger');

const invite = async (req, res) => {
  try {
    const { email, role } = req.body;
    const projectId = req.params.id;
    const user = await findByEmail(email);
    if (!user) return res.status(404).json({ message: 'User not found' });
    await addMember(projectId, user.id, role || 'viewer');
    await logActivity(req.user.id, projectId, `invited ${user.name} as ${role || 'viewer'}`);
    res.json({ message: 'Member invited' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const list = async (req, res) => {
  try {
    const members = await getMembers(req.params.id);
    res.json(members);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const changeRole = async (req, res) => {
  try {
    const { role } = req.body;
    await updateRole(req.params.id, req.params.userId, role);
    res.json({ message: 'Role updated' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const remove = async (req, res) => {
  try {
    await removeMember(req.params.id, req.params.userId);
    await logActivity(req.user.id, req.params.id, `removed a member from the project`);
    res.json({ message: 'Member removed' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { invite, list, changeRole, remove };