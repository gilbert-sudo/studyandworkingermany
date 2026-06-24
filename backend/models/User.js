const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  clientId: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  hasCompletedVocationalTest: {
    type: Boolean,
    default: false
  },
  vocationalTestResults: {
    type: Array,
    default: []
  }
});

module.exports = mongoose.model('User', userSchema);
