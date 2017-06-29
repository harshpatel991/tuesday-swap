process.env.NODE_ENV = 'test';
process.env.SECRET_KEY = 'fake';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const passportStub = require('passport-stub');
const server = require('../../server');
const knex = require('../../database/db').knex;

chai.use(chaiHttp);
passportStub.install(server);

describe('routes : auth', () => {
    beforeEach(function() {
        return knex.migrate.rollback().then( () => {
            return knex.migrate.latest().then( () => {
                return knex.seed.run();
            });
        })
    });

    afterEach(function(done) {
        passportStub.logout();
        knex.migrate.rollback()
            .then(function() {
                done();
            });
    });

    describe('POST /auth/register', () => {
        it('should register a new user', (done) => {
            chai.request(server)
                .post('/auth/register')
                .send({
                    email_address: 'newuser@test.com',
                    password: 'newuserpassword',
                    password_confirm: 'newuserpassword',
                    reddit_username: 'new_user_reddit_username'
                })
                .end((err, res) =>  {
                    should.not.exist(err);
                    res.redirects.length.should.eql(0);
                    res.status.should.eql(200);
                    res.type.should.eql('application/json');
                    res.body.status.should.eql('success');
                    done();
                })
        });

        it('should throw an error if a user is already logged in', (done) => {
            passportStub.login({
                username: 'verified@test.com',
                password: 'verified',
            });
            chai.request(server)
                .post('/auth/register')
                .send({
                    email_address: 'verified@test.com',
                    password: 'verified',
                    password_confirm: 'verified',
                    reddit_username: 'new_user_reddit_username'
                })
                .end((err, res) => {
                    should.exist(err);
                    res.redirects.length.should.eql(0);
                    res.status.should.eql(401);
                    res.type.should.eql('application/json');
                    res.body.status.should.eql('You are already logged in');
                    done();
                });
        });

        it('should not register with empty email', (done) => {
            chai.request(server)
                .post('/auth/register')
                .send({
                    email_address: '',
                    password: 'verified',
                    password_confirm: 'verified',
                    reddit_username: 'new_user_reddit_username'
                })
                .end((err, res) => {
                    should.exist(err);
                    res.redirects.length.should.eql(0);
                    res.status.should.eql(400);
                    res.type.should.eql('application/json');
                    res.body.failures[0].msg.should.eql('Email address cannot be empty');
                    done();
                });
        });

        it('should not register with invalid email', (done) => {
            chai.request(server)
                .post('/auth/register')
                .send({
                    email_address: 'bademail',
                    password: 'verified',
                    password_confirm: 'verified',
                    reddit_username: 'new_user_reddit_username'
                })
                .end((err, res) => {
                    should.exist(err);
                    res.redirects.length.should.eql(0);
                    res.status.should.eql(400);
                    res.type.should.eql('application/json');
                    res.body.failures[0].msg.should.eql('Email address should be a valid email');
                    done();
                });
        });

        it('should not register with short password', (done) => {
            chai.request(server)
                .post('/auth/register')
                .send({
                    email_address: 'new_user@test.com',
                    password: '',
                    password_confirm: '',
                    reddit_username: 'new_user_reddit_username'
                })
                .end((err, res) => {
                    should.exist(err);
                    res.redirects.length.should.eql(0);
                    res.status.should.eql(400);
                    res.type.should.eql('application/json');
                    res.body.failures[0].msg.should.eql('Password must be at least 6 characters');
                    done();
                });
        });

        it('should not register if passwords do not match', (done) => {
            chai.request(server)
                .post('/auth/register')
                .send({
                    email_address: 'new_user@test.com',
                    password: 'thispasswordwontmatch',
                    password_confirm: 'thispassworddoesntmatch',
                    reddit_username: 'new_user_reddit_username'
                })
                .end((err, res) => {
                    should.exist(err);
                    res.redirects.length.should.eql(0);
                    res.status.should.eql(400);
                    res.type.should.eql('application/json');
                    res.body.failures[0].msg.should.eql('Passwords must match');
                    done();
                });
        });

        it('should not register if reddit username is empty', (done) => {
            chai.request(server)
                .post('/auth/register')
                .send({
                    email_address: 'new_user@test.com',
                    password: 'password',
                    password_confirm: 'password',
                    reddit_username: ''
                })
                .end((err, res) => {
                    should.exist(err);
                    res.redirects.length.should.eql(0);
                    res.status.should.eql(400);
                    res.type.should.eql('application/json');
                    res.body.failures[0].msg.should.eql('Reddit username cannot be empty');
                    done();
                });
        });
    })

    describe('POST /auth/login', () => {
        it('should login a verified user', (done) => {
            chai.request(server)
                .post('/auth/login')
                .send({
                    email_address: 'verified@test.com',
                    password: 'verified',
                })
                .end((err, res) => {
                    should.not.exist(err);
                    res.redirects.length.should.eql(0);
                    res.status.should.eql(200);
                    res.type.should.eql('application/json');
                    res.body.status.should.eql('success');
                    done();
                });
        });

        it('should not login an unregistered user', (done) => {
            chai.request(server)
                .post('/auth/login')
                .send({
                    email_address: 'non-exsitent@test.com',
                    password: 'non-exsitent',
                })
                .end((err, res) => {
                    should.exist(err);
                    res.redirects.length.should.eql(0);
                    res.status.should.eql(404);
                    res.type.should.eql('application/json');
                    res.body.status.should.eql('User not found');
                    done();
                });
        });

        it('should not login with wrong password', (done) => {
            chai.request(server)
                .post('/auth/login')
                .send({
                    email_address: 'verified@test.com',
                    password: 'wrong_password',
                })
                .end((err, res) => {
                    should.exist(err);
                    res.redirects.length.should.eql(0);
                    res.status.should.eql(404);
                    res.type.should.eql('application/json');
                    res.body.status.should.eql('User not found');
                    done();
                });
        });

        it('should throw an error if a user is logged in', (done) => {
            passportStub.login({
                username: 'verified@test.com',
                password: 'verified'
            });
            chai.request(server)
                .post('/auth/login')
                .send({
                    email_address: 'verified@test.com',
                    password: 'verified'
                })
                .end((err, res) => {
                    should.exist(err);
                    res.redirects.length.should.eql(0);
                    res.status.should.eql(401);
                    res.type.should.eql('application/json');
                    res.body.status.should.eql('You are already logged in');
                    done();
                });
        });

        it('should fail with empty email', (done) => {
            chai.request(server)
                .post('/auth/login')
                .send({
                    email_address: '',
                    password: 'verified',
                })
                .end((err, res) => {
                    res.redirects.length.should.eql(0);
                    res.status.should.eql(400);
                    res.body.message.should.eql('Validation failed');
                    res.body.failures[0].msg.should.eql('Email address cannot be empty');
                    done();
                });
        });

        it('should fail with invalid email', (done) => {
            chai.request(server)
                .post('/auth/login')
                .send({
                    email_address: 'invalidemail',
                    password: 'verified',
                })
                .end((err, res) => {
                    res.redirects.length.should.eql(0);
                    res.status.should.eql(400);
                    res.body.message.should.eql('Validation failed');
                    res.body.failures[0].msg.should.eql('Email address should be a valid email');
                    done();
                });
        });

        it('should fail with empty password', (done) => {
            chai.request(server)
                .post('/auth/login')
                .send({
                    email_address: 'verified@test.com',
                    password: '',
                })
                .end((err, res) => {
                    res.redirects.length.should.eql(0);
                    res.status.should.eql(400);
                    res.body.message.should.eql('Validation failed');
                    res.body.failures[0].msg.should.eql('Password cannot be be empty');
                    done();
                });
        });
    });

    describe('GET /auth/logout', () => {
        it('should logout a user', (done) => {
            passportStub.login({
                username: 'verified@test.com',
                password: 'verified'
            });
            chai.request(server)
                .get('/auth/logout')
                .end((err, res) => {
                    should.not.exist(err);
                    res.redirects.length.should.eql(0);
                    res.status.should.eql(200);
                    res.type.should.eql('application/json');
                    res.body.status.should.eql('success');
                    done();
                });
        });

        it('should throw an error if a user is not logged in', (done) => {
            chai.request(server)
                .get('/auth/logout')
                .end((err, res) => {
                    should.exist(err);
                    res.redirects.length.should.eql(0);
                    res.status.should.eql(401);
                    res.type.should.eql('application/json');
                    res.body.status.should.eql('Please log in');
                    done();
                });
        });
    });

    describe('GET /user', () => {
        it('should return a success when logged in', (done) => {
            passportStub.login({
                username: 'verified@test.com',
                password: 'verified'
            });
            chai.request(server)
                .get('/user')
                .end((err, res) => {
                    should.not.exist(err);
                    res.redirects.length.should.eql(0);
                    res.status.should.eql(200);
                    res.type.should.eql('application/json');
                    res.body.status.should.eql('success');
                    done();
                });
        });
        it('should throw an error if a user is not logged in', (done) => {
            chai.request(server)
                .get('/user')
                .end((err, res) => {
                    should.exist(err);
                    res.redirects.length.should.eql(0);
                    res.status.should.eql(401);
                    res.type.should.eql('application/json');
                    res.body.status.should.eql('Please log in');
                    done();
                });
        });

        it('should throw an error if a user logs in and then logs out', (done) => {
            passportStub.login({
                username: 'verified@test.com',
                password: 'verified'
            });
            passportStub.logout();
            chai.request(server)
                .get('/user')
                .end((err, res) => {
                    should.exist(err);
                    res.redirects.length.should.eql(0);
                    res.status.should.eql(401);
                    res.type.should.eql('application/json');
                    res.body.status.should.eql('Please log in');
                    done();
                });
        });
    });

    describe('GET /admin', () => {
        it('should return a success when logged in as admin', (done) => {
            passportStub.login({
                username: 'admin@test.com',
                password: 'admin'
            });
            chai.request(server)
                .get('/admin')
                .end((err, res) => {
                    should.not.exist(err);
                    res.redirects.length.should.eql(0);
                    res.status.should.eql(200);
                    res.type.should.eql('application/json');
                    res.body.status.should.eql('success');
                    done();
                });
        });
        it('should throw an error if a user is not logged in', (done) => {
            chai.request(server)
                .get('/admin')
                .end((err, res) => {
                    should.exist(err);
                    res.redirects.length.should.eql(0);
                    res.status.should.eql(401);
                    res.type.should.eql('application/json');
                    res.body.status.should.eql('Please log in');
                    done();
                });
        });
        it('should throw an error if a user is not an admin', (done) => {
            passportStub.login({
                username: 'verified@test.com',
                password: 'verified'
            });
            chai.request(server)
                .get('/admin')
                .end((err, res) => {
                    should.exist(err);
                    res.redirects.length.should.eql(0);
                    res.status.should.eql(401);
                    res.type.should.eql('application/json');
                    res.body.status.should.eql('Not an admin');
                    done();
                });
        });
    });

});

