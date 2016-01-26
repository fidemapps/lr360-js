export default function (action, callback) {
    return this.request({
        method: 'POST',
        body: action,
        path: '/api/gamification/actions'
    }, callback);
}