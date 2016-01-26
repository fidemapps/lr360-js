/* istanbulify ignore file */
let expect = require('chai').expect;
import Client from './client';

describe('Client', () => {

    describe('new Client()', () => {

        it('should extend config correctly when no parameters are sent to the Client', done => {

            let expectedConfig = {
                hostname: 'services.fidemapps.com',
                port: 80,
                protocol: 'http'
            };

            let client = new Client();
            expect(client.config).to.eql(expectedConfig);
            done();

        });

        it('should extend config correctly with given secret and key', done => {

            let config = {
                secret: 'a',
                key: 'b'
            };

            let expectedConfig = {
                hostname: 'services.fidemapps.com',
                port: 80,
                protocol: 'http',
                secret: config.secret,
                key: config.key
            };

            let client = new Client(config);
            expect(client.config).to.eql(expectedConfig);
            done();

        });

        it('should extend config correctly with given hostname', done => {

            let config = {
                hostname: 'different.host.com'
            };

            let expectedConfig = {
                hostname: config.hostname,
                port: 80,
                protocol: 'http'
            };

            let client = new Client(config);
            expect(client.config).to.eql(expectedConfig);
            done();

        });

        it('extend use port 443 if given protocol https', done => {

            let config = {
                protocol: 'https'
            };

            let expectedConfig = {
                hostname: 'services.fidemapps.com',
                port: 443,
                protocol: config.protocol
            };

            let client = new Client(config);
            expect(client.config).to.eql(expectedConfig);
            done();

        });

    });

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
            let requestOptions = client.getRequestOptions();
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
            let requestOptions = client.getRequestOptions(options);
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
            let requestOptions = client.getRequestOptions(options);
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
            let requestOptions = client.getRequestOptions(options);
            expect(requestOptions).to.eql(expectedRequestOptions);
            done();

        });

    });

});