import Client from '../../src/client/client';
import { expect } from 'chai';
import request from 'browser-request';
import identifyMember from '../../src/methods/identify.member';

describe('identify.member.js', () => {

  describe('identifyMember()', () => {

    const EXPECTED_ERROR_MESSAGE = 'You must provide either a member ID, an external ID or an email.';

    it('should throw an error when options given doesn\'t have either an id, email or external_email field', done => {

      try {
        identifyMember({});
      }
      catch (error) {

        expect(error).to.exist;
        expect(error.message).to.equal(EXPECTED_ERROR_MESSAGE);
        done();

      }

    });

    it('should throw an error when options given is null', done => {

      try {
        identifyMember();
      }
      catch (error) {

        expect(error).to.exist;
        expect(error.message).to.equal(EXPECTED_ERROR_MESSAGE);
        done();

      }

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

    describe('callback(error, data)', () => {

      it('should return error to callback when no options parameter is given', done => {

        let client = new Client();
        let options = null;

        identifyMember.call(client, options, (error, data) => {

          expect(error).to.exist;
          expect(data).to.not.exist;
          expect(error.message).to.equal(EXPECTED_ERROR_MESSAGE);

          done();

        });

      });

      it('should return error to callback when options given doesn\'t have either id, email or external_id properties', done => {

        let client = new Client();
        let options = {};

        identifyMember.call(client, options, (error, data) => {

          expect(error).to.exist;
          expect(data).to.not.exist;
          expect(error.message).to.equal(EXPECTED_ERROR_MESSAGE);

          done();

        });

      });

    });

  });

});
