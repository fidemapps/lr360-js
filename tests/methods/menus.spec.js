import { expect } from 'chai';
import sinon from 'sinon';
import Client from '../../src/client/client';
import getMenus from '../../src/methods/menus';

describe('menus.js', () => {

  describe('getMenus()', () => {

    it('should call baseRequest without query parameters when no ID is passed', done => {

      let client = new Client();
      let options = {};
      let baseRequestStub = sinon.stub(client, 'baseRequest', () => {});
      let expectedRequestOpions = {
        method: 'GET',
        path: '/api/content/menus',
      };

      getMenus.call(client, options);

      expect(baseRequestStub.calledWith(expectedRequestOpions)).to.be.true;

      done();

    });

    it('should call baseRequest without query parameters when no options are passed', done => {

      let client = new Client();
      let options = null;
      let baseRequestStub = sinon.stub(client, 'baseRequest', () => {});
      let expectedRequestOpions = {
        method: 'GET',
        path: '/api/content/menus',
      };

      getMenus.call(client, options);

      expect(baseRequestStub.calledWith(expectedRequestOpions)).to.be.true;

      done();

    });

    it('should call baseRequest with query parameters when a ID is passed', done => {

      let client = new Client();
      let options = { memberId: 1234 };
      let baseRequestStub = sinon.stub(client, 'baseRequest', () => {});
      let expectedRequestOpions = {
        method: 'GET',
        path: '/api/content/menus?member_id=1234',
      };

      getMenus.call(client, options);

      expect(baseRequestStub.calledWith(expectedRequestOpions)).to.be.true;

      done();

    });

  });

});
