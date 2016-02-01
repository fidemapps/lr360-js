export default function (config) {

    config = config || {};

    this.config = _.assign({}, this.config, config);

}