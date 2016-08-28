'use strict';

import { expect } from 'chai';
import sinon from 'sinon';
import Client from '../../src/client/client';
import memberProfile from '../../src/client.methods/member.profile.js';

describe('member.profile.js', () => {

  describe('memberProfile()', () => {

    const ERROR_MESSAGE = 'You must provide a member ID.';
    const ERROR_MESSAGE_CALLBACK = 'You must provide a callback.';

    it('should call handleError if no parameters are passed', done => {

      let client = new Client();
      let errorHandlerStub = sinon.stub(client, 'handleError', () => {});

      memberProfile.call(client);

      expect(errorHandlerStub.calledWith(ERROR_MESSAGE_CALLBACK)).to.be.true;

      done();

    });

    it('should call handleError if no callback is passed', done => {

      let client = new Client();
      let options = {};
      let errorHandlerStub = sinon.stub(client, 'handleError', () => {});

      memberProfile.call(client, options);

      expect(errorHandlerStub.calledWith(ERROR_MESSAGE_CALLBACK)).to.be.true;

      done();

    });

    it('should call handleError if parameters are passed in wrong order', done => {

      let client = new Client();
      let options = { email: 'test@test.com' };
      let errorHandlerStub = sinon.stub(client, 'handleError', () => {});

      memberProfile.call(client, () => {}, options);

      expect(errorHandlerStub.calledWith(ERROR_MESSAGE_CALLBACK)).to.be.true;

      done();

    });

    it('should call handleError when no options are passed and no memberId is found in client', done => {

      let client = new Client();
      let callback = () => {}; // jscs:disable
      let errorHandlerStub = sinon.stub(client, 'handleError', () => {});

      memberProfile.call(client, callback);

      expect(errorHandlerStub.calledWith(ERROR_MESSAGE, callback)).to.be.true;

      done();

    });

    it('should call baseRequest with memberId from client (no options passed)', done => {

      let client = new Client();
      client.memberId = 'memberIdFromClient';
      let baseRequestStub = sinon.stub(client, 'baseRequest', () => {});

      memberProfile.call(client, () => {});

      expect(baseRequestStub.calledWith({
        method: 'GET',
        path: `/api/members/${client.memberId}`,
      })).to.be.true;

      done();

    });

    it('should call baseRequest with memberId from options (no client memberId set)', done => {

      let client = new Client();
      let options = { memberId: 'memberIdFromOptions' };
      let baseRequestStub = sinon.stub(client, 'baseRequest', () => {});

      memberProfile.call(client, options, () => {});

      expect(baseRequestStub.calledWith({
        method: 'GET',
        path: `/api/members/${options.memberId}`,
      })).to.be.true;

      done();

    });

    it('should call baseRequest with memberId from options (overwriting memberId on client)', done => {

      let client = new Client();
      client.memberId = 'memberIdFromClient';
      let options = { memberId: 'memberIdFromOptions' };
      let baseRequestStub = sinon.stub(client, 'baseRequest', () => {});

      memberProfile.call(client, options, () => {});

      expect(baseRequestStub.calledWith({
        method: 'GET',
        path: `/api/members/${options.memberId}`,
      })).to.be.true;

      done();

    });

  });

});
