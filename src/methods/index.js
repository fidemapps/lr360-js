import { trackAction } from './track.action';
import { baseRequest as request } from './base.request';

export const clientMethods = {
    trackAction: trackAction,
    request: request
};