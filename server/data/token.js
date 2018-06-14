import jwt from 'jsonwebtoken';

const token = {
  real: jwt.sign({ id: 1 }, 'secret', { // add the secret here
    expiresIn: 86400
  })

}

export default token;
