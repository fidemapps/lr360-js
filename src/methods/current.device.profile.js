const METHOD = 'GET';
const PATH = '/api/device/me';

export default function (callback) {

    return this.baseRequest({
        method: METHOD,
        path: PATH
    }, callback);

}
