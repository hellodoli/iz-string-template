import CommentTemplate from './index';

/* const htmlComment = new CommentTemplate(commentType.html);
htmlComment.setOptions({ deco: '&*&*', length: 20, text: textOptions.right });
console.log('htmlComment: ', htmlComment);
console.log(htmlComment.getString('hello')); */

const jsComment = new CommentTemplate('js', { syntax: 'block2' });
// jsComment.space = '  ';
window.jsComment = jsComment;
console.log('jsComment: ', jsComment);
console.log(
  jsComment.getString([
    'yes',
    'what!!!',
    'I do it',
    ' ',
    '',
    ' ',
    'something',
    '',
  ])
);
