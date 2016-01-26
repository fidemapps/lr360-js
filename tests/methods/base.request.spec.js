let expect = require('chai').expect;
import { getRequestOptions } from '../../src/methods/base.request';
import Client from '../../src/client/client';

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