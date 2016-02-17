let expect = require('chai').expect;
import RequestError from '../../src/client.methods/request.error.js';

describe('request.error.js', () => {

  describe('new RequestError()', () => {

    it('should create a RequestError object with default values when no parameters are given', done => {

      let error = new RequestError();
      expect(error.body).to.eql({});
      expect(error.statusCode).to.equal('');
      done();

    });

    it('should create a RequestError object with a given body (as object) and status code', done => {

      let expectedBody = { error: 'custom error message' };
      let expectedStatusCode = '1234';

      let error = new RequestError(expectedBody, expectedStatusCode);

      expect(error.body).to.eql(expectedBody);
      expect(error.message).to.eql(expectedBody.error);
      expect(error.statusCode).to.equal(expectedStatusCode);

      done();

    });

    it('should create a RequestError object with a given body (as string) and status code', done => {

      let expectedBody = { error: 'custom error message' };
      let expectedStatusCode = '1234';

      let error = new RequestError(JSON.stringify(expectedBody), expectedStatusCode);

      expect(error.body).to.eql(expectedBody);
      expect(error.message).to.eql(expectedBody.error);
      expect(error.statusCode).to.equal(expectedStatusCode);

      done();

    });

  });

});
