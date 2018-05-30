import data from '../data/request.json';
import pool from '../models/database';



class RequestController {

  static userRequest(request, response) {
    const userId = request.Id;

    const qry = `SELECT from request WHERE user_id = '${userId}`

    pool.connect((err, client, done) => {
      if (err) {
        console.log(`not able to get connection ${err}`);
        response.status(400).send(err);
      }
      client.query(qry)
        .then(result => response.status(200).json({ request: result.rows }))
        .catch(next)
    });
  }

  // '/api/v1/users/requests/:requestId
  static viewRequest(request, response, next) {
    const requestId = request.params.requestId;
    const qry = `SELECT from requests WHERE id= '${requestId}'`
    pool.connect((err, client, done) => {
      if (err) {
        console.log(`not able to get connection ${err}`);
        response.status(400).send(err);
      }
      client.query(qry)
        .then(result => response.status(200).json({ requests: result.rows }))
        .catch(next)

    });

  }

  // '/api/v1/users/requests'
  static postRequest(request, response, next) {
    const userId = request.userId;
    const {id,
      item, requestType, requestDescription
    } = request.body;
    const status = '';
    // const id =1; fix needs an id to post
    if (userId !== '' && item !== '' && requestType !== '' && requestDescription !== '') {
      const qry = 'INSERT INTO requests (id,user_id,item,request_type,request_description,status) VALUES($1, $2, $3, $4, $5, $6) RETURNING * ';
      const values = [id, userId, item, requestType, requestDescription, status];
      pool.connect((err, client, done) => {
        if (err) {
          console.log(`not able to get connection ${err}`);
          response.status(400).send(err);
        }
        client.query(qry, values)
          .then(result => response.status(201).json({ request: result.rows[0], message: 'Request has been added successfully' }))
          .catch(next)

      });
    } else {
      return response.status(400).json({ message: 'An Empty field found, Please fill up all fields', error: 'Bad Request' });
    }
  }

  // '/api/v1/users/requests/:requestId'
  static updateRequest(request, response, next) {
    const { requestType, requestDescription } = request.body;

    const requestId = request.params.requestId;
    const findId = `SELECT FROM requests WHERE id= '${requestId}'`;

    const qry = `UPDATE requests SET request_type = '${requestType}', request_description = '${requestDescription}' WHERE requests.id = '${requestId}' RETURNING * `;
    pool.connect((err, client, done) => {
      if (err) {
        console.log(`not able to get connection ${err}`);
        response.status(400).send(err);
      }
      client.query(findId)
        .then((result1) => {
          if (result1.rows.length == 0) {
            return response.status(400).json({ message: 'Request does not exist' });
          }
          client.query(qry)
            .then(result => response.status(200).json({ message: 'Request has been successfully updated', request: result.rows[0] }))
            .catch(next);

        });
    });
  }
  // /api/v1/requests
  static allRequest(request, response, next) {

    const qry = 'SELECT * FROM requests';
    pool.connect((err, client, done) => {
      if (err) {
        console.log(`not able to get connection ${err}`);
        response.status(400).send(err);
      }
      client.query(qry)
        .then(result => response.status(200).json({ requests: result.rows }))
        .catch(next)

    });
  }



  // '/api/v1/requests/:requestId/approve'
  static approveRequest(request, response, next) {
    // rewrite this logic, check if it is null first then and exist before Updating
    // const findQuery = `SELECT from requests WHERE requests.id ='${request.param.requestId}'`;
    const { status } = request.body;
    if (status !== '' && status === 'approve') {
      const addStatus = 'pending';
      const requestId = request.params.requestId;
      const qry = `UPDATE requests SET status = '${addStatus}' WHERE requests.id = '${requestId}' RETURNING * `;
      pool.connect((err, client, done) => {
        if (err) {
          console.log(`not able to get connection ${err}`);
          response.status(400).send(err);
        }
        client.query(qry)
          .then((result) => {
            if (result.rows.length == 0) {
              response.status(400).json({ message: 'This request does not exist' });
            } else {
              response.status(201).json({ message: 'Request has been Approved', request: result.rows });
            }
          })
          .catch(next)

      });
    } else { return response.status(400).json({ message: 'Invalid entry, Ensure you enter: approve' }) }

  }


  // '/api/v1/requests/:requestId/disapprove'
  static disapproveRequest(request, response, next) {
    const { status } = request.body;
    if (status !== '' && status === 'disapprove') {
      const addStatus = 'disapprove';
      const requestId = request.params.requestId;
      const qry = `UPDATE requests SET status = '${addStatus}' WHERE requests.id = '${requestId}' RETURNING * `;
      pool.connect((err, client, done) => {
        if (err) {
          console.log(`not able to get connection ${err}`);
          response.status(400).send(err);
        }
        client.query(qry)
          .then((result) => {
            if (result.rows.length == 0) {
              response.status(400).json({ message: 'This request does not exist' });
            } else {
              response.status(201).json({ message: 'Request has been Disapproved', request: result.rows });
            }
          })
          .catch(next)

      });
    } else { return response.status(400).json({ message: 'Invalid entry, Ensure you enter: disapprove' }) }
  }

  // '/api/v1/requests/:requestId/resolve
  static resolveRequest(request, response, next) {
    const { status } = request.body;
    if (status !== '' && status === 'resolve') {
      const addStatus = 'resolve';
      const requestId = request.params.requestId;
      const qry = `UPDATE requests SET status = '${addStatus}' WHERE requests.id = '${requestId}' RETURNING * `;
      pool.connect((err, client, done) => {
        if (err) {
          console.log(`not able to get connection ${err}`);
          response.status(400).send(err);
        }
        client.query(qry)
          .then((result) => {
            if (result.rows.length == 0) {
              response.status(400).json({ message: 'This request does not exist' });
            } else {
              response.status(201).json({ message: 'Request has been Resolved', request: result.rows });
            }
          })
          .catch(next);

      });
    } else { return response.status(400).json({ message: 'Invalid entry, Ensure you enter: resolve' }) }
  }







}
export default RequestController;
