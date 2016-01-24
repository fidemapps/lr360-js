var expect = require('chai').expect;
import Client from '../../src/client/client';

describe('Client', function () {

    it('should extend config correctly when no paramaters are sent to the Client', function (done) {

        var client = new Client();

        expect(client.config).to.eql({
            hostname: 'services.fidemapps.com',
            port: 80,
            protocol: 'http'
        });

        done();

    });

    it('should extend config correctly', function (done) {

        var client = new Client({
            secret: 'a',
            key: 'b'
        });

        expect(client.config).to.eql({
            hostname: 'services.fidemapps.com',
            port: 80,
            protocol: 'http',
            secret: 'a',
            key: 'b'
        });

        done();

    });

    it('should use 443 if protocol is https', function (done) {

        var client = new Client({
            secret: 'a',
            key: 'b',
            protocol: 'https'
        });

        expect(client.config).to.eql({
            hostname: 'services.fidemapps.com',
            port: 443,
            protocol: 'https',
            secret: 'a',
            key: 'b'
        });

        done();
    });

});