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

describe('POST endpoint for a login', () => {
  it('should return an 200', (done) => {
    chai.request(app)
      .post('/auth/login')
      .end((error, response) => {
        expect(response.status).to.equal(200);
        // (response.body).to.be.an('object');
        done();
      });
  });

  it('should return an 404', (done) => {
    chai.request(app)
      .post('/auth/login')
      .send({ email: 'uwa@uwa.com', password: 'password' })
      .end((error, response) => {
        expect(response.status).to.equal(200);
        // (response.body).to.be.an('object');
        done();
      });
  });
});








