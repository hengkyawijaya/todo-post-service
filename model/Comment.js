const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const mongoosePaginate = require('mongoose-paginate');

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    require: true
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
    require: true
  },
  content: {
    type: String,
    require: true
  },
}, {
  timestamps: true
})

CommentSchema.plugin(mongoosePaginate);


const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
