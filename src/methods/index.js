import trackAction from './track.action';
import setup from './setup';
import { baseRequest as request } from './base.request';

export const clientMethods = {
    setup: setup,
    trackAction: trackAction,
    request: request
};