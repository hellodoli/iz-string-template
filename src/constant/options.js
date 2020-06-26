import { commentType } from './commentType';

const textOptions = {
  top: 'textOptionsTop',
  bottom: 'textOptionsBottom',
  left: 'textOptionsLeft',
  right: 'textOptionsRight',
  center: 'textOptionsCenter',
  mid: 'textOptionsCenter',
};

const baseOption = {
  text: textOptions.center,
  length: 20,
};

const defaultOptions = {
  [commentType.html]: {
    ...baseOption,
    deco: ' ',
  },
  [commentType.custom]: {
    ...baseOption,
  },
};

export { defaultOptions, textOptions };
