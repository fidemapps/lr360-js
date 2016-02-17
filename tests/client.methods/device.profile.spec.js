import { expect } from 'chai';
import sinon from 'sinon';
import Client from '../../src/client/client';
import deviceProfile from '../../src/client.methods/device.profile.js';

describe('device.profile.js', () => {

  describe('deviceProfile()', () => {

    const ERROR_MESSAGE_CALLBACK = 'You must provide a callback.';

    it('should call handleError when no callback is passed', done => {

      let client = new Client();
      let handleErrorStub = sinon.stub(client, 'handleError', () => {});

      deviceProfile.call(client);

      expect(handleErrorStub.calledWith(ERROR_MESSAGE_CALLBACK)).to.be.true;

      done();

    });

    it('should call baseRequest with deviceId given', done => {

      let client = new Client();
      let baseRequestStub = sinon.stub(client, 'baseRequest', () => {});
      let options = { deviceId: 'deviceIdFromOptions' };

      deviceProfile.call(client, options, () => {});

      expect(baseRequestStub.calledWith({
        method: 'GET',
        path: `/api/devices/${options.deviceId}`,
      })).to.be.true;

      done();

    });

    it('should call baseRequest with me when no deviceId is given', done => {

      let client = new Client();
      let baseRequestStub = sinon.stub(client, 'baseRequest', () => {});
      let options = {};

      deviceProfile.call(client, options, () => {});

      expect(baseRequestStub.calledWith({
        method: 'GET',
        path: `/api/device/me`,
      })).to.be.true;

      done();

    });

    it('should call handleError when arguments passed are in wrong order', done => {

      let client = new Client();
      let handleErrorStub = sinon.stub(client, 'handleError', () => {});

      deviceProfile.call(client, () => {}, 'wrong argument order');

      expect(handleErrorStub.calledWith(ERROR_MESSAGE_CALLBACK)).to.be.true;

      done();

    });

  });

});
