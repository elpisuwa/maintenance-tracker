import data from '../data/request.json';



class RequestController{
  
  static allRequest(request, response){
	
	  return response.status(200).json({data});
  }


	static updateRequest(request,response){
		const {requestType,requestDescription} = request.body;

	static viewRequest(request,response){
	
		const findRequestId = data.findIndex((userRequest)=>
			userRequest.id === parseInt(request.params.requestId, 10)
		);
			
		return response.status(200).json({request:data[findRequestId]});
		

	}


		const findRequestId = data.findIndex((userRequest)=>
			userRequest.id === parseInt(request.params.requestId, 10)
		);
		
		data[findRequestId].requestType = request.body.requestType;
		data[findRequestId].requestDescription = request.body.requestDescription;

		return response.status(200).json({message:'Request has been successfully updated', request: data[findRequestId]})
	

	}


}


export default RequestController;