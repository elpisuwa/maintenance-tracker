import data from '../data/request.json';



class RequestController{
  
  static postRequest(request,response){
  	const {userId,requestType,requestDescription} = request.body;
  	 const id = data[data.length-1].id+1;
  	 const newRequest = {id, userId, requestType,requestDescription};
  	 
  	 data.push(newRequest);

  	 return response.status(201).json({Request: data, message: 'request as been added successfully'});
 	


  }




}


export default RequestController;