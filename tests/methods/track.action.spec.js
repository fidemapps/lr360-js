import { expect } from 'chai';
import Client from '../../src/client/client';
import request from 'browser-request';
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
                body: JSON.stringify({
                  type: 'TEST',
                  coordinates: {
                      lat: 1234,
                      long: 9876
                  }
                }),
                qs: null
            })).to.be.true;

            requestPostStub.restore();
            done();

        });

        it('should call request.post() with correct requestOptions (when key and path are given) ' +
            'with no coordinates found', done => {

                delete window.navigator;
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
                    body: JSON.stringify({
                      type: 'TEST',
                      coordinates: null
                    }),
                    qs: null
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

        });

    });

});
