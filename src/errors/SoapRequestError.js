import AbstractError from './AbstractError'

/**
 * SoapRequestError Class
 * @package errors
 */
export default class SoapRequestError extends AbstractError {
  constructor(message = 'Soap Request Error', ...args) {
    super(...[message, ...args])
  }
}
