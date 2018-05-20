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