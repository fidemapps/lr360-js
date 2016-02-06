let expect = require('chai').expect;
import sinon from 'sinon';
let superagent = require('superagent');
import { getRequestOptions, baseRequest, addGeolocation } from '../../src/methods/base.request';
import Client from '../../src/client/client';

describe('base.request.js', () => {

  describe('baseRequest()', () => {

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

    it('should check basic calls to superagent and its methods', done => {

      let options = {
        method: 'GET',
        path: '/custom/path',
      };
      let expectedURL = 'http://services.fidemapps.com:80/custom/path';

      let client = new Client({ key: 'ACCESS-KEY' });

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

    it('should throw error when key and callback are not given to function', done => {

      let client = new Client();

      try {
        baseRequest.call(client, {});
      }
      catch (error) {

        expect(error).to.exist;
        expect(error.message).to.equal('You must provide a key.');
        done();

      }

    });

    it('should throw error when path and callback are not given to function', done => {

      let client = new Client({ key: 'ACCESS-KEY' });

      try {
        baseRequest.call(client, {});
      }
      catch (error) {

        expect(error).to.exist;
        expect(error.message).to.equal('You must provide a path.');
        done();

      }

    });

    it('should throw request error when no callback is given and request returns error', done => {

      let requestError = new Error('Error from request call');
      let options = {
        method: 'GET',
        path: '/custom/path',
      };
      let expectedURL = 'http://services.fidemapps.com:80/custom/path';

      let client = new Client({ key: 'ACCESS-KEY' });

      // overwrite superagent.end() behavior
      superagentRequest.end = callback => callback(requestError);

      try {
        baseRequest.call(client, options);
      }
      catch (error) {

        expect(superagentGetStub.calledWith(expectedURL)).to.be.true;
        expect(error).to.exist;
        expect(error.message).to.equal(requestError.message);

        done();

      }

    });

    it('should throw error when no callback is given and response returns statusCode 299', done => {

      let response = {
        statusCode: 299,
        body: { error: 'message' },
      };
      let options = {
        method: 'GET',
        path: '/custom/path',
      };
      let expectedURL = 'http://services.fidemapps.com:80/custom/path';

      let client = new Client({ key: 'ACCESS-KEY' });

      // overwrite superagent.end() behavior
      superagentRequest.end = callback => callback(null, response);

      try {
        baseRequest.call(client, options);
      }
      catch (error) {

        expect(superagentGetStub.calledWith(expectedURL)).to.be.true;
        expect(error).to.exist;
        expect(error.message).to.equal('message');
        expect(error.statusCode).to.equal(299);
        expect(error.body).to.eql(response.body);

        done();

      }

    });

    describe('callback(error, body)', () => {

      it('should send error to callback when no parameters are given (missing path)', done => {

        let client = new Client({ key: 'ACCESS-KEY' });

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
        let options = {
          method: 'GET',
          path: '/custom/path',
        };
        let expectedURL = `http://services.fidemapps.com:80${options.path}`;

        superagentRequest.end = callback => callback(requestError);

        let client = new Client({ key: 'ACCESS-KEY' });

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
          body: JSON.stringify({ error: 'message' }),
        };
        let options = {
          method: 'GET',
          path: '/custom/path',
        };
        let expectedURL = `http://services.fidemapps.com:80${options.path}`;

        superagentRequest.end = callback => callback(null, response);

        let client = new Client({ key: 'ACCESS-KEY' });

        baseRequest.call(client, options, (error, body) => {

          expect(superagentGetStub.calledWith(expectedURL)).to.be.true;
          expect(error).to.exist;
          expect(body).to.exist;
          expect(body).to.eql(JSON.parse(response.body));
          expect(error.message).to.equal('message');
          expect(error.statusCode).to.equal(299);
          expect(error.body).to.eql(JSON.parse(response.body));

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
      };
      let expectedOptions = {
        method: 'POST',
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
      };
      let expectedOptions = {
        method: 'POST',
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
      };
      let expectedOptions = {
        method: 'POST',
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
      };
      let expectedOptions = {
        method: 'POST',
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
