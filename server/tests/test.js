import chai from 'chai';
import app from '../app';

const {expect} = chai;

describe('POST endpoint for request', ()=>{

	it('should not add a request with empty type ', (done)=>{
		chai.request(app)
		.post('/api/v1/users/requests')
		.send({userId:1, type: '', description: 'repair wheels'})
		.end((error,response)=>{
			expect(response).to.have.status(400);
			expect(response.body.error).to.equal('Bad request');
			done();
		});
	});

	it('should not add a request with empty description ', (done)=>{
		chai.request(app)
		.post('/api/v1/users/requests')
		.send({userId:1, type: 'repair', description: ''})
		.end((error,response)=>{
			expect(response).to.have.status(400);
			expect(response.body.error).to.equal('Bad request');
			done();
		});
	});

	it('should return 201 for a successful post ', (done)=>{
		chai.request(app)
		.post('/api/v1/users/requests')
		.send({userId:1, type: 'repair', description: 'fix windscreen'})
		.end((error,response)=>{
			expect(response).to.have.status(200);
			expect(response.body.message).to.equal('Successfully added request');
			expect(response.body).to.be.an('object');
			done();
		});
	});

});