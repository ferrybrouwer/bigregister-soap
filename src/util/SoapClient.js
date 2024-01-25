import soap from 'soap'
import { EventEmitter } from 'events'

import SoapRequestError from '../errors/SoapRequestError'

/**
 * SOAP client class
 */
class SoapClient extends EventEmitter {
  wsdl = null

  /**
   * @constructor
   * @param {String} wsdl
   */
  constructor(wsdl = 'https://api.bigregister.nl/zksrv/soap/4?wsdl') {
    super()
    this.wsdl = wsdl
  }

  /**
   * Connect client
   *
   * @return {Promise.<SoapClient>}
   */
  async connect() {

    // return when client already exists
    if (this.client) return this.client

    // connect and emit client
    try {
      this.client = await this._createClient(this.wsdl)
      this.emit('connected', this.client)
    } catch (err) {
      throw new SoapRequestError(`Can not create soap client: ${err.message}`)
    }

    return this.client
  }

  /**
   * Create SOAP client
   *
   * @private
   * @param {String} wsdl
   * @return {Promise.<SoapClient>}
   */
  _createClient(wsdl) {
    return new Promise((resolve, reject) => {
      soap.createClient(wsdl, (err, client) => {
        if (err) return reject(err)
        resolve(client)
      })
    })
  }

  /**
   * Request currying function
   *
   * @example request('ListHcpApprox4')({RegistrationNumber: '49020087501'})
   * @param   {String} method
   * @param   {Object} args
   * @return  {Function}
   */
  request(method) {
    return (args) => new Promise((resolve, reject) => {
      this.client[method](args, (err, response) => {
        if (err) return reject(err)

        if (typeof response !== 'object') {
          return reject(new SoapRequestError(`No result found`))
        }

        resolve(response)
      })
    })
  }
}

export default SoapClient
