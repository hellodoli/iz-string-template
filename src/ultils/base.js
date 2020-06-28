import { commentType } from '../constant/commentType';
import { defaultOptions, syntaxOptions } from '../constant/options';
import { isValidType, isValidOptions, isValidSyntax } from './checker';

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
  ! Before pass <syntax> param, <syntax> must pass by checker.isValidSyntax
  * (checker from ./checker.js)
*/
function getSyntax(syntax) {
  let s = syntax;
  if (!isValidSyntax(s)) s = syntaxOptions.line;
  return s;
}

/*
  ! Make sure <syntax> is valid.
*/
function getSymbol(syntax) {
  const symbol = {};
  if (syntax === syntaxOptions.block1) {
    symbol.first = '/*';
    symbol.last = '*/';
  } else if (syntax === syntaxOptions.block2) {
    symbol.first = '/**';
    symbol.last = '*/';
  } else {
    symbol.first = '//';
    symbol.last = '';
  }
  return symbol;
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

export { getType, getOptions, build, getSymbol, getSyntax };
