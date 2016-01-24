import _ from 'lodash';
import Promise from 'bluebird';
import request from 'request';

const HOSTNAME = 'services.fidemapps.com';

export default class Client {

    /**
     *
     * @param {object} config
     * @param {string} config.key API key
     * @param {string} config.secret API secret
     * @param {string} [config.hostname="services.fidemapps.com"] Hostname
     * @param {string} [config.protocol=http] Protocol (http or https)
     * @param {string} [config.port=80|443] Port
     */
    constructor(config) {
        config = config || {};
        this.config = _.assign({
            hostname: config.hostname || HOSTNAME,
            port: config.protocol === 'https' ? 443 : 80,
            protocol: 'http'
        }, config);
    }

    request(options, cb) {

        options = getDefaultOptions(options);

        // Check required options.
        if (!options.path)
            throw new Error('You must provide a path.');

        var req = getDefaultRequest(options, this.config);

        return req;

    }

}

function getDefaultOptions(options) {

    const DEFAULT_OPTIONS = {
        token: null,
        sign: true,
        method: 'GET',
        body: null,
        headers: {},
        requestOptions: {}
    };

    return assign(DEFAULT_OPTIONS, options);
}

function getDefaultRequest(options, config) {

    const DEFAULT_REQUEST = {
        method: options.method,
        hostname: config.hostname,
        path: options.path,
        url: formatUrl(assign({}, options, config)),
        headers: {
            accept: 'application/json'
        }
    };

    var req = assign(DEFAULT_REQUEST, options.requestOptions);

    // Put a body for PUT and POST.
    if (['put', 'post'].indexOf(options.method.toLowerCase()) !== -1) {
        req.headers['content-type'] = 'application/json';
        req.body = JSON.stringify(options.body);
    }

    // Use token.
    if (options.token) {
        req.headers['X-Fidem-SessionToken'] = options.token;
    }

    req.headers['X-Fidem-AccessApiKey'] = config.key;

    return req;
}

function formatUrl(url) {
    return url.protocol + '://' + url.hostname + ':' + url.port + url.path;
}