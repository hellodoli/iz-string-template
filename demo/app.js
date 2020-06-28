/* const jsComment = new CommentTemplate('js', { syntax: 'block2' });
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
); */

const showOption = false;
let currentType = null;

function onSubmit(e) {
  e.preventDefault();
  console.log(this);
  console.log('submit');
}

function onSelectTypeChange(e) {
  const { value } = e.target;
  console.log('type: ', value);
  currentType = value;
  const label = '<label>Options:</label>';
  if (currentType === 'html') {
  } else if (currentType === 'js') {
  }
}

window.onload = function () {
  const submitForm = document.getElementById('submitForm');
  const selectType = document.getElementById('selectType');
  submitForm.addEventListener('submit', onSubmit);
  selectType.addEventListener('change', onSelectTypeChange);
};
