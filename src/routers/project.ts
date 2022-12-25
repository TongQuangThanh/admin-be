import express from 'express';
import { ProjectSchema } from '../mongoose/project'
export const projectRouters = express.Router();

projectRouters.get('/get', (req, res) => {
  ProjectSchema.find()
    .then(projects => res.status(200).json({ message: "OK", data: projects }))
    .catch(err => res.status(500).json({ message: "Lỗi server", data: err }));
});

projectRouters.post('/save', async (req, res) => {
  try {
    console.log(req.body);
    await ProjectSchema.deleteMany();
    await ProjectSchema.insertMany(req.body);
    res.status(200).json({ message: "OK", data: req.body });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", data: error });
  }
});
