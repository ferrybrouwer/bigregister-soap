import { EventEmitter } from 'events'

import SoapClient from './util/SoapClient'
import BigRegisterError from './errors/BigRegisterError'
import ListHcpApproxRequest from './models/ListHcpApproxRequest'

/**
 * BigRegister Class
 */
class BigRegister extends EventEmitter {
  client                 = null
  ListHcpApprox4Requests = null
  connected              = false

  /**
   * @constructor
   */
  constructor() {
    super()
  }

  /**
   * Connect to soap server
   *
   * @note It's not necessary to wait for promise to be resolved
   * @param {String|undefined} wsdl
   * @return {Promise.<SoapClient>}
   */
  async connect(wsdl = undefined) {
    // create and connect client
    this.client = new SoapClient(wsdl)
    this.client.once('connected', () => {
      this.connected = true
      this.emit('connected')
    })
    this.client.connect()

    // create `ListHcpApprox4` requests
    this.ListHcpApprox4Requests = this.client.request('ListHcpApprox4')
  }

  /**
   * Wait for connection method
   *
   * @private
   * @throws  {Error}
   * @param   {Number} timeout
   * @return  {Promise.<SoapClient>}
   */
  _waitForConnection(timeout = 4000) {
    return new Promise((resolve, reject) => {
      if (this.connected) {
        resolve(this.client)
      } else {
        let _timeout = setTimeout(() => reject(new BigRegisterError(`Exceeds timeout limit`)), timeout)
        this.once('connected', () => {
          if (_timeout) clearTimeout(_timeout)
          resolve(this.client)
        })
      }
    })
  }

  /**
   * Find person by registration number
   *
   * @throws  {Error}
   * @param   {String|Number} registrationNumber
   * @param   {Number} timeout
   * @return  {Promise.<Object>}
   */
  async findByRegistrationNumber(registrationNumber, timeout = 5000) {
    // wait for connection
    await this._waitForConnection(timeout)

    // get arguments for model to send
    const args              = new ListHcpApproxRequest()
    args.RegistrationNumber = registrationNumber

    // get data
    let data = null
    try {
      data = await this.ListHcpApprox4Requests(args.toObject())
    } catch (err) {
      throw new BigRegisterError(`Can not fetch data: ${err.message}`)
    }

    // validate response data
    if (
      !data.hasOwnProperty('ListHcpApprox') ||
      !data.ListHcpApprox.hasOwnProperty('ListHcpApprox4') ||
      !(Array.isArray(data.ListHcpApprox.ListHcpApprox4) || data.ListHcpApprox.ListHcpApprox4.length === 0)
    ) {
      throw new BigRegisterError(`Invalid response data`)
    }

    return data.ListHcpApprox.ListHcpApprox4[0]
  }
}

module.exports = (wsdl) => new BigRegister(wsdl)

