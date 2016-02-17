let expect = require('chai').expect;
import sinon from 'sinon';
let superagent = require('superagent');
import { baseRequest, addGeolocation } from '../../src/request/base.request.js';
import Client from '../../src/client/client';

describe('base.request.js', () => {

  describe('baseRequest()', () => {

    const ERROR_MESSAGE = 'You must provide a key and a path.';
    let superagentGetStub;
    let superagentRequest = {};
    let setSpy;
    let withCredentialsSpy;
    let sendSpy;

    superagentRequest.set = () => superagentRequest;
    superagentRequest.withCredentials = () => superagentRequest;
    superagentRequest.send = () => superagentRequest;

    // superagentRequest.end() should be overwritten on specific tests
    superagentRequest.end = (callback) => callback();

    beforeEach(done => {

      delete window.navigator;
      window.navigator = {
        geolocation: {
          getCurrentPosition: (success, error) => success({ coords: { latitude: 1234, longitude: 9876 } }),
        },
      };

      setSpy = sinon.spy(superagentRequest, 'set');
      withCredentialsSpy = sinon.spy(superagentRequest, 'withCredentials');
      sendSpy = sinon.spy(superagentRequest, 'send');

      superagentGetStub = sinon.stub(superagent, 'get', () => superagentRequest);

      done();

    });

    afterEach(done => {

      superagentGetStub.restore();
      setSpy.restore();
      withCredentialsSpy.restore();
      sendSpy.restore();

      done();

    });

    it('should check basic calls to superagent and its methods when path and key are passed correctly', done => {

      let options = {
        method: 'GET',
        path: '/custom/path',
      };
      let expectedURL = 'http://services.fidemapps.com:80/custom/path';

      let client = new Client();
      client.setup({ key: 'ACCESS-KEY' });

      baseRequest.call(client, options, () => {

        expect(superagentGetStub.calledWith(expectedURL)).to.be.true;
        expect(setSpy.withArgs('X-Fidem-AccessApiKey', 'ACCESS-KEY').calledOnce).to.be.true;
        expect(setSpy.withArgs('Accept', 'application/json').calledOnce).to.be.true;
        expect(setSpy.withArgs('Content-Type', 'application/json').calledOnce).to.be.true;
        expect(withCredentialsSpy.calledOnce).to.be.true;
        expect(sendSpy.withArgs(null).calledOnce).to.be.true;

        done();

      });

    });

    it('should call handleError when key is not found on client', done => {

      let client = new Client();
      let callback = () => {}; // jscs:disable
      let handleErrorStub = sinon.stub(client, 'handleError', () => {});

      baseRequest.call(client, {}, callback);

      expect(handleErrorStub.calledWith(ERROR_MESSAGE, callback)).to.be.true;

      done();

    });

    it('should call handleError when path is not found on options', done => {

      let client = new Client();
      let handleErrorStub = sinon.stub(client, 'handleError', () => {});
      client.setup({ key: 'ACCESS-KEY' });
      let callback = () => {}; // jscs:disable

      baseRequest.call(client, {}, callback);

      expect(handleErrorStub.calledWith(ERROR_MESSAGE, callback)).to.be.true;

      done();

    });

    it('should call handleError when no callback is given and request returns error', done => {

      let client = new Client();
      client.setup({ key: 'ACCESS-KEY' });

      let options = {
        method: 'GET',
        path: '/custom/path',
      };

      let handleErrorStub = sinon.stub(client, 'handleError', () => {}); // jscs:disable
      let requestError = new Error('Error from request call');

      // overwrite superagent.end() behavior to call back with error
      superagentRequest.end = callback => callback(requestError);

      baseRequest.call(client, options);

      expect(handleErrorStub.calledWith(requestError)).to.be.true;

      done();

    });

    it('should call handleError when no callback is given and response returns statusCode 299', done => {

      let client = new Client();
      client.setup({ key: 'ACCESS-KEY' });

      let options = {
        method: 'GET',
        path: '/custom/path',
      };

      let response = {
        statusCode: 299,
        body: JSON.stringify({ error: 'message' }),
      };

      // overwrite superagent.end() behavior to call back with response with error code
      superagentRequest.end = callback => callback(null, response);

      // test
      let handleErrorStub = sinon.stub(client, 'handleError', (error, callback) => {

        expect(callback).to.not.exist;
        expect(error).to.exist;
        expect(error.message).to.equal('message');
        expect(error.statusCode).to.equal(299);
        expect(error.body).to.eql(JSON.parse(response.body));
        done();

      });

      baseRequest.call(client, options);

    });

    describe('callback(error, body)', () => {

      it('should send error to callback when request call returns an error', done => {

        let requestError = new Error('Error from request call');
        let options = {
          method: 'GET',
          path: '/custom/path',
        };
        let expectedURL = `http://services.fidemapps.com:80${options.path}`;

        superagentRequest.end = callback => callback(requestError);

        let client = new Client();
        client.setup({ key: 'ACCESS-KEY' });

        baseRequest.call(client, options, (error, body) => {

          expect(superagentGetStub.calledWith(expectedURL)).to.be.true;
          expect(error).to.exist;
          expect(body).to.not.exist;
          expect(error.message).to.equal(requestError.message);

          done();
        });
      });

      it('should send error to callback when request call response with statusCode 299', done => {

        let response = {
          statusCode: 299,
          body: { error: 'message' },
        };
        let options = {
          method: 'GET',
          path: '/custom/path',
        };
        let expectedURL = `http://services.fidemapps.com:80${options.path}`;

        superagentRequest.end = callback => callback(null, response);

        let client = new Client();
        client.setup({ key: 'ACCESS-KEY' });

        baseRequest.call(client, options, (error, body) => {

          expect(superagentGetStub.calledWith(expectedURL)).to.be.true;
          expect(error).to.exist;
          expect(body).to.exist;
          expect(body).to.eql(response);
          expect(error.message).to.equal('message');
          expect(error.statusCode).to.equal(299);
          expect(error.body).to.eql(response.body);

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

      let options = {
        method: 'POST',
        path: '/api/gamification/actions',
      };
      let expectedOptions = {
        method: 'POST',
        path: '/api/gamification/actions',
        body: {
          coordinates: null,
        },
      };

      addGeolocation(options, augmentedOptions => {

        expect(augmentedOptions).to.eql(expectedOptions);
        done();

      });

    });

    it('should return options with coordinates null when window.navigator.geolocation is not present', done => {

      window.navigator = {};
      let options = {
        method: 'POST',
        path: '/api/gamification/actions',
      };
      let expectedOptions = {
        method: 'POST',
        path: '/api/gamification/actions',
        body: {
          coordinates: null,
        },
      };

      addGeolocation(options, augmentedOptions => {

        expect(augmentedOptions).to.eql(expectedOptions);
        done();

      });

    });

    it('should return options with coordinates null when window.navigator.getCurrentPosition calls error callback', done => {

      window.navigator = {
        geolocation: {
          getCurrentPosition: (success, error) => error(),
        },
      };
      let options = {
        method: 'POST',
        path: '/api/gamification/actions',
      };
      let expectedOptions = {
        method: 'POST',
        path: '/api/gamification/actions',
        body: {
          coordinates: null,
        },
      };

      addGeolocation(options, augmentedOptions => {

        expect(augmentedOptions).to.eql(expectedOptions);
        done();

      });

    });

    it('should return options with coordinates when coordinates are found an sent to success callback', done => {

      window.navigator = {
        geolocation: {
          getCurrentPosition: (success, error) => success({ coords: { latitude: 1234, longitude: 9876 } }),
        },
      };
      let options = {
        method: 'POST',
        path: '/api/gamification/actions',
      };
      let expectedOptions = {
        method: 'POST',
        path: '/api/gamification/actions',
        body: {
          coordinates: { lat: 1234, long: 9876 },
        },
      };

      addGeolocation(options, augmentedOptions => {

        expect(augmentedOptions).to.eql(expectedOptions);
        done();

      });

    });

  });

});
