let expect = require('chai').expect;
import sinon from 'sinon';
import request from 'request';
import { getRequestOptions, baseRequest, addGeolocation } from '../../src/methods/base.request';
import Client from '../../src/client/client';

describe('base.request.js', () => {

    describe('getRequestOptions()', () => {

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

    });

    describe('baseRequest()', () => {

        let requestGetStub;

        beforeEach(done => {

            delete window.navigator;
            window.navigator = {
                geolocation: {
                    getCurrentPosition: (success, error) => success({coords: {latitude: 1234, longitude: 9876}})
                }
            };
            requestGetStub = sinon.stub(request, 'get');
            done();

        });

        afterEach(done => {
            requestGetStub.restore();
            done();
        });

        it('should call request with correct requestOptions and return body to given callback', done => {

            let response = {statusCode: 200};
            let body = {body: 'content'};
            let options = {path: '/custom/path'};
            let expectedRequestOptions = {
                url: `http://services.fidemapps.com:80${options.path}`,
                method: 'GET',
                headers: {
                    'X-Fidem-AccessApiKey': 'ACCESS-KEY',
                    accept: 'application/json'
                },
                qs: null,
                coordinates: {
                    lat: 1234,
                    long: 9876
                }
            };

            requestGetStub.yields(null, JSON.stringify(response), JSON.stringify(body));

            let client = new Client({key: 'ACCESS-KEY'});

            baseRequest.call(client, options, (error, body) => {

                expect(requestGetStub.calledWith(expectedRequestOptions)).to.be.true;
                expect(error).to.not.exist;
                expect(body).to.eql(body);

                done();
            });
        });

        it('should throw error when key and callback are not given to function', done => {

            let client = new Client();

            try {
                baseRequest.call(client, {});
            }
            catch (error) {

                expect(error).to.exist;
                expect(error.message).to.equal('You must provide a key.')
                done();

            }

        });

        it('should throw error when path and callback are not given to function', done => {

            let client = new Client({key: 'ACCESS-KEY'});

            try {
                baseRequest.call(client, {});
            }
            catch (error) {

                expect(error).to.exist;
                expect(error.message).to.equal('You must provide a path.')
                done();

            }

        });

        it('should throw request error when no callback is given and request returns error', done => {

            let requestError = new Error('Error from request call');
            let options = {path: '/custom/path'};
            let expectedRequestOptions = {
                url: `http://services.fidemapps.com:80${options.path}`,
                method: 'GET',
                headers: {
                    'X-Fidem-AccessApiKey': 'ACCESS-KEY',
                    accept: 'application/json'
                },
                qs: null,
                coordinates: {
                    lat: 1234,
                    long: 9876
                }
            };

            requestGetStub.yields(requestError);

            let client = new Client({key: 'ACCESS-KEY'});

            try {
                baseRequest.call(client, options);
            }
            catch (error) {

                expect(requestGetStub.calledWith(expectedRequestOptions)).to.be.true;
                expect(error).to.exist;
                expect(error.message).to.equal(requestError.message);

                done();

            }

        });

        it('should throw error when no callback is given and response returns statusCode 299', done => {

            let response = {statusCode: 299};
            let responseBody = {error: 'message'};
            let options = {path: '/custom/path'};
            let expectedRequestOptions = {
                url: `http://services.fidemapps.com:80${options.path}`,
                method: 'GET',
                headers: {
                    'X-Fidem-AccessApiKey': 'ACCESS-KEY',
                    accept: 'application/json'
                },
                qs: null,
                coordinates: {
                    lat: 1234,
                    long: 9876
                }
            };

            requestGetStub.yields(null, response, JSON.stringify(responseBody));

            let client = new Client({key: 'ACCESS-KEY'});

            try {
                baseRequest.call(client, options);
            }
            catch (error) {

                expect(requestGetStub.calledWith(expectedRequestOptions)).to.be.true;
                expect(error).to.exist;
                expect(error.message).to.equal('message');
                expect(error.statusCode).to.equal(299);
                expect(error.body).to.eql(responseBody);

                done();

            }

        });

        describe('callback(error, body)', () => {

            it('should send error to callback when no parameters are given (missing path)', done => {

                let client = new Client({key: 'ACCESS-KEY'});

                baseRequest.call(client, null, (error, body) => {

                    expect(error).to.exist;
                    expect(body).to.not.exist;
                    expect(error.message).to.equal('You must provide a path.');

                    done();
                });

            });

            it('should send error to callback when no key is configured in client (missing key)', done => {

                let client = new Client();

                baseRequest.call(client, null, (error, body) => {

                    expect(error).to.exist;
                    expect(body).to.not.exist;
                    expect(error.message).to.equal('You must provide a key.');

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
                        'X-Fidem-AccessApiKey': 'ACCESS-KEY',
                        accept: 'application/json'
                    },
                    qs: null,
                    coordinates: {
                        lat: 1234,
                        long: 9876
                    }
                };

                requestGetStub.yields(requestError);

                let client = new Client({key: 'ACCESS-KEY'});

                baseRequest.call(client, options, (error, body) => {

                    expect(requestGetStub.calledWith(expectedRequestOptions)).to.be.true;
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
                        'X-Fidem-AccessApiKey': 'ACCESS-KEY',
                        accept: 'application/json'
                    },
                    qs: null,
                    coordinates: {
                        lat: 1234,
                        long: 9876
                    }
                };

                requestGetStub.yields(null, response, JSON.stringify(responseBody));

                let client = new Client({key: 'ACCESS-KEY'});

                baseRequest.call(client, options, (error, body) => {

                    expect(requestGetStub.calledWith(expectedRequestOptions)).to.be.true;
                    expect(error).to.exist;
                    expect(body).to.exist;
                    expect(body).to.eql(responseBody);
                    expect(error.message).to.equal('message');
                    expect(error.statusCode).to.equal(299);
                    expect(error.body).to.eql(responseBody);

                    done();
                });

            });

        });

    });

    describe('addGeolocation()', () => {

        beforeEach(done => {
            delete window.navigator;
            done();
        });

        it('should return options with coordinates null when window.navigator is not present', done => {

            let options = {};
            let expectedOptions = {coordinates: null};

            addGeolocation(options, augmentedOptions => {

                expect(augmentedOptions).to.eql(expectedOptions);
                done();

            });

        });

        it('should return options with coordinates null when window.navigator.geolocation is not present', done => {

            window.navigator = {};
            let options = {};
            let expectedOptions = {coordinates: null};

            addGeolocation(options, augmentedOptions => {

                expect(augmentedOptions).to.eql(expectedOptions);
                done();

            });

        });

        it('should return options with coordinates null when window.navigator.getCurrentPosition calls error callback', done => {

            window.navigator = {
                geolocation: {
                    getCurrentPosition: (success, error) => error()
                }
            };
            let options = {};
            let expectedOptions = {coordinates: null};

            addGeolocation(options, augmentedOptions => {

                expect(augmentedOptions).to.eql(expectedOptions);
                done();

            });

        });

        it('should return options with coordinates when coordinates are found an sent to success callback', done => {

            window.navigator = {
                geolocation: {
                    getCurrentPosition: (success, error) => success({coords: {latitude: 1234, longitude: 9876}})
                }
            };
            let options = {};
            let expectedOptions = {coordinates: {lat: 1234, long: 9876}};

            addGeolocation(options, augmentedOptions => {

                expect(augmentedOptions).to.eql(expectedOptions);
                done();

            });

        });

    });

});