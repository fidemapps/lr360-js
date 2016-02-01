import { expect } from 'chai';
import Client from '../../src/client/client';
import setup from '../../src/methods/setup';

describe('setup.js', () => {

    it('should not change the default config when called with no parameters', done => {

        let expectedDefaultConfig = {
            hostname: 'services.fidemapps.com',
            port: 80,
            protocol: 'http'
        };

        let client = new Client();

        expect(client.config).to.eql(expectedDefaultConfig);

        setup.call(client);

        expect(client.config).to.eql(expectedDefaultConfig);

        done();

    });

    it('should overwrite config settings for the client with given parameter', done => {

        let expectedDefaultConfig = {
            hostname: 'services.fidemapps.com',
            port: 80,
            protocol: 'http'
        };

        let expectedFinalConfig = {
            hostname: 'modified.hostname.com',
            port: 81,
            protocol: 'https',
            key: 'ACCESS-KEY'
        };

        let client = new Client();

        expect(client.config).to.eql(expectedDefaultConfig);

        setup.call(client, {
            hostname: 'modified.hostname.com',
            port: 81,
            protocol: 'https',
            key: 'ACCESS-KEY'
        });

        expect(client.config).to.eql(expectedFinalConfig);

        done();

    });

});