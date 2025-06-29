const { verify } = require("jsonwebtoken");

function isAuthenticated(request, response, next) {
  const authToken = request.headers.authorization;
  if (!authToken) {
    return response.status(401).end();
  }

  const [, token] = authToken.split(" ");

  try {
    const { sub } = verify(token, process.env.JWT_SECRET);
    request.user_id = sub;
    return next();
  } catch (error) {
    return response.status(401).end();
  }
}

module.exports = { isAuthenticated };
