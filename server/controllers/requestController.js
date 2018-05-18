import data from '../data/request.json';



class RequestController{

	static updateRequest(request,response){
		const {requestType,requestDescription} = request.body;


		const searchRequest = data.findIndex((userRequest)=>
			userRequest.id === parseInt(request.params.requestId, 10)
		);

		
			data[searchRequest].requestType = request.body.requestType;
			data[searchRequest].description = request.body.requestDescription;

			return response.status(200).json({message:'Request has been successfully updated', request: data})
		

	}







}


export default RequestController;