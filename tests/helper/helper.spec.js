import { expect } from 'chai';
import Helper from '../../src/helper/helper';

describe('helper.js', () => {

  describe('getCallback()', () => {

    it('should return null when called with no arguents', done => {
      let callback = Helper.getCallback();
      expect(callback).to.be.null;
      done();
    });

    it('should return null when no callback is found', done => {
      let callback = Helper.getCallback(['something', () => {}, 'something else']);
      expect(callback).to.be.null;
      done();
    });

    it('should return callback', done => {
      let sentCallback = () => {};
      let returnedCallback = Helper.getCallback(['something', sentCallback]);
      expect(returnedCallback).to.eql(sentCallback);
      done();
    });

  });

  describe('hasRequiredProperties()', () => {

    it('should return false when required property is not found', done => {
      let found = Helper.hasRequiredProperties('notfound', { id: 'id' });
      expect(found).to.be.false;
      done();
    });

    it('should return false when one of required properties is not found', done => {
      let found = Helper.hasRequiredProperties(['id', 'notfound'], { id: 'id' });
      expect(found).to.be.false;
      done();
    });

    it('should return true if one required property (string) is found', done => {
      let found = Helper.hasRequiredProperties('id', { id: 'id' });
      expect(found).to.be.true;
      done();
    });

    it('should return true if one required property (array) is found', done => {
      let found = Helper.hasRequiredProperties(['id'], { id: 'id' });
      expect(found).to.be.true;
      done();
    });

    it('should return true if allrequired properties are found', done => {
      let found = Helper.hasRequiredProperties(['id', 'notfound'], { id: 'id', notfound: 'found' });
      expect(found).to.be.true;
      done();
    });

  });

  describe('hasOneOfRequiredProperties()', () => {

    it('should return false when no properties are found', done => {
      let found = Helper.hasOneOfRequiredProperties(['id', 'notfound'], { test: 'test' });
      expect(found).to.be.false;
      done();
    });

    it('should return true when one of the properties is found', done => {
      let found = Helper.hasOneOfRequiredProperties(['id', 'notfound'], { test: 'test', id: 'id' });
      expect(found).to.be.true;
      done();
    });

  });

  describe('getMemberId()', () => {

    it('should return null when no memberId is found', done => {
      let memberId = Helper.getMemberId();
      expect(memberId).to.be.null;
      done();
    });

    it('should return null when args[0] is not an object', done => {
      let memberId = Helper.getMemberId(['wrong type']);
      expect(memberId).to.be.null;
      done();
    });

    it('should return memberId when memberId is found on client', done => {
      let client = { memberId: 'idFromClient' };
      let memberId = Helper.getMemberId.call(client);
      expect(memberId).to.equal(client.memberId);
      done();
    });

    it('should return memberId when memberId is found on args', done => {
      let client = {};
      let memberId = Helper.getMemberId.call(client, [{ memberId: 'idFromArgs' }]);
      expect(memberId).to.equal('idFromArgs');
      done();
    });

    it('should return memberId from args when memberId is found on both client and args', done => {
      let client = { memberId: 'idFromClient' };
      let memberId = Helper.getMemberId.call(client, [{ memberId: 'idFromArgs' }]);
      expect(memberId).to.equal('idFromArgs');
      done();
    });

  });

  describe('getDeviceId()', () => {

    it('should return me when no deviceId is found', done => {
      let deviceId = Helper.getDeviceId();
      expect(deviceId).to.equal('me');
      done();
    });

    it('should return null when args[0] is not an object', done => {
      let deviceId = Helper.getDeviceId(['wrong type']);
      expect(deviceId).to.equal('me');
      done();
    });

    it('should return memberId when memberId is found on args', done => {
      let deviceId = Helper.getDeviceId([{ deviceId: 'idFromArgs' }]);
      expect(deviceId).to.equal('idFromArgs');
      done();
    });

  });

  describe('getQueryParams()', () => {

    it('should return an empty string when called with no params', done => {
      let qs = Helper.getQueryParams();
      expect(qs).to.equal('');
      done();
    });

    it('should return an empty string when called with a param of wrong type', done => {
      let qs = Helper.getQueryParams({});
      expect(qs).to.equal('');
      done();
    });

    it('should return a valid query string with member_id property (string)', done => {
      let qs = Helper.getQueryParams('testid');
      expect(qs).to.equal('?member_id=testid');
      done();
    });

    it('should return a valid query string with member_id property (number)', done => {
      let qs = Helper.getQueryParams(1234);
      expect(qs).to.equal('?member_id=1234');
      done();
    });

  });

});
