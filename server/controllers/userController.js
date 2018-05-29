import bcrypt from 'bcryptjs';
import config from '../../config';
import jwt from 'jsonwebtoken';
import pool from '../models/database';


class userController {



  static signupRequest(request, response, next) {

    const username = request.body.username;
    const email = request.body.email;
    const password = request.body.password;

    request.checkBody('username', 'Username is required').notEmpty();
    request.checkBody('email', 'Email is required').notEmpty();
    request.checkBody('email', 'Email is Invalid').isEmail();
    request.checkBody('password', 'password is required').notEmpty();

    const errors = request.validationErrors();
    if (errors) {
      response.json({ errors: errors });
    } else {
      const hashedPassword = bcrypt.hashSync(request.body.password, 8);
      const qry = 'INSERT INTO users (username,email,password) VALUES ($1, $2, $3) returning *';
      const values = [username, email, hashedPassword];
      pool.connect((err, client, done) => {
        if (err) {
          console.log(`not able to get connection ${err}`);
          response.status(400).send(err);
        }
        client.query(qry, values)
          .then((result) => {
            const token = jwt.sign({ id: result.rows[0].id }, config.secret, { // add the secret here
              expiresIn: 86400 // expires in 24 hours
            });
            response.status(200).json({ auth: true, token: token, user: { id: result.rows[0].id, username: result.rows[0].username } });

          })
          .catch(next);
      });
    }

  }
  

  static loginRequest(request, response, next) {

    const username = request.body.username;
    const password = request.body.password;

    request.checkBody('username', 'Username field cannot be empty').notEmpty();
    request.checkBody('password', 'Password field cannot be empty').notEmpty();
    const errors = request.validationErrors();
    if (errors) {
      console.log('There is an error');
      response.json({ errors: errors });
    }
    const qry = `SELECT id, username, email, password from users where username = '${username}';`;

    pool.connect((err, client, done) => {
      if (err) {
        console.log(`not able to get connection ${err}`);
        response.status(400).send(err);
      }
      client.query(qry)
        .then((result) => {
          console.log(result.rows[0].password);

          const passwordIsValid = bcrypt.compareSync(request.body.password, result.rows[0].password);
          if (!passwordIsValid) return response.status(401).send({ auth: false, token: null });


          const token = jwt.sign({ id: result.rows[0].id }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
          });
          response.status(200).send({ auth: true, token: token });
        })
        .catch(next)

    });

  }

}

export default userController;
