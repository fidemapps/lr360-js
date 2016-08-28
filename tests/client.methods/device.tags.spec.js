'use strict';

import { expect } from 'chai';
import sinon from 'sinon';
import Client from '../../src/client/client';
import getDeviceTags from '../../src/client.methods/device.tags';

describe('device.tags.js', () => {

  describe('getDeviceTags()', () => {

    const EXPECTED_ERROR_MESSAGE = 'You must provide a device ID.';
    const ERROR_MESSAGE_CALLBACK = 'You must provide a callback.';

    it('should call handleError when called with no parameters', done => {

      let client = new Client();
      let handleErrorStub = sinon.stub(client, 'handleError', () => {});

      getDeviceTags.call(client);

      expect(handleErrorStub.calledWith(ERROR_MESSAGE_CALLBACK)).to.be.true;

      done();

    });

    it('should call handleError when called with no callback', done => {

      let client = new Client();
      client.deviceId = 'deviceIdFromClient';
      let options = { deviceId: 'deviceIdFromOptions' };
      let handleErrorStub = sinon.stub(client, 'handleError', () => {});

      getDeviceTags.call(client, options);

      expect(handleErrorStub.calledWith(ERROR_MESSAGE_CALLBACK)).to.be.true;

      done();

    });

    it('should call handleError when no options are passed', done => {

      let client = new Client();
      let handleErrorStub = sinon.stub(client, 'handleError', () => {});

      getDeviceTags.call(client, () => {});

      expect(handleErrorStub.calledWith(ERROR_MESSAGE_CALLBACK)).to.be.true;

      done();

    });

    it('should call handleError when options passed is missing deviceId property', done => {

      let client = new Client();
      let options = {};
      let handleErrorStub = sinon.stub(client, 'handleError', () => {});

      getDeviceTags.call(client, options, () => {});

      expect(handleErrorStub.calledWith(EXPECTED_ERROR_MESSAGE)).to.be.true;

      done();

    });

    it('should call baseRequest with deviceId from options passed', done => {

      let client = new Client();
      let options = { deviceId: 'deviceIdFromOptions' };
      let baseRequestStub = sinon.stub(client, 'baseRequest', () => {});

      getDeviceTags.call(client, options, () => {});

      expect(baseRequestStub.calledWith({
        method: 'GET',
        path: `/api/devices/${options.deviceId}/tags`,
      })).to.be.true;

      done();

    });

    it('should call baseRequest with deviceId found in options with tag cluster code', done => {

      let client = new Client();
      let baseRequestStub = sinon.stub(client, 'baseRequest', () => {});
      let options = {
        deviceId: 'deviceIdFromOptions',
        tagClusterCode: 'CLUSTER',
      };

      getDeviceTags.call(client, options, () => {});

      expect(baseRequestStub.calledWith({
        method: 'GET',
        path: `/api/devices/${options.deviceId}/tags/CLUSTER`,
      })).to.be.true;

      done();

    });

    it('should call baseRequest with deviceId found in options with tag cluster code and tag code', done => {

      let client = new Client();
      let baseRequestStub = sinon.stub(client, 'baseRequest', () => {});
      let options = {
        deviceId: 'deviceIdFromOptions',
        tagClusterCode: 'CLUSTER',
        tagCode: 'TAG',
      };

      getDeviceTags.call(client, options, () => {});

      expect(baseRequestStub.calledWith({
        method: 'GET',
        path: `/api/devices/${options.deviceId}/tags/CLUSTER/TAG`,
      })).to.be.true;

      done();

    });

    it('should call baseRequest with deviceId found in options with tag code only', done => {

      let client = new Client();
      let baseRequestStub = sinon.stub(client, 'baseRequest', () => {});
      let options = {
        deviceId: 'deviceIdFromOptions',
        tagCode: 'TAG',
      };

      getDeviceTags.call(client, options, () => {});

      expect(baseRequestStub.calledWith({
        method: 'GET',
        path: `/api/devices/${options.deviceId}/tags`,
      })).to.be.true;

      done();

    });

  });

});
