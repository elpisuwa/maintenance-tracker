import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../app';

const { expect } = chai;
chai.use(chaiHttp);


describe('GET endpoint for a request', () => {
  it('should return an 403', (done) => {
    chai.request(app)
      .get('/api/v1/users/requests')
      .end((error, response) => {
        expect(response.status).to.equal(403);
        // (response.body).to.be.an('object');
        done();
      });
  });
});


describe('GET endpoint for a request', () => {
  it('should return a 403', (done) => {
    chai.request(app)
      .get('/api/v1/users/requests/1')
      .end((error, response) => {
        expect(response.status).to.equal(403);
        // (response.body).to.be.an('object');
        done();
      });
  });
});

describe('POST endpoint for a request', () => {
  it('should return an 403', (done) => {
    chai.request(app)
      .get('/api/v1/users/requests')
      .end((error, response) => {
        expect(response.status).to.equal(403);
        done();
      });
  });
});
describe('PUT endpoint for a request', () => {
  it('should return an 200', (done) => {
    chai.request(app)
      .get('/api/v1/users/requests/1')
      .end((error, response) => {
        expect(response.status).to.equal(403);
        done();
      });
  });
});

describe('GET endpoint for all request', () => {
  it('should return an 403', (done) => {
    chai.request(app)
      .get('/api/v1/requests')
      .end((error, response) => {
        expect(response.status).to.equal(403);
        // (response.body).to.be.an('object');
        done();
      });
  });
});

describe('PUT endpoint for a approve', () => {
  it('should return an 403', (done) => {
    chai.request(app)
      .put('/api/v1/requests/1/approve')
      .end((error, response) => {
        expect(response.status).to.equal(403);
        // (response.body).to.be.an('object');
        done();
      });
  });
});

describe('PUT endpoint for a disapprove', () => {
  it('should return an 403', (done) => {
    chai.request(app)
      .put('/api/v1/requests/1/disapprove')

      .end((error, response) => {
        expect(response.status).to.equal(403);
        // (response.body).to.be.an('object');
        done();
      });
  });
  it('should return an 200', (done) => {
    chai.request(app)
      .put('/api/v1/requests/1/disapprove')
      .send({ requestDescription: 'lorem lorem lorem' })
      .end((error, response) => {
        expect(response.status).to.equal(403);
        // (response.body).to.be.an('object');
        done();
      });
  });
});

describe('PUT endpoint for a resolve', () => {
  it('should return an 403', (done) => {
    chai.request(app)
      .put('/api/v1/requests/1/resolve')
      .end((error, response) => {
        expect(response.status).to.equal(403);
        // (response.body).to.be.an('object');
        done();
      });
  });

});



describe('GET endpoint for a request', () => {
  it('should return an 403', (done) => {
    chai.request(app)
      .post('/auth/signup')
      .set({ username: 'hope', email: 'uwa@uwa.com', password: 'password' })
      .end((error, response) => {
        expect(response.status).to.equal(200);
        // (response.body).to.be.an('object');
        done();
      });
  });

  it('should return an 403', (done) => {
    chai.request(app)
      .post('/auth/signup')
      .send({ username: '', email: 'uwa@uwa.com', password: 'password' })
      .end((error, response) => {
        expect(response.status).to.equal(200);
        // (response.body).to.be.an('object');
        done();
      });
  });
});

describe('User Signup', () => {
    it('registers a new user and returns user data + token for valid data', (done) => {
        chai.request(app)
        .post('/auth/signup')
        .send({username:'uwahope',email:'uwahope@yahoo.com',password:'password'})
        .end((error, response) => {
          // userToken = res.body.token;
          expect(response.status).to.equal(201);
          expect(response.body).to.be.an('object');
          expect(res.body).to.include.keys('token');
          //expect(res.body.user).to.include.keys('userId');
          expect(res.body.user.username).to.equal('uwahope');

          if (error) return done(error);
          done();
        });
    });
  });

    // it('returns validation errors for wrong input', (done) => {
    //     .post('/api/v1/auth/signup')
    //     .send({username:'uwahope',email:'uwahope@yahoo.com',password:'password'})
    //     .end((err, res) => {
    //       // userToken = res.body.token;
    //       expect(res.statusCode).to.equal(400);
    //       expect(res.body).to.be.an('object');
    //       expect(res.body.errors.businessName.msg).to.equal('Unaccepted Field');
    //       expect(res.body.errors.username.msg).to.equal('username must be specified');
    //       expect(res.body.errors.email.msg).to.equal('Email is invalid');
    //       expect(res.body.errors.password.msg).to.equal('Password must be at least 8 characters');
    //       expect(res.body.errors.passwordConfirm.msg).to.equal('Passwords don\'t match');

    //       if (err) return done(err);
    //       done();
    //     });
    // });
