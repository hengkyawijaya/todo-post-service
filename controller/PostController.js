const { Post } = require("../model")

module.exports = {
   find: async(data, req, res, next) => {
    const { page=1, limit=10, searchBy='type', search='', orderBy='createdAt', order='desc', filter=false  } = req.query;
    const theFilter = filter ? JSON.parse(filter) : {}

    try {
      const thePost = await Post.paginate({...theFilter}, { sort:[{ [orderBy]: order  }], page, limit, 
          populate:[{
          path: "user"
        }]
      });
      res.send({
        data: {
          post: thePost.docs,
          total: thePost.total
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
      const thePost = await Post.findById(id);

      res.send({
        data: {
          post: thePost,
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
    const { post } = req.body;
    const { data:{ user } } = data;
    try {
      const thePost = await new Post({ ...post, user }).save();

      res.send({
        data: {
          post: thePost
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
    const { post } = req.body;
    const { data:{user} } = data;

    const thePost = await Post.findOne({ $and: [{ _id: id }, { user: user._id }  ] });

    if(!thePost){
      return next({
          message: "Unauthorized"
      })
    }

    try {
      const editPost = await Post.findByIdAndUpdate(id, post);

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

    const thePost = await Post.findOne({ $and: [{ _id: id }, { user: user._id }  ] });
    

    if(!thePost){
      return next({
          message: "Unauthorized"
      })
    }

    try {
      
      await thePost.remove();

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