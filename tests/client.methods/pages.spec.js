import { expect } from 'chai';
import sinon from 'sinon';
import Client from '../../src/client/client';
import getPages from '../../src/client.methods/pages';

describe('pages.js', () => {

  describe('getPages()', () => {

    const EXPECTED_ERROR_MESSAGE = 'You must provide a page ID.';
    const ERROR_MESSAGE_CALLBACK = 'You must provide a callback.';

    it('should call handleError when called with no parameters', done => {

      let client = new Client();
      let handleErrorStub = sinon.stub(client, 'handleError', () => {});

      getPages.call(client);

      expect(handleErrorStub.calledWith(ERROR_MESSAGE_CALLBACK)).to.be.true;

      done();

    });

    it('should call handleError when called with no callback', done => {

      let client = new Client();
      let options = { pageId: '1234' };
      let handleErrorStub = sinon.stub(client, 'handleError', () => {});

      getPages.call(client, options);

      expect(handleErrorStub.calledWith(ERROR_MESSAGE_CALLBACK)).to.be.true;

      done();

    });

    it('should call handleError when no page ID is passed', done => {

      let client = new Client();
      let options = {};
      let handleErrorStub = sinon.stub(client, 'handleError', () => {});

      getPages.call(client, options, () => {});

      expect(handleErrorStub.calledWith(EXPECTED_ERROR_MESSAGE)).to.be.true;

      done();

    });

    it('should call baseRequest without request parameters when no memberId is passed', done => {

      let client = new Client();
      let baseRequestStub = sinon.stub(client, 'baseRequest', () => {});
      let expectedRequestOpions = {
        method: 'GET',
        path: '/api/content/pages/1234',
      };

      getPages.call(client, { pageId: 1234 }, () => {});

      expect(baseRequestStub.calledWith(expectedRequestOpions)).to.be.true;

      done();

    });

    it('should call baseRequest with request parameters when memberId is passed', done => {

      let client = new Client();
      let baseRequestStub = sinon.stub(client, 'baseRequest', () => {});
      let expectedRequestOpions = {
        method: 'GET',
        path: '/api/content/pages/1234?memberId=9876',
      };

      getPages.call(client, { pageId: 1234, memberId: 9876 }, () => {});

      expect(baseRequestStub.calledWith(expectedRequestOpions)).to.be.true;

      done();

    });

    it('should call baseRequest with request parameters when memberId is found on client', done => {

      let client = new Client();
      client.memberId = 9876;
      let baseRequestStub = sinon.stub(client, 'baseRequest', () => {});
      let expectedRequestOpions = {
        method: 'GET',
        path: '/api/content/pages/1234?memberId=9876',
      };

      getPages.call(client, { pageId: 1234 }, () => {});

      expect(baseRequestStub.calledWith(expectedRequestOpions)).to.be.true;

      done();

    });

  });

});
