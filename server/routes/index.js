import requestController from '../controllers/requestController';

const routes =(app)=>{
	app.get('/', (req,res)=>{
		res.status(200).send('Welcome to Maintenance Tracker');
	});
	app.get('api/v1/users/requests',requestController.allRequest);
	// app.get('api/v1/users/requests/:requestId', requestController.getRequest);
	// app.post('api/v1/users/requests',requestController.postRequest);
	// app.put('api/v1/users/requests/:requestId', requestController.updateRequest);
}

export default routes;