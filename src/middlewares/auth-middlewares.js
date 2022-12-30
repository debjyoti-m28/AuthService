const { ClientErrorCodes } = require("../utils/error-codes")

const validateUserAuth = (req, res, next) => {
    if(!req.body.email || !req.body.password) {
        return res.status(ClientErrorCodes.BAD_REQUEST).json({
            success: false,
            data: {},
            message: 'Something went wrong',
            err: 'Email or password missing in the request'
        });
    }
    next();
}

const validateIsAdminRequest = (req, res, next) => {
    if(!req.body.id) {
        return res.status(ClientErrorCodes.BAD_REQUEST).json({
            success: false,
            data: {},
            err: 'User id not given',
            message: 'Something went wrong'
        })
    }
    next();
}

module.exports = {
    validateUserAuth,
    validateIsAdminRequest
}