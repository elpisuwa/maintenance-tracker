import data from '../data/request.json';
import pool from '../models/database';



class RequestController {
  static postRequest(request, response, next) {
    const {
      userId, item, requestType, requestDescription
    } = request.body;
    const status = '';
    // const id =1; fix needs an id to post
    if (userId !== '' && item !== '' && requestType !== '' && requestDescription !== '') {
      const qry = 'INSERT INTO requests (user_id,item,request_type,request_description,status) VALUES($1, $2, $3, $4, $5) RETURNING * ';
      const values = [userId, item, requestType, requestDescription, status];
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

  static userRequest(request, response) {
    const newData = data.filter(userRequest =>
      userRequest.userId == parseInt(request.params.userId, 10));
    return response.status(200).json({ newData });

  }

  static approveRequest(request, response, next) {
    //rewrite this logic, check if it is null first then and exist before Updating 
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
            if (result.rows.length==0) {
              response.status(400).json({ message: 'This request does not exist' });
            } else {
              response.status(201).json({ message: 'Request has been Approved', request: result.rows });
            }
          })
          .catch(next)

      });
    } else { return response.status(400).json({ message: 'Invalid entry, Ensure you enter: approve' }) }

  }



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
            if (result.rows.length==0) {
              response.status(400).json({ message: 'This request does not exist' });
            } else {
              response.status(201).json({ message: 'Request has been Disapproved', request: result.rows });
            }
          })
          .catch(next)

      });
    } else { return response.status(400).json({ message: 'Invalid entry, Ensure you enter: disapprove' }) }
  }

  static resolveRequest(request, response) {
    const { status } = request.body;

    const findId = data.findIndex(userRequest =>
      userRequest.id == parseInt(request.params.requestId, 10));
    if (request.body.status === 'resolve' && data[findId].status === 'pending') { // only pending request can be updated to resolve
      data[findId].status = request.body.status;
      return response.status(201).json({ message: 'Request has been Resolved', request: data[findId] });
    }
    return response.status(400).json({ message: 'Invalid entry, Ensure you entered: resolve' });
  }


  static updateRequest(request, response) {
    const { requestType, requestDescription } = request.body;
    const findRequestId = data.findIndex(userRequest =>
      userRequest.id === parseInt(request.params.requestId, 10));
    data[findRequestId].requestType = request.body.requestType;
    data[findRequestId].requestDescription = request.body.requestDescription;
    if (data[findRequestId].status === 'pending') {
      return response.status(200).json({ message: 'Request has been successfully updated', request: data[findRequestId] })
    }
    return response.status(400).json({ message: 'Request can not be updated yet, until Approved' })
  }
  static viewRequest(request, response) {
    const findRequestId = data.findIndex(userRequest =>
      userRequest.id === parseInt(request.params.requestId, 10));
    return response.status(200).json({ request: data[findRequestId] });
  }
}
export default RequestController;
