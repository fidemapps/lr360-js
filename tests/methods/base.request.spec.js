let expect = require('chai').expect;
import sinon from 'sinon';
import request from 'request';
import { getRequestOptions, baseRequest } from '../../src/methods/base.request';
import Client from '../../src/client/client';

describe('base.request', () => {

    describe('getRequestOptions', () => {

        it('should return default options when no options are given', done => {

            let expectedRequestOptions = {
                url: 'http://services.fidemapps.com:80',
                method: 'GET',
                headers: {
                    'X-Fidem-AccessApiKey': null,
                    accept: 'application/json'
                },
                qs: null
            };

            let client = new Client();
            let requestOptions = getRequestOptions.call(client);
            expect(requestOptions).to.eql(expectedRequestOptions);
            done();

        });

        it('should return default options when no options are given and client has different config', done => {

            let config = {
                key: 'my-key',
                protocol: 'https',
                hostname: 'modified.host.com'
            };

            let expectedRequestOptions = {
                url: 'https://modified.host.com:443',
                method: 'GET',
                headers: {
                    'X-Fidem-AccessApiKey': 'my-key',
                    accept: 'application/json'
                },
                qs: null
            };

            let client = new Client(config);
            let requestOptions = getRequestOptions.call(client);
            expect(requestOptions).to.eql(expectedRequestOptions);
            done();

        });

        it('should return request options with url, method and qs overwritten with values from given options', done => {

            let options = {
                path: '/my/path',
                method: 'MODIFIED',
                qs: {
                    query: 'string'
                }
            };

            let expectedRequestOptions = {
                url: `http://services.fidemapps.com:80${options.path}`,
                method: options.method,
                headers: {
                    'X-Fidem-AccessApiKey': null,
                    accept: 'application/json'
                },
                qs: options.qs
            };

            let client = new Client();
            let requestOptions = getRequestOptions.call(client, options);
            expect(requestOptions).to.eql(expectedRequestOptions);
            done();

        });

        it('should return request options with url, method, qs and token  overwritten with values from given options', done => {

            let options = {
                path: '/my/path',
                method: 'MODIFIED',
                qs: {
                    query: 'string'
                },
                token: 'mytoken'
            };

            let expectedRequestOptions = {
                url: `http://services.fidemapps.com:80${options.path}`,
                method: options.method,
                headers: {
                    'X-Fidem-AccessApiKey': null,
                    'X-Fidem-SessionToken': 'mytoken',
                    accept: 'application/json'
                },
                qs: options.qs
            };

            let client = new Client();
            let requestOptions = getRequestOptions.call(client, options);
            expect(requestOptions).to.eql(expectedRequestOptions);
            done();

        });

        it('should return request options with url, method, qs, token, content-type header and body ' +
            'overwritten with values from given options', done => {

            let options = {
                path: '/my/path',
                method: 'PUT',
                qs: {
                    query: 'string'
                },
                token: 'mytoken',
                body: {
                    body: 'value'
                }
            };

            let expectedRequestOptions = {
                url: `http://services.fidemapps.com:80${options.path}`,
                method: options.method,
                headers: {
                    'X-Fidem-AccessApiKey': null,
                    'X-Fidem-SessionToken': 'mytoken',
                    accept: 'application/json',
                    'content-type': 'application/json'
                },
                body: JSON.stringify(options.body),
                qs: options.qs
            };

            let client = new Client();
            let requestOptions = getRequestOptions.call(client, options);
            expect(requestOptions).to.eql(expectedRequestOptions);
            done();

        });

        // TODO: handle case where body throws error when being parsed

    });

    describe('baseRequest', () => {

        let stub;

        beforeEach(done => {
            stub = sinon.stub(request, 'get');
            done();
        });

        afterEach(done => {
            stub.restore();
            done();
        });

        it('should call request with correct requestOptions', done => {

            let response = {statusCode: 200};
            let body = {body: 'content'};
            let options = {path: '/custom/path'};
            let expectedRequestOptions = {
                url: `http://services.fidemapps.com:80${options.path}`,
                method: 'GET',
                headers: {
                    'X-Fidem-AccessApiKey': null,
                    accept: 'application/json'
                },
                qs: null
            };

            stub.yields(null, JSON.stringify(response), JSON.stringify(body));

            let client = new Client();

            baseRequest.call(client, options, (error, body) => {

                expect(stub.calledWith(expectedRequestOptions)).to.be.true;
                expect(error).to.not.exist;
                expect(body).to.eql(body);

                done();
            });
        });

        it('should send error to callback when no parameters are given', done => {

            let client = new Client();

            baseRequest.call(client, null, (error, body) => {

                expect(error).to.exist;
                expect(body).to.not.exist;
                expect(error.message).to.equal('You must provide a path.');

                done();
            });

        });

        it('should send error to callback when request call returns an error', done => {

            let requestError = new Error('Error from request call');
            let options = {path: '/custom/path'};
            let expectedRequestOptions = {
                url: `http://services.fidemapps.com:80${options.path}`,
                method: 'GET',
                headers: {
                    'X-Fidem-AccessApiKey': null,
                    accept: 'application/json'
                },
                qs: null
            };

            stub.yields(requestError);

            let client = new Client();

            baseRequest.call(client, options, (error, body) => {

                expect(stub.calledWith(expectedRequestOptions)).to.be.true;
                expect(error).to.exist;
                expect(body).to.not.exist;
                expect(error.message).to.equal(requestError.message);

                done();
            });
        });

        it('should send error to callback when request call response with statusCode 299', done => {

            let response = {statusCode: 299};
            let responseBody = {error: 'message'};
            let options = {path: '/custom/path'};
            let expectedRequestOptions = {
                url: `http://services.fidemapps.com:80${options.path}`,
                method: 'GET',
                headers: {
                    'X-Fidem-AccessApiKey': null,
                    accept: 'application/json'
                },
                qs: null
            };

            stub.yields(null, response, responseBody);

            let client = new Client();

            baseRequest.call(client, options, (error, body) => {

                expect(stub.calledWith(expectedRequestOptions)).to.be.true;
                expect(error).to.exist;
                expect(body).to.not.exist;
                expect(error.message).to.equal('message');
                expect(error.statusCode).to.equal(299);
                expect(error.body).to.eql(responseBody);

                done();
            });
        });

    });

});