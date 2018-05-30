import requestController from '../controllers/requestController';
import userController from '../controllers/userController';

const routes = (app) => {
  app.get('/', (req, res) => {
    res.send('welcome to Maintenance Tracke!');
  });
  app.post('/api/v1/users/requests', requestController.postRequest);
  app.get('/api/v1/requests', requestController.allRequest);
  app.get('/api/v1/users/requests/:requestId', requestController.viewRequest);

  app.get('/api/v1/users/requests', requestController.allRequest);
  app.put('/api/v1/users/requests/:requestId', requestController.updateRequest);

  app.get('/api/v1/users/:userId/requests', requestController.userRequest);
  app.put('/api/v1/requests/:requestId/approve', requestController.approveRequest);
  app.put('/api/v1/requests/:requestId/disapprove', requestController.disapproveRequest);
  app.put('/api/v1/requests/:requestId/resolve', requestController.resolveRequest);
  app.post('/auth/login', userController.loginRequest);
  app.post('/auth/signup', userController.signupRequest);
}

export default routes;
