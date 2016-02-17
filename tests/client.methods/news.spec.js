import { expect } from 'chai';
import sinon from 'sinon';
import Client from '../../src/client/client';
import getNews from '../../src/client.methods/news';

describe('news.js', () => {

  describe('getNews()', () => {

    const EXPECTED_ERROR_MESSAGE = 'You must provide a news list ID.';
    const ERROR_MESSAGE_CALLBACK = 'You must provide a callback.';

    it('should call handleError when called with no parameters', done => {

      let client = new Client();
      let handleErrorStub = sinon.stub(client, 'handleError', () => {});

      getNews.call(client);

      expect(handleErrorStub.calledWith(ERROR_MESSAGE_CALLBACK)).to.be.true;

      done();

    });

    it('should call handleError when called with no callback', done => {

      let client = new Client();
      let options = { newsListId: '1234' };
      let handleErrorStub = sinon.stub(client, 'handleError', () => {});

      getNews.call(client, options);

      expect(handleErrorStub.calledWith(ERROR_MESSAGE_CALLBACK)).to.be.true;

      done();

    });

    it('should call handleError when no news list ID is passed', done => {

      let client = new Client();
      let options = {};
      let handleErrorStub = sinon.stub(client, 'handleError', () => {});

      getNews.call(client, options, () => {});

      expect(handleErrorStub.calledWith(EXPECTED_ERROR_MESSAGE)).to.be.true;

      done();

    });

    it('should call baseRequest without request parameters when no memberId is passed', done => {

      let client = new Client();
      let baseRequestStub = sinon.stub(client, 'baseRequest', () => {});
      let expectedRequestOpions = {
        method: 'GET',
        path: '/api/content/newslists/1234',
      };

      getNews.call(client, { newsListId: 1234 }, () => {});

      expect(baseRequestStub.calledWith(expectedRequestOpions)).to.be.true;

      done();

    });

    it('should call baseRequest with request parameters when memberId is passed', done => {

      let client = new Client();
      let baseRequestStub = sinon.stub(client, 'baseRequest', () => {});
      let expectedRequestOpions = {
        method: 'GET',
        path: '/api/content/newslists/1234?memberId=9876',
      };

      getNews.call(client, { newsListId: 1234, memberId: 9876 }, () => {});

      expect(baseRequestStub.calledWith(expectedRequestOpions)).to.be.true;

      done();

    });

    it('should call baseRequest with request parameters when memberId is found on client', done => {

      let client = new Client();
      client.memberId = 9876;
      let baseRequestStub = sinon.stub(client, 'baseRequest', () => {});
      let expectedRequestOpions = {
        method: 'GET',
        path: '/api/content/newslists/1234?memberId=9876',
      };

      getNews.call(client, { newsListId: 1234 }, () => {});

      expect(baseRequestStub.calledWith(expectedRequestOpions)).to.be.true;

      done();

    });

    it('should call baseRequest with query parameters when a member ID is passed, overwriting member ID on client', done => {

      let client = new Client();
      client.memberId = 'memberIdFromClient';
      let options = { memberId: 'memberIdFromOptions', newsListId: 1234 };
      let baseRequestStub = sinon.stub(client, 'baseRequest', () => {});
      let expectedRequestOpions = {
        method: 'GET',
        path: '/api/content/newslists/1234?memberId=memberIdFromOptions',
      };

      getNews.call(client, options, () => {});

      expect(baseRequestStub.calledWith(expectedRequestOpions)).to.be.true;

      done();

    });

  });

});
