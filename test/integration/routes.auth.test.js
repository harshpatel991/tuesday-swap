process.env.NODE_ENV = 'test';
process.env.SECRET_KEY = 'fake';
process.env.EXPRESS_PORT = 4001;

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const passportStub = require('passport-stub');
const server = require('../../server');
const knex = require('../../database/db').knex;
const User = require('../../models/User');

chai.use(chaiHttp);
passportStub.install(server);

describe('routes : auth', () => {
    before(function () {
        return knex.migrate.rollback().then(() => {
            return knex.migrate.latest().then(() => {
                return knex.seed.run();
            });
        })
    });

    afterEach(function (done) {
        passportStub.logout();
        done();
    });

    describe('POST /auth/register', () => {
        let registerCookie;
        it('should register a new user and set the authenticated token', (done) => {
            chai.request(server)
                .post('/auth/register')
                .send({
                    email_address: 'newuser@test.com',
                    password: 'newuserpassword',
                    password_confirm: 'newuserpassword',
                    reddit_username: 'new_user_reddit_username'
                })
                .end((err, res) => {
                    should.not.exist(err);
                    res.status.should.eql(200);
                    res.type.should.eql('application/json');
                    res.body.status.should.eql('Success');
                    registerCookie = res.headers['set-cookie'].pop().split(';')[0];
                    done();
                })
        });
        it('should see the newly registered user as authenticated', (done) => {
            var req = chai.request(server).get('/user');
            req.set('Cookie', registerCookie);
            req.end((err, res) => {
                    should.not.exist(err);
                    res.status.should.eql(200);
                    res.type.should.eql('application/json');
                    res.body.user.should.eql(4);
                    done();
                });
        });

        it('should throw an error if a user is already logged in', (done) => {
            passportStub.login(
                new User({
                    id: 3,
                    username: 'verified@test.com',
                    password: 'verified',
                    admin: false
                })
            );
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
                    res.status.should.eql(400);
                    res.type.should.eql('application/json');
                    res.body.failures[0].msg.should.eql('Reddit username cannot be empty');
                    done();
                });
        });
    })

    describe('POST /auth/login', () => {
        let loginCookie;
        it('should login a verified user', (done) => {
            chai.request(server)
                .post('/auth/login')
                .send({
                    email_address: 'verified@test.com',
                    password: 'verified',
                })
                .end((err, res) => {
                    should.not.exist(err);
                    res.status.should.eql(200);
                    res.type.should.eql('application/json');
                    res.body.status.should.eql('Success');
                    loginCookie = res.headers['set-cookie'].pop().split(';')[0];
                    done();
                });
        });

        it('should see the newly logged in user as authenticated', (done) => {
            let req = chai.request(server).get('/user');
            req.set('Cookie', loginCookie);
            req.end((err, res) => {
                should.not.exist(err);
                res.status.should.eql(200);
                res.type.should.eql('application/json');
                res.body.user.should.eql(3);
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
                    res.status.should.eql(404);
                    res.type.should.eql('application/json');
                    res.body.status.should.eql('User not found');
                    done();
                });
        });

        it('should throw an error if a user is logged in', (done) => {
            passportStub.login(
                new User({
                    id: 3,
                    username: 'verified@test.com',
                    password: 'verified',
                    admin: false
                })
            );
            chai.request(server)
                .post('/auth/login')
                .send({
                    email_address: 'verified@test.com',
                    password: 'verified'
                })
                .end((err, res) => {
                    should.exist(err);
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
                    res.status.should.eql(400);
                    res.body.message.should.eql('Validation failed');
                    res.body.failures[0].msg.should.eql('Password cannot be be empty');
                    done();
                });
        });
    });

    describe('GET /auth/logout', () => {
        it('should logout a user', (done) => {
            passportStub.login(
                new User({
                    id: 3,
                    username: 'verified@test.com',
                    password: 'verified',
                    admin: false
                })
            );
            chai.request(server)
                .get('/auth/logout')
                .end((err, res) => {
                    should.not.exist(err);
                    res.status.should.eql(200);
                    res.type.should.eql('application/json');
                    res.body.status.should.eql('Success');
                    done();
                });
        });

        it('should throw an error if a user is not logged in', (done) => {
            chai.request(server)
                .get('/auth/logout')
                .end((err, res) => {
                    should.exist(err);
                    res.status.should.eql(401);
                    res.type.should.eql('application/json');
                    res.body.status.should.eql('Please log in');
                    done();
                });
        });
    });

    describe('GET /user', () => {
        it('should return a success when logged in', (done) => {
            passportStub.login(
                new User({
                    id: 3,
                    username: 'verified@test.com',
                    password: 'verified',
                    admin: false
                })
            );
            chai.request(server)
                .get('/user')
                .end((err, res) => {
                    should.not.exist(err);
                    res.status.should.eql(200);
                    res.type.should.eql('application/json');
                    res.body.user.should.eql(3);
                    done();
                });
        });
        it('should throw an error if a user is not logged in', (done) => {
            chai.request(server)
                .get('/user')
                .end((err, res) => {
                    should.exist(err);
                    res.status.should.eql(401);
                    res.type.should.eql('application/json');
                    res.body.status.should.eql('Please log in');
                    done();
                });
        });

        it('should throw an error if a user logs in and then logs out', (done) => {
            passportStub.login(
                new User({
                    id: 3,
                    username: 'verified@test.com',
                    password: 'verified',
                    admin: false
                })
            );
            passportStub.logout();
            chai.request(server)
                .get('/user')
                .end((err, res) => {
                    should.exist(err);
                    res.status.should.eql(401);
                    res.type.should.eql('application/json');
                    res.body.status.should.eql('Please log in');
                    done();
                });
        });
    });

    describe('GET /admin', () => {
        it('should return a success when logged in as admin', (done) => {
            passportStub.login(
                new User({
                    id: 1,
                    username: 'admin@test.com',
                    password: 'admin',
                    admin: true
                })
            );
            chai.request(server)
                .get('/admin')
                .end((err, res) => {
                    should.not.exist(err);
                    res.status.should.eql(200);
                    res.type.should.eql('application/json');
                    res.body.user.should.eql(1);
                    done();
                });
        });
        it('should throw an error if a user is not logged in', (done) => {
            chai.request(server)
                .get('/admin')
                .end((err, res) => {
                    should.exist(err);
                    res.status.should.eql(401);
                    res.type.should.eql('application/json');
                    res.body.status.should.eql('Please log in');
                    done();
                });
        });
        it('should throw an error if a user is not an admin', (done) => {
            passportStub.login(
                new User({
                    id: 3,
                    username: 'verified@test.com',
                    password: 'verified',
                    admin: false
                })
            );
            chai.request(server)
                .get('/admin')
                .end((err, res) => {
                    should.exist(err);
                    res.status.should.eql(401);
                    res.type.should.eql('application/json');
                    res.body.status.should.eql('Not an admin');
                    done();
                });
        });
    });

});

