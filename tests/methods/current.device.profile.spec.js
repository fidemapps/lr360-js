import { expect } from 'chai';
import sinon from 'sinon';
import Client from '../../src/client/client';
import currentDeviceProfile from '../../src/methods/current.device.profile';

describe('current.device.profile.js', () => {

    describe('currentDeviceProfile()', () => {

        it('should call baseRequest with expected values', done => {

            let client = new Client();
            let baseRequestStub = sinon.stub(client, 'baseRequest', () => {});
            let expectedRequestOpions = {
                method: 'GET',
                path: '/api/device/me'
            };

            currentDeviceProfile.call(client);

            expect(baseRequestStub.calledWith(expectedRequestOpions)).to.be.true;

            done();

        });

    });

});
