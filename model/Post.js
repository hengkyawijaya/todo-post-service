const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const mongoosePaginate = require('mongoose-paginate');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    require: true
  },
  content: {
    type: String,
    require: true
  },
}, {
  timestamps: true
})

PostSchema.plugin(mongoosePaginate);


const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
