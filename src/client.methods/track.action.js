'use strict';

let assign = require('lodash.assign');
import Helper from '../helper/helper';

const METHOD = 'POST';
const PATH = '/api/gamification/actions';
const MISSING_TYPE_ERROR_MESSAGE = 'You must provide the type of action to be tracked.';
const WRONG_ARGUMENTS_ERROR_MESSAGE = 'You must provide the correct arguments to trackAction.';

export default function () {

  let args = Array.prototype.slice.call(arguments); // arguments to array
  let callback = typeof args[args.length - 1] === 'function' ? args[args.length - 1] : null;

  if (!expectedArguments(args)) {
    return this.handleError(WRONG_ARGUMENTS_ERROR_MESSAGE, callback);
  }

  let options = buildOptions(args);

  if (!Helper.hasRequiredProperties('type', options)) {
    return this.handleError(MISSING_TYPE_ERROR_MESSAGE, callback);
  }

  return this.baseRequest({
    method: METHOD,
    body: options,
    path: PATH,
  }, callback);

}

function expectedArguments(args) {

  return (args.length === 1 && typeof args[0] === 'string') ||
    (args.length === 1 && typeof args[0] === 'object') ||
    (args.length === 2 && typeof args[0] === 'string' && typeof args[1] === 'function') ||
    (args.length === 2 && typeof args[0] === 'object' && typeof args[1] === 'function') ||
    (args.length === 2 && typeof args[0] === 'string' && typeof args[1] === 'object') ||
    (args.length === 3 && typeof args[0] === 'string' && typeof args[1] === 'object' && typeof args[2] === 'function');

}

function buildOptions(args) {
  let options;

  switch (args.length) {

    case 1:
      options = fromOneArgument(args);
      break;

    case 2:

      if (typeof args[1] === 'function') {
        options = fromOneArgument(args);
      }  else {
        options = fromTwoArguments(args);
      }

      break;

    default:
      options = fromTwoArguments(args);
  }

  return options;
}

function fromOneArgument(args) {
  if (typeof args[0] === 'string') {
    return assign({}, { type: args[0] });
  } else {
    return args[0];
  }
}

function fromTwoArguments(args) {
  return assign({}, args[1], { type: args[0] });
}
