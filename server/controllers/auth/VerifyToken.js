import jwt from 'jsonwebtoken';
//import config from '../../../config';

function verifyToken(request, response, next) {
  const token = request.headers['x-access-token'];
  if (!token) { return response.status(403).send({ auth: false, message: 'No token provided.' }); }
  jwt.verify(token, 'secret', (err, decoded) => {
    if (err) { return response.status(500).send({ auth: false, message: 'Failed to authenticate token.' }); }
    
    request.userId = decoded.id;
    request.role = decoded.role;
    next();
  });
}
module.exports = verifyToken;
