// jshint esversion: 6
import {createConverter} from './modules/muconverter.js';

let conversion = {
  from: 'm',
  to: 'cm'
};

let con1 = createConverter(conversion);
console.log(con1.toString() + '\n');

let a = con1.convert([1, 2, 3, 4, 5]);
let b = con1.convert('5');
let c = con1.convert(5);
let d = con1.convert(1, 2, 3);
let e = con1.convert('1', '2', '3', '4');

console.log(`[1, 2, 3, 4, 5]: ${a}   type : ${typeof a} \n`);
console.log(`'5': ${b}   type : ${typeof b[0]} \n`);
console.log(`5: ${c}   type : ${typeof c} \n`);
console.log(`(1 ,2 ,3): ${d}   type : ${typeof d} \n`);
console.log(`('1', '2', '3', '4'): ${e}   type : ${typeof e[0]} \n`);
