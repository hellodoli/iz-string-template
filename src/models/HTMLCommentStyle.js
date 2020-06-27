import { textOptions } from '../constant/options';
import { getStringFromJoinArray } from '../ultils/maker';
import CommentStyle from './CommentStyle';

class HTMLCommentStyle extends CommentStyle {
  constructor(type, options, { first, last, body }) {
    super(type, options);
    this.first = first || '<!';
    this.last = last || '>';
    this.body = body || '-';
  }

  getString(input) {
    let rootString = '';
    let finalString = '';

    const { deco } = this.options;
    const flLength = this.first.length + this.last.length;
    const bodyLength = this.options.length - flLength;

    rootString =
      this.first +
      getStringFromJoinArray(bodyLength < 0 ? 0 : bodyLength, this.body) +
      this.last;

    if (bodyLength <= 0 || rootString.length < flLength + deco.length * 2 + 5)
      return {
        rootString,
        finalString,
      };

    if (input) {
      const l = input.length;
      const rsl = rootString.length;

      const maxInputLength = rsl - (flLength + deco.length * 2 + 4);
      if (l > 0 && l <= maxInputLength) {
        if (this.options.text === textOptions.center) {
          const firstLength = parseInt(rsl / 2, 10) - parseInt(l / 2, 10);
          const lastLength = firstLength + l;

          const bodyFirstLength = firstLength - this.first.length - deco.length;
          const first =
            this.first +
            getStringFromJoinArray(bodyFirstLength, this.body) +
            deco;
          const bodyLastLength = lastLength - this.last.length - deco.length;
          const last =
            deco +
            getStringFromJoinArray(bodyLastLength, this.body) +
            this.last;
          finalString = first + input + last;
        } else if (this.options.text === textOptions.left) {
        } else if (this.options.text === textOptions.right) {
        }
      }
    }

    return {
      rootString,
      finalString,
    };
  }
}

export default HTMLCommentStyle;
