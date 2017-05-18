"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * AbstractModel Class
 * @package models
 */
class AbstractModel {

  /**
   * Convert to plain object
   *
   * @return {Object}
   */
  toObject() {
    let obj = {};
    for (var i in this) {
      if (this.hasOwnProperty(i) && this[i]) {
        obj[i] = this[i];
      }
    }

    return obj;
  }
}
exports.default = AbstractModel;