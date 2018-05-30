 

class VerifyRole(){
  static verifyAdmin(request, response, next){
 	const userId = request.userId;
 	const role = 'role';
 	const qry = `SELECT from userId WHERE id ='${userId}', role = '${role}' '

 }