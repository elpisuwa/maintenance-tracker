import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../app';

const {expect} = chai;
chai.use(chaiHttp);

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