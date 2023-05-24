const crypto = require('crypto');   // node自带库

const md5password = (password) => {
    const md5 = crypto.createHash('md5');   // 将密码转换为md5格式
    const result = md5.update(password).digest('hex');  // 16进制
    return result
}

module.exports = md5password;