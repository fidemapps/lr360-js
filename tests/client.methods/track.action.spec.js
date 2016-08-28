'use strict';

import { expect } from 'chai';
import Client from '../../src/client/client';
import sinon from 'sinon';
let assign = require('lodash.assign');
import trackAction from '../../src/client.methods/track.action.js';

describe('track.action.js', () => {

  describe('trackAction()', () => {

    const MISSING_TYPE_ERROR_MESSAGE = 'You must provide the type of action to be tracked.';
    const WRONG_ARGUMENTS_ERROR_MESSAGE = 'You must provide the correct arguments to trackAction.';
    let clientMock = {
      baseRequest: () => {}, // jscs:disable
      handleError: () => {}, // jscs:disable
    };
    let baseRequestStub;
    let handleErrorStub;

    beforeEach(done => {
      baseRequestStub = sinon.stub(clientMock, 'baseRequest');
      handleErrorStub = sinon.stub(clientMock, 'handleError');
      done();
    });

    afterEach(done => {
      baseRequestStub.restore();
      handleErrorStub.restore();
      done();
    });

    it('should make valid call to baseRequest when called with one argument, a String, and no callback', done => {

      let type = 'test type';

      trackAction.call(clientMock, type);

      let expectedCallBody = {
        method: 'POST',
        body: { type: type },
        path: '/api/gamification/actions',
      };

      expect(baseRequestStub.calledWith(expectedCallBody, null)).to.be.true;

      done();

    });

    it('should make valid call to baseRequest when called with one argument, an Object (with a type property), and no callback', done => {

      let data = {
        type: 'test type',
        content: 'additional information',
      };

      trackAction.call(clientMock, data);

      let expectedCallBody = {
        method: 'POST',
        body: data,
        path: '/api/gamification/actions',
      };

      expect(baseRequestStub.calledWith(expectedCallBody, null)).to.be.true;

      done();

    });

    it('should make valid call to baseRequest when called with two arguments, a String and an Object (with a type property), and no callback', done => {

      let type = 'test type';
      let data = { content: 'additional information' };

      trackAction.call(clientMock, type, data);

      let expectedCallBody = {
        method: 'POST',
        body: assign({}, data, { type: type }),
        path: '/api/gamification/actions',
      };

      expect(baseRequestStub.calledWith(expectedCallBody, null)).to.be.true;

      done();

    });

    it('should make valid call to baseRequest when called with two arguments, a String and a callback', done => {

      let type = 'test type';
      let callback = () => {};

      trackAction.call(clientMock, type, callback);

      let expectedCallBody = {
        method: 'POST',
        body: { type: type },
        path: '/api/gamification/actions',
      };

      expect(baseRequestStub.calledWith(expectedCallBody, callback)).to.be.true;

      done();

    });

    it('should make valid call to baseRequest when called with two arguments, an Object (with a type property) and a callback', done => {

      let data = {
        type: 'test type',
        content: 'additional information',
      };
      let callback = () => {};

      trackAction.call(clientMock, data, callback);

      let expectedCallBody = {
        method: 'POST',
        body: data,
        path: '/api/gamification/actions',
      };

      expect(baseRequestStub.calledWith(expectedCallBody, callback)).to.be.true;

      done();

    });

    it('should make valid call to baseRequest when called with three arguments, a String, an Object (with a type property) and a callback', done => {

      let type = 'test type';
      let data = { content: 'additional information' };
      let callback = () => {};

      trackAction.call(clientMock, type, data, callback);

      let expectedCallBody = {
        method: 'POST',
        body: assign({}, data, { type: type }),
        path: '/api/gamification/actions',
      };

      expect(baseRequestStub.calledWith(expectedCallBody, callback)).to.be.true;

      done();

    });

    it('should call handleError when called with invalid arguments (with callback)', done => {

      let type = 'test type';
      let data = { content: 'additional information' };
      let callback = () => {};

      // changed place of data and type
      trackAction.call(clientMock, data, type, callback);

      expect(baseRequestStub.calledOnce).to.be.false;
      expect(handleErrorStub.calledWith(WRONG_ARGUMENTS_ERROR_MESSAGE, callback)).to.be.true;

      done();

    });

    it('should call handleError when called with invalid arguments (without callback)', done => {

      let type = 'test type';
      let data = { content: 'additional information' };
      let callback = () => {};

      // changed place of callback and type
      trackAction.call(clientMock, callback, type);

      expect(baseRequestStub.calledOnce).to.be.false;
      expect(handleErrorStub.calledWith(WRONG_ARGUMENTS_ERROR_MESSAGE, null)).to.be.true;

      done();

    });

    it('should call handleError when called with two arguments, object and callback, and object is missing type property', done => {

      let data = { content: 'additional information' };
      let callback = () => {};

      // changed place of data and type
      trackAction.call(clientMock, data, callback);

      expect(baseRequestStub.calledOnce).to.be.false;
      expect(handleErrorStub.calledWith(MISSING_TYPE_ERROR_MESSAGE, callback)).to.be.true;

      done();

    });

    it('should call handleError when called with one argument, object, and object is missing type property', done => {

      let data = { content: 'additional information' };

      // changed place of data and type
      trackAction.call(clientMock, data);

      expect(baseRequestStub.calledOnce).to.be.false;
      expect(handleErrorStub.calledWith(MISSING_TYPE_ERROR_MESSAGE, null)).to.be.true;

      done();

    });

  });

});
