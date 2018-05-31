// import chaiHttp from 'chai-http';
// import chai from 'chai';
// import app from '../app';
// import login from '../data/data';

// const { expect } = chai;
// chai.use(chaiHttp);


// describe('Signin Route', ()=>{
// const api = '/auth/login';
// 	it(' Signs in User ', (done)=>{
// 		chai.request(app)
// 		.post(api)
// 		.send(data.signin.correctData)
// 		.end((error,response)=>{
// 			expect(response.status).to.equal(200);
// 			expect(response.body).to.include.keys('token');
// 			expect(response.body.message).to.equal('An Empty field found, Please fill up all fields');
// 			expect(response.body.error).to.equal('Bad Request');
// 			done();
// 		});
// 	});

// 	it(' Doesnt Sign in User ', (done)=>{
// 		chai.request(app)
// 		.post(api)
// 		.send(data.signin.wrongData)
// 		.end((error,response)=>{
// 			expect(response.status).to.equal(400);
// 			expect(response.body.message).to.equal('An Empty field found, Please fill up all fields');
// 			done();
// 		});
// 	});



// }

// describe('User Signup', () => {
//     it('registers a new user and returns user data + token for valid data', (done) => {
//         .post('/api/v1/auth/signup')
//         .send(rightUserData)
//         .end((err, res) => {
//           // userToken = res.body.token;
//           expect(res.statusCode).to.equal(201);
//           expect(res.body).to.be.an('object');
//           expect(res.body).to.include.keys('token');
//           expect(res.body.user).to.include.keys('userId');
//           expect(res.body.user.email).to.equal('favour@shaguy.com');

//           if (err) return done(err);
//           done();
//         });
//     });

//     it('returns validation errors for wrong input', (done) => {
//         .post('/api/v1/auth/signup')
//         .send(wrongUserData)
//         .end((err, res) => {
//           // userToken = res.body.token;
//           expect(res.statusCode).to.equal(400);
//           expect(res.body).to.be.an('object');
//           expect(res.body.errors.businessName.msg).to.equal('Unaccepted Field');
//           expect(res.body.errors.username.msg).to.equal('username must be specified');
//           expect(res.body.errors.email.msg).to.equal('Email is invalid');
//           expect(res.body.errors.password.msg).to.equal('Password must be at least 8 characters');
//           expect(res.body.errors.passwordConfirm.msg).to.equal('Passwords don\'t match');

//           if (err) return done(err);
//           done();
//         });
//     });

    

    

    
    
//  }

