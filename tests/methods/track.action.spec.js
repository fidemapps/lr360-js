import { expect } from 'chai';
import Client from '../../src/client/client';
import request from 'request';
import trackAction from '../../src/methods/track.action';

describe('track.action.js', () => {

    describe('trackAction()', () => {

        beforeEach(done => {

            delete window.navigator;
            window.navigator = {
                geolocation: {
                    getCurrentPosition: (success, error) => success({coords: {latitude: 1234, longitude: 9876}})
                }
            };
            done();

        });

        it('should throw an error when no type property is set on the body given and no callback is given', done => {

            let client = new Client();

            try {
                trackAction.call(client, {irrelevantProperty: 'test'})
            } catch (error) {

                expect(error).to.exist;
                expect(error.message).to.equal('You must provide the type of action to be tracked.');
                done();
            }

        });

        it('should call baseRequest() with given options', done => {

            let client = new Client();
            let baseRequestStub = sinon.stub(client, 'baseRequest', () => {
            });

            trackAction.call(client, {type: 'TEST'});

            expect(baseRequestStub.calledWith({
                method: 'POST',
                body: {type: 'TEST'},
                path: '/api/gamification/actions'
            })).to.be.true;

            baseRequestStub.restore();
            done();

        });

        it('should call request.post() with correct requestOptions (when key and path are given)', done => {

            let requestPostStub = sinon.stub(request, 'post');
            let client = new Client({key: 'ACCESS-KEY'});

            trackAction.call(client, {type: 'TEST'});

            expect(requestPostStub.calledWith({
                url: `http://services.fidemapps.com:80/api/gamification/actions`,
                method: 'POST',
                headers: {
                    'X-Fidem-AccessApiKey': 'ACCESS-KEY',
                    accept: 'application/json',
                    'content-type': 'application/json'
                },
                body: JSON.stringify({type: 'TEST'}),
                qs: null,
                coordinates: {
                    lat: 1234,
                    long: 9876
                }
            })).to.be.true;

            requestPostStub.restore();
            done();

        });

        describe('callback(error, data)', () => {

            it('should return error to callback when no parameter is given', done => {

                let client = new Client();

                trackAction.call(client, null, (error, body) => {

                    expect(error).to.exist;
                    expect(body).to.not.exist;
                    expect(error.message).to.equal('You must provide the type of action to be tracked.');

                    done();

                });

            });

            it('should return error to callback when no type property is set on the body given', done => {

                let client = new Client();

                trackAction.call(client, {irrelevantProperty: 'test'}, (error, body) => {

                    expect(error).to.exist;
                    expect(body).to.not.exist;
                    expect(error.message).to.equal('You must provide the type of action to be tracked.');

                    done();

                });

            });

            it('should return an error if key is not configured on client', done => {

                let client = new Client();

                trackAction.call(client, {type: 'TEST'}, (error, data) => {

                    expect(error).to.exist;
                    expect(data).to.not.exist;
                    expect(error.message).to.equal('You must provide a key.');

                    done();

                });

            });

            it('should return an error when request.post() yields error', done => {

                let requestPostStub = sinon.stub(request, 'post');
                let client = new Client({key: 'ACCESS-KEY'});

                requestPostStub.yields(new Error('error'), null, null);

                trackAction.call(client, {type: 'TEST'}, (error, body) => {

                    expect(error).to.exist;
                    expect(body).to.not.exist;
                    expect(error.message).to.equal('error');

                    requestPostStub.restore();
                    done();

                });

            });

            it('should return a RequestError when request.post() yields response with error code', done => {

                let requestPostStub = sinon.stub(request, 'post');
                let client = new Client({key: 'ACCESS-KEY'});

                requestPostStub.yields(null, {statusCode: 299}, JSON.stringify({error: 'message'}));

                trackAction.call(client, {type: 'TEST'}, (error, body) => {

                    expect(error).to.exist;
                    expect(body).to.exist;
                    expect(error.message).to.equal('message');
                    expect(error.statusCode).to.equal(299);
                    expect(body).to.eql({error: 'message'});

                    requestPostStub.restore();
                    done();

                });

            });

        });

    });

});