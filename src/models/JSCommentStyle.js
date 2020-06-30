import { syntaxOptions } from '../constant/options';
import { getSymbol } from '../ultils/base';
import { isArray } from '../ultils/checker';
import CommentStyle from './CommentStyle';

class JSCommentStyle extends CommentStyle {
  constructor(type, options) {
    super(type, options);
    const { first, last } = getSymbol(this.options.syntax);
    this.first = first;
    this.last = last;
    this.space = ' ';
  }

  getString(input) {
    let rootString = '';
    let finalString = '';
    rootString = this.first + this.last;

    if (isArray(input)) {
      const l = input.length;
      if (l > 0) {
        const { syntax } = this.options;
        if (syntax === syntaxOptions.block1) {
          const first =
            input[0].trim() === ''
              ? this.first
              : this.first + this.space + input[0].trim();
          const last = input[input.length - 1].trim()
            ? this.last
            : input[input.length - 1].trim() + this.space + this.last;
          finalString = input.map((row) => row.trim());
          finalString.unshift(first); // first
          finalString.push(last); // last
          finalString = finalString.join('\n');
        } else if (syntax === syntaxOptions.block2) {
          finalString = input.map((row, index) => {
            const r = row.trim();
            const space = r === '' ? '' : this.space;
            return `${this.space}*${space}${r}`;
          });
          finalString.unshift(this.first); // first
          finalString.push(this.space + this.last); // last
          finalString = finalString.join('\n');
        } else {
          finalString = input
            .map((row) => this.first + this.space + row.trim())
            .join('\n');
        }
      }
    }

    return {
      rootString,
      finalString,
    };
  }
}

export default JSCommentStyle;
