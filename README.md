# iz-string-template
Generate comment string. JS Comment and HTML Comment.
# Usage:
`npm run build`

In `dist` folder you will see `comments-generate.js` file.

Place `comments-generate.js` in your project.

```html
<script src="comments-generate.js"></script>
```

Example:

```js
const type = 'html'; // or 'js'
// create comment
const comment = new CommentTemplate(type);
// add options
const options = {
  // for 'html'
  deco: '*', // anything for fun :))
  length: 30,
  text: 'right', // 'left' || 'center' || 'right'
  // for 'js'
  // syntax: 'line' // 'line' || 'block1' || 'block2'
};
comment.setOptions(options);
// if js comment input is array ['comment line 1', 'comment line 2']
const { rootString, finalString } = comment.getString('your comment');
console.log(finalString); // <!--*---------your comment*-->
```

You can view demo at `./demo/index.html`.
