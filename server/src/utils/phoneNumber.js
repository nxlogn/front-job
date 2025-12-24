const crypto=require("crypto")
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY
const IV_LENGTH = 16; // 对于 AES，IV 通常是 16 字节
//IV (Initialization Vector - 初始化向量) 1个随机数，与密钥一起用于加密过程
console.log("环境变量里的密钥", ENCRYPTION_KEY)
function encryptPhoneNumber(phoneNumber) {
    // 确保手机号是字符串
    const text = String(phoneNumber);
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY, 'hex'), iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + ':' + encrypted;
}

function decryptPhoneNumber(encryptedText) {
    const textParts = encryptedText.split(':');
    const iv = Buffer.from(textParts.shift(), 'hex');
    const encryptedData = textParts.join(':');
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY, 'hex'), iv);
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}


module.exports={
    encryptPhoneNumber,
    decryptPhoneNumber
}