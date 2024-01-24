'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _soap = require('soap');

var _soap2 = _interopRequireDefault(_soap);

var _events = require('events');

var _SoapRequestError = require('../errors/SoapRequestError');

var _SoapRequestError2 = _interopRequireDefault(_SoapRequestError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * SOAP client class
 */
class SoapClient extends _events.EventEmitter {

  /**
   * @constructor
   * @param {String} wsdl
   */
  constructor(wsdl = 'https://api.bigregister.nl/zksrv/soap/4?wsdl') {
    super();
    this.wsdl = null;
    this.wsdl = wsdl;
  }

  /**
   * Connect client
   *
   * @return {Promise.<SoapClient>}
   */
  connect() {
    var _this = this;

    return _asyncToGenerator(function* () {

      // return when client already exists
      if (_this.client) return _this.client;

      // connect and emit client
      try {
        _this.client = yield _this._createClient(_this.wsdl);
        _this.emit('connected', _this.client);
      } catch (err) {
        throw new _SoapRequestError2.default(`Can not create soap client: ${err.message}`);
      }

      return _this.client;
    })();
  }

  /**
   * Create SOAP client
   *
   * @private
   * @param {String} wsdl
   * @return {Promise.<SoapClient>}
   */
  _createClient(wsdl) {
    return new Promise(function (resolve, reject) {
      _soap2.default.createClient(wsdl, function (err, client) {
        if (err) return reject(err);
        resolve(client);
      });
    });
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
    var _this2 = this;

    return function (args) {
      return new Promise(function (resolve, reject) {
        _this2.client[method](args, function (err, response) {
          if (err) return reject(err);

          if (typeof response !== 'object') {
            return reject(new _SoapRequestError2.default(`No result found`));
          }

          resolve(response);
        });
      });
    };
  }
}

exports.default = SoapClient;
