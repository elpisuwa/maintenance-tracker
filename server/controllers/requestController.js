import data from '../data/request.json';



class RequestController {
<<<<<<< HEAD
  static postRequest(request, response) {
=======
  static postRequest(request,response) {
>>>>>>> 29d2cafa7be9494c12523928ff574a5068738b68
    const {
      userId, model, requestType, requestDescription } = request.body;
    const id = data[data.length - 1].id + 1;
    const newRequest =
	{
<<<<<<< HEAD
     id, userId, model, requestType, requestDescription	};
  	  
	 if (userId !== '' && model !== '' && requestType !== '' && requestDescription !== '') { 
	 data.push(newRequest);

	 return response.status(201).json({request: data, message: 'Request has been added successfully'});
=======
	 id, userId, model, requestType, requestDescription };
  	  
	  	 if (userId !== '' && model !== '' && requestType !== '' && requestDescription !== '') { 
	  	 data.push(newRequest);

	  	 return response.status(201).json({request: data, message: 'Request has been added successfully'});
>>>>>>> 29d2cafa7be9494c12523928ff574a5068738b68
		    }
		     return response.status(400).json({message:'An Empty field found, Please fill up all fields',error: 'Bad Request'});

	  }

  static allRequest(request, response) {
    return response.status(200).json({ data });
  }

<<<<<<< HEAD
  static updateRequest(request, response) {
=======
  static updateRequest(request,response){
>>>>>>> 29d2cafa7be9494c12523928ff574a5068738b68
    const { requestType, requestDescription } = request.body;
    const findRequestId = data.findIndex(( userRequest )=>
      userRequest.id === parseInt(request.params.requestId, 10)
    );
<<<<<<< HEAD
    data[findRequestId].requestType = request.body.requestType;
    data[findRequestId].requestDescription = request.body.requestDescription;
    return response.status(200).json({message:'Request has been successfully updated', request: data[findRequestId]})
  }
  static viewRequest(request,response){
    const findRequestId = data.findIndex((userRequest)=>
      userRequest.id === parseInt(request.params.requestId, 10)
    );
    return response.status(200).json({ request:data[findRequestId] });
  }
}
export default RequestController;
=======
		
		data[findRequestId].requestType = request.body.requestType;
		data[findRequestId].requestDescription = request.body.requestDescription;

		return response.status(200).json({message:'Request has been successfully updated', request: data[findRequestId]})
	
	}
    static viewRequest(request,response){
      const findRequestId = data.findIndex((userRequest)=>
       userRequest.id === parseInt(request.params.requestId, 10)
      );
	 return response.status(200).json({ request:data[findRequestId] });

  }
}
export default RequestController;
>>>>>>> 29d2cafa7be9494c12523928ff574a5068738b68
