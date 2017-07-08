process.env.NODE_ENV = 'test';
process.env.SECRET_KEY = 'fake';
process.env.SECURE_COOKIE = false;
process.env.EXPRESS_PORT = 4001;

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const passportStub = require('passport-stub');
const server = require('../../server');
const knex = require('../../database/db').knex;
const User = require('../../models/User');
const Contest = require('../../models/Contest');
const moment = require("moment");

chai.use(chaiHttp);
passportStub.install(server);

describe('routes : contest', () => {
    beforeEach(function () {
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

    describe('POST /contest', () => {
        it('add a new contest', (done) => {
            passportStub.login(
                new User({
                    id: 1,
                    username: 'admin@test.com',
                    password: 'admin',
                    admin: true
                })
            );
            chai.request(server)
                .post('/contest')
                .send({
                    name: 'New Contest',
                    description: 'This is the description for new contest',
                    end_at: "3017-06-25 15:13:26.000-00"
                })
                .end((err, res) => {
                    should.not.exist(err);
                    res.status.should.eql(201);
                    res.type.should.eql('application/json');
                    res.body.status.should.eql('Success');
                    Contest.where( {id: res.body.contest} ).fetch()
                        .then((contest) => {
                            contest.id.should.eql(res.body.contest);
                            contest.get("name").should.eql("New Contest");
                            contest.get("description").should.eql("This is the description for new contest");
                            moment(contest.get("end_at")).format().should.eql(moment("3017-06-25 15:13:26-00").format());
                            done();
                        })
                        .catch((err) => {
                            done("Error: " + err);
                        });

                })
        });

        it('should throw an error if any of the fields is blank', (done) => {
            passportStub.login(
                new User({
                    id: 1,
                    username: 'admin@test.com',
                    password: 'admin',
                    admin: true
                })
            );
            chai.request(server)
                .post('/contest')
                .send({
                    name: '',
                    description: '',
                    end_at: ""
                })
                .end((err, res) => {
                    res.status.should.eql(400);
                    res.type.should.eql('application/json');
                    res.body.message.should.eql('Validation failed');
                    res.body.failures[0].msg.should.eql('Name cannot be empty');
                    res.body.failures[1].msg.should.eql('Description cannot be empty');
                    res.body.failures[2].msg.should.eql('End at must be date');
                    done();
                })
        });

        it('should throw an error if not logged in', (done) => {
            chai.request(server)
                .post('/contest')
                .send({
                    name: 'New Contest',
                    description: 'This is the description for new contest',
                    end_at: "3017-06-25 15:13:26.000-00"
                })
                .end((err, res) => {
                    res.status.should.eql(401);
                    res.type.should.eql('application/json');
                    res.body.status.should.eql('Please log in');
                    done();
                })
        });

        it('should throw an error if not an admin', (done) => {
            passportStub.login(
                new User({
                    id: 1,
                    username: 'verified@test.com',
                    password: 'verified'
                })
            );
            chai.request(server)
                .post('/contest')
                .send({
                    name: 'New Contest',
                    description: 'This is the description for new contest',
                    end_at: "3017-06-25 15:13:26.000-00"
                })
                .end((err, res) => {
                    res.status.should.eql(401);
                    res.type.should.eql('application/json');
                    res.body.status.should.eql('Not an admin');
                    done();
                })
        });
    });

});