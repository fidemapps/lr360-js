import { expect } from 'chai';
import Client from '../../src/client/client';
import setup from '../../src/methods/setup';

describe('setup.js', () => {

  it('should throw error when config is called without a key passed and dev flag is true', done => {

    let client = new Client();
    client.config.dev = true;

    try {
      setup.call(client);
    }
    catch (error) {

      expect(error).to.exist;
      expect(error.message).to.equal('You must provide a Key.');
      done();

    }

  });

  it('should overwrite config settings for the client with given parameter', done => {

    let expectedDefaultConfig = {
      hostname: 'services.fidemapps.com',
      port: 80,
      protocol: 'http',
      dev: false,
    };

    let expectedFinalConfig = {
      hostname: 'modified.hostname.com',
      port: 81,
      protocol: 'https',
      key: 'ACCESS-KEY',
      dev: true,
    };

    let client = new Client();

    expect(client.config).to.eql(expectedDefaultConfig);

    setup.call(client, {
      hostname: 'modified.hostname.com',
      port: 81,
      protocol: 'https',
      key: 'ACCESS-KEY',
      dev: true,
    });

    expect(client.config).to.eql(expectedFinalConfig);

    done();

  });

});
