import { textOptions } from '../constant/options';
import { getStringFromJoinArray } from '../ultils/maker';
import CommentStyle from './CommentStyle';

class HTMLCommentStyle extends CommentStyle {
  constructor(type, options) {
    super(type, options);
    this.first = '<!--';
    this.last = '-->';
    this.body = '-';
  }

  getString(input) {
    let rootString = '';
    let finalString = '';

    const { deco, length: oLength } = this.options;
    const flLength = this.first.length + this.last.length;
    const bodyLength = oLength - flLength;
    const fillLength = bodyLength < 0 ? 0 : bodyLength;

    if (this.body.length > 1) this.body = '-';

    rootString =
      this.first + getStringFromJoinArray(fillLength, this.body) + this.last;

    if (bodyLength <= 0) {
      return { rootString, finalString };
    }

    // Check input
    const l = input.length;
    const rsl = rootString.length;

    const maxInputLength = rsl - (flLength + deco.length * 2);
    if (l >= 0 && l <= maxInputLength) {
      let first = '';
      let last = '';
      if (this.options.text === textOptions.left) {
        first = this.first + deco;
        const lastLength = rsl - first.length - l;
        const bodyLastLength = lastLength - deco.length - this.last.length;
        last =
          deco + getStringFromJoinArray(bodyLastLength, this.body) + this.last;
      } else if (this.options.text === textOptions.right) {
        last = deco + this.last;
        const firstLength = rsl - last.length - l;
        const bodyFirstLength = firstLength - deco.length - this.first.length;
        first =
          this.first +
          deco +
          getStringFromJoinArray(bodyFirstLength, this.body);
      } else {
        const firstLength = parseInt(rsl / 2, 10) - parseInt(l / 2, 10);
        const lastLength = rsl - firstLength - l;

        const bodyFirstLength = firstLength - this.first.length - deco.length;
        first =
          this.first +
          getStringFromJoinArray(bodyFirstLength, this.body) +
          deco;
        const bodyLastLength = lastLength - this.last.length - deco.length;
        last =
          deco + getStringFromJoinArray(bodyLastLength, this.body) + this.last;
      }
      finalString = first + input + last;
    }

    return {
      rootString,
      finalString,
    };
  }
}

export default HTMLCommentStyle;
