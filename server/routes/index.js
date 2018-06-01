import requestController from '../controllers/requestController';
import userController from '../controllers/userController';
import VerifyToken from '../controllers/auth/VerifyToken';
import tableMigrations from '../models/migrations/dbTables';

const routes = (app) => {
  app.get('/', (req, res) => {
    res.send('welcome to Maintenance Tracke!');
  });
  app.post('/api/v1/users/requests', VerifyToken, requestController.postRequest);
  app.get('/api/v1/requests', VerifyToken, requestController.allRequest);
  app.get('/api/v1/users/requests/:requestId', VerifyToken, requestController.viewRequest);
  app.get('/api/v1/users/requests', VerifyToken, requestController.userRequest);
 //app.get('/api/v1/requests', VerifyToken, requestController.allRequest);
  app.put('/api/v1/users/requests/:requestId', VerifyToken, requestController.updateRequest);
  app.put('/api/v1/requests/:requestId/approve', VerifyToken, requestController.approveRequest);
  app.put('/api/v1/requests/:requestId/disapprove', VerifyToken, requestController.disapproveRequest);
  app.put('/api/v1/requests/:requestId/resolve', VerifyToken, requestController.resolveRequest);
  app.post('/api/v1/auth/login', userController.loginRequest);
  app.post('/api/v1/auth/signup', userController.signupRequest);
  app.get('/logout', userController.logout);
  app.post('api/v1/auth/adminsignup', userController.createAdmin);
  // app.get('/api/v1/user', userController.users);
  app.post('/createtable', tableMigrations.createRequestTables);
  app.post('/createUserTables', tableMigrations.createUserTables);
  app.get('/checkforonnection', tableMigrations.checkConnection);
  app.post('/dropdata', tableMigrations.drop);
}

export default routes;
