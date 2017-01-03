// jshint esversion: 6
/** @module  Measurement Units Converter module*/

/** The name of the module. */
export const name = 'MUConverter';

/** Static method for ratio calculation */
class Ratio {
  static getRatio(obj) {
    let ratioFrom, ratioTo;
    let strFrom = obj.from.trim(), strTo = obj.to.trim();
    const unit = new Map([
      ['', 1], ['d', 1e-1], ['c', 1e-2], ['m', 1e-3], ['µ', 1e-6],
      ['n', 1e-9], ['p', 1e-12], ['f', 1e-15], ['a', 1e-18],
      ['z', 1e-21], ['y', 1e-24], ['da', 1e1], ['h', 1e2],
      ['k', 1e3], ['M', 1e6], ['G', 1e9], ['T', 1e12],
      ['P', 1e15], ['E', 1e18], ['Z', 1e21], ['Y', 1e24], ]);

    if (strFrom.length === 1) ratioFrom = unit.get('');
     else if (strFrom.indexOf('da') >= 0 ) ratioFrom = unit.get('da');

    if (strTo.length === 1) ratioTo = unit.get('');
     else if (strTo.indexOf('da') >= 0) ratioTo = unit.get('da');

    for (let i of unit) {
      if (ratioFrom === undefined && i[0][0] === strFrom[0]) ratioFrom = i[1];
      if (ratioTo === undefined && i[0][0] === strTo[0]) ratioTo = i[1];
    }
    return ratioFrom / ratioTo;
  }
}

/** Saving ratio for each instance */
let _ratio = new WeakMap();
class muObj {
  constructor (obj) {
    _ratio.set(this, Ratio.getRatio(obj));
    Object.assign(this, {from:obj.from, to:obj.to});
    // this.from = obj.from;
    // this.to = obj.to;
    this.convert = ( ...args ) => {
      let ratio = _ratio.get(this);

      if (args.length == 1 && (typeof args[0] !== 'object' )) {
        let i = args[0] * ratio;
        return (typeof args[0] === 'number') ? i : i.toString();
      }

      if (args.length == 1 && (typeof args[0] === 'object' )) {
        let arr = [];
        args[0].forEach((el) => arr.push(el * ratio));
        return arr;
      }

      return Array.from(args, x => {
        let i = x * ratio;
        return (typeof x === 'number') ? i : i.toString();
      });
    };
  }
  /** A string representation of the class */
  toString() {
     return `Convert from: ${this.from}  to: ${this.to}  ratio: ${_ratio.get(this)}`;
 }
}

/**
 * Return instance which is also has single method 'convert'.
 * Method calculates the values according to the International System of Units.
 * @function
 * @param {Object} obj - Object for add function convert.
 *  Object must looks like following:
 *  let conversion = {
 *  from: 'cm',
 *  to: 'mm'
 *  };
 * @return {Object} Return input object instance whith convert method.
 */
export function createConverter(obj) {
      return new muObj(obj);
}
