const { PostController, CommentController } = require("../controller");
const { AuthMiddleware } = require("../middleware");

module.exports = (app) => {
  app.post("/posts/create",AuthMiddleware, PostController.create),
  app.get("/posts", AuthMiddleware, PostController.find),
  app.get("/posts/:id", AuthMiddleware, PostController.findOne),
  app.put("/posts/:id/update",AuthMiddleware, PostController.update),
  app.delete("/posts/:id/delete",AuthMiddleware, PostController.destroy),

  app.post("/comments/create",AuthMiddleware, CommentController.create),
  app.get("/comments", AuthMiddleware, CommentController.find),
  app.get("/comments/:id", AuthMiddleware, CommentController.findOne),
  app.put("/comments/:id/update",AuthMiddleware, CommentController.update),
  app.delete("/comments/:id/delete",AuthMiddleware, CommentController.destroy)
}