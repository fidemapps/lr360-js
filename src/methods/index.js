import trackAction from './track.action';
import setup from './setup';
import { baseRequest } from './base.request';

export const clientMethods = {
    setup: setup,
    trackAction: trackAction,
    baseRequest: baseRequest
};