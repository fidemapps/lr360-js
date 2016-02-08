import { expect } from 'chai';
import sinon from 'sinon';
import Client from '../../src/client/client';
import challengesTodo from '../../src/methods/challenges.todo';

describe('challenges.done.js', () => {

  describe('getMemberChallengesTodo()', () => {

    const EXPECTED_ERROR_MESSAGE = 'You must provide a member ID.';

    it('should throw an error when no options and callback are given', done => {

      try {
        challengesTodo();
      }
      catch (error) {

        expect(error).to.exist;
        expect(error.message).to.equal(EXPECTED_ERROR_MESSAGE);
        done();

      }

    });

    it('should throw an error when options parameter doesn\'t have required property and callback is not given', done => {

      try {
        let options = {};
        challengesTodo(options);
      }
      catch (error) {

        expect(error).to.exist;
        expect(error.message).to.equal(EXPECTED_ERROR_MESSAGE);
        done();

      }

    });

    it('should call baseRequest with expected values', done => {

      let client = new Client();
      let baseRequestStub = sinon.stub(client, 'baseRequest', () => {});
      let expectedRequestOpions = {
        method: 'GET',
        path: '/api/members/1234/challenges/todo',
      };

      challengesTodo.call(client, { memberId: 1234 });

      expect(baseRequestStub.calledWith(expectedRequestOpions)).to.be.true;

      done();

    });

    describe('callback(error, data)', () => {

      it('should send an error to callback when no options are given', done => {

        let options = null;
        challengesTodo(options, (error, data) => {

          expect(error).to.exist;
          expect(data).to.not.exist;
          expect(error.message).to.equal(EXPECTED_ERROR_MESSAGE);

          done();

        });

      });

      it('should send an error to callback when options parameter doesn\'t have required property', done => {

        let options = {};
        challengesTodo(options, (error, data) => {

          expect(error).to.exist;
          expect(data).to.not.exist;
          expect(error.message).to.equal(EXPECTED_ERROR_MESSAGE);

          done();

        });

      });

    });

  });

});
