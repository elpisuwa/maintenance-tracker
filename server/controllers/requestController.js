import data from '../data/request.json';



class RequestController{

	static viewRequest(request,response){
	
		const searchRequest = data.findIndex((userRequest)=>
			userRequest.id === parseInt(request.params.requestId, 10)
		);
			// !data[searchRequest] ?  response.status(400).json({message:'doesnt exist'}) :response.status(200).json({request:data[searchRequest]});
		
		return response.status(200).json({request:data[searchRequest]});
		

	}







}


export default RequestController;