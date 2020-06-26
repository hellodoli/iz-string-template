import * as checker from '../ultils/checker';
import * as base from '../ultils/base';

class CommentStyle {
  constructor(type, options) {
    const cs = base.build(type, options);
    this.type = cs.type;
    this.options = cs.options;
  }

  getOptions() {
    return this.options;
  }

  setOptions(customOptions) {
    if (checker.isValidOptions(customOptions, this.type)) {
      this.options = base.getOptions(customOptions, this.type);
    }
  }
}

export default CommentStyle;
