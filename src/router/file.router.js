
const Router = require('koa-router');

// const {
//   verifyAuth
// } = require('../middleware/auth.middleware');
// const {
//   create,
//   list
// } = require('../controller/label.controller.js')

const fileRouter = new Router({prefix: '/label'});

// fileRouter.post('/', verifyAuth, create);
// fileRouter.get('/', list);

module.exports = fileRouter;
