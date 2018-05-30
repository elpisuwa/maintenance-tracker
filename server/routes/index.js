import requestController from '../controllers/requestController';
import userController from '../controllers/userController';
import VerifyToken from '../controllers/auth/VerifyToken';
const routes = (app) => {
  app.get('/', (req, res) => {
    res.send('welcome to Maintenance Tracke!');
  });
  app.post('/api/v1/users/requests', VerifyToken, requestController.postRequest);
  app.get('/api/v1/requests', VerifyToken, requestController.allRequest);
  app.get('/api/v1/users/requests/:requestId', VerifyToken, requestController.viewRequest);
  app.get('/api/v1/users/requests', VerifyToken, requestController.userRequest);
  app.get('/api/v1/requests', requestController.allRequest);
  app.put('/api/v1/users/requests/:requestId', VerifyToken, requestController.updateRequest);

  //app.get('/api/v1/users/:userId/requests', requestController.userRequest);
  app.put('/api/v1/requests/:requestId/approve',VerifyToken, requestController.approveRequest);
  app.put('/api/v1/requests/:requestId/disapprove',VerifyToken, requestController.disapproveRequest);
  app.put('/api/v1/requests/:requestId/resolve', VerifyToken, requestController.resolveRequest);
  app.post('/auth/login', userController.loginRequest);
  app.post('/auth/signup', userController.signupRequest);
  app.get('/logout', userController.logout);
  app.get('/user', VerifyToken, userController.user)
}

export default routes;
