'use strict';

var _events = require('events');

var _SoapClient = require('./util/SoapClient');

var _SoapClient2 = _interopRequireDefault(_SoapClient);

var _BigRegisterError = require('./errors/BigRegisterError');

var _BigRegisterError2 = _interopRequireDefault(_BigRegisterError);

var _ListHcpApproxRequest = require('./models/ListHcpApproxRequest');

var _ListHcpApproxRequest2 = _interopRequireDefault(_ListHcpApproxRequest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * BigRegister Class
 */
class BigRegister extends _events.EventEmitter {

  /**
   * @constructor
   */
  constructor() {
    super();
    this.client = null;
    this.ListHcpApprox4Requests = null;
    this.connected = false;
  }

  /**
   * Connect to soap server
   *
   * @note It's not necessary to wait for promise to be resolved
   * @param {String|undefined} wsdl
   * @return {Promise.<SoapClient>}
   */
  connect(wsdl = undefined) {
    var _this = this;

    return _asyncToGenerator(function* () {
      // create and connect client
      _this.client = new _SoapClient2.default(wsdl);
      _this.client.once('connected', function () {
        _this.connected = true;
        _this.emit('connected');
      });
      _this.client.connect();

      // create `ListHcpApprox4` requests
      _this.ListHcpApprox4Requests = _this.client.request('ListHcpApprox4');
    })();
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
    var _this2 = this;

    return new Promise(function (resolve, reject) {
      if (_this2.connected) {
        resolve(_this2.client);
      } else {
        let _timeout = setTimeout(function () {
          return reject(new _BigRegisterError2.default(`Exceeds timeout limit`));
        }, timeout);
        _this2.once('connected', function () {
          if (_timeout) clearTimeout(_timeout);
          resolve(_this2.client);
        });
      }
    });
  }

  /**
   * Find person by registration number
   *
   * @throws  {Error}
   * @param   {String|Number} registrationNumber
   * @param   {Number} timeout
   * @return  {Promise.<Object>}
   */
  findByRegistrationNumber(registrationNumber, timeout = 5000) {
    var _this3 = this;

    return _asyncToGenerator(function* () {
      // wait for connection
      yield _this3._waitForConnection(timeout);

      // get arguments for model to send
      const args = new _ListHcpApproxRequest2.default();
      args.RegistrationNumber = registrationNumber;

      // get data
      let data = null;
      try {
        data = yield _this3.ListHcpApprox4Requests(args.toObject());
      } catch (err) {
        throw new _BigRegisterError2.default(`Can not fetch data: ${err.message}`);
      }

      // validate response data
      if (!data || !data.hasOwnProperty('ListHcpApprox') || !data.ListHcpApprox.hasOwnProperty('ListHcpApprox4') || !(Array.isArray(data.ListHcpApprox.ListHcpApprox4) || data.ListHcpApprox.ListHcpApprox4.length === 0)) {
        throw new _BigRegisterError2.default(`Invalid response data`);
      }

      return data.ListHcpApprox.ListHcpApprox4[0];
    })();
  }
}

module.exports = new BigRegister();