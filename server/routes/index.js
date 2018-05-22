import requestController from '../controllers/requestController';

const routes =(app)=>{
	app.get('/', (req,res)=>{
		res.status(200).json({message:'Welcome to Maintenance Tracker'});
	});
	
	app.get('/api/v1/users/requests/:requestId', requestController.viewRequest);


	app.get('/api/v1/users/requests',requestController.allRequest);
  
  app.put('/api/v1/users/requests/:requestId', requestController.updateRequest);
	

}

export default routes;