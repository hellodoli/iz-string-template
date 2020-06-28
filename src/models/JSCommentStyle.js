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
          finalString = input
            .map((row, index) => {
              const r = row.trim();
              const space = r === '' ? '' : this.space;
              if (index === 0) return this.first + space + r;
              if (index === input.length - 1) return r + space + this.last;
              return r;
            })
            .join('\n');
        } else if (syntax === syntaxOptions.block2) {
          finalString = input
            .map((row, index) => {
              const r = row.trim();
              if (index === 0) return this.first;
              if (index === input.length - 1) return this.space + this.last;
              const space = r === '' ? '' : this.space;
              return `${this.space}*${space}${r}`;
            })
            .join('\n');
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
