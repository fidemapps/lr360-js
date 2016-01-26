// 3 ways to use
// trackAction('type')
// trackAction('type', {data...})
// trackAction({})

export default function (action, callback) {
    return this.request({
        method: 'POST',
        body: action,
        path: '/api/gamification/actions'
    }, callback);
}