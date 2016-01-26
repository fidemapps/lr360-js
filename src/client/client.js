import _ from 'lodash';
import Promise from 'bluebird';
import request from 'request';
import RequestError from './request.error';

const HOSTNAME = 'services.fidemapps.com';

export default class Client {

    constructor(config) {
        config = config || {};
        this.config = _.assign({
            hostname: config.hostname || HOSTNAME,
            port: config.protocol === 'https' ? 443 : 80,
            protocol: 'http'
        }, config);
    }

    request(options, callback) {

        if (!options.path) {
            throw new Error('You must provide a path.');
        }

        let requestOptions = this.getRequestOptions(options);

        // Make the request.
        request(requestOptions, function (err, res, body) {
            // Basic error.
            if (err) {
                return callback(error);
            }

            // Status error.
            if (res.statusCode >= 299) {
                return callback(new RequestError(body, res.statusCode));
            }

            // No error.
            return callback(null, JSON.parse(body));
        });

    }

    getRequestOptions(options) {

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

        // add request.body and request.headers['content-type'] iif method is PUT or POST
        if (options.method && ['put', 'post'].indexOf(options.method.toLowerCase()) !== -1) {
            request = _.merge({}, request, {headers: {'content-type': 'application/json'}});
            if (options.body) {
                // TODO: error might be thrown here
                request = _.merge({}, request, {body: JSON.stringify(options.body)});
            }
        }

        return request;
    }

}

function formatUrl(url) {
    let path = url.path || '';
    return `${url.protocol}://${url.hostname}:${url.port}${path}`;
}