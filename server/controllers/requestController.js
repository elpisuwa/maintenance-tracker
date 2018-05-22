import data from '../data/request.json';



class RequestController{
  

  static postRequest(request,response){
  	const {userId,model,requestType,requestDescription} = request.body;
  	 const id = data[data.length-1].id+1;
  	 const newRequest = {id, userId,model,requestType,requestDescription};
  	  
  	 if(userId!=="" && model !=="" &&requestType !== "" && requestDescription !== ""){ 
	  	 data.push(newRequest);

	  	 return response.status(201).json({request: data, message: 'Request has been added successfully'});
	    }
	     return response.status(400).json({message:'bad request'});

  }

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