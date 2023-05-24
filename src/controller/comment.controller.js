const service = require('../service/comment.service.js');

class CommentController {
    /**
     * 创建评论
     * @param {*} ctx 
     *  需要动态id , 内容 , 用户id
     * @param {*} next 
     */

  async create(ctx, next) {
    const { momentId, content } = ctx.request.body;
    const { id } = ctx.user;
    const result = await service.create(momentId, content, id);
    ctx.body = result;
  }


  /**
   * 评论 其他的 评论
   * 动态id  评论id 评论人的id 内容 
   * @param {*} ctx 
   * @param {*} next 
   */
  async reply(ctx, next) {
    const { momentId, content } = ctx.request.body;
    const { commentId } = ctx.params;
    const { id } = ctx.user;
    const result = await service.reply(momentId, content, id, commentId);
    ctx.body = result;
  }
  
  /**
   * 修改评论
   * 评论id 内容
   * @param {*} ctx 
   * @param {*} next 
   */
  async update(ctx, next) {
    const { commentId } = ctx.params;
    const { content } = ctx.request.body;
    const result = await service.update(commentId, content);
    ctx.body = result;
  }


  /**
   * 删除评论
   * @param {*} ctx 
   * @param {*} next 
   */

  async remove(ctx, next) {
    const { commentId } = ctx.params;
    const result = await service.remove(commentId);
    ctx.body = result;
  }
  


  /**
   * 查看所有评论
   * @param {*} ctx 
   * @param {*} next 
   */

  async list(ctx, next) {
    const { momentId } = ctx.query;
    const result = await service.getCommentsByMomentId(momentId);
    ctx.body = result;
  }
}

module.exports = new CommentController();