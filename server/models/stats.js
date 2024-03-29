import mongoose from 'mongoose';

const StatSchema = new mongoose.Schema({
  timestamp: { type: mongoose.SchemaTypes.Date, default: Date.now },
  videoId: { type: mongoose.SchemaTypes.String, required: true },
  uid: { type: mongoose.Schema.ObjectId, required: true },
  searchString: { type: mongoose.SchemaTypes.String, required: true },
  videoDuration: { type: mongoose.SchemaTypes.Number, required: true },
  thumbUrl: { type: mongoose.SchemaTypes.String, required: true }
});

export default mongoose.model('stat', StatSchema);