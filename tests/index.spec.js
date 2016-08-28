'use strict';

import { expect } from 'chai';
import sinon from 'sinon';
import Client from '../src/client/client';
import { client, emptyQueue, replaceQueuePush } from '../src/index';

describe('index.js', () => {

  // snippet ran by clients (excluding asynchronous script loading)
  function clientCodeSnippet() {
    let namespace = 'lr360';
    window[namespace] = window[namespace] || function () {
      (window[namespace].queue = window[namespace].queue || []).push(arguments);
    };
  }

  describe('script load', () => {

    it('should create a global lr360 variable and a queue', done => {

      expect(window.lr360).to.exist;
      expect(window.lr360.queue).to.exist;
      done();

    });

  });

  describe('script load (with client code snippet)', () => {

    it('should set global lr360 variable if lr360 does not exist', done => {

      delete window.lr360;
      expect(window.lr360).to.not.exist;

      clientCodeSnippet();

      expect(window.lr360).to.exist;
      expect(typeof window.lr360).to.equal('function');
      done();

    });

    it('should not change lr360 variable if lr360 already exist', done => {

      expect(window.lr360).to.exist;
      let lr360 = window.lr360;

      let namespace = 'lr360';
      window[namespace] = window[namespace] || 'value that should be ignored';

      expect(window.lr360).to.eql(lr360);
      done();

    });

    it('should add client calls to the queue array when script has not been loaded ' +
            'i.e. emptyQueue() and replaceQueuePush() have not been called', done => {

              delete window.lr360;
              expect(window.lr360).to.not.exist;

              clientCodeSnippet();

              window.lr360('setup', 'ACCESS-KEY');
              window.lr360('trackAction', { type: 'test' });

              let expectedQueueContent = [
                  { 0: 'setup', 1: 'ACCESS-KEY' },
                  { 0: 'trackAction', 1: { type: 'test' } },
              ];

              expect(window.lr360.queue).to.exist;
              expect(window.lr360.queue.length).to.equal(2);
              expect(JSON.stringify(window.lr360.queue)).to.equal(JSON.stringify(expectedQueueContent));

              done();

            });

  });

  describe('emptyQueue()', () => {

    let applySetupStub;
    let applyTrackActionStub;

    beforeEach(done => {

      applySetupStub = sinon.stub(Client.prototype.setup, 'apply', () => {
      });
      applyTrackActionStub = sinon.stub(Client.prototype.trackAction, 'apply', () => {
      });

      done();

    });

    afterEach(done => {

      applySetupStub.restore();
      applyTrackActionStub.restore();

      done();

    });

    it('read queue and empty it', done => {

      delete window.lr360;

      clientCodeSnippet();

      expect(window.lr360).to.exist;

      window.lr360('setup', { key: 'MOMO-ACCESSKEY' });
      window.lr360('trackAction', { type: 'testing' });

      emptyQueue();

      expect(window.lr360.queue).to.eql([]);

      done();

    });

    it('read queue and call setup and trackAction methods with correct parameters', done => {

      delete window.lr360;

      clientCodeSnippet();

      window.lr360('setup', { key: 'MOMO-ACCESSKEY' });
      window.lr360('trackAction', { type: 'testing' });

      emptyQueue();

      expect(applySetupStub.calledOnce).to.be.true;
      expect(applySetupStub.calledWith(client, [{ key: 'MOMO-ACCESSKEY' }])).to.be.true;

      expect(applyTrackActionStub.calledOnce).to.be.true;
      expect(applyTrackActionStub.calledWith(client, [{ type: 'testing' }])).to.be.true;

      done();

    });

    it('should do nothing if queue is empty', done => {

      expect(window.lr360.queue).to.eql([]);

      let queueShiftStub = sinon.stub(window.lr360.queue, 'shift');
      let arraySliceStub = sinon.stub(Array.prototype.slice, 'call');

      emptyQueue();

      expect(queueShiftStub.calledOnce).to.be.false;
      expect(arraySliceStub.calledOnce).to.be.false;

      queueShiftStub.restore();
      arraySliceStub.restore();

      done();

    });

  });

  describe('replaceQueuePush()', () => {

    beforeEach(done => {
      window.lr360.queue = [];
      done();
    });

    it('should replace the queue array by a function', done => {

      expect(window.lr360.queue).to.eql([]);

      replaceQueuePush();

      expect(window.lr360.queue).to.not.eql([]);

      done();

    });

    describe('queue.push() behavior after replaceQueuePush() has been called', () => {

      it('should call setup method on client when pushing data to lr360.queue', done => {

        replaceQueuePush();

        let applySetupStub = sinon.stub(Client.prototype.setup, 'apply', () => {
        });

        window.lr360('setup', { key: 'ACCESS-KEY' });

        expect(applySetupStub.calledWith(client, [{ key: 'ACCESS-KEY' }])).to.be.true;

        applySetupStub.restore();

        done();

      });

    });

  });

});
