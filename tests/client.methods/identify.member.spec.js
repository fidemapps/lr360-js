import Client from '../../src/client/client';
import { expect } from 'chai';
import request from 'browser-request';
import identifyMember from '../../src/client.methods/identify.member.js';

describe('identify.member.js', () => {

  describe('identifyMember()', () => {

    it('should call baseRequest with given id in body', done => {

      let client = new Client();
      let baseRequestStub = sinon.stub(client, 'baseRequest', () => {});
      let expectedRequestOptions = {
        method: 'POST',
        path: '/api/gamification/actions/identify-member',
        body: {
          member_id: 1234, // jscs:disable
        },
      };

      identifyMember.call(client, { member_id: 1234 });

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
        },
      };

      identifyMember.call(client, { external_id: 'qwerty' });

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
