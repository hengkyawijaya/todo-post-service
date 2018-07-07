const { Post } = require("../model")

module.exports = {
   find: async(data, req, res, next) => {
    const { page=1, limit=10, searchBy='type', search='', orderBy='updatedAt', order='desc', filter  } = req.query;
    try {
      const thePost = await Post.paginate({...filter}, { page, limit, 
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

    if(user.id !== post.user.id){
      next({
        error: {
          message: "Unauthorized"
        }
      })
    }

    try {
      const thePost = await Post.findByIdAndUpdate({ id }, post);

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
  destroy: async (data, req, res, next) =>{
    const { id } = req.params;
    const { data:{user} } = data;
    
    if(user.id !== post.user.id){
      next({
        error: {
          message: "Unauthorized"
        }
      })
    }

    try {
      const thePost = await Post.remove({ id });

      res.send({
        data: {
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

}