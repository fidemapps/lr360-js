import trackAction from './track.action';
import setup from './setup';
import identifyMember from './identify.member';
import getMemberProfile from './member.profile';
import getDeviceProfile from './device.profile';
import getMemberChallenges from './challenges';
import getMemberChallengesDone from './challenges.done';
import getMemberChallengesTodo from './challenges.todo';
import getMenus from './menus';
import getPages from './pages';
import getNews from './news';
import getContests from './contests';
import { baseRequest } from './base.request';

export const clientMethods = {
  setup: setup,
  trackAction: trackAction,
  baseRequest: baseRequest,
  identifyMember: identifyMember,
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
