import { expect } from 'chai';
import sinon from 'sinon';
import Client from '../../src/client/client';
import getContests from '../../src/methods/contests';

describe('contests.js', () => {

  describe('getContests()', () => {

    it('should call baseRequest without request parameters when no memberId is passed', done => {

      let client = new Client();
      let baseRequestStub = sinon.stub(client, 'baseRequest', () => {});
      let expectedRequestOpions = {
        method: 'GET',
        path: '/api/contests',
      };

      getContests.call(client, {});

      expect(baseRequestStub.calledWith(expectedRequestOpions)).to.be.true;

      done();

    });

    it('should call baseRequest with request parameters when memberId is passed', done => {

      let client = new Client();
      let baseRequestStub = sinon.stub(client, 'baseRequest', () => {});
      let expectedRequestOpions = {
        method: 'GET',
        path: '/api/contests?member_id=9876',
      };

      getContests.call(client, { memberId: 9876 });

      expect(baseRequestStub.calledWith(expectedRequestOpions)).to.be.true;

      done();

    });

  });

});
