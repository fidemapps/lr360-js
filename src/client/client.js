import _ from 'lodash';
import { clientMethods } from '../methods/index';

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

}

_.assign(Client.prototype, clientMethods);