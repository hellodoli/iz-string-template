import { commentType } from './commentType';

const textOptions = {
  top: 'top',
  bottom: 'bottom',
  left: 'left',
  right: 'right',
  center: 'center',
  mid: 'center',
};

const syntaxOptions = {
  line: 'line',
  block1: 'block1',
  block2: 'block2',
};

const defaultOptions = {
  [commentType.html]: {
    text: textOptions.center,
    length: 20,
    deco: ' ',
  },
  [commentType.js]: {
    syntax: syntaxOptions.line,
    text: textOptions.center,
  },
};

export { defaultOptions, textOptions, syntaxOptions };
