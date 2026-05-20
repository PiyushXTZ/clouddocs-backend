const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./src/routes/authRoutes');
const projectRoutes = require('./src/routes/projectRoutes');
const fileRoutes = require('./src/routes/fileRoutes');
const memberRoutes = require('./src/routes/memberRoutes');
const activityRoutes = require('./src/routes/activityRoutes');
const adminRoutes = require('./src/routes/adminRoutes');

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api', fileRoutes);
app.use('/api', memberRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/admin', adminRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});