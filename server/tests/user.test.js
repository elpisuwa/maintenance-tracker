import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../app';
import login from '../data/data';

const { expect } = chai;
chai.use(chaiHttp);


describe('Signin Route', ()=>{
const api = '/auth/login';
	it(' Signs in User ', (done)=>{
		chai.request(app)
		.post(api)
		.send({username:'uwahope',password:'password'})
		.end((error,response)=>{
			expect(response.status).to.equal(200);
			expect(response.body).to.include.keys('token');
			expect(response.body.message).to.equal('An Empty field found, Please fill up all fields');
			expect(response.body.error).to.equal('Bad Request');
			done();
		});
	});

	it(' Doesnt Sign in User ', (done)=>{
		chai.request(app)
		.post(api)
		.send({username:'',password:''})
		.end((error,response)=>{
			expect(response.status).to.equal(400);
			expect(response.body.message).to.equal('An Empty field found, Please fill up all fields');
			done();
		});
	});
  it(' Doesnt Sign in User ', (done)=>{
    chai.request(app)
    .post(api)
    .send({username:'',password:'password'})
    .end((error,response)=>{
      expect(response.status).to.equal(400);
      expect(response.body.message).to.equal('An Empty field found, Please fill up all fields');
      done();
    });
  });


}

describe('User Signup', () => {
    it('registers a new user and returns user data + token for valid data', (done) => {
        .post('/api/v1/auth/signup')
        .send({username:'uwahope',email:'uwahope@yahoo.com',password:'password'})
        .end((err, res) => {
          // userToken = res.body.token;
          expect(res.statusCode).to.equal(201);
          expect(res.body).to.be.an('object');
          expect(res.body).to.include.keys('token');
          //expect(res.body.user).to.include.keys('userId');
          expect(res.body.user.username).to.equal('uwahope');

          if (err) return done(err);
          done();
        });
    });

    it('returns validation errors for wrong input', (done) => {
        .post('/api/v1/auth/signup')
        .send(wrongUserData)
        .end((err, res) => {
          // userToken = res.body.token;
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body.errors.businessName.msg).to.equal('Unaccepted Field');
          expect(res.body.errors.username.msg).to.equal('username must be specified');
          expect(res.body.errors.email.msg).to.equal('Email is invalid');
          expect(res.body.errors.password.msg).to.equal('Password must be at least 8 characters');
          expect(res.body.errors.passwordConfirm.msg).to.equal('Passwords don\'t match');

          if (err) return done(err);
          done();
        });
    });
}