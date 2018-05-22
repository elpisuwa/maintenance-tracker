import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../app';

const {expect} = chai;
chai.use(chaiHttp);


describe('PUT for requests', ()=>{
	it('should return 200', (done)=>{
		chai.request(app)
		.put('/api/v1/users/requests/1')
		.send({model:'volvo', requestType:'repair', requestDescription:'change brake pad'})
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