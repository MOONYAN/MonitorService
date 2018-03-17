var mongoose = require('mongoose'),
    uniqueValidator = require('mongoose-unique-validator'),
    Schema = mongoose.Schema;

var hostSchema = new Schema({
    name: { type: String, required: true, unique: true }
});

hostSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Host', hostSchema);