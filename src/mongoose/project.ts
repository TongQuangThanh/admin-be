import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const projectSchema = new mongoose.Schema({
  name: String,
  rootUrl: String,
});

projectSchema.plugin(uniqueValidator);

export const ProjectSchema = mongoose.model('Project', projectSchema);