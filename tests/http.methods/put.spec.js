import { expect } from 'chai';
import sinon from 'sinon';
import putRequest from '../../src/http.methods/put';

describe('put.js', () => {
  const ERROR_MESSAGE_ENDPOINT = 'You must provide a endpoint.';
  const ERROR_MESSAGE_BODY = 'You must provide a request body.';
  const ERROR_MESSAGE_CALLBACK = 'You must provide a callback.';

  let handleErrorStub;
  let baseRequestStub;

  beforeEach(done => {
    handleErrorStub = sinon.stub(lr360.client, 'handleError', () => {});
    baseRequestStub = sinon.stub(lr360.client, 'baseRequest', () => {});
    done();
  });

  afterEach(done => {
    handleErrorStub.restore();
    baseRequestStub.restore();
    done();
  });

  it('should throw error when called without an endpoint', done => {

    let endpoint = null;
    let body = {};
    let callback = () => {};

    putRequest(endpoint, body, callback);

    expect(handleErrorStub.calledWith(ERROR_MESSAGE_ENDPOINT, callback)).to.be.true;
    done();

  });

  it('should throw error when called without a body', done => {

    let endpoint = '/test';
    let body = null;
    let callback = () => {};

    putRequest(endpoint, body, callback);

    expect(handleErrorStub.calledWith(ERROR_MESSAGE_BODY, callback)).to.be.true;
    done();

  });

  it('should throw error when called without an callback', done => {

    let endpoint = '/test/route';
    let body = {};
    let callback = null;

    putRequest(endpoint, body, callback);

    expect(handleErrorStub.calledWith(ERROR_MESSAGE_CALLBACK, callback)).to.be.true;
    done();

  });

  it('should throw error when called with wrong parameter type (for endpoint)', done => {

    let endpoint = () => {}; // jscs:disable
    let body = {};
    let callback = () => {};

    putRequest(endpoint, body, callback);

    expect(handleErrorStub.calledWith(ERROR_MESSAGE_ENDPOINT, callback)).to.be.true;
    done();

  });

  it('should throw error when called with wrong parameter type (for body)', done => {

    let endpoint = '/test'; // jscs:disable
    let body = 'wront thing here';
    let callback = () => {};

    putRequest(endpoint, body, callback);

    expect(handleErrorStub.calledWith(ERROR_MESSAGE_BODY, callback)).to.be.true;
    done();

  });

  it('should throw error when called with wrong parameter type (for callback)', done => {

    let endpoint = '/test/route';
    let body = {};
    let callback = {};

    putRequest(endpoint, body, callback);

    expect(handleErrorStub.calledWith(ERROR_MESSAGE_CALLBACK, callback)).to.be.true;
    done();

  });

  it('should call baserequest with correct parameters', done => {

    let endpoint = '/test/route';
    let body = { key: 'value' };
    let callback = () => {};

    putRequest(endpoint, body, callback);

    expect(baseRequestStub.calledWith({
      method: 'PUT',
      path: endpoint,
      body: body,
    }, callback)).to.be.true;
    done();

  });

});