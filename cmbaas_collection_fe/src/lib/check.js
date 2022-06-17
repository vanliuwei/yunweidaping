// 手机号
function isPhoneNumber (phoneNumber) {
  var reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
  return reg.test(phoneNumber)
}

function isEmail (email) {
  var reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
  return reg.test(email)
}

function isNumber (value) {
  var reg = /^\d+$/
  return reg.test(value)
}

function isBlockNum (value) {
  var reg = /^([1-9]\d*)$/
  return reg.test(value)
}

function isCmBlockNum (value) {
  var reg = /^([0-9]\d*)$/
  return reg.test(value)
}

function isAccount (value) {
  var reg = /^(?![.])(?!\d+$)[a-z1-5.]{5,12}(?<![.])$/
  return reg.test(value)
}

function isTrxId (value) {
  var reg = /^([0-9a-f]{64})$/
  return reg.test(value)
}

function isStar (value) {
  var reg = /^[*]/
  return reg.test(value)
}

function isUser (value) {
  var reg = /^[\u4E00-\u9FA5a-zA-Z0-9_]{1,20}$/
  return reg.test(value)
}

function isLoginId (value) {
  var reg = /^([\u4E00-\u9FA5A-Za-z0-9_]{1,30})$/
  return reg.test(value)
}

function isRealName (value) {
  var reg = /^([\u4E00-\u9FA5A-Za-z]{1,30})$/
  return reg.test(value)
}

function isPassword (value) {
  var reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!#$%])[a-zA-Z0-9!#$%]{8,20}$/
  return reg.test(value)
}

function isContractName (value) {
  var reg = /^[-.0-9a-zA-Z]{5,32}$/
  return reg.test(value)
}

export {
  isPhoneNumber,
  isEmail,
  isNumber,
  isAccount,
  isTrxId,
  isBlockNum,
  isStar,
  isUser,
  isLoginId,
  isRealName,
  isPassword,
  isContractName,
  isCmBlockNum
}
