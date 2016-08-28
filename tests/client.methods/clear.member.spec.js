'use strict';

import { expect } from 'chai';
import sinon from 'sinon';
import Client from '../../src/client/client';
import clearMember from '../../src/client.methods/clear.member.js';

describe('clear.member.js', () => {

  describe('clearMember()', () => {

    it('should call baseRequest with passed callback', done => {

      let client = new Client();
      client.memberId = 'testmemberid';
      let baseRequestStub = sinon.stub(client, 'baseRequest', (options, callback) => callback());
      let expectedRequestOpions = {
        method: 'DELETE',
        path: '/api/gamification/actions/identify-member',
      };
      let callback = () => {};

      clearMember.call(client, callback);

      expect(baseRequestStub.calledWith(expectedRequestOpions)).to.be.true;
      expect(client.memberId).to.not.exist;

      done();

    });

  });

});
