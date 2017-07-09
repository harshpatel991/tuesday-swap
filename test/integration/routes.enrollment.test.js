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
const Enrollment = require('../../models/Enrollment');
const Code = require('../../models/Code');
const Seeking = require('../../models/Seeking');
const moment = require("moment");

chai.use(chaiHttp);
passportStub.install(server);

describe('routes : enrollment', () => {
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

    describe('POST /enrollment', () => {
        it('add a new enrollment', (done) => {
            passportStub.login(
                new User({
                    id: 3,
                    username: 'verified@test.com',
                    password: 'verified'
                })
            );
            chai.request(server)
                .post('/enrollment')
                .send({
                    contest_id: 4,
                    should_give_away_codes: true,
                    codes: [
                        {
                            code_type_id: 9,
                            code: "this_is_a_code1"
                        },
                        {
                            code_type_id: 10,
                            code: "this_is_a_code2"
                        },
                        {
                            code_type_id: 11,
                            code: "this_is_a_code3"
                        }
                    ],
                    seeking: [
                        12, 13
                    ]

                })
                .end((err, res) => {
                    should.not.exist(err);
                    res.status.should.eql(201);
                    res.type.should.eql('application/json');
                    res.body.status.should.eql('Success');

                    Enrollment.where( {id: res.body.enrollmentId} ).fetch({ withRelated: ['codes', 'seekings'] })
                        .then((enrollment) => {
                            enrollment = enrollment.toJSON();
                            enrollment.user_id.should.eql(3);
                            enrollment.contest_id.should.eql(4);
                            enrollment.should_give_away_codes.should.eql(true);

                            enrollment.codes.length.should.eql(3);
                            enrollment.codes.forEach((code, codeIndex)=> {
                                code.enrollment_id.should.eql(res.body.enrollmentId);
                                code.code_type_id.should.eql(codeIndex+9);
                                code.code.should.eql("this_is_a_code" + (codeIndex+1));
                                code.taken.should.eql(false);
                                should.equal(code.taken_by, null);
                            });

                            enrollment.seekings.length.should.eql(2);
                            enrollment.seekings.forEach((seeking, seekingIndex)=> {
                                seeking.enrollment_id.should.eql(res.body.enrollmentId);
                                seeking.code_type_id.should.eql(seekingIndex+12);
                                seeking.num_times_satisfied.should.eql(0);
                            });
                            done();
                        })
                        .catch((err) => {
                            done("Error: " + err);
                        });
                })
        });

        it('should throw an error if not logged in', (done) => {
            chai.request(server)
                .post('/enrollment')
                .send({
                    contest_id: 4,
                    should_give_away_codes: true,
                    codes: [
                        {
                            code_type_id: 9,
                            code: "this_is_a_code1"
                        }
                    ],
                    seeking: [ 4 ]
                })
                .end((err, res) => {
                    res.status.should.eql(401);
                    res.type.should.eql('application/json');
                    res.body.status.should.eql('Please log in');
                    done();
                })
        });

        it('should throw an error if user already enrolled in the contest', (done) => {
            passportStub.login(
                new User({
                    id: 3,
                    username: 'verified@test.com',
                    password: 'verified'
                })
            );
            chai.request(server)  //this one should succeed
                .post('/enrollment')
                .send({
                    contest_id: 4,
                    should_give_away_codes: true,
                    codes: [
                        {
                            code_type_id: 9,
                            code: "this_is_a_code1"
                        }
                    ],
                    seeking: [ 10 ]
                })
                .end((err, res) => {
                    res.status.should.eql(201);

                    chai.request(server)  //this one should fail
                        .post('/enrollment')
                        .send({
                            contest_id: 4,
                            should_give_away_codes: true,
                            codes: [
                                {
                                    code_type_id: 9,
                                    code: "this_is_another_code2"
                                }
                            ],
                            seeking: [ 10 ]
                        })
                        .end((err, res2) => {
                            res2.status.should.eql(409);
                            res2.body.failures[0].should.eql('Already enrolled in this contest');
                            done()
                        })
                });
        });

        it('should allow enrolling a user in two different contests', (done) => {
            passportStub.login(
                new User({
                    id: 3,
                    username: 'verified@test.com',
                    password: 'verified'
                })
            );
            chai.request(server)
                .post('/enrollment')
                .send({
                    contest_id: 4,
                    should_give_away_codes: true,
                    codes: [
                        {
                            code_type_id: 9,
                            code: "this_is_a_code1"
                        }
                    ],
                    seeking: [ 10 ]
                })
                .end((err, res) => {
                    res.status.should.eql(201);

                    chai.request(server)
                        .post('/enrollment')
                        .send({
                            contest_id: 5,
                            should_give_away_codes: true,
                            codes: [
                                {
                                    code_type_id: 14,
                                    code: "this_is_another_code8"
                                }
                            ],
                            seeking: [ 15 ]
                        })
                        .end((err, res2) => {
                            res2.status.should.eql(201);
                            done()
                        })
                });
        });


        it('should throw an error if the code type ids are not for the contest', (done) => {
            passportStub.login(
                new User({
                    id: 3,
                    username: 'verified@test.com',
                    password: 'verified'
                })
            );
            chai.request(server)
                .post('/enrollment')
                .send({
                    contest_id: 2,
                    should_give_away_codes: true,
                    codes: [
                        {
                            code_type_id: 7,
                            code: "this_is_a_code7"
                        },
                        {
                            code_type_id: 8, // This one is not part of the contest
                            code: "this_is_a_code8"
                        }
                    ],
                    seeking: [ 4 ]
                })
                .end((err, res) => {
                    res.status.should.eql(400);
                    res.type.should.eql('application/json');
                    res.body.failures[0].should.eql('Found a Code Type Id does that not belong to this contest');
                    done();
                });
        });

        it('should throw an error if the seeking code type ids are not for the contest', (done) => {
            passportStub.login(
                new User({
                    id: 3,
                    username: 'verified@test.com',
                    password: 'verified'
                })
            );
            chai.request(server)
                .post('/enrollment')
                .send({
                    contest_id: 5,
                    should_give_away_codes: true,
                    codes: [
                        {
                            code_type_id: 15,
                            code: "this_is_a_code7"
                        }
                    ],
                    seeking: [ 14, 15, 16 ] // 16 is not part of the contest
                })
                .end((err, res) => {
                    res.status.should.eql(400);
                    res.type.should.eql('application/json');
                    res.body.failures[0].should.eql('Found a Seeking Code Type Id does that not belong to this contest');
                    done();
                });
        });

        it('should throw an error contest id is invalid', (done) => {
            passportStub.login(
                new User({
                    id: 3,
                    username: 'verified@test.com',
                    password: 'verified'
                })
            );
            chai.request(server)
                .post('/enrollment')
                .send({
                    contest_id: 5000,
                    should_give_away_codes: true,
                    codes: [ {
                        code_type_id: 15,
                        code: "this_is_a_code15"
                    } ],
                    seeking: [ ]
                })
                .end((err, res) => {
                    res.status.should.eql(500);
                    done();
                });
        });

        it('should throw an error contest id is not present', (done) => {
            passportStub.login(
                new User({
                    id: 3,
                    username: 'verified@test.com',
                    password: 'verified'
                })
            );
            chai.request(server)
                .post('/enrollment')
                .send({
                    should_give_away_codes: true,
                    codes: [ ],
                    seeking: [ ]
                })
                .end((err, res) => {
                    res.status.should.eql(400);
                    res.type.should.eql('application/json');
                    res.body.failures[0].msg.should.eql('Contest Id cannot be empty');
                    res.body.failures[1].msg.should.eql('Contest Id cannot be an integer');

                    done();
                });
        });

        it('should add enrollment even if seeking is empty', (done) => {
            passportStub.login(
                new User({
                    id: 3,
                    username: 'verified@test.com',
                    password: 'verified'
                })
            );
            chai.request(server)
                .post('/enrollment')
                .send({
                    contest_id: 5,
                    should_give_away_codes: true,
                    codes: [
                        {
                            code_type_id: 15,
                            code: "this_is_a_code7"
                        }
                    ],
                    seeking: []
                })
                .end((err, res) => {
                    res.status.should.eql(201);
                    done();
                });
        });

        it('should throw an error if codes is empty', (done) => {
            passportStub.login(
                new User({
                    id: 3,
                    username: 'verified@test.com',
                    password: 'verified'
                })
            );
            chai.request(server)
                .post('/enrollment')
                .send({
                    contest_id: 5,
                    should_give_away_codes: true,
                    codes: [ ],
                    seeking:  [14]
                })
                .end((err, res) => {
                    res.status.should.eql(400);
                    res.body.failures[0].should.eql('Must submit at least one code');
                    done();
                });
        });

        it('should throw an error if code type is not present', (done) => {
            passportStub.login(
                new User({
                    id: 3,
                    username: 'verified@test.com',
                    password: 'verified'
                })
            );
            chai.request(server)
                .post('/enrollment')
                .send({
                    contest_id: 5,
                    should_give_away_codes: true,
                    codes: [
                        {
                            code: "this_is_a_code15"
                        },
                        {
                            code_type_id: 15,
                            code: "this_is_a_code15"
                        },
                        {
                            code_type_id: "blah",
                            code: "this_is_a_code15"
                        }
                    ],
                    seeking:  [14]
                })
                .end((err, res) => {
                    res.status.should.eql(400);
                    res.body.failures[0].should.eql("Index: 0: Code Type Id should be an integer");
                    res.body.failures[1].should.eql("Index: 2: Code Type Id should be an integer");
                    done();
                });
        });

        it('should throw an error if the contest has ended', (done) => {
            passportStub.login(
                new User({
                    id: 3,
                    username: 'verified@test.com',
                    password: 'verified'
                })
            );
            chai.request(server)
                .post('/enrollment')
                .send({
                    contest_id: 6,
                    should_give_away_codes: true,
                    codes: [
                        {
                            code_type_id: 15,
                            code: "this_is_a_code15"
                        }
                    ],
                    seeking:  [14]
                })
                .end((err, res) => {
                    res.status.should.eql(400);
                    res.body.failures[0].should.eql("Contest has ended");
                    done();
                });
        });
    });

});