import data from '../data/request.json';



class RequestController{
  
  static postRequest(request,response){
  	const {userId,model,requestType,requestDescription} = request.body;
  	 const id = data[data.length-1].id+1;
  	 const newRequest = {id, userId,model,requestType,requestDescription};
  	  
  	 if(userId!=="" && model !=="" requestType !== "" && requestDescription !== ""){ 
	  	 data.push(newRequest);

	  	 return response.status(201).json({request: data, message: 'Request has been added successfully'});
	 }
	     return response.status(400).json({message:'bad request'});

  }




}


export default RequestController;