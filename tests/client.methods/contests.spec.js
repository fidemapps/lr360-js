'use strict';

import { expect } from 'chai';
import sinon from 'sinon';
import Client from '../../src/client/client';
import getContests from '../../src/client.methods/contests';

describe('contents.js', () => {

  describe('getContest()', () => {

    const ERROR_MESSAGE_CALLBACK = 'You must provide a callback.';

    it('should call handleError when called with no parameters', done => {

      let client = new Client();
      let handleErrorStub = sinon.stub(client, 'handleError', () => {});

      getContests.call(client);

      expect(handleErrorStub.calledWith(ERROR_MESSAGE_CALLBACK)).to.be.true;

      done();

    });

    it('should call handleError when called with no callback', done => {

      let client = new Client();
      client.memberId = 'memberIdFromClient';
      let options = { memberId: 'memberIdFromOptions' };
      let handleErrorStub = sinon.stub(client, 'handleError', () => {});

      getContests.call(client, options);

      expect(handleErrorStub.calledWith(ERROR_MESSAGE_CALLBACK)).to.be.true;

      done();

    });

    it('should call baseRequest without query parameters when no options are passed', done => {

      let client = new Client();
      let options = null;
      let baseRequestStub = sinon.stub(client, 'baseRequest', () => {});
      let expectedRequestOpions = {
        method: 'GET',
        path: '/api/contests',
      };

      getContests.call(client, options, () => {});

      expect(baseRequestStub.calledWith(expectedRequestOpions)).to.be.true;

      done();

    });

    it('should call baseRequest without query parameters when no member ID is passed in options', done => {

      let client = new Client();
      let options = {};
      let baseRequestStub = sinon.stub(client, 'baseRequest', () => {});
      let expectedRequestOpions = {
        method: 'GET',
        path: '/api/contests',
      };

      getContests.call(client, options, () => {});

      expect(baseRequestStub.calledWith(expectedRequestOpions)).to.be.true;

      done();

    });

    it('should call baseRequest with query parameters when a ID is found on client', done => {

      let client = new Client();
      let options = { memberId: 'memberIdFromClient' };
      let baseRequestStub = sinon.stub(client, 'baseRequest', () => {});
      let expectedRequestOpions = {
        method: 'GET',
        path: '/api/contests?memberId=memberIdFromClient',
      };

      getContests.call(client, options, () => {});

      expect(baseRequestStub.calledWith(expectedRequestOpions)).to.be.true;

      done();

    });

    it('should call baseRequest with query parameters when a ID is passed', done => {

      let client = new Client();
      let options = { memberId: 'memberIdFromOptions' };
      let baseRequestStub = sinon.stub(client, 'baseRequest', () => {});
      let expectedRequestOpions = {
        method: 'GET',
        path: '/api/contests?memberId=memberIdFromOptions',
      };

      getContests.call(client, options, () => {});

      expect(baseRequestStub.calledWith(expectedRequestOpions)).to.be.true;

      done();

    });

    it('should call baseRequest with query parameters when a member ID is passed, overwriting member ID on client', done => {

      let client = new Client();
      client.memberId = 'memberIdFromClient';
      let options = { memberId: 'memberIdFromOptions' };
      let baseRequestStub = sinon.stub(client, 'baseRequest', () => {});
      let expectedRequestOpions = {
        method: 'GET',
        path: '/api/contests?memberId=memberIdFromOptions',
      };

      getContests.call(client, options, () => {});

      expect(baseRequestStub.calledWith(expectedRequestOpions)).to.be.true;

      done();

    });

  });

});
