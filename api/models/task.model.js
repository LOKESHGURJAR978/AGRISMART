import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date, required: true },
  priority: { type: String, required: true },
  assignee: { type: String, required: true },
  status: { type: String, default: 'Not Started' },
});

const Task = mongoose.model('Task', taskSchema);

export default Task;
