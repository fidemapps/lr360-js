'use strict';

import { expect } from 'chai';
import sinon from 'sinon';
import Client from '../../src/client/client';
import challengesDone from '../../src/client.methods/challenges.done.js';

describe('challenges.done.js', () => {

  describe('getMemberChallengesDone()', () => {

    const EXPECTED_ERROR_MESSAGE = 'You must provide a member ID.';
    const ERROR_MESSAGE_CALLBACK = 'You must provide a callback.';

    it('should call handleError when called with no parameters', done => {

      let client = new Client();
      let handleErrorStub = sinon.stub(client, 'handleError', () => {});

      challengesDone.call(client);

      expect(handleErrorStub.calledWith(ERROR_MESSAGE_CALLBACK)).to.be.true;

      done();

    });

    it('should call handleError when called with no callback', done => {

      let client = new Client();
      client.memberId = 'memberIdFromClient';
      let options = { memberId: 'memberIdFromOptions' };
      let handleErrorStub = sinon.stub(client, 'handleError', () => {});

      challengesDone.call(client, options);

      expect(handleErrorStub.calledWith(ERROR_MESSAGE_CALLBACK)).to.be.true;

      done();

    });

    it('should call handleError when no memberId is found in client and no options are passed', done => {

      let client = new Client();
      let handleErrorStub = sinon.stub(client, 'handleError', () => {});

      challengesDone.call(client, () => {});

      expect(handleErrorStub.calledWith(EXPECTED_ERROR_MESSAGE)).to.be.true;

      done();

    });

    it('should call handleError when no memberId is found in client and options passed is missing memberId property', done => {

      let client = new Client();
      let options = {};
      let handleErrorStub = sinon.stub(client, 'handleError', () => {});

      challengesDone.call(client, options, () => {});

      expect(handleErrorStub.calledWith(EXPECTED_ERROR_MESSAGE)).to.be.true;

      done();

    });

    it('should call baseRequest with memberId found in client and no options is passed', done => {

      let client = new Client();
      client.memberId = 'memberIdFromClient';
      let baseRequestStub = sinon.stub(client, 'baseRequest', () => {});

      challengesDone.call(client, () => {});

      expect(baseRequestStub.calledWith({
        method: 'GET',
        path: `/api/members/${client.memberId}/challenges/done`,
      })).to.be.true;

      done();

    });

    it('should call baseRequest with memberId found in options passed and no memberId is in client', done => {

      let client = new Client();
      let options = { memberId: 'memberIdFromOptions' };
      let baseRequestStub = sinon.stub(client, 'baseRequest', () => {});

      challengesDone.call(client, options, () => {});

      expect(baseRequestStub.calledWith({
        method: 'GET',
        path: `/api/members/${options.memberId}/challenges/done`,
      })).to.be.true;

      done();

    });

    it('should call baseRequest with memberId from options passed, overwriting memberId from client', done => {

      let client = new Client();
      client.memberId = 'memberIdFromClient';
      let options = { memberId: 'memberIdFromOptions' };
      let baseRequestStub = sinon.stub(client, 'baseRequest', () => {});

      challengesDone.call(client, options, () => {});

      expect(baseRequestStub.calledWith({
        method: 'GET',
        path: `/api/members/${options.memberId}/challenges/done`,
      })).to.be.true;

      done();

    });

  });

});
