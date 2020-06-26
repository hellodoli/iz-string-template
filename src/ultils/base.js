import { commentType } from '../constant/commentType';
import { defaultOptions } from '../constant/options';
import { isValidType, isValidOptions } from './checker';

/* 
  ! Before pass <type> param, <type> must pass by checker.isValidType
  * (checker from ./checker.js)
*/
function getType(type) {
  let t = type;
  if (!isValidType(type)) t = commentType.html;
  return t;
}

/* 
  ! Make sure <type> is valid.
  ! Before pass <options> param, <options> must pass by checker.isValidOptions
  * (checker from ./checker.js)
*/
function getOptions(options, type) {
  if (!isValidOptions(options, type)) return defaultOptions[type];
  const keys = Object.keys(options);
  const newOptions = { ...defaultOptions[type] };
  keys.forEach((key) => (newOptions[key] = options[key]));
  return newOptions;
}

/*
 * Build constructor params
 */
function build(type, options) {
  const fixedType = getType(type);
  return {
    type: fixedType,
    options: getOptions(options, fixedType),
  };
}

export { getOptions, build };
