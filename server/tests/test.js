import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../app';

const { expect } = chai;
chai.use(chaiHttp);


describe('POST endpoint for request', ()=>{
const api = '/api/v1/users/requests';
	it('should not add a request with empty type ', (done)=>{
		chai.request(app)
		.post(api)
		.send({userId:1,item:'4runner', requestType: '', requestDescription: 'repair wheels'})
		.end((error,response)=>{
			expect(response.status).to.equal(400);
			expect(response.body.message).to.equal('An Empty field found, Please fill up all fields');
			expect(response.body.error).to.equal('Bad Request');
			done();
		});
	});

	it('should not add a request with empty description ', (done)=>{
		chai.request(app)
		.post(api)
		.send({userId:1,item:'4runner', requestType: 'repair', requestDescription: ''})
		.end((error,response)=>{
			expect(response.status).to.equal(400);
			expect(response.body.message).to.equal('An Empty field found, Please fill up all fields');
			expect(response.body.error).to.equal('Bad Request');
			done();
		});
	});

    it('should not add a request with empty item ', (done)=>{
		chai.request(app)
		.post(api)
		.send({userId:1,item:'', requestType: 'repair', requestDescription: 'fix'})
		.end((error,response)=>{
			expect(response.status).to.equal(400);
			expect(response.body.message).to.equal('An Empty field found, Please fill up all fields');
			expect(response.body.error).to.equal('Bad Request');
			done();
		});
	});

	it('should return 201 for a successful post request ', (done)=>{
		chai.request(app)
		.post(api)
		.send({userId:1, item:'4runner', requestType: 'repair', requestDescription: 'fix windscreen'})
		.end((error,response)=>{
			expect(response.status).to.equal(201);
			expect(response.body.message).to.equal('Request has been added successfully');
			expect(response.body).to.be.an('object');
			//expect(response.body.request).to.be.an('array');
			done();
		});
	});
  });




//modify request
describe('PUT for requests', ()=>{
	it('should return 200', (done)=>{
		chai.request(app)
		.put('/api/v1/users/requests/2')
		.send({item:'volvo', requestType:'repair', requestDescription:'change brake pad'})
		.end((error,response)=>{
			expect(response.status).to.equal(200);
			expect(response.body).to.be.an('object');
		    done();
		});
	});
  });

describe('GET endpoint for a request', ()=>{
	it('should return an 200',(done)=>{
	chai.request(app)	
	.get('/api/v1/users/requests/:requestId')
	.end((error,response)=>{
		expect(response.status).to.equal(200);
		expect(response.body).to.be.an('object');
		done();
	});
	});
  });


describe('GET all request endpoint', ()=>{
 
  it('should return a 200', (done)=>{
     chai.request(app)
     .get('/api/v1/users/requests')
     .end((error, response)=>{
     	expect(response.status).to.equal(200);
     	expect(response.body).to.be.an('object');
     	done();
     });
  });

});
//test endpoint for approving request
describe('PUT to approve request', ()=>{
	it('should return a 201', (done)=>{
		chai.request(app)
		.put('/api/v1/requests/1/approve')
		.send({status:'pending'})
		.end((error, response)=>{
			expect(response.status).to.equal(201);
			expect(response.body).to.be.an('object');
			expect(response.body.message).to.equal('Request has been Approved');
			done();
		});
	});

	it('should return a 400', (done)=>{
		chai.request(app)
		.put('/api/v1/requests/1/approve')
		.send({status:''})
		.end((error, response)=>{
			expect(response.status).to.equal(400);
			expect(response.body.message).to.equal('Invalid entry, Ensure you entered: pending');
			done();
		});
	});

	it('should return a 400', (done)=>{
		chai.request(app)
		.put('/api/v1/requests/1/approve')
		.send({status:'wrong'})
		.end((error, response)=>{
			expect(response.status).to.equal(400);
			expect(response.body.message).to.equal('Invalid entry, Ensure you entered: pending');
			done();
		});
	});
});
//test endpoint for disapproving request
describe('PUT to disapprove a request', ()=>{
	it('should return a 201', (done)=>{
		chai.request(app)
		.put('/api/v1/requests/1/disapprove')
		.send({status:'disapprove'})
		.end((error, response)=>{
			expect(response.status).to.equal(201);
			expect(response.body).to.be.an('object');
			expect(response.body.message).to.equal('Request has been Disapproved');
			done();
		});
	});

	it('should return a 400', (done)=>{
		chai.request(app)
		.put('/api/v1/requests/1/disapprove')
		.send({status:''})
		.end((error, response)=>{
			expect(response.status).to.equal(400);
			expect(response.body.message).to.equal('Invalid entry, Ensure you entered: disapprove');
			done();
		});
	});

	it('should return a 400', (done)=>{
		chai.request(app)
		.put('/api/v1/requests/1/disapprove')
		.send({status:'wrong'})
		.end((error, response)=>{
			expect(response.status).to.equal(400);
			expect(response.body.message).to.equal('Invalid entry, Ensure you entered: disapprove');
			done();
		});
	});
});
//test endpoint for resolving request
describe('PUT to resolve a request', ()=>{
	it('should return a 201 for pending status', (done)=>{
		chai.request(app)
		.put('/api/v1/requests/2/resolve')
		.send({status:'resolve'})
		.end((error, response)=>{
			expect(response.status).to.equal(201);
			expect(response.body).to.be.an('object');
			expect(response.body.message).to.equal('Request has been Resolved');
			done();
		});
	});

	it('should return a 400 for unpending status', (done)=>{ //the status must be pending 
		chai.request(app)
		.put('/api/v1/requests/1/resolve')
		.send({status:'wrong'})
		.end((error, response)=>{
			expect(response.status).to.equal(400);
			expect(response.body.message).to.equal('Invalid entry, Ensure you entered: resolve');
			done();
		});
	});
});
	