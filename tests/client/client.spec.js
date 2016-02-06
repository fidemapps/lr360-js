let expect = require('chai').expect;
import Client from '../../src/client/client';

describe('client.js', () => {

  describe('new Client()', () => {

    it('should extend config correctly when no parameters are sent to the Client', done => {

      let expectedConfig = {
        hostname: 'services.fidemapps.com',
        port: 80,
        protocol: 'http',
      };

      let client = new Client();
      expect(client.config).to.eql(expectedConfig);
      done();

    });

    it('should extend config correctly with given secret and key', done => {

      let config = {
        secret: 'a',
        key: 'b',
      };

      let expectedConfig = {
        hostname: 'services.fidemapps.com',
        port: 80,
        protocol: 'http',
        secret: config.secret,
        key: config.key,
      };

      let client = new Client(config);
      expect(client.config).to.eql(expectedConfig);
      done();

    });

    it('should extend config correctly with given hostname', done => {

      let config = {
        hostname: 'different.host.com',
      };

      let expectedConfig = {
        hostname: config.hostname,
        port: 80,
        protocol: 'http',
      };

      let client = new Client(config);
      expect(client.config).to.eql(expectedConfig);
      done();

    });

    it('extend use port 443 if given protocol https', done => {

      let config = {
        protocol: 'https',
      };

      let expectedConfig = {
        hostname: 'services.fidemapps.com',
        port: 443,
        protocol: config.protocol,
      };

      let client = new Client(config);
      expect(client.config).to.eql(expectedConfig);
      done();

    });

  });

});
