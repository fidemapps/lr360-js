import trackAction from './track.action.js';
import setup from './setup';
import identifyMember from './identify.member.js';
import clearMember from './clear.member.js';
import getMemberProfile from './member.profile.js';
import getDeviceProfile from './device.profile.js';
import getMemberChallenges from './challenges';
import getMemberChallengesDone from './challenges.done.js';
import getMemberChallengesTodo from './challenges.todo.js';
import getMenus from './menus';
import getPages from './pages';
import getNews from './news';
import getContests from './contests';
import { baseRequest } from '../request/base.request.js';

export const clientMethods = {
  setup: setup,
  trackAction: trackAction,
  baseRequest: baseRequest,
  identifyMember: identifyMember,
  clearMember: clearMember,
  getMemberProfile: getMemberProfile,
  getDeviceProfile: getDeviceProfile,
  getMemberChallenges: getMemberChallenges,
  getMemberChallengesDone: getMemberChallengesDone,
  getMemberChallengesTodo: getMemberChallengesTodo,
  getMenus: getMenus,
  getPages: getPages,
  getNews: getNews,
  getContests: getContests,
};
