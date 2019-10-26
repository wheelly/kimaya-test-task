import mongoose from 'mongoose';
import user from './users'

const StatSchema = new mongoose.Schema({
  timestamp: { type: mongoose.SchemaTypes.Date, default: Date.now },
  videoId: { type: mongoose.SchemaTypes.String, required: true },
  user: user,
  searchString: { type: mongoose.SchemaTypes.String, required: true },
  videoDuration: { type: mongoose.SchemaTypes.Number, required: true },
});

export default mongoose.model('stat', StatSchema);