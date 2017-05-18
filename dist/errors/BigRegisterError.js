'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _AbstractError = require('./AbstractError');

var _AbstractError2 = _interopRequireDefault(_AbstractError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * BigRegisterError Class
 * @package errors
 */
class BigRegisterError extends _AbstractError2.default {
  constructor(message = 'Big Register Error', ...args) {
    super(...[message, ...args]);
  }
}
exports.default = BigRegisterError;