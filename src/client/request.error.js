export default class RequestError extends Error {

    /**
     *
     * @param {object} body
     * @param {number} statusCode
     */
    constructor(body, statusCode) {
        try {
            body = JSON.parse(body);
        } catch (e) {
        }

        super(body.error);

        this.body = body;
        this.statusCode = statusCode;
    }

}