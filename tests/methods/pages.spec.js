import { expect } from 'chai';
import sinon from 'sinon';
import Client from '../../src/client/client';
import getPages from '../../src/methods/pages';

describe('pages.js', () => {

  describe('getPages()', () => {

    const EXPECTED_ERROR_MESSAGE = 'You must provide a page ID.';

    it('should throw an error when no options and callback are given', done => {

      try {
        getPages();
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
        getPages(options);
      }
      catch (error) {

        expect(error).to.exist;
        expect(error.message).to.equal(EXPECTED_ERROR_MESSAGE);
        done();

      }

    });

    it('should call baseRequest without request parameters when no memberId is passed', done => {

      let client = new Client();
      let baseRequestStub = sinon.stub(client, 'baseRequest', () => {});
      let expectedRequestOpions = {
        method: 'GET',
        path: '/api/content/pages/1234',
      };

      getPages.call(client, { pageId: 1234 });

      expect(baseRequestStub.calledWith(expectedRequestOpions)).to.be.true;

      done();

    });

    it('should call baseRequest with request parameters when memberId is passed', done => {

      let client = new Client();
      let baseRequestStub = sinon.stub(client, 'baseRequest', () => {});
      let expectedRequestOpions = {
        method: 'GET',
        path: '/api/content/pages/1234?member_id=9876',
      };

      getPages.call(client, { pageId: 1234, memberId: 9876 });

      expect(baseRequestStub.calledWith(expectedRequestOpions)).to.be.true;

      done();

    });

    describe('callback(error, data)', () => {

      it('should send an error to callback when no options are given', done => {

        let options = null;
        getPages(options, (error, data) => {

          expect(error).to.exist;
          expect(data).to.not.exist;
          expect(error.message).to.equal(EXPECTED_ERROR_MESSAGE);

          done();

        });

      });

      it('should send an error to callback when options parameter doesn\'t have required property', done => {

        let options = {};
        getPages(options, (error, data) => {

          expect(error).to.exist;
          expect(data).to.not.exist;
          expect(error.message).to.equal(EXPECTED_ERROR_MESSAGE);

          done();

        });

      });

    });

  });

});
