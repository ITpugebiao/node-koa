const Router = require('koa-router')


const momentRouter = new Router({prefix: '/moment'});

const {create, remove ,detail ,list,update} = require('../controller/moment.controller.js')
const {
    verifyAuth,
    verifyPermission
  } = require('../middleware/auth.middleware');


momentRouter.post('/', verifyAuth, create);  // 新增评论
momentRouter.get('/', list);   // 查询所有评论
momentRouter.get('/:momentId', detail); // 查询单条评论

// 1.用户必须登录 2.用户具备权限
momentRouter.patch('/:momentId', verifyAuth, verifyPermission, update);   // 修改评论
momentRouter.delete('/:momentId', verifyAuth, verifyPermission, remove);  // 删除评论




module.exports = momentRouter