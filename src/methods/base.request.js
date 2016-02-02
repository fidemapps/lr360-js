import request from 'request';
import RequestError from './request.error';
import Promise from 'bluebird';

export function baseRequest(options, callback) {

    options = options || {};
    let message;

    if (message = isMissingMandatoryFields(this.config, options)) {
        if (callback && typeof callback === 'function') {
            return callback(new Error(message));
        }
        throw new Error(message);
    }

    let requestOptions = getRequestOptions.call(this, options);

    return addGeolocation(requestOptions, (requestOptions) => {

        // stringify final request body
        if (requestOptions.body) {
          requestOptions = _.assign({}, requestOptions, {body: JSON.stringify(requestOptions.body)});
        }
        let method = requestOptions.method.toLowerCase();

        return request[method](requestOptions, (err, res, body) => {

            let requestError;
            if (res && res.statusCode >= 299) {
                requestError = new RequestError(body, res.statusCode);
            }

            if (callback && typeof callback === 'function') {
                return callback(err || requestError || null, body && JSON.parse(body));
            }
            else {
                if (err || requestError) {
                    throw err || requestError;
                }
            }

        });

    });

}

export function getRequestOptions(options) {

    options = options || {};

    let request = {
        url: formatUrl(_.assign({}, options, this.config)),
        method: options.method || 'GET',
        headers: {
            'X-Fidem-AccessApiKey': this.config.key || null,
            accept: 'application/json'
        },
        qs: options.qs || null
    };

    // add token to request.headers['X-Fidem-SessionToken'] if found
    if (options.token) {
        request = _.merge({}, request, {headers: {'X-Fidem-SessionToken': options.token}});
    }

    // add request.body and request.headers['content-type'] if method is PUT or POST
    if (options.method && ['put', 'post'].indexOf(options.method.toLowerCase()) !== -1) {

        request = _.merge({}, request, {headers: {'content-type': 'application/json'}});

        if (options.body) {
            request = _.merge({}, request, {body: options.body});
        }

    }

    return request;

}

export function addGeolocation(options, callback) {

    function success(position) {
        let coordinates = {
            lat: position.coords.latitude,
            long: position.coords.longitude
        };
        callback(_.merge({}, options, {body: {coordinates: coordinates}}));
    }

    function error() {
        callback(_.merge({}, options, {body: {coordinates: null}}));
    }

    // don't change anything if request method is not POST or PUT
    if (!options.method || ['put', 'post'].indexOf(options.method.toLowerCase()) === -1) {
      return callback(options);
    }

    if (!window.navigator || !window.navigator.geolocation) {
        error();
    }
    else {
        window.navigator.geolocation.getCurrentPosition(success, error);
    }

}

function isMissingMandatoryFields(config, options) {
    if (!config.key) {
        return 'You must provide a key.';
    }
    if (!options.path) {
        return "You must provide a path."
    }
    return false;
}

function formatUrl(url) {
    let path = url.path || '';
    return `${url.protocol}://${url.hostname}:${url.port}${path}`;
}
