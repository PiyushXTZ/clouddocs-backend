const { createProject, getProjectById, getProjectsByUser, updateProject, deleteProject } = require('../models/projectModel');
const { addMember } = require('../models/memberModel');
const logActivity = require('../utils/activityLogger');

const create = async (req, res) => {
  try {
    const { name, description } = req.body;
    const projectId = await createProject(name, description, req.user.id);
    await addMember(projectId, req.user.id, 'owner');
    await logActivity(req.user.id, projectId, 'created the project');
    res.status(201).json({ id: projectId, name, description });
  } catch (err) {
  console.log(err);
  res.status(500).json({ message: 'Server error' });
}
};

const getAll = async (req, res) => {
  try {
    const projects = await getProjectsByUser(req.user.id);
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getOne = async (req, res) => {
  try {
    const project = await getProjectById(req.params.id);
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const update = async (req, res) => {
  try {
    const { name, description } = req.body;
    await updateProject(req.params.id, name, description);
    await logActivity(req.user.id, req.params.id, 'updated the project details');
    res.json({ message: 'Project updated' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const remove = async (req, res) => {
  try {
    await deleteProject(req.params.id);
    res.json({ message: 'Project deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { create, getAll, getOne, update, remove };