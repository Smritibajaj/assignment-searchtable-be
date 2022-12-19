const httpStatus = require("http-status");
const passport = require("passport");
const AuthService = require("../services/auth.service");
const { verifyToken, signNewToken } = require("../helper/auth.helper");
const UserHelper = require("../helper/user.helper");

const AuthController = {
  
  signIn: (req, res, next) => {
    //Use passport local authenticate method
    passport.authenticate("login", { session: false }, (err, user, info) => {
      if (err) {
        return res.status(httpStatus.BAD_REQUEST).json({
          status: httpStatus.BAD_REQUEST,
          body: info,
        });
      }
      req.login(user, { session: false }, (err) => {
        if (err) {
          return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: httpStatus.INTERNAL_SERVER_ERROR,
            body: err,
          });
        }

        if (!user)
          return res.status(httpStatus.NOT_FOUND).json({
            status: httpStatus.NOT_FOUND,
            body: info,
          });
        const token = signNewToken(user._id);
        return res.status(httpStatus.OK).json({
          status: httpStatus.OK,
          response: {
            ...Object.assign(UserHelper.sanitizeUserObject(user)),
            token,
          },
        });
      });
    })(req, res, next);
  },

  signUp: async (req, res, next) => {
    try {
      const { email, password, authType, userName, company_name } = req.body;
      const signUpUser = await AuthService.signUpUser({
        email,
        password,
        userName,
        company_name
      });
      return res.status(httpStatus.OK).json({
        status: httpStatus.OK,
        response: signUpUser,
      });
    } catch (err) {
      console.log({ err });
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        status: httpStatus.INTERNAL_SERVER_ERROR,
        response: err || httpStatus["500_MESSAGE"],
      });
    }
  },
};

module.exports = AuthController;
