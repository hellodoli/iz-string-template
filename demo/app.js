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

const count = 0;

const id = {
  // input
  form: 'submitForm',
  selecType: 'selectType',
  // input - html comment
  selectOptionText: 'selectOptionText',
  inputLength: 'inputLength',
  inputDeco: 'inputDeco',
  inputHTMLComment: 'inputHTMLComment',
  // input - js comment
  selectOptionSyntax: 'selectOptionSyntax',
  inputJSComment: 'inputJSComment',
  btnAddComment: 'btnAddComment',
  // render parent DOM
  renderZone: 'renderZone',
  renderOptionsZone: 'renderOptionsZone',
  renderCommentZone: 'renderCommentZone',
  renderInputJSComment: 'renderInputJSCommentZone',
  // output
  renderOutput: 'renderOutputZone',
};

const htmlString = {
  formGroupWrapper(html) {
    return `<div class="form-group">${html}</div>`;
  },
  options: {
    label: '<label>Options</label>',
    errorHelper(textError) {
      return `<small class="text-danger">
        ${textError}
      </small>`;
    },
    text: `<select id="${id.selectOptionText}" class="custom-select is-valid">
      <option value="center" selected>Center</option>
      <option value="left">Left</option>
      <option value="right">Right</option>
    </select>`,
    length: `<input id="${id.inputLength}" onchange="" type="number" class="form-control is-valid" min="1" value="20" />`,
    deco: `<input id="${id.inputDeco}" type="text" class="form-control" placeholder="Write your deco value (e.g = '***')" />`,
    syntax: `<select id="${id.selectOptionSyntax}" class="custom-select is-valid">
      <option value="line" selected>Line</option>
      <option value="block1">Block 1</option>
      <option value="block2">Block 2</option>
    </select>`,
  },
  userInput: {
    label: '<label>Comment</label>',
    inputHTMLComment: `<textarea id="${id.inputHTMLComment}" placeholder="Write your comment here ..." class="form-control" rows="5"></textarea>`,
    inputJSComment: `<input id="${id.inputJSComment}${count}" type="text" class="form-control" />`,
    btnAddCommentJS: `<button id="${id.btnAddComment}" class="btn">Add Comment Block</button>`,
  },
};

let valid = {
  options: {
    length: null,
    deco: null,
  },
};

let currentType = null;

function resetValid() {
  valid = {
    options: {
      length: null,
      deco: null,
    },
  };
}

function createHelperTextNode(status, text) {
  const small = document.createElement('small');
  small.className = `text-${status}`;
  small.innerText = text;
  return small;
}

function onInputLengthChange(e) {
  const ele = e.target;
  const numLength = parseInt(ele.value);
  console.log('num: ', numLength);

  function renderHelerTextNode(status) {
    const nextEle = ele.nextElementSibling;
    const parentEle = ele.parentElement;
    if (nextEle) parentEle.removeChild(nextEle); // remove if exist
    if (status === 'on') {
      const helperText = createHelperTextNode('danger', 'Invalid Length !!!');
      ele.parentElement.appendChild(helperText);
    }
  }

  if (!isNaN(numLength) && numLength > 0) {
    // valid
    renderHelerTextNode('off');
    ele.classList.remove('is-invalid');
    ele.classList.add('is-valid');
    valid.options.length = true;
  } else {
    // invalid
    ele.classList.remove('is-valid');
    ele.classList.add('is-invalid');
    valid.options.length = false;
    renderHelerTextNode('on');
  }
}

function onInputDecoChange(e) {
  const ele = e.target;
  ele.classList.add('is-valid');
  valid.options.deco = true;
}

function onSelectSyntaxChange(e) {
  const ele = e.target;
  const { value } = ele;
  if (value === 'block1' || value === 'block2') {
    if (!document.getElementById(id.renderInputJSComment)) {
      const html = '';
      const parent = ele.parentElement;
      parent.insertAdjacentHTML('afterend', `<div id="two">two</div>`);
    }
  } else {
  }
}

function toggleEventDynamic(status) {
  if (currentType === 'html') {
    if (status === 'add') {
      // add 'options' html comment
      const inputLength = document.getElementById(id.inputLength);
      const inputDeco = document.getElementById(id.inputDeco);
      if (inputLength)
        inputLength.addEventListener('input', onInputLengthChange);
      if (inputDeco) inputDeco.addEventListener('input', onInputDecoChange);
    } else if (status === 'remove') {
      // remove 'options' js comment
      const selectOptionSyntax = document.getElementById(id.selectOptionSyntax);
      if (selectOptionSyntax)
        selectOptionSyntax.removeEventListener('change', onSelectSyntaxChange);
    }
  } else if (currentType === 'js') {
    if (status === 'remove') {
      // remove 'options' html comment
      const inputLength = document.getElementById(id.inputLength);
      const inputDeco = document.getElementById(id.inputDeco);
      if (inputLength)
        inputLength.removeEventListener('input', onInputLengthChange);
      if (inputDeco) inputDeco.removeEventListener('input', onInputDecoChange);
    } else if (status === 'add') {
      // add 'options' js comment
      const selectOptionSyntax = document.getElementById(id.selectOptionSyntax);
      if (selectOptionSyntax)
        selectOptionSyntax.addEventListener('change', onSelectSyntaxChange);
    }
  }
}

function onSelectTypeChange(e) {
  const { value } = e.target;
  currentType = value;
  console.log('type: ', currentType);
  // reset valid check variable
  resetValid();
  // remove prev Eventlistener
  toggleEventDynamic('remove');
  const {
    formGroupWrapper,
    options: { label: optionLabel, text, length, deco, syntax },
    userInput: { label: userInputLabel, inputHTMLComment, inputJSComment },
  } = htmlString;
  const html =
    currentType === 'html'
      ? optionLabel +
        formGroupWrapper(text) +
        formGroupWrapper(length) +
        formGroupWrapper(deco) +
        formGroupWrapper(userInputLabel + inputHTMLComment)
      : optionLabel +
        formGroupWrapper(syntax) +
        formGroupWrapper(userInputLabel + inputJSComment);

  // render options HTML
  render(html, document.getElementById(id.renderZone));
  // add Eventlistener
  toggleEventDynamic('add');
}

function onSubmit(e) {
  e.preventDefault();
  console.log('submit');
  if (valid.options.length === true && valid.options.deco === true) {
    console.log('start generate');
  } else {
    alert('Input invalid !!!');
  }
}

window.onload = function () {
  const submitForm = document.getElementById(id.form);
  const selectType = document.getElementById(id.selecType);

  submitForm.addEventListener('submit', onSubmit);
  selectType.addEventListener('change', onSelectTypeChange);
};
