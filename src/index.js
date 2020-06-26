import { commentType } from './constant/commentType';
import HTMLCommentStyle from './models/HTMLCommentStyle';

const htmlCommentStyle = new HTMLCommentStyle(
  commentType.html,
  {
    length: 20,
  },
  {}
);

window.onload = function () {
  const val = document.getElementById('val');
  const btn = document.getElementById('btn');
  const out = document.getElementById('out');
  btn.addEventListener('click', () => {
    const string = htmlCommentStyle.getString(val.value).finalString;
    console.log(htmlCommentStyle.getString(val));
    out.textContent = string;
  });
};
