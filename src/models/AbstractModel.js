/**
 * AbstractModel Class
 * @package models
 */
export default class AbstractModel {

  /**
   * Convert to plain object
   *
   * @return {Object}
   */
  toObject() {
    let obj = {}
    for (var i in this) {
      if (this.hasOwnProperty(i) && this[i]) {
        obj[i] = this[i]
      }
    }

    return obj
  }
}
