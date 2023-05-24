const errorTypes = require('../constants/error-types')

const errorHandler = (error, context) => {

    let status, message;

    switch (error.message) {
        case errorTypes.NAME_OR_PASSWORD_IS_REQUIRED:
            status = 400;
            message = "用户名密码不能为空";
            break;
        case errorTypes.USER_ALERADY_EXISTS:
            status = 409;
            message = "用户名已经存在";
            break;
        case errorTypes.PASSWORD_FORMAT_ERROR:
            status = 400;
            message = "密码长度应超过6位,且为数字,字母组成";
            break;
        case errorTypes.UNAUTHORIZATION:
            status = 401; // 参数错误
            message = "无效的token~";
            break;
        case errorTypes.UNPERMISSION:
            status = 401; // 参数错误
            message = "您不具备操作的权限~";
            break;
        default:
            status = 404;
            message = "NOT FOUND";
    }

    context.status = status;
    context.body = message;
}

module.exports = errorHandler