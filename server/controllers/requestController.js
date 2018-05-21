import data from '../data/request.json';



class RequestController{


static allRequest(request, response){
	
	return response.status(200).json({data});
}




}


export default RequestController;