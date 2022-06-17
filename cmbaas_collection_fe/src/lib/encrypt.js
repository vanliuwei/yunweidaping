import { JSEncrypt } from 'jsencrypt'
//  加密
export const encryptedData = (data, publicKey) => {
  // 新建JSEncrypt对象
  publicKey = publicKey ? publicKey :
    'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAgSqykofAxCNWspshJboA0EZgY5BhzVRKLkuxMJbROFLRa3Yqqn8cvOgQtzjqN6IcCHscMPQQrLdyiNsUCdjyu45BoG8kh2KtNMGzdEV/JS0BloS7ATrpRSYxUVOmYkTTN2qRFX92ZgNFbgUhqVSok3VRDWb+ArkEqtyUQ2UhgwqkzbPk8IKcfqzIPvNTRmCK81aFIHD7q67m5D1OYPTJYQ6zgZjutwsIckXaJfY/XFC7fDoS1vi6zH9ftra402V003z6Hb9fNVyDElVdCNtmZ2OG5xb52mWGotKznJXhWlcjsic4jv5kqrlFq/Z+xzUpcz4xeQUPoSRlpPis2p+6lwIDAQAB'
  publicKey = `-----BEGIN PUBLIC KEY-----${publicKey}-----END PUBLIC KEY-----`
  // console.log(publicKey,'publicKey')
  let encryptor = new JSEncrypt();
  // 设置公钥
  encryptor.setPublicKey(publicKey);
  // 加密数据
  return encryptor.encrypt(data);
}
// 解密
export const  decryptData = (data, privateKey) => {
  // 新建JSEncrypt对象
  let decrypt= new JSEncrypt();
  // 设置私钥
  decrypt.setPrivateKey(privateKey);
  // 解密数据
  return decrypt.decrypt(secretWord);
}