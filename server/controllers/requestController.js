import data from '../data/request.json';



class RequestController{

	static viewRequest(request,response){
	
		const findRequestId = data.findIndex((userRequest)=>
			userRequest.id === parseInt(request.params.requestId, 10)
		);
			
		return response.status(200).json({request:data[findRequestId]});
		

	}







}


export default RequestController;