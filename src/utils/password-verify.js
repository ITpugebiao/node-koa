
//  要求密码 密码长度要大于6位，由数字和字母组成

const verify = (password) => {
    const reg =  /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}$/ ;
    return reg.test(password)
}


module.exports = verify