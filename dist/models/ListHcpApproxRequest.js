'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _AbstractModel = require('./AbstractModel');

var _AbstractModel2 = _interopRequireDefault(_AbstractModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * ListHcpApproxRequest Class
 * @package models
 */
class ListHcpApproxRequest extends _AbstractModel2.default {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.WebSite = 'Ribiz', this.Name = null, this.Initials = null, this.Prefix = null, this.Street = null, this.Gender = null, this.HouseNumber = null, this.Postalcode = null, this.City = null, this.RegistrationNumber = null, this.DateOfBirth = null, this.ProfessionalGroup = null, this.TypeOfSpecialism = null, _temp;
  }

}
exports.default = ListHcpApproxRequest;