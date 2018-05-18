import requestController from '../controllers/requestController';

const routes =(app)=>{
	app.get('/', (req,res)=>{
		res.status(200).send('Welcome to Maintenance Tracker');
	});
	
	app.post('/api/v1/users/requests',requestController.postRequest);
}	


export default routes;