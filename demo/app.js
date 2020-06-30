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
  // render parent DOM
  renderInputZone: 'renderInputZone',
  renderOptionsZone: 'renderOptionsZone',
  renderCommentZone: 'renderCommentZone',
  renderInputJSComment: 'renderInputJSCommentZone',
  // output
  renderOutputZone: 'renderOutputZone',
};

const htmlString = {
  formGroupWrapper(html) {
    return `<div class="form-group">${html}</div>`;
  },
  renderWrapper(idDOM, html) {
    return `<div id="${idDOM}">${html}</div>`;
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
    inputHTMLComment: `<textarea id="${id.inputHTMLComment}" placeholder="Write your comment here ..." class="form-control" rows="3"></textarea>`,
    inputJSComment: `<textarea id="${id.inputJSComment}" placeholder="Write your comment here ..." class="form-control" rows="5"></textarea>`,
  },
};

let valid = {
  options: {
    length: null,
    deco: null,
  },
};

let currentType = null;

/* Helper function */
function resetValid() {
  valid = {
    options: {
      length: null,
      deco: null,
    },
  };
}

function renderInputZone() {
  const {
    renderWrapper,
    formGroupWrapper,
    options: { label: optionLabel, text, length, deco, syntax },
    userInput: { label: userInputLabel, inputHTMLComment, inputJSComment },
  } = htmlString;

  const optionHTML =
    currentType === 'html'
      ? optionLabel +
        formGroupWrapper(text) +
        formGroupWrapper(length) +
        formGroupWrapper(deco)
      : optionLabel + formGroupWrapper(syntax);
  const optionZone = renderWrapper(id.renderOptionsZone, optionHTML);
  const commentHTML =
    currentType === 'html'
      ? formGroupWrapper(userInputLabel + inputHTMLComment)
      : formGroupWrapper(userInputLabel + inputJSComment);
  const commentZone = renderWrapper(id.renderCommentZone, commentHTML);
  return optionZone + commentZone;
}

function createHelperTextNode(status, text) {
  const small = document.createElement('small');
  small.className = `text-${status}`;
  small.innerText = text;
  return small;
}

/* onChange Input Event */
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
  const inputJSComment = document.getElementById(id.inputJSComment);
  const nextEle = inputJSComment.nextElementSibling;
  if (nextEle) inputJSComment.parentElement.removeChild(nextEle);
  if (value === 'block1' || value === 'block2') {
    const helperText = createHelperTextNode(
      'muted',
      '*Every comment end with "." e.g Hello.Hi.I"m comment line'
    );
    inputJSComment.parentElement.appendChild(helperText);
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
  // render option & comment HTML
  render(renderInputZone(), document.getElementById(id.renderInputZone));
  valid.options.length = true; // default
  // add Eventlistener
  toggleEventDynamic('add');
}

/* submit Form Event */
function onSubmit(e) {
  e.preventDefault();
  console.log('submit');
  if (currentType === null) return;
  if (currentType === 'html') {
    const input = document.getElementById(id.inputHTMLComment);
    if (input.value.trim() === '') return;
    if (valid.options.length === true && valid.options.deco === true) {
      console.log('generate - html');
      const options = {
        text: document.getElementById(id.selectOptionText).value,
        length: document.getElementById(id.inputLength).value,
        deco: document.getElementById(id.inputDeco).value,
      };
      const htmlComment = new CommentTemplate('html', options);
      const { rootString, finalString } = htmlComment.getString(input.value);
      const html =
        `<div>rootString: ${rootString}</div>` +
        `<div>finalString: ${finalString}</div>`;
      console.log('stringHTML: ', html);
      document.getElementById(id.renderOutputZone).textContent = finalString;
    }
  } else if (currentType === 'js') {
    const input = document.getElementById(id.inputJSComment);
    if (input.value.trim() === '') return;
    console.log('generate - js');
    console.log(input.value);
    console.log(input.value.split('.'));
    const options = {
      syntax: document.getElementById(id.selectOptionSyntax).value,
    };
    const jsComment = new CommentTemplate('js', options);
    const array = input.value.trim().split('.');
    const { rootString, finalString } = jsComment.getString(array);
    const html =
      `<div>rootString: ${rootString}</div>` +
      `<div>finalString: ${finalString}</div>`;
    console.log('stringHTML: ', html);
    document.getElementById(id.renderOutputZone).textContent = finalString;
  }
}

window.onload = function () {
  const submitForm = document.getElementById(id.form);
  const selectType = document.getElementById(id.selecType);

  submitForm.addEventListener('submit', onSubmit);
  selectType.addEventListener('change', onSelectTypeChange);
};
