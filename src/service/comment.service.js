const connection = require('../app/database');

class CommentService {

    /**
     * 
     * @param {*} momentId 动态id 
     * @param {*} content  内容
     * @param {*} userId 用户id
     * @returns 
     */
  async create(momentId, content, userId) {
    const statement = `INSERT INTO comment (content, moment_id, user_id) VALUES (?, ?, ?);`;
    `INSERT INTO comment SET ?`
    const [result] = await connection.execute(statement, [content, momentId, userId]);
    return result;
  }

  /**
   * 
   * @param {*} momentId  动态id
   * @param {*} content  评论内容
   * @param {*} userId  用户id
   * @param {*} commentId 被评论的评论id 
   * @returns 
   */
  async reply(momentId, content, userId, commentId) {
    const statement = `INSERT INTO comment (content, moment_id, user_id, comment_id) VALUES (?, ?, ?, ?);`;
    const [result] = await connection.execute(statement, [content, momentId, userId, commentId]);
    return result;
  }
  /**
   *  修改评论
   * @param {*} commentId 
   * @param {*} content 
   * @returns 
   */
  async update(commentId, content) {
    const statement = `UPDATE comment SET content = ? WHERE id = ?`;
    const [result] = await connection.execute(statement, [content, commentId]);
    return result;
  }

  async remove(commentId) {
    const statement = `DELETE FROM comment WHERE id = ?`;
    const [result] = await connection.execute(statement, [commentId]);
    return result;
  }

  async getCommentsByMomentId(momentId) {
    const statement = `
      SELECT 
        m.id, m.content, m.comment_id commendId, m.createAt createTime,
        JSON_OBJECT('id', u.id, 'name', u.name) user
      FROM comment m
      LEFT JOIN user u ON u.id = m.user_id
      WHERE moment_id = ?;
    `;
    const [result] = await connection.execute(statement, [momentId]);
    return result;
  }
}

module.exports = new CommentService();