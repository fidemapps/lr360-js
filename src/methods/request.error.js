export default class RequestError extends Error {

    constructor(body, statusCode) {
        body = body || {};
        statusCode = statusCode || '';

        try {
            body = JSON.parse(body);
        } catch (e) {
        }

        super(body.error);

        this.body = body;
        this.statusCode = statusCode;
    }

}
