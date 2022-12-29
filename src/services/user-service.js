const { UserRepository } = require("../repository/user-repository");
const jwt = require('jsonwebtoken');
const { JWT_KEY } = require("../config/serverConfig");
const bcrypt = require('bcrypt');

class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async create(data) {
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            console.log("Sonething went wrong in the service layer");
            throw {error};
        }
    }

    async signIn(email, plainPassword) {
        try {
            //step 1 -> fetch the user using email
            const user = await this.userRepository.getUserByEmail(email);
            // step 2 -> comapre incoming plain password with stored encrypted password
            const matchPassword = this.checkPassword(plainPassword, user.password);

            //step 3 -> if password doesn't match throw error
            if(!matchPassword) {
                console.log("Password doesn't match");
                throw {error: 'password is incorrect'};
            } 

            //step 4 -> if password matches, generate jwt token and sent it to the user
            const token = this.createToken({eamil: user.email, id: user.id});
            return token;
        } catch (error) {
            console.log("Password doesn't match");
            throw {error: 'Password is incorrect'}
        }
    }

    createToken(user) {
        try {
            const token = jwt.sign(user, JWT_KEY, { expiresIn: '1d' });
            return token;
        } catch (error) {
            console.log("Error in creating the token");
            throw error;
        }
    }

    verifyToken(token) {
        try {
            const decoded = jwt.verify(token, JWT_KEY);
            return decoded;
        } catch (error) {
            console.log("Error in token validation");
            throw error;
        }
    }

    checkPassword(plainPassword, encryptedPassword) {
        try {
            return bcrypt.compareSync(plainPassword, encryptedPassword);
        } catch (error) {
            console.log("Error in password validation");
            throw error;
        } 
    }
}

module.exports = UserService;