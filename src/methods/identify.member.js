const METHOD = 'POST';
const PATH = '/api/gamification/actions/identify-member';
const ERROR_MESSAGE = 'You must provide either an ID, an external ID or an email.';

export default function (options, callback) {

    options = options || {};
    if (!hasOneOfRequiredProperties(options)) {
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

function hasOneOfRequiredProperties(options) {
    return  !!options.id || !!options.email || !! options.external_id;
}
