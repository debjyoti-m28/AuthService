const UserService = require("../services/user-service");

const userService = new UserService();

const create = async (req,res) => {
    try {
        const user = await userService.create({
            email: req.body.email,
            password: req.body.password
        });
        return res.status(201).json({
            data: user,
            success: true,
            message: "Successfully created the new user.",
            err: {}
        })  
    } catch (error) {
        console.log(error);
        return res.status(500).json({
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
        res.status(200).json({
            data: response,
            success: true,
            message: "Successfully logged in",
            err: {}
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            success: false,
            message: "Something went wrong",
            err: error
        })
    }
}

const isAuthenticated = async (req, res) => {
    try {
        //get the token from request headers
        const token = req.headers['x-access-token'];
        const response = await userService.isAuthenticated(token); //response = {userId: 2}
        res.status(200).json({
            data: response,
            success: true,
            message: "User is authenticated and token is valid.",
            err: {}
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            success: false,
            message: "Something went wrong in authentication",
            err: error
        })
    }
}

module.exports = {
    create,
    signIn,
    isAuthenticated
}