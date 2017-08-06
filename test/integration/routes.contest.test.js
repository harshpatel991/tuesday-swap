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
                    Contest.where( {id: res.body.contestId} ).fetch()
                        .then((contest) => {
                            contest.id.should.eql(res.body.contestId);
                            contest.get("slug").should.eql("new-contest");
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

    describe('GET /contest/:contestId/:contestSlug', () => {
        it('should get a contest', (done) => {
            chai.request(server)
                .get('/contest/1/contest1')
                .end((err, res) => {
                    should.not.exist(err);
                    res.status.should.eql(200);
                    res.body.id.should.eql(1);
                    res.body.name.should.eql("Contest1");
                    res.body.slug.should.eql("contest1");
                    res.body.description.should.eql("Description 1");
                    res.body.end_at.should.eql("3017-06-25T15:13:26.000Z");

                    res.body.codeTypes.length.should.eql(6);
                    res.body.codeTypes[0].id.should.eql(1);
                    res.body.codeTypes[1].id.should.eql(2);
                    res.body.codeTypes[2].id.should.eql(3);
                    res.body.codeTypes[3].id.should.eql(4);
                    res.body.codeTypes[4].id.should.eql(5);
                    res.body.codeTypes[5].id.should.eql(6);

                    res.body.codeTypes[0].contest_id.should.eql(1);
                    res.body.codeTypes[1].contest_id.should.eql(1);
                    res.body.codeTypes[2].contest_id.should.eql(1);
                    res.body.codeTypes[3].contest_id.should.eql(1);
                    res.body.codeTypes[4].contest_id.should.eql(1);
                    res.body.codeTypes[5].contest_id.should.eql(1);

                    res.body.codeTypes[0].name.should.eql("Code Type 1");
                    res.body.codeTypes[1].name.should.eql("Code Type 2");
                    res.body.codeTypes[2].name.should.eql("Code Type 3");
                    res.body.codeTypes[3].name.should.eql("Code Type 4");
                    res.body.codeTypes[4].name.should.eql("Code Type 5");
                    res.body.codeTypes[5].name.should.eql("Code Type 6");

                    res.body.codeTypes[0].image.should.eql("/code_type_1.jpg");
                    res.body.codeTypes[1].image.should.eql("/code_type_2.jpg");
                    res.body.codeTypes[2].image.should.eql("/code_type_3.jpg");
                    res.body.codeTypes[3].image.should.eql("/code_type_4.jpg");
                    res.body.codeTypes[4].image.should.eql("/code_type_5.jpg");
                    res.body.codeTypes[5].image.should.eql("/code_type_6.jpg");

                    res.body.enrollments.length.should.eql(4);
                    res.body.enrollments[0].id.should.eql(4);
                    res.body.enrollments[0].slug.should.eql("test_enrollment4");
                    res.body.enrollments[0].user_id.should.eql(6);
                    should.not.exist(res.body.enrollments[0].should_give_away_codes);

                    res.body.enrollments[0].codes.length.should.eql(1);
                    res.body.enrollments[0].codes[0].id.should.eql(6);
                    res.body.enrollments[0].codes[0].enrollment_id.should.eql(4);
                    res.body.enrollments[0].codes[0].code_type_id.should.eql(1);
                    res.body.enrollments[0].codes[0].taken.should.eql(false);
                    res.body.enrollments[0].codes[0].codeType.id.should.eql(1);
                    res.body.enrollments[0].codes[0].codeType.name.should.eql("Code Type 1");
                    res.body.enrollments[0].codes[0].codeType.image.should.eql("/code_type_1.jpg");
                    should.not.exist(res.body.enrollments[0].codes[0].code);
                    should.not.exist(res.body.enrollments[0].codes[0].taken_by);

                    res.body.enrollments[0].seekings.length.should.eql(1);
                    res.body.enrollments[0].seekings[0].id.should.eql(6);
                    res.body.enrollments[0].seekings[0].enrollment_id.should.eql(4);
                    res.body.enrollments[0].seekings[0].code_type_id.should.eql(1);
                    should.not.exist(res.body.enrollments[0].seekings[0].num_times_satisfied);

                    res.body.enrollments[0].seekings[0].codeType.id.should.eql(1);
                    res.body.enrollments[0].seekings[0].codeType.name.should.eql("Code Type 1");
                    res.body.enrollments[0].seekings[0].codeType.image.should.eql("/code_type_1.jpg");

                    done();
                });
        });
    });
});