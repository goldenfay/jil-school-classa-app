const checkAuthAdmin = require("../../admin/middlewares/check-auth-admin");
const checkAuthUser = require("../middlewares/check-auth-user");

module.exports = async (req, res, next) => {
  if (req.method === "OPTIONS") next();
  // GET requests don't have BODY, so check headers also
  if (req.body.adminType || req.headers.admintype) checkAuthAdmin(req, res, next);
  if (req.body.userType || req.headers.usertype) checkAuthUser(req, res, next);
};
