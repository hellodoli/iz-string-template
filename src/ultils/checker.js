import { commentType } from '../constant/commentType';
import { defaultOptions, syntaxOptions } from '../constant/options';

function isValidType(type) {
  const { custom, html, js } = commentType;
  if (type === html || type === js || type === custom) return true;
  return false;
}

function isValidOptions(options, type) {
  const keys = Object.keys(options);
  if (!keys || keys.length === 0) return false;
  const uinique = Object.keys(defaultOptions[type]);
  const isValid = keys.every((key) => uinique.includes(key));
  if (isValid) return true;
  return false;
}

function isValidSyntax(syntax) {
  const { line, block1, block2 } = syntaxOptions;
  if (syntax === line || syntax === block1 || syntax === block2) return true;
  return false;
}

function isArray(arr) {
  return Object.prototype.toString.call(arr) === '[object Array]';
}

export { isValidType, isValidOptions, isValidSyntax, isArray };
