import { commentType } from './constant/commentType';
import HTMLCommentStyle from './models/HTMLCommentStyle';
import JSCommentStyle from './models/JSCommentStyle';

(function () {
  function CommentTemplate(type, options = {}) {
    let instance = null;
    if (type === commentType.html) {
      instance = new HTMLCommentStyle(type, options);
    } else if (type === commentType.js) {
      instance = new JSCommentStyle(type, options);
    } else {
      instance = new HTMLCommentStyle(type, options);
    }
    return instance;
  }

  window.CommentTemplate = CommentTemplate;
}.call(this));
