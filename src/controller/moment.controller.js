
const momentService = require('../service/moment.service');


class MomentController {
   //    增
   /**
    *  需要用户id , 内容
    * @param {*} ctx 
    * @param {*} next 
    */
   async create(ctx, next) {
      // 获取用户id , 内容
      const userId = ctx.user.id
      const content = ctx.request.body.content;

      // 2.将数据插入到数据库
      const result = await momentService.create(userId, content);
      ctx.body = result;

   }

   // 删
   /**
    *  需要评论id
    * @param {*} ctx 
    * @param {*} next 
    */
   async remove(ctx, next) {
      // // 获取评论id 
      const { momentId } = ctx.params

      // 2.删除内容
      const result = await momentService.remove(momentId);
      ctx.body = result;
   }

   // 改
   /**
    * 评论id ,  内容
    * @param {*} ctx 
    * @param {*} next 
    */
   async update(ctx, next) {
      // 1.获取参数
    const { momentId } = ctx.params;
    const { content } = ctx.request.body;

     // 2.修改内容
     const result = await momentService.update(content, momentId);
     ctx.body = result;
   }

   // 查
   /**
    *  评论id
    * @param {*} ctx 
    * @param {*} next 
    */
   async detail(ctx, next) {
      const id = ctx.params.momentId   
      const result = await momentService.getMomentById(id)
      ctx.body = result;
   }

   /**
    * 查询列表
    * @param {*} ctx 
    * @param {*} next 
    */

   async list(ctx,next) {
      //  1. 从请求路径参数中获取数据
      const {offset , size} = ctx.query;

      // 2. 查询列表
      const result = await momentService.getMomentList(offset, size);

      ctx.body = result
   }

}

module.exports = new MomentController()