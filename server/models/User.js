const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, default: '' },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    passwordHash: { type: String },
    provider: {
      type: String,
      enum: ['local', 'google', 'github'],
      default: 'local',
      index: true,
    },
    providerId: { type: String, index: true },
    avatarUrl: { type: String, default: '' },

    verified: { type: Boolean, default: false },
    verificationToken: { type: String, index: true },
    verificationTokenExpires: { type: Date },

    // optional: roles/permissions for portal
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
      index: true,
    },
  },
  { timestamps: true }
);

// Instance methods
UserSchema.methods.setPassword = async function (password) {
  const salt = await bcrypt.genSalt(10);
  this.passwordHash = await bcrypt.hash(password, salt);
};

UserSchema.methods.comparePassword = async function (password) {
  if (!this.passwordHash) return false;
  return bcrypt.compare(password, this.passwordHash);
};

// Static helpers
UserSchema.statics.upsertOAuthUser = async function (provider, providerId, profile) {
  const email = (profile.email || '').toLowerCase();
  const name = profile.name || '';
  const avatarUrl = profile.avatarUrl || '';

  let user = null;

  if (email) {
    user = await this.findOne({ email });
  }
  if (!user) {
    user = await this.findOne({ provider, providerId });
  }

  if (!user) {
    user = new this({
      email,
      name,
      avatarUrl,
      provider,
      providerId,
      verified: true, // OAuth providers considered verified
    });
    await user.save();
    return user;
  }

  // update basic profile info
  let changed = false;
  if (name && user.name !== name) {
    user.name = name;
    changed = true;
  }
  if (avatarUrl && user.avatarUrl !== avatarUrl) {
    user.avatarUrl = avatarUrl;
    changed = true;
  }
  if (!user.providerId) {
    user.providerId = providerId;
    changed = true;
  }
  if (!user.verified) {
    user.verified = true;
    changed = true;
  }
  if (changed) await user.save();
  return user;
};

UserSchema.methods.toSafeJSON = function () {
  return {
    id: this._id.toString(),
    name: this.name,
    email: this.email,
    avatarUrl: this.avatarUrl,
    provider: this.provider,
    role: this.role,
    verified: this.verified,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

const User = mongoose.model('User', UserSchema);
module.exports = User;