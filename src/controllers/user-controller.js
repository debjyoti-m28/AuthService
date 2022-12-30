const UserService = require("../services/user-service");
const { ServerErrorCodes, SuccessCodes } = require("../utils/error-codes");

const userService = new UserService();

const create = async (req,res) => {
    try {
        const user = await userService.create({
            email: req.body.email,
            password: req.body.password
        });
        return res.status(SuccessCodes.CREATED).json({
            data: user,
            success: true,
            message: "Successfully created the new user.",
            err: {}
        })  
    } catch (error) {
        console.log(error);
        return res.status(ServerErrorCodes.INTERNAL_SERVER_ERROR).json({
            data: {},
            success: false,
            message: "Something went wrong",
            err: error
        })
    }
}

const signIn = async (req, res) => {
    try {
        const response = await userService.signIn(req.body.email, req.body.password);
        res.status(SuccessCodes.OK).json({
            data: response,
            success: true,
            message: "Successfully logged in",
            err: {}
        })
    } catch (error) {
        console.log(error);
        return res.status(ServerErrorCodes.INTERNAL_SERVER_ERROR).json({
            data: {},
            success: false,
            message: "Something went wrong",
            err: error
        })
    }
}

const isAuthenticated = async (req, res) => {
    try {
        //get the token from request headers and check if the token expired or not, if the token expired user need to login again
        const token = req.headers['x-access-token'];
        const response = await userService.isAuthenticated(token); //response = {userId: 2}
        res.status(SuccessCodes.OK).json({
            data: response,
            success: true,
            message: "User is authenticated and token is valid.",
            err: {}
        });
    } catch (error) {
        console.log(error);
        return res.status(ServerErrorCodes.INTERNAL_SERVER_ERROR).json({
            data: {},
            success: false,
            message: "Something went wrong in authentication",
            err: error
        })
    }
}

const isAdmin = async (req, res) => {
    try {
        const response = await userService.isAdmin(req.body.id);
        res.status(SuccessCodes.OK).json({
            data: response,
            success: true,
            message: "Successfully fetched whether user is admin or not",
            err: {}
        })
    } catch (error) {
        console.log(error);
        return res.status(ServerErrorCodes.INTERNAL_SERVER_ERROR).json({
            data: {},
            success: false,
            message: "Something went wrong in validate admin role",
            err: error
        });
    }
}

module.exports = {
    create,
    signIn,
    isAuthenticated,
    isAdmin
}