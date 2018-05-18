import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../app';
const should = chai.should();

// const {expect} = chai;
chai.use(chaiHttp);

describe('POST endpoint for request', ()=>{

	// it('should not add a request with empty type ', (done)=>{
	// 	chai.request(app)
	// 	.post('/api/v1/users/requests')
	// 	.send({userId:1, requestType: '', requestDescription: 'repair wheels'})
	// 	.end((error,response)=>{
	// 		response.should.have.status(201);
	// 		//expect(response.body.error).should.equal('Bad request');
	// 		done();
	// 	});
	// });

	// it('should not add a request with empty description ', (done)=>{
	// 	chai.request(app)
	// 	.post('/api/v1/users/requests')
	// 	.send({userId:1, requestType: 'repair', requestDescription: ''})
	// 	.end((error,response)=>{
	// 		response.should.have.status(201);
	// 		// expect(response.body.error).to.equal('Bad request');
	// 		done();
	// 	});
	// });

	it('should return 201 for a successful post ', (done)=>{
		chai.request(app)
		.post('/api/v1/users/requests')
		.send({userId:1, requestType: 'repair', requestDescription: 'fix windscreen'})
		.end((error,response)=>{
			response.should.have.status(201);
			// expect(response.body.message).to.equal('Successfully added request');
			response.body.should.be.a('object');
			done();
		});
	});


});