import trackAction from './track.action';
import setup from './setup';
import identifyMember from './identify.member';
import getMemberProfile from './member.profile';
import getDeviceProfile from './device.profile';
import getCurrentDeviceProfile from './current.device.profile';
import { baseRequest } from './base.request';

export const clientMethods = {
    setup: setup,
    trackAction: trackAction,
    baseRequest: baseRequest,
    identifyMember: identifyMember,
    getMemberProfile: getMemberProfile,
    getDeviceProfile: getDeviceProfile,
    getCurrentDeviceProfile: getCurrentDeviceProfile
};
