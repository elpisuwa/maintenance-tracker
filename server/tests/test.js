import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../app';


const {expect} = chai;
chai.use(chaiHttp);

const api = '/api/v1/users/requests';
describe('POST endpoint for request', ()=>{

	it('should not add a request with empty type ', (done)=>{
		chai.request(app)
		.post(api)
		.send({userId:1,model:'4runner', requestType: '', requestDescription: 'repair wheels'})
		.end((error,response)=>{
			expect(response.status).to.equal(400);
			expect(response.body.message).to.equal('bad request');
			done();
		});
	});

	it('should not add a request with empty description ', (done)=>{
		chai.request(app)
		.post(api)
		.send({userId:1,model:'4runner', requestType: 'repair', requestDescription: ''})
		.end((error,response)=>{
			expect(response.status).to.equal(400);
			expect(response.body.message).to.equal('bad request');
			done();
		});
	});

    it('should not add a request with empty model ', (done)=>{
		chai.request(app)
		.post(api)
		.send({userId:1,model:'', requestType: 'repair', requestDescription: 'fix'})
		.end((error,response)=>{
			expect(response.status).to.equal(400);
			expect(response.body.message).to.equal('bad request');
			done();
		});
	});

	it('should return 201 for a successful post request ', (done)=>{
		chai.request(app)
		.post(api)
		.send({userId:1, model:'4runner', requestType: 'repair', requestDescription: 'fix windscreen'})
		.end((error,response)=>{
			expect(response.status).to.equal(201);
			expect(response.body.message).to.equal('Request has been added successfully');
			expect(response.body).to.be.an('object');
			expect(response.body.request).to.be.an('array');
			done();
		});
	});


});