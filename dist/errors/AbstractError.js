'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * AbstractError Class
 * @package errors
 */
class AbstractError extends Error {
    constructor(...args) {
        super(...args);
        this.name = this.constructor.name;

        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, this.constructor);
        } else {
            this.stack = new Error(this.message).stack;
        }
    }
}
exports.default = AbstractError;