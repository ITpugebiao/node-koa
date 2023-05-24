const Router = require('koa-router')

const commentRouter = new Router({prefix: '/comment'})

const {
    create,
    reply,
    update,
    remove,
    list
  } = require('../controller/comment.controller.js')

const {
    verifyAuth,
    verifyPermission
  } = require('../middleware/auth.middleware');



// 新增评论 
commentRouter.post('/' , verifyAuth  , create)
// 评论其他评论
commentRouter.post('/:commentId', verifyAuth , reply)

// 修改评论
commentRouter.patch('/:commentId', verifyAuth, verifyPermission, update);
// 删除评论
commentRouter.delete('/:commentId', verifyAuth, verifyPermission, remove);

// 获取评论列表
commentRouter.get('/', list);





module.exports = commentRouter