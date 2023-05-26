const mongoose = require('mongoose');

// Define Schemes
const userSchema = new mongoose.Schema({
  userid: { type: Number, required: true, unique: true },
  password: { type: String, required: true }
},
{
  timestamps: true
});

// Create new user document
userSchema.statics.create = function (payload) {
  // this === Model
  const user = new this(payload);
  // return Promise
  return user.save();
};

// Find All
userSchema.statics.findAll = function () {
  // return promise
  // V4부터 exec() 필요없음
  return this.find({});
};

// Find One by userid
userSchema.statics.findOneByuserid = function (userid) {
  return this.findOne({ userid });
};

// Update by userid
userSchema.statics.updateByuserid = function (userid, payload) {
  // { new: true }: return the modified document rather than the original. defaults to false
  return this.findOneAndUpdate({ userid }, payload, { new: true });
};

// Delete by userid
userSchema.statics.deleteByuserid = function (userid) {
  return this.remove({ userid });
};

// Create Model & Export
module.exports = mongoose.model('user', userSchema);