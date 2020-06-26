import { commentType } from '../constant/commentType';
import { defaultOptions } from '../constant/options';

function isValidType(type) {
  const { custom, html } = commentType;
  if (type === html || type === custom) return true;
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

export { isValidType, isValidOptions };
