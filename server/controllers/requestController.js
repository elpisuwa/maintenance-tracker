import data from '../data/request.json';
import pool from '../models/database';



class RequestController {
  // GET /api/v1/users/requests/
  static userRequest(request, response) {
    const userId = request.userId;
    const role = request.role;
    const qry = `SELECT * FROM requests WHERE user_id = '${userId}'`

    pool.connect((err, client, done) => {
      if (err) {
        console.log(`not able to get connection ${err}`);
        response.status(400).send(err);
      }
      client.query(qry)
        .then(result => response.status(200).json({ request: result.rows }))
        .catch()
    });
  }

  // '/api/v1/users/requests/:requestId.
  static viewRequest(request, response) {
    const requestId = request.params.requestId;
    if (Number.isInteger(requestId) === true) { 
      const qry = `SELECT * FROM requests WHERE id= '${requestId}'`
      pool.connect((err, client, done) => {
        if (err) {
          console.log(`not able to get connection ${err}`);
          response.status(400).send(err);
        }
        client.query(qry)
          .then((result) => {
            if (result.rows.length !== 0) {
              return response.status(200).json({ requests: result.rows })
            }


            return response.status(404).json({ message: 'request does not exist' });

          })
          .catch()

      });
    }
    return response.json({ message: 'requestId must be an integer' });
  }

  // '/api/v1/users/requests'
  static postRequest(request, response) {
    const userId = request.userId;
    const {
      item, requestType, requestDescription
    } = request.body;
    const status = '';
    if (item !== '' && requestType !== '' && requestDescription !== '') {
      const qry = 'INSERT INTO requests (user_id,item,request_type,request_description,status) VALUES($1, $2, $3, $4, $5) RETURNING * ';
      const values = [userId, item, requestType, requestDescription, status];
      pool.connect((err, client) => {
        if (err) {
          console.log(`not able to get connection ${err}`);
          response.status(400).send(err);
        }
        client.query(qry, values)
          .then(result => response.status(201).json({ request: result.rows[0], message: 'Request has been added successfully' }))
          .catch()

      });
    } else {
      return response.status(400).json({ message: 'An Empty field found, Please fill up all fields', error: 'Bad Request' });
    }
  }

  // '/api/v1/users/requests/:requestId'
  static updateRequest(request, response) {
    const { requestType, requestDescription } = request.body;

    const requestId = request.params.requestId;
    const findId = `SELECT * FROM requests WHERE id= '${requestId}'`;

    const qry = `UPDATE requests SET request_type = '${requestType}', request_description = '${requestDescription}' WHERE requests.id = '${requestId}', status  = 'pending' RETURNING * `;
    pool.connect((err, client) => {
      if (err) {
        console.log(`not able to get connection ${err}`);
        response.status(400).send(err);
      }
      client.query(findId)
        .then((result1) => {
          if (result1.rows.length === 0) {
            return response.status(400).json({ message: 'Request does not exist' });
          } else if (result1.rows[0].status === 'pending') {
            client.query(qry)
              .then(result => response.status(200).json({ message: 'Request has been successfully updated', request: result.rows[0] }))
              .catch();
          }
          return response.send({ message: 'You currently can not update this request. Thanks' });
        });
    });
  }
  // /api/v1/requests
  static allRequest(request, response) {
    const admin = request.role;
    
      const qry = 'SELECT * FROM requests';
      pool.connect((err, client) => {
        if (err) {
          console.log(`not able to get connection ${err}`);
          response.status(400).send(err);
        }
        client.query(qry)
          .then(result => response.status(200).json({ requests: result.rows }))
          .catch()

      });
    
    return response.status(401).json({ message: 'Ooops! You are not an Admin, therfore you can not view all requests' })
  }



  // '/api/v1/requests/:requestId/approve'
  static approveRequest(request, response) {
    // rewrite this logic, check if it is null first then and exist before Updating
    // const findQuery = `SELECT from requests WHERE requests.id ='${request.param.requestId}'`;
    //const admin = request.role;

    
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
          .catch()

      });
    

  }


  // '/api/v1/requests/:requestId/disapprove'
  static disapproveRequest(request, response) {
    const admin = request.role;

    
      const addStatus = 'disapprove';
      const requestId = request.params.requestId;
      const findStatus = `SELECT * FROM requests WHERE id = '${requestId}'`;

      const qry = `UPDATE requests SET status = '${addStatus}' WHERE requests.id = '${requestId}' RETURNING * `;
      pool.connect((err, client) => {
        if (err) {
          console.log(`not able to get connection ${err}`);
          response.status(400).send(err);
        }
        client.query(findStatus).then((result1) => {
          if (result1.rows[0].status === '' || result1.rows[0].status === 'pending') {
            client.query(qry)
              .then((result) => {
                if (result.rows.length === 0) {
                  response.status(400).json({ message: 'This request does not exist' });
                } else {
                  return response.status(201).json({ message: 'Request has been Disapproved', request: result.rows });
                }
              })
              .catch()
          } else {
            return response.send({ message: 'You can not disapprove a resolved request!' })
          }
        })


      });
    

  }

  // '/api/v1/requests/:requestId/resolve
  static resolveRequest(request, response) {
    const admin = request.role;

    
      const addStatus = 'resolved';
      const requestId = request.params.requestId;
      const findStatus = `SELECT * FROM requests WHERE id = '${requestId}'`;

      const qry = `UPDATE requests SET status = '${addStatus}' WHERE requests.id = '${requestId}' RETURNING * `;
      pool.connect((err, client) => {
        if (err) {
          console.log(`not able to get connection ${err}`);
          response.status(400).send(err);
        }
        client.query(findStatus).then((result1) => {
          if (result1.rows[0].status === 'pending') {
            client.query(qry)
              .then((result) => {
                if (result.rows.length == 0) {
                  response.status(400).json({ message: 'This request does not exist' });
                } else {
                  response.status(201).json({ message: 'Request has been Approved', request: result.rows });
                }
              })
              .catch()

          }
        })


      });
    

  }







}
export default RequestController;
