import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../app'

const {expect} = chai;
chai.use(chaiHttp);

describe('for GET endpoint', ()=>{
  
  it('should return a 200', (done)->{
     chai.request(app)
     .get('/api/v1/users/requests')
     .send({userId:'1',requestType:'repair',requestDescription:'faulty brake pads'} )
     .end((error, response)=>{
     	expect(response).to.have.status(200);
     	expect(response.body).to.be.an('object');
     });
  });
});