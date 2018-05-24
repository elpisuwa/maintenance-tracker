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
			expect(response.boody.error).to.equal('Bad Request');
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
			expect(response.boody.error).to.equal('Bad Request');
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
			expect(response.boody.error).to.equal('Bad Request');
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
			expect(response.body.request).to.be.an('array');
			done();
		});
	});
  });





describe('PUT for requests', ()=>{
	it('should return 200', (done)=>{
		chai.request(app)
		.put('/api/v1/users/requests/1')
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