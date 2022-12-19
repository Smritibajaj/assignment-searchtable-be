const router = require("express").Router({
  caseSensitive: true,
  strict: true,
});
const { UserController } = require("../controllers/index");
const { getUserByUName } = require("../services/user.service");
const { checkError } = require("../helper/validation");
const {
  checkIsValidBody,
  sanitizeBody,
} = require("../validators/user.validator");

/**
 * @description Edit user profile
 */
router.route("/update").put(
  checkIsValidBody,
  sanitizeBody,
  (req, res, next) => {
    const { body, user } = req;
    req.body = {
      query: {
        _id: user._id,
      },
      condition: {
        $set: body,
      },
    };
    next();
  },
  UserController.updateUserProfile
);

/**
 * @dessription Get Current User route
 */
router.route("/profile").get(UserController.getCurrentUser);


module.exports = router;
