const METHOD = 'POST';
const PATH = '/api/gamification/actions';
const ERROR_MESSAGE = 'You must provide the type of action to be tracked.';

export default function (options, callback) {

    options = options || {};
    if (!options.type) {
        if (callback && typeof callback === 'function') {
            return callback(new Error(ERROR_MESSAGE));
        }
        throw new Error(ERROR_MESSAGE);
    }

    return this.baseRequest({
        method: METHOD,
        body: options,
        path: PATH
    }, callback);

}