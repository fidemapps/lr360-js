const METHOD = 'POST';
const PATH = '/api/gamification/actions';
const ERROR_MESSAGE = 'You must provide the type of action to be tracked.';

export default function (body, callback) {

    body = body || {};
    if (!body.type) {
        if (callback && typeof callback === 'function') {
            return callback(new Error(ERROR_MESSAGE));
        }
        throw new Error(ERROR_MESSAGE);
    }

    return this.baseRequest({
        method: METHOD,
        body: body,
        path: PATH
    }, callback);

}