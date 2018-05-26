import data from '../data/request.json';



class RequestController {
  static postRequest(request,response) {
    const {
      userId, item, requestType, requestDescription } = request.body;
    const id = data[data.length - 1].id + 1;
    const status ='pending';
    const newRequest =
  {
     id, userId, item, requestType, requestDescription, status
  };
      
   if (userId !== '' && item !== '' && requestType !== '' && requestDescription !== '') { 
   data.push(newRequest);

   return response.status(201).json({request: data, message: 'Request has been added successfully'});
        }
         return response.status(400).json({message:'An Empty field found, Please fill up all fields',error: 'Bad Request'});

    }

  static allRequest(request, response) {
    return response.status(200).json({ data });
  }


  static userRequest(request, response) {
    const newData = data.filter((userRequest) =>
      userRequest.userId==parseInt(request.params.userId, 10)
    );
    return response.status(200).json({ newData });

  }

  static approveRequest(request, response) {
    const { status } = request.body;

    const findId = data.findIndex(( userRequest )=>
      userRequest.id == parseInt(request.params.requestId, 10)
    );
    if (request.body.status === 'pending') {
    data[findId].status =  request.body.status;
    return response.status(201).json({message: 'Request has been Approved', request: data[findId] });
    }
    return response.status(400).json({message: 'Invalid entry, Ensure you entered: pending' })
  }

  static disapproveRequest(request, response) {
    const { status } = request.body;

    const findId = data.findIndex(( userRequest )=>
      userRequest.id == parseInt(request.params.requestId, 10)
    );
    if (request.body.status === 'disapprove'){
    data[findId].status =  request.body.status;
    return response.status(201).json({message: 'Request has been Disapproved', request: data[findId] });
    }
    return response.status(400).json({message: 'Invalid entry, Ensure you entered: disapprove'});
  }

  static resolveRequest(request, response) {
    const { status } = request.body;

    const findId = data.findIndex(( userRequest )=>
      userRequest.id == parseInt(request.params.requestId, 10)
    );
    if (request.body.status ==='resolve' && data[findId].status === 'pending'){ //only pending request can be updated to resolve
    data[findId].status =  request.body.status;
    return response.status(201).json({message: 'Request has been Resolved', request: data[findId] });
    }
    return response.status(400).json({message: 'Invalid entry, Ensure you entered: resolve'});
  } 
  

  static updateRequest(request, response) {
    const { requestType, requestDescription } = request.body;
    const findRequestId = data.findIndex(( userRequest )=>
      userRequest.id === parseInt(request.params.requestId, 10)
    );
    data[findRequestId].requestType = request.body.requestType;
    data[findRequestId].requestDescription = request.body.requestDescription;
    if(data[findRequestId].status ==='pending'){
      return response.status(200).json({message:'Request has been successfully updated', request: data[findRequestId]})
    }
      return response.status(400).json({message: 'Request can not be updated yet, until Approved'})
  }
  static viewRequest(request,response){
    const findRequestId = data.findIndex((userRequest)=>
      userRequest.id === parseInt(request.params.requestId, 10)
    );
    return response.status(200).json({ request:data[findRequestId] });
  }
}
export default RequestController;
