const { PutObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const s3 = require('../config/s3');
const { createFile, getFilesByProject, getFileById, deleteFile } = require('../models/fileModel');
const logActivity = require('../utils/activityLogger');

const upload = async (req, res) => {
  try {
    const { originalname, buffer, mimetype, size } = req.file;
    const filename = `${Date.now()}-${originalname}`;

    await s3.send(new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET,
      Key: filename,
      Body: buffer,
      ContentType: mimetype,
    }));

    const fileUrl = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${filename}`;
    const fileId = await createFile(filename, originalname, fileUrl, size, mimetype, req.params.id, req.user.id);
    await logActivity(req.user.id, req.params.id, `uploaded ${originalname}`);
    res.status(201).json({ id: fileId, fileUrl, originalname });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const list = async (req, res) => {
  try {
    const files = await getFilesByProject(req.params.id);
    res.json(files);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const remove = async (req, res) => {
  try {
    const file = await getFileById(req.params.fileId);
    if (!file) return res.status(404).json({ message: 'File not found' });

    await s3.send(new DeleteObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET,
      Key: file.filename,
    }));

    await deleteFile(req.params.fileId);
    await logActivity(req.user.id, file.project_id, `deleted ${file.original_name}`);
    res.json({ message: 'File deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { upload, list, remove };