import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../models/database';



class userController {



  static signupRequest(request, response, next) {

    const username = request.body.username;
    const email = request.body.email;
    const password = request.body.password;
    const role = 'user';

    request.checkBody('username', 'Username is required').notEmpty();
    request.checkBody('email', 'Email is required').notEmpty();
    request.checkBody('email', 'Email is Invalid').isEmail();
    request.checkBody('password', 'password is required').notEmpty();

    const errors = request.validationErrors();
    if (errors) {
      response.json({ errors: errors.msg });
    } else {
      const findEmail = `SELECT from users WHERE email= '${email}'`;
      const hashedPassword = bcrypt.hashSync(request.body.password, 8);
      const qry = 'INSERT INTO users (username,email,password,role) VALUES ($1, $2, $3, $4) returning *';
      const values = [username, email, hashedPassword, role];
      pool.connect((err, client, done) => {
        if (err) {
          console.log(`not able to get connection ${err}`);
          response.status(400).send(err);
        }

        client.query(qry, values)
          .then((result) => {
            const token = jwt.sign({ id: result.rows[0].id }, { role: result.rows[0].role }, 'secret', { // add the secret here
              expiresIn: 86400 // expires in 24 hours
            });
            response.status(200).send({ auth: true, token: token, user: { id: result.rows[0].id, username: result.rows[0].username } });

          })
          .catch(next);

      });
    }

  }

  static createAdmin(request, response, next) {

    const username = request.body.username;
    const email = request.body.email;
    const password = request.body.password;
    const role = 'admin';

    request.checkBody('username', 'Username is required').notEmpty();
    request.checkBody('email', 'Email is required').notEmpty();
    request.checkBody('email', 'Email is Invalid').isEmail();
    request.checkBody('password', 'password is required').notEmpty();

    const errors = request.validationErrors();
    if (errors) {
      response.json({ errors: errors.msg });
    } else {
      const hashedPassword = bcrypt.hashSync(request.body.password, 8);
      const qry = 'INSERT INTO users (username,email,password,role) VALUES ($1, $2, $3, $4) returning *';
      const values = [username, email, hashedPassword, role];
      pool.connect((err, client) => {
        if (err) {
          console.log(`not able to get connection ${err}`);
          response.status(400).send(err);
        }
        client.query(qry, values)
          .then((result) => {
            const token = jwt.sign({ id: result.rows[0].id }, { role: result.rows[0].role }, 'secret', { // add the secret here
              expiresIn: 86400 // expires in 24 hours
            });
            response.status(200).send({ auth: true, token: token, user: { id: result.rows[0].id, username: result.rows[0].username } });

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
      response.json({ errors: errors.msg });
    }
    const qry = `SELECT id, username, email, password from users where username = '${username}';`;

    pool.connect((err, client) => {
      if (err) {
        console.log(`not able to get connection ${err}`);
        response.status(400).send(err);
      }
      client.query(qry)
        .then((result) => {
          console.log(request);
          console.log(result.rows[0].password);

          const passwordIsValid = bcrypt.compareSync(request.body.password, result.rows[0].password);
          if (!passwordIsValid) return response.status(401).send({ auth: false, token: null });


          const token = jwt.sign({ id: result.rows[0].id }, { role: result.rows[0].role }, 'secret', {
            expiresIn: 86400 // expires in 24 hours
          });
          response.status(200).send({ auth: true, token: token });
        })
        .catch(next)

    });

  }


  static user(request, response, next) {
    const qry = `SELECT * users WHERE id= '${request.userId}'`;
    pool.connect((err, client, done) => {
      if (err) {
        console.log(`not able to get connection ${err}`);
        response.status(400).send(err);
      }
      client.query(qry)
        .then((result) => {
          if (!result) return res.status(500).send('There was a problem finding the user.');
          // if (!user) return res.status(404).send("No user found.");
          res.status(200).send(result);

        }).catch(next);


    });

  }

  static logout(request, response) {
    res.status(200).send({ auth: false, token: null });
  }
}

export default userController;
