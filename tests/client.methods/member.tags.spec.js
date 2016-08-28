'use strict';

import { expect } from 'chai';
import sinon from 'sinon';
import Client from '../../src/client/client';
import getMemberTags from '../../src/client.methods/member.tags';

describe('member.tags.js', () => {

  describe('getMemberTags()', () => {

    const EXPECTED_ERROR_MESSAGE = 'You must provide a member ID.';
    const ERROR_MESSAGE_CALLBACK = 'You must provide a callback.';

    it('should call handleError when called with no parameters', done => {

      let client = new Client();
      let handleErrorStub = sinon.stub(client, 'handleError', () => {});

      getMemberTags.call(client);

      expect(handleErrorStub.calledWith(ERROR_MESSAGE_CALLBACK)).to.be.true;

      done();

    });

    it('should call handleError when called with no callback', done => {

      let client = new Client();
      client.memberId = 'memberIdFromClient';
      let options = { memberId: 'memberIdFromOptions' };
      let handleErrorStub = sinon.stub(client, 'handleError', () => {});

      getMemberTags.call(client, options);

      expect(handleErrorStub.calledWith(ERROR_MESSAGE_CALLBACK)).to.be.true;

      done();

    });

    it('should call handleError when no memberId is found in client and no options are passed', done => {

      let client = new Client();
      let handleErrorStub = sinon.stub(client, 'handleError', () => {});

      getMemberTags.call(client, () => {});

      expect(handleErrorStub.calledWith(EXPECTED_ERROR_MESSAGE)).to.be.true;

      done();

    });

    it('should call handleError when no memberId is found in client and options passed is missing memberId property', done => {

      let client = new Client();
      let options = {};
      let handleErrorStub = sinon.stub(client, 'handleError', () => {});

      getMemberTags.call(client, options, () => {});

      expect(handleErrorStub.calledWith(EXPECTED_ERROR_MESSAGE)).to.be.true;

      done();

    });

    it('should call baseRequest with memberId found in client and no options is passed', done => {

      let client = new Client();
      client.memberId = 'memberIdFromClient';
      let baseRequestStub = sinon.stub(client, 'baseRequest', () => {});

      getMemberTags.call(client, () => {});

      expect(baseRequestStub.calledWith({
        method: 'GET',
        path: `/api/members/${client.memberId}/tags`,
      })).to.be.true;

      done();

    });

    it('should call baseRequest with memberId found in options passed and no memberId is in client', done => {

      let client = new Client();
      let options = { memberId: 'memberIdFromOptions' };
      let baseRequestStub = sinon.stub(client, 'baseRequest', () => {});

      getMemberTags.call(client, options, () => {});

      expect(baseRequestStub.calledWith({
        method: 'GET',
        path: `/api/members/${options.memberId}/tags`,
      })).to.be.true;

      done();

    });

    it('should call baseRequest with memberId from options passed, overwriting memberId from client', done => {

      let client = new Client();
      client.memberId = 'memberIdFromClient';
      let options = { memberId: 'memberIdFromOptions' };
      let baseRequestStub = sinon.stub(client, 'baseRequest', () => {});

      getMemberTags.call(client, options, () => {});

      expect(baseRequestStub.calledWith({
        method: 'GET',
        path: `/api/members/${options.memberId}/tags`,
      })).to.be.true;

      done();

    });

    it('should call baseRequest with memberId found in client and no options is passed with tag cluster code', done => {

      let client = new Client();
      client.memberId = 'memberIdFromClient';
      let baseRequestStub = sinon.stub(client, 'baseRequest', () => {});
      let options = {
        tagClusterCode: 'CLUSTER',
      };

      getMemberTags.call(client, options, () => {});

      expect(baseRequestStub.calledWith({
        method: 'GET',
        path: `/api/members/${client.memberId}/tags/CLUSTER`,
      })).to.be.true;

      done();

    });

    it('should call baseRequest with memberId found in client and no options is passed with tag cluster code and tag code', done => {

      let client = new Client();
      client.memberId = 'memberIdFromClient';
      let baseRequestStub = sinon.stub(client, 'baseRequest', () => {});
      let options = {
        tagClusterCode: 'CLUSTER',
        tagCode: 'TAG',
      };

      getMemberTags.call(client, options, () => {});

      expect(baseRequestStub.calledWith({
        method: 'GET',
        path: `/api/members/${client.memberId}/tags/CLUSTER/TAG`,
      })).to.be.true;

      done();

    });

    it('should call baseRequest with memberId found in client and no options is passed with tag code only', done => {

      let client = new Client();
      client.memberId = 'memberIdFromClient';
      let baseRequestStub = sinon.stub(client, 'baseRequest', () => {});
      let options = {
        tagCode: 'TAG',
      };

      getMemberTags.call(client, options, () => {});

      expect(baseRequestStub.calledWith({
        method: 'GET',
        path: `/api/members/${client.memberId}/tags`,
      })).to.be.true;

      done();

    });

  });

});
