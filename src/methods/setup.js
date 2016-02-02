import { assign } from 'lodash';

export default function (config) {

    config = config || {};

    this.config = assign({}, this.config, config);

}
