import requestController from '../controllers/requestController';

const routes =(app)=>{
	app.get('/', (req,res)=>{
		res.status(200).send('Welcome to Maintenance Tracker');
	});
	
	app.get('/api/v1/users/requests/:requestId', requestController.viewRequest);
}

export default routes;