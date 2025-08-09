const mongoose = require('mongoose');

const VideoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '', trim: true },
    r2Key: { type: String, required: true, unique: true, index: true },
    publicUrl: { type: String, required: true },
    contentType: { type: String, default: 'video/mp4' },
    size: { type: Number, default: 0 },

    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    isPublic: { type: Boolean, default: false },

    tags: { type: [String], default: [] },
    durationSeconds: { type: Number, default: 0 },

    // Soft delete flag (optional)
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

VideoSchema.methods.toSafeJSON = function () {
  return {
    id: this._id.toString(),
    title: this.title,
    description: this.description,
    r2Key: this.r2Key,
    publicUrl: this.publicUrl,
    contentType: this.contentType,
    size: this.size,
    isPublic: this.isPublic,
    tags: this.tags,
    durationSeconds: this.durationSeconds,
    owner: this.owner?.toString?.() || this.owner,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

const Video = mongoose.model('Video', VideoSchema);
module.exports = Video;