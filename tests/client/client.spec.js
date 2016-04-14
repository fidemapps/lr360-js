let expect = require('chai').expect;
import sinon from 'sinon';
import Client from '../../src/client/client';

describe('client.js', () => {

  describe('new Client()', () => {

    it('should check that a new Client has the correct config set up', done => {

      let expectedConfig = {
        hostname: 'services.fidemapps.com',
        port: 80,
        protocol: 'http',
        geolocation: true,
        dev: false,
      };

      let client = new Client();

      expect(client.config).to.eql(expectedConfig);

      done();

    });

  });

  describe('handleError()', () => {

    let logErrorStub;

    beforeEach(done => {
      logErrorStub = sinon.stub(console, 'error', () => {});
      done();
    });

    afterEach(done => {
      logErrorStub.restore();
      done();
    });

    it('should log default error message if dev flag is false (e.g. running on production) and no message is passed', done => {

      const DEFAULT_ERROR_MESSAGE = 'N/A';
      let client = new Client();
      client.config.dev = false;

      client.handleError();

      expect(logErrorStub.calledWith(DEFAULT_ERROR_MESSAGE)).to.be.true;

      done();

    });

    it('should throw passed error message if dev flag is true', done => {

      const ERROR_MESSAGE_THROWN = 'Custom error message thrown';
      let client = new Client();
      client.config.dev = true;

      try {
        client.handleError(ERROR_MESSAGE_THROWN);
      } catch (error) {

        expect(logErrorStub.calledOnce).to.be.false;
        expect(error).to.exist;
        expect(error.message).to.equal(ERROR_MESSAGE_THROWN);
        done();

      }

    });

    it('should log passed error message if dev flag is false (e.g. running on production)', done => {

      const ERROR_MESSAGE_LOGGED = 'Custom error message logged';
      let client = new Client();
      client.config.dev = false;

      client.handleError(ERROR_MESSAGE_LOGGED);

      expect(logErrorStub.calledWith(ERROR_MESSAGE_LOGGED)).to.be.true;

      done();

    });

    it('should log custom error message if dev flag is false (e.g. running on production) and a custom error is passed', done => {

      let customError = { message: 'custom error message' };

      let client = new Client();
      client.config.dev = false;

      client.handleError(customError);

      expect(logErrorStub.calledWith(customError.message)).to.be.true;

      done();

    });

    it('should throw passed error if dev flag is true', done => {

      let customError = { message: 'custom error message' };
      let client = new Client();
      client.config.dev = true;

      try {
        client.handleError(customError);
      } catch (error) {

        expect(logErrorStub.calledOnce).to.be.false;
        expect(error).to.eql(customError);

        done();

      }

    });

  });

});
