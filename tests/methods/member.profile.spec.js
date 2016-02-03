import { expect } from 'chai';
import sinon from 'sinon';
import Client from '../../src/client/client';
import memberProfile from '../../src/methods/member.profile';

describe('member.profile.js', () => {

    describe('memberProfile()', () => {

        const EXPECTED_ERROR_MESSAGE = 'You must provide a member ID.';

        it('should throw an error when no options and callback are given', done => {

            try{
                memberProfile();
            }
            catch(error) {

                expect(error).to.exist;
                expect(error.message).to.equal(EXPECTED_ERROR_MESSAGE);
                done();

            }

        });

        it('should throw an error when options parameter doesn\'t have required property and callback is not given', done => {

            try{
                let options = {};
                memberProfile(options);
            }
            catch(error) {

                expect(error).to.exist;
                expect(error.message).to.equal(EXPECTED_ERROR_MESSAGE);
                done();

            }

        });

        it('should call baseRequest with expected values', done => {

            let client = new Client();
            let baseRequestStub = sinon.stub(client, 'baseRequest', () => {});
            let expectedRequestOpions = {
                method: 'GET',
                body: {id: 1234},
                path: '/api/members/1234'
            };

            memberProfile.call(client, {id: 1234});

            expect(baseRequestStub.calledWith(expectedRequestOpions)).to.be.true;

            done();

        });

        describe('callback(error, data)', () => {

            it('should send an error to callback when no options are given', done => {

                let options = null;
                memberProfile(options, (error, data) => {

                    expect(error).to.exist;
                    expect(data).to.not.exist;
                    expect(error.message).to.equal(EXPECTED_ERROR_MESSAGE);

                    done();

                });

            });

            it('should send an error to callback when options parameter doesn\'t have required property', done => {

                let options = {};
                memberProfile(options, (error, data) => {

                    expect(error).to.exist;
                    expect(data).to.not.exist;
                    expect(error.message).to.equal(EXPECTED_ERROR_MESSAGE);

                    done();

                });

            });

        });

    });

});
