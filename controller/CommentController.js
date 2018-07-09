const { Comment } = require("../model")

module.exports = {
   find: async(data, req, res, next) => {
    const { page=1, limit=10, searchBy='type', search='', orderBy='updatedAt', order='desc', filter=false  } = req.query;
    const theFilter = filter ? JSON.parse(filter) : {}

    try {
      const theComment = await Comment.paginate({...theFilter}, { page, limit, populate:[{
        path:"user"
      }]});

      res.send({
        data: {
          comment: theComment.docs,
          total: theComment.total
        },
        status: {
          code: 200,
          message: "Operation handle correctly",
          succeeded: true
        }
      });

    } catch(err) {
      res.send(err)
    }
  },
  findOne: async (data, req, res, next) => {
    const { id } = req.params;
    
    try {
      const theComment = await Comment.findById(id);

      res.send({
        data: {
          comment: theComment,
        },
        status: {
          code: 200,
          message: "Operation handle correctly",
          succeeded: true
        }
      });
    } catch(err) {
      res.send(err)
    }
  },
  create: async(data, req, res, next) => {
    const { comment } = req.body;
    const { data:{user} } = data;
    try {
      const theComment = await new Comment({...comment, user}).save();

      res.send({
        data: {
          comment: theComment
        },
        status: {
          code: 200,
          message: "Operation handle correctly",
          succeeded: true
        }
      });

    } catch(err) {
      res.send(err)
    }
  },
  update: async (data, req, res, next) => {
    const { id } = req.params;
    const { comment } = req.body;
    const { data:{user} } = data;

    const theComment = await Comment.findOne({ $and: [{ _id: id }, { user: user._id }  ] });

    if(!theComment){
      return next({
          message: "Unauthorized"
      })
    }

    try {
      const editComment = await Comment.findByIdAndUpdate(id, comment);

      res.send({
        status: {
          code: 200,
          message: "Operation handle correctly",
          succeeded: true
        }
      });
    } catch(err) {
      res.send(err)
    }
  },
  destroy: async (data, req, res, next) =>{
    const { id } = req.params;
    const { data:{user} } = data;

    try {

      const theComment = await Comment.findOne({ $and: [{ _id: id }, { user: user._id }  ] });

    if(!theComment){
      return next({
          message: "Unauthorized"
      })
    }

      await theComment.remove();

      res.send({
        status: {
          code: 200,
          message: "Operation handle correctly",
          succeeded: true
        }
      });
    } catch(err) {
      res.send(err)
    }
  },

}