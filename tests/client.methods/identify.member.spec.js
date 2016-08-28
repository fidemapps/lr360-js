'use strict';

import Client from '../../src/client/client';
import { expect } from 'chai';
import request from 'browser-request';
import identifyMember from '../../src/client.methods/identify.member.js';

describe('identify.member.js', () => {

  describe('identifyMember()', () => {

    const EXPECTED_ERROR_MESSAGE = 'You must provide either a member ID, an external ID or an email.';

    it('should call handleError when called with no parameters', done => {

      let client = new Client();
      let handleErrorStub = sinon.stub(client, 'handleError', () => {});

      identifyMember.call(client);

      expect(handleErrorStub.calledWith(EXPECTED_ERROR_MESSAGE)).to.be.true;

      done();

    });

    it('should call handleError when called with a parameter that has no member ID, external ID or email', done => {

      let client = new Client();
      let options = {};
      let handleErrorStub = sinon.stub(client, 'handleError', () => {});

      identifyMember.call(client, options);

      expect(handleErrorStub.calledWith(EXPECTED_ERROR_MESSAGE)).to.be.true;

      done();

    });

    it('should call baseRequest with given id in body', done => {

      let client = new Client();
      let baseRequestStub = sinon.stub(client, 'baseRequest', () => {});
      let expectedRequestOptions = {
        method: 'POST',
        path: '/api/gamification/actions/identify-member',
        body: {
          memberId: 1234,
        },
      };

      identifyMember.call(client, { memberId: 1234 });

      expect(baseRequestStub.calledWith(expectedRequestOptions)).to.be.true;
      done();

    });

    it('should call baseRequest with given email in body', done => {

      let client = new Client();
      let baseRequestStub = sinon.stub(client, 'baseRequest', () => {});
      let expectedRequestOptions = {
        method: 'POST',
        path: '/api/gamification/actions/identify-member',
        body: {
          email: 'test@test.com',
        },
      };

      identifyMember.call(client, { email: 'test@test.com' });

      expect(baseRequestStub.calledWith(expectedRequestOptions)).to.be.true;
      done();

    });

    it('should call baseRequest with given external_id in body', done => {

      let client = new Client();
      let baseRequestStub = sinon.stub(client, 'baseRequest', () => {});
      let expectedRequestOptions = {
        method: 'POST',
        path: '/api/gamification/actions/identify-member',
        body: {
          external_id: 'qwerty', // jscs:disable
          externalId: 'qwerty',
        },
      };

      identifyMember.call(client, { externalId: 'qwerty' });

      expect(baseRequestStub.calledWith(expectedRequestOptions)).to.be.true;
      done();

    });

    describe('callbackInterceptor()', () => {

      it('should set the memberId on the client after getting a successful response from server', done => {

        let client = new Client();
        client.memberId = null;
        sinon.stub(client, 'baseRequest', (request, callback) => {
          return callback(null, { body: { data: { id: 'returnedmemberid' } } });
        });

        identifyMember.call(client, { email: 'test@test.com' });

        expect(client.memberId).to.equal('returnedmemberid');

        done();

      });

    });

  });

});
