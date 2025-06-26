const { getUser } = require("../service/auth");

// async function restrictToLoggedInUserOnly(req, res, next) {
//   const userUid = req.cookies?.uid;
//   if (!userUid) return res.redirect("/login");
//   const user = getUser(userUid);
//   if (!user) return res.redirect("/login");
//   req.user = user;
//   next();
// }

// async function checkAuth(req, res, next) {
//   const userUid = req.cookies?.uid;

//   const user = getUser(userUid);

//   req.user = user;

//   next();
// }

async function checkForAuthentication(req, res, next) {
  const tokenCookie = req.cookies?.token;
  req.user = null;

  if (!tokenCookie) return next();

  const user = getUser(tokenCookie);
  req.user = user;
  return next();
}

function restrictTo(roles = []) {
  return function (req, res, next) {
    if (!req.user) return res.redirect("/login");

    if (!roles.includes(req.user.role)) return res.end("Unauthorized");

    return next();
  };
}

module.exports = {
  // restrictToLoggedInUserOnly,
  // checkAuth,
  checkForAuthentication,
  restrictTo,
};
