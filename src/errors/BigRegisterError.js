import AbstractError from './AbstractError'

/**
 * BigRegisterError Class
 * @package errors
 */
export default class BigRegisterError extends AbstractError {
  constructor(message = 'Big Register Error', ...args) {
    super(...[message, ...args])
  }
}
