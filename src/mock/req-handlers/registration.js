function postSendOtp(schema) {
    return schema.db.sendOtp[0];
}

function postVerifyOtp(schema) {
    return schema.db.verifyOtp[0];
}

function postLogin(schema) {
    return schema.db.login[0];
}

function postVerifyToken(schema) {
    return schema.db.verifyToken[0];
}

function postRefreshToken(schema) {
    return schema.db.refreshToken[0];
}

function postCheckAuth(schema) {
    return schema.db.checkAuth[0];
}

export { postSendOtp, postVerifyOtp, postLogin, postVerifyToken, postRefreshToken, postCheckAuth };
