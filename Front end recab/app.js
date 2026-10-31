/* =========================================================================
   webschool — data store + application logic (vanilla JS, no build step)

   THIS FILE IS ITSELF A LESSON. Every pattern below is one you'll meet again
   in React:   DATA -> STATE -> RENDER -> EVENTS -> (change state) -> RENDER
   ========================================================================= */

/* -------------------------------------------------------------------------
   1. DATA STORE
   Lessons are plain objects in an array. The sidebar, viewer and search all
   READ from this array; none of them hard-code lesson text. Add a lesson here
   and the whole UI updates. (React: this is your "props" / API data.)
   `L` joins lines so demo code stays readable.
   ------------------------------------------------------------------------- */
const L = (...lines) => lines.join("\n");

const LESSONS = [
  {
    id: "big-picture", name: "the big picture", category: "together",
    tagline: "HTML = nouns, CSS = adjectives, JS = verbs",
    overview:
      "A web page is three languages cooperating. HTML says what exists (a card, a button). " +
      "CSS says how it looks (blue, rounded, centered). JavaScript says what happens " +
      "(when clicked, change the text). They never mix jobs, which keeps each file simple.",
    syntax: "<div class=\"card\" id=\"card\">…</div>",
    flags: [
      { flag: "class=\"card\"", desc: "the handle CSS uses: .card { … } styles every element with it" },
      { flag: "id=\"card\"", desc: "the handle JS uses: document.getElementById(\"card\")" },
      { flag: "tag name", desc: "<div>, <button>… tells the browser WHAT the thing is" },
    ],
    together: [
      { cmd: "HTML → CSS: .card { background: navy; }", desc: "CSS finds HTML by selector (class, id, tag) and decorates it." },
      { cmd: "HTML → JS: card.classList.toggle(\"on\")", desc: "JS finds HTML through the DOM, then flips a class. CSS reacts instantly. JS never sets colors itself." },
    ],
    demo: {
      html: "<div class=\"card\" id=\"card\">Click me</div>",
      css: L(".card { padding: 18px; border-radius: 10px; background: #e5e7eb; cursor: pointer; }",
             ".card.on { background: #4f46e5; color: white; }"),
      js: L("const card = document.getElementById(\"card\");",
            "card.addEventListener(\"click\", () => card.classList.toggle(\"on\"));"),
    },
  },
  /* ---- BASICS: HTML ---- */
  {
    id: "html-basics", name: "text, links & images", category: "html",
    tagline: "the everyday tags you'll type most",
    overview:
      "Most of a page is text, links and pictures. <p> is a paragraph, <a href> is a link, " +
      "<img src alt> is an image. Tags can carry attributes (name=\"value\") that configure them. " +
      "Inline tags like <strong> and <em> sit inside a line of text; block tags like <p> and <h1> " +
      "take their own line.",
    syntax: L("<p>Some <strong>bold</strong> text</p>", "<a href=\"https://example.com\">a link</a>", "<img src=\"cat.png\" alt=\"a cat\" />"),
    flags: [
      { flag: "<p>", desc: "a paragraph of text" },
      { flag: "<a href>", desc: "a link; href is where it goes" },
      { flag: "<img src alt>", desc: "an image; alt is the text description (required for accessibility)" },
      { flag: "<strong> <em>", desc: "important (bold) and emphasized (italic) text" },
      { flag: "<br> <hr>", desc: "line break and horizontal rule (self-closing)" },
    ],
    together: [
      { cmd: "img { max-width: 100%; }", desc: "CSS keeps images from overflowing their container on small screens." },
      { cmd: "link.href = \"https://…\"", desc: "JS can change any attribute (href, src, alt) on the fly through the DOM." },
    ],
    demo: {
      html: L("<p>A <strong>bold</strong> and <em>italic</em> word.</p>",
              "<a href=\"#\" id=\"a\">a link</a><br>",
              "<img alt=\"blue square\" src=\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='50' height='50'%3E%3Crect width='50' height='50' rx='10' fill='%234f46e5'/%3E%3C/svg%3E\" />"),
      css: "a { color: crimson; } img { margin-top: 8px; }",
      js: "document.getElementById(\"a\").textContent = \"JS changed my text\";",
    },
  },
  {
    id: "html-lists", name: "lists & tables", category: "html",
    tagline: "group items and show rows of data",
    overview:
      "<ul> is a bulleted list, <ol> a numbered one, and each item is an <li>. Tables use <table>, " +
      "<tr> (row), <th> (header cell) and <td> (data cell). Use tables only for real tabular data, " +
      "never for page layout (that's CSS's job).",
    syntax: L("<ul>", "  <li>one</li>", "  <li>two</li>", "</ul>"),
    flags: [
      { flag: "<ul> / <ol>", desc: "unordered (bullets) / ordered (numbers) list" },
      { flag: "<li>", desc: "one item; only valid inside ul or ol" },
      { flag: "<tr> <th> <td>", desc: "table row, header cell, data cell" },
      { flag: "<thead> <tbody>", desc: "group header rows and body rows" },
    ],
    together: [
      { cmd: "li:nth-child(even) { … }", desc: "CSS can stripe rows and style every other item without extra classes." },
      { cmd: "rows.map(r => `<tr>…</tr>`)", desc: "JS generates list items or table rows from an array of data." },
    ],
    demo: {
      html: L("<ol id=\"l\"></ol>", "<table><tr><th>Name</th><th>Age</th></tr><tr><td>Ada</td><td>36</td></tr></table>"),
      css: "td, th { border: 1px solid #ccc; padding: 4px 10px; } li:nth-child(even) { color: #4f46e5; }",
      js: "document.getElementById(\"l\").innerHTML = [\"HTML\", \"CSS\", \"JS\", \"React\"].map((x) => `<li>${x}</li>`).join(\"\");",
    },
  },
  {
    id: "structure", name: "page structure", category: "html",
    tagline: "the skeleton every page starts with",
    overview:
      "Every page has a <head> (invisible info: title, linked files) and a <body> (everything " +
      "you see). Elements are tags that open and close: <p>text</p>. Some are self-closing: <img />. " +
      "In React's JSX the rules are stricter: every tag must close.",
    syntax: L("<!DOCTYPE html>", "<html lang=\"en\">", "  <head>…</head>", "  <body>…</body>", "</html>"),
    flags: [
      { flag: "<head>", desc: "title, meta tags, and <link> to your CSS" },
      { flag: "<body>", desc: "all visible content, plus <script> at the end" },
      { flag: "<h1>–<h6>", desc: "headings: one h1 per page, then nest logically" },
      { flag: "<img alt>", desc: "images need alt text for screen readers" },
    ],
    together: [
      { cmd: "<link rel=\"stylesheet\" href=\"style.css\">", desc: "this one line plugs the CSS file into the page." },
      { cmd: "<script src=\"app.js\"></script>", desc: "plugs the JS file in. Put it last so elements exist before JS looks for them." },
    ],
    demo: { html: "<h1>Hello web</h1>\n<p>This is a <strong>paragraph</strong>.</p>", css: "", js: "" },
  },
  {
    id: "semantic", name: "semantic tags", category: "html",
    tagline: "tags that describe meaning, not looks",
    overview:
      "<div> means nothing. <nav>, <main>, <section>, <article>, <button> each say what the " +
      "content IS. That helps search engines, screen readers and you. Rule of thumb: if it " +
      "is clickable, it's a <button> or <a>, never a div.",
    syntax: "<header> <nav> <main> <section> <article> <footer>",
    flags: [
      { flag: "<button>", desc: "keyboard- and screen-reader-friendly click target" },
      { flag: "<ul><li>", desc: "lists. JS often generates these from arrays" },
      { flag: "data-id=\"3\"", desc: "custom attribute to stash data on an element for JS" },
      { flag: "class vs id", desc: "class can repeat (CSS); id must be unique (JS)" },
    ],
    together: [
      { cmd: "el.dataset.id", desc: "JS reads data-id back. This is how the sidebar knows WHICH lesson you clicked." },
      { cmd: "<main> → <Main /> in React", desc: "semantic regions later become your components." },
    ],
    demo: {
      html: L("<ul id=\"list\">", "  <li data-n=\"1\">One</li>", "  <li data-n=\"2\">Two</li>", "</ul>"),
      css: "li { cursor: pointer; padding: 4px; }",
      js: L("document.getElementById(\"list\").addEventListener(\"click\", (e) => {",
            "  e.target.textContent = \"clicked item #\" + e.target.dataset.n;",
            "});"),
    },
  },
  {
    id: "forms", name: "forms & inputs", category: "html",
    tagline: "how users give the page data",
    overview:
      "<input>, <select> and <textarea> collect data; <label> names them; a <form> groups them. " +
      "A form's submit event normally reloads the page, so JS calls preventDefault() and handles " +
      "the data itself. That is exactly what React does too.",
    syntax: "<label for=\"name\">Name</label>\n<input id=\"name\" type=\"text\" />",
    flags: [
      { flag: "for / id", desc: "ties a label to its input (clicking the label focuses it)" },
      { flag: "type", desc: "text, email, number, checkbox, password…" },
      { flag: "input.value", desc: "in JS, the current text the user typed" },
      { flag: "submit", desc: "event fired by the form on Enter / button click" },
    ],
    together: [
      { cmd: "input:focus { outline: … }", desc: "CSS pseudo-classes style states with no JS at all." },
      { cmd: "e.preventDefault()", desc: "JS stops the browser's default reload so you stay in control." },
    ],
    demo: {
      html: L("<form id=\"f\">", "  <input id=\"n\" placeholder=\"your name\" />", "  <button>Greet</button>", "</form>", "<p id=\"out\"></p>"),
      css: "input:focus { outline: 2px solid #4f46e5; } input, button { padding: 6px; }",
      js: L("document.getElementById(\"f\").addEventListener(\"submit\", (e) => {",
            "  e.preventDefault();",
            "  const name = document.getElementById(\"n\").value;",
            "  document.getElementById(\"out\").textContent = `Hello, ${name}!`;",
            "});"),
    },
  },
  /* ---- BASICS: CSS ---- */
  {
    id: "css-basics", name: "colors & text", category: "css",
    tagline: "the properties you'll reach for first",
    overview:
      "CSS is a list of property: value; pairs. Colors can be names (red), hex (#4f46e5) or rgb(). " +
      "Sizes use units: px is fixed, rem scales with the user's font size, % is relative to the " +
      "parent. Text is controlled by font-size, font-family, line-height and text-align.",
    syntax: "p {\n  color: #4f46e5;\n  font-size: 1.1rem;\n}",
    flags: [
      { flag: "color / background", desc: "text color and background color" },
      { flag: "font-size", desc: "text size (prefer rem over px)" },
      { flag: "font-family", desc: "typeface, with fallbacks: \"Inter\", sans-serif" },
      { flag: "line-height", desc: "space between lines; 1.5 reads comfortably" },
      { flag: "text-align", desc: "left, center, right" },
    ],
    together: [
      { cmd: "<p class=\"lead\">", desc: "HTML only adds the class name; the look lives in CSS, so one edit restyles every paragraph." },
      { cmd: "document.body.style.fontSize = \"20px\"", desc: "JS can set styles directly, but toggling a class is cleaner and keeps design in CSS." },
    ],
    demo: {
      html: "<p class=\"lead\">Big, colorful, centered text.</p>\n<p>Normal text.</p>",
      css: ".lead { color: #4f46e5; font-size: 1.5rem; text-align: center; line-height: 1.6; font-family: Georgia, serif; }",
      js: "",
    },
  },
  {
    id: "css-box", name: "the box model", category: "css",
    tagline: "every element is a box with layers",
    overview:
      "Every element is a rectangle made of four layers, from inside out: content, padding (space " +
      "inside), border, and margin (space outside). Set box-sizing: border-box so width includes " +
      "padding and border. Without it, sizes get surprising.",
    syntax: ".box {\n  padding: 16px;\n  border: 2px solid;\n  margin: 12px;\n}",
    flags: [
      { flag: "padding", desc: "space between content and border" },
      { flag: "border", desc: "the line around the box: width style color" },
      { flag: "margin", desc: "space outside the border, pushes neighbors away" },
      { flag: "box-sizing", desc: "border-box makes width include padding + border" },
      { flag: "border-radius", desc: "rounded corners" },
    ],
    together: [
      { cmd: "* { box-sizing: border-box; }", desc: "almost every stylesheet starts with this, including this app's style.css." },
      { cmd: "el.getBoundingClientRect()", desc: "JS can measure the final box CSS produced (position and size)." },
    ],
    demo: {
      html: "<div class=\"box\">padding 20, border 3, margin 10</div><div class=\"box\">next box</div>",
      css: "* { box-sizing: border-box; } .box { padding: 20px; border: 3px solid #4f46e5; margin: 10px; border-radius: 8px; background: #eef; }",
      js: "",
    },
  },
  {
    id: "css-display", name: "display & position", category: "css",
    tagline: "how elements flow and where they sit",
    overview:
      "display decides how an element flows: block (full-width, stacks), inline (flows within " +
      "text), inline-block (inline but sizable), none (hidden), or flex/grid. position moves " +
      "things out of normal flow: relative (nudge), absolute (place inside the nearest relative " +
      "parent), fixed (stick to the screen), sticky (stick when scrolling).",
    syntax: ".badge {\n  position: absolute;\n  top: 0;\n  right: 0;\n}",
    flags: [
      { flag: "display: block", desc: "takes the full width, starts on a new line" },
      { flag: "display: none", desc: "removes the element from the page entirely" },
      { flag: "position: relative", desc: "stays in flow; becomes the anchor for absolute children" },
      { flag: "position: absolute", desc: "placed with top/right/bottom/left in the relative parent" },
      { flag: "z-index", desc: "stacking order of overlapping elements" },
    ],
    together: [
      { cmd: ".hidden { display: none; }", desc: "CSS defines hiding; JS just toggles the .hidden class on and off." },
      { cmd: "el.hidden = true", desc: "HTML's built-in hidden attribute does the same job without writing CSS." },
    ],
    demo: {
      html: "<button id=\"b\">Toggle</button>\n<div class=\"card\" id=\"c\">I'm a card <span class=\"badge\">new</span></div>",
      css: ".card { position: relative; margin-top: 12px; padding: 16px; border: 1px solid #ccc; border-radius: 8px; } .badge { position: absolute; top: -8px; right: 8px; background: crimson; color: #fff; font-size: 12px; padding: 2px 8px; border-radius: 999px; } .hidden { display: none; }",
      js: "b.onclick = () => c.classList.toggle(\"hidden\");",
    },
  },
  {
    id: "selectors", name: "selectors & cascade", category: "css",
    tagline: "how CSS finds the elements to style",
    overview:
      "A rule = selector + declarations. The selector picks elements; declarations set properties. " +
      "When rules conflict, the more specific selector wins (id > class > tag), then the later rule. " +
      "Every element is also a box: content + padding + border + margin.",
    syntax: "selector {\n  property: value;\n}",
    flags: [
      { flag: ".card", desc: "class selector: all elements with class=\"card\"" },
      { flag: "#hero", desc: "id selector: the one element with id=\"hero\"" },
      { flag: "a:hover", desc: "pseudo-class: only while the mouse is over it" },
      { flag: "var(--x)", desc: "reads a CSS variable defined as --x: value on :root" },
    ],
    together: [
      { cmd: "el.classList.add(\"active\")", desc: "JS's best move: toggle classes. CSS owns the look, JS owns the state." },
      { cmd: "el.style.setProperty(\"--accent\", \"red\")", desc: "JS can even change CSS variables and restyle everything using them." },
    ],
    demo: {
      html: "<p class=\"note\">Hover me</p>\n<p id=\"special\" class=\"note\">I'm special (id wins)</p>",
      css: L(":root { --accent: #4f46e5; }",
             ".note { color: var(--accent); padding: 8px; border: 2px solid currentColor; }",
             ".note:hover { background: #eef; }",
             "#special { color: crimson; }"),
      js: "",
    },
  },
  {
    id: "flexbox", name: "flexbox", category: "css",
    tagline: "lay things out in one row or column",
    overview:
      "Set display: flex on a PARENT and its children line up in a row. Then align and space them. " +
      "Use flex for one dimension (navbars, button rows, a card's insides). You'll use it in almost " +
      "every React component.",
    syntax: ".row {\n  display: flex;\n  gap: 8px;\n}",
    flags: [
      { flag: "justify-content", desc: "spacing along the main axis (space-between, center…)" },
      { flag: "align-items", desc: "alignment on the cross axis (center, stretch…)" },
      { flag: "flex: 1", desc: "this child grows to fill leftover space" },
      { flag: "flex-direction", desc: "row (default) or column" },
    ],
    together: [
      { cmd: "display: flex  (on the parent)", desc: "the parent decides the layout; children just exist. Same idea as a React parent component." },
      { cmd: "container.append(newItem)", desc: "JS adds a child and flexbox places it automatically. No math needed." },
    ],
    demo: {
      html: "<div class=\"row\"><input placeholder=\"grows\" /><button id=\"b\">Add box</button></div>\n<div class=\"row\" id=\"boxes\"></div>",
      css: L(".row { display: flex; gap: 8px; margin-bottom: 8px; } input { flex: 1; }",
             ".box { width: 28px; height: 28px; background: #4f46e5; border-radius: 6px; }"),
      js: L("document.getElementById(\"b\").onclick = () => {",
            "  const d = document.createElement(\"div\");",
            "  d.className = \"box\";",
            "  document.getElementById(\"boxes\").append(d);",
            "};"),
    },
  },
  {
    id: "grid", name: "grid & responsive", category: "css",
    tagline: "rows AND columns, adapting to any screen",
    overview:
      "Grid lays out two dimensions at once. repeat(auto-fit, minmax(110px, 1fr)) means: as many " +
      "columns as fit, each at least 110px, sharing space equally. Media queries (@media) change " +
      "rules at certain screen widths. This very page uses both.",
    syntax: ".grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 8px;\n}",
    flags: [
      { flag: "1fr", desc: "one share of the free space" },
      { flag: "auto-fit", desc: "create as many columns as will fit" },
      { flag: "gap", desc: "space between cells (no margin hacks)" },
      { flag: "@media", desc: "apply rules only at certain widths" },
    ],
    together: [
      { cmd: "items.map(i => `<div>${i}</div>`)", desc: "JS builds N cells from an array; grid arranges any N. Data in, layout out." },
      { cmd: "resize the window", desc: "no JS needed: CSS alone reflows the grid. Let CSS do what CSS is good at." },
    ],
    demo: {
      html: "<div class=\"grid\" id=\"g\"></div>",
      css: L(".grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(60px, 1fr)); gap: 6px; }",
             ".grid div { background: #4f46e5; color: #fff; padding: 12px; text-align: center; border-radius: 6px; }"),
      js: "document.getElementById(\"g\").innerHTML = [1,2,3,4,5,6].map((n) => `<div>${n}</div>`).join(\"\");",
    },
  },
  /* ---- BASICS: JavaScript ---- */
  {
    id: "js-basics", name: "data types & operators", category: "js",
    tagline: "the values JS works with",
    overview:
      "Values have types: string (text), number, boolean (true/false), undefined (nothing assigned " +
      "yet) and null (deliberately empty). Operators combine them: + - * / % for math, === for " +
      "equality. Always use === (strict) instead of ==, which converts types in surprising ways. " +
      "console.log() prints to the browser console (press F12) for debugging.",
    syntax: "const age = 30;          // number\nconst name = \"Ada\";      // string\nconst ok = true;         // boolean",
    flags: [
      { flag: "typeof x", desc: "tells you a value's type: \"string\", \"number\"…" },
      { flag: "===  !==", desc: "strict equal / not equal (no type conversion)" },
      { flag: "+ - * / %", desc: "math; % is the remainder (7 % 2 → 1)" },
      { flag: "&&  ||  !", desc: "and, or, not" },
      { flag: "Number(\"5\")", desc: "convert text to a number (input values are always text)" },
    ],
    together: [
      { cmd: "input.value", desc: "always a STRING, even if the user types 5. Convert with Number() before doing math." },
      { cmd: "console.log(x)", desc: "your window into running code; check the DevTools console when something breaks." },
    ],
    demo: {
      html: "<pre id=\"out\"></pre>",
      css: "pre { background: #f3f4f6; padding: 10px; border-radius: 6px; }",
      js: L("const price = 10, qty = 3;",
            "const lines = [",
            "  `total: ${price * qty}`,",
            "  `typeof price: ${typeof price}`,",
            "  `\"5\" + 1 = ${\"5\" + 1}`,       // text + number glues together",
            "  `Number(\"5\") + 1 = ${Number(\"5\") + 1}`,",
            "  `5 === \"5\": ${5 === \"5\"}`,",
            "];",
            "out.textContent = lines.join(\"\\n\");"),
    },
  },
  {
    id: "js-control", name: "conditionals & loops", category: "js",
    tagline: "make decisions and repeat work",
    overview:
      "if / else runs code only when a condition is true. The ternary (cond ? a : b) is the " +
      "one-line version, and it's what you'll use inside JSX. Loops repeat work: for…of walks " +
      "through an array. In day-to-day modern JS you'll mostly use .map() and .filter() instead " +
      "of loops, but the idea is the same.",
    syntax: "if (age >= 18) {\n  // adult\n} else {\n  // minor\n}\n\nfor (const item of items) { /* … */ }",
    flags: [
      { flag: "if / else if / else", desc: "branching on conditions" },
      { flag: "cond ? a : b", desc: "ternary: pick one of two values" },
      { flag: "for…of", desc: "loop over each item of an array" },
      { flag: "cond && value", desc: "short-circuit: value only if cond is truthy" },
    ],
    together: [
      { cmd: "el.classList.toggle(\"done\", isDone)", desc: "a condition in JS decides which CSS class the element gets." },
      { cmd: "{isDone ? <Check /> : <Todo />}", desc: "the same ternary shows different UI in React." },
    ],
    demo: {
      html: "<input id=\"n\" type=\"number\" value=\"15\" /> <button id=\"b\">check</button><p id=\"out\"></p>",
      css: "input { width: 70px; padding: 4px; } .ok { color: green; } .no { color: crimson; }",
      js: L("b.onclick = () => {",
            "  const n = Number(document.getElementById(\"n\").value);",
            "  const fizz = [];",
            "  for (let i = 1; i <= n; i++) {          // loop",
            "    if (i % 15 === 0) fizz.push(\"FizzBuzz\");",
            "    else if (i % 3 === 0) fizz.push(\"Fizz\");  // branch",
            "    else if (i % 5 === 0) fizz.push(\"Buzz\");",
            "    else fizz.push(i);",
            "  }",
            "  out.className = n >= 10 ? \"ok\" : \"no\";   // ternary → CSS class",
            "  out.textContent = fizz.join(\", \");",
            "};"),
    },
  },
  {
    id: "js-data", name: "objects & arrays", category: "js",
    tagline: "group related data together",
    overview:
      "An array is an ordered list: [\"a\", \"b\"], accessed by position starting at 0. An object " +
      "is a set of named values: { name: \"Ada\", age: 36 }, accessed by key. Combine them (an array " +
      "of objects) and you have a database in miniature. This file's LESSONS list is exactly that.",
    syntax: "const user = { name: \"Ada\", age: 36 };\nconst langs = [\"HTML\", \"CSS\", \"JS\"];",
    flags: [
      { flag: "obj.key", desc: "read a property (obj[\"key\"] also works)" },
      { flag: "arr[0]", desc: "first item; arr.length is the item count" },
      { flag: "arr.push(x)", desc: "add to the end (mutates, so prefer [...arr, x] in React)" },
      { flag: "{ ...obj, k: v }", desc: "copy an object with one field changed" },
      { flag: "JSON.stringify", desc: "turn data into text (to store or send it)" },
    ],
    together: [
      { cmd: "const LESSONS = [ {…}, {…} ]", desc: "this app's whole content is data like this; JS turns it into HTML and CSS styles it." },
      { cmd: "<Card {...lesson} />", desc: "in React, objects become props, spread onto components." },
    ],
    demo: {
      html: "<pre id=\"out\"></pre>",
      css: "pre { background: #f3f4f6; padding: 10px; border-radius: 6px; }",
      js: L("const user = { name: \"Ada\", langs: [\"HTML\", \"CSS\", \"JS\"] };",
            "const updated = { ...user, langs: [...user.langs, \"React\"] };  // copy, don't mutate",
            "out.textContent =",
            "  `first: ${user.langs[0]}\\n` +",
            "  `count before: ${user.langs.length}\\n` +",
            "  `count after: ${updated.langs.length}\\n` +",
            "  JSON.stringify(updated);"),
    },
  },
  {
    id: "functions", name: "variables & functions", category: "js",
    tagline: "store values, package logic",
    overview:
      "const holds a value that won't be reassigned; let can change. Functions package logic; arrow " +
      "functions are the short form. Template literals (backticks) embed values with ${}. " +
      "Destructuring pulls fields out of objects. React code is full of all four.",
    syntax: "const greet = (name) => `Hi ${name}!`;\nconst { id, title } = task;",
    flags: [
      { flag: "const / let", desc: "prefer const; use let only when it must change" },
      { flag: "(a) => a * 2", desc: "arrow function with implicit return" },
      { flag: "`${x}`", desc: "template literal for building strings" },
      { flag: "{ a, b } = obj", desc: "destructuring: pull fields out" },
    ],
    together: [
      { cmd: "button.onclick = greet", desc: "functions are values: hand them to the DOM to run later, on an event." },
      { cmd: "out.textContent = greet(\"Ada\")", desc: "function result → DOM → the browser repaints with your CSS." },
    ],
    demo: {
      html: "<p id=\"out\"></p>",
      css: "p { font-size: 20px; }",
      js: L("const greet = ({ name, age }) => `Hi ${name}, you are ${age}!`;",
            "document.getElementById(\"out\").textContent = greet({ name: \"Ada\", age: 36 });"),
    },
  },
  {
    id: "dom", name: "the DOM", category: "js",
    tagline: "the live tree JS uses to control the page",
    overview:
      "The browser turns your HTML into a tree of objects: the DOM. JavaScript can find nodes, " +
      "change text, toggle classes, and create or remove elements. Every change is repainted " +
      "instantly. React exists to manage these updates for you.",
    syntax: "const el = document.querySelector(\".card\");\nel.textContent = \"new text\";",
    flags: [
      { flag: "querySelector", desc: "find the first element matching a CSS selector" },
      { flag: "textContent", desc: "read/set text (safe from injected HTML)" },
      { flag: "classList", desc: "add / remove / toggle CSS classes" },
      { flag: "createElement", desc: "build a new element, then .append() it" },
    ],
    together: [
      { cmd: "querySelector(\".card\")", desc: "uses the exact same selector syntax as CSS. One skill, two languages." },
      { cmd: "replaceChildren(...)", desc: "this app redraws its sidebar this way every time state changes." },
    ],
    demo: {
      html: "<button id=\"b\">Add item</button><ul id=\"u\"></ul>",
      css: "li { color: #4f46e5; }",
      js: L("let n = 0;",
            "document.getElementById(\"b\").onclick = () => {",
            "  const li = document.createElement(\"li\");   // 1. create",
            "  li.textContent = \"item \" + (++n);            // 2. fill",
            "  document.getElementById(\"u\").append(li);    // 3. attach",
            "};"),
    },
  },
  {
    id: "events", name: "events", category: "js",
    tagline: "react to clicks, typing and more",
    overview:
      "An event is something the user does. You register a function with addEventListener and the " +
      "browser calls it when the event happens. The event object tells you what exactly happened. " +
      "Pattern: event → update data → redraw. React's onClick follows it too.",
    syntax: "el.addEventListener(\"click\", (event) => {\n  // react here\n});",
    flags: [
      { flag: "click", desc: "mouse / tap / keyboard activation" },
      { flag: "input", desc: "fires on every keystroke in a field" },
      { flag: "event.target", desc: "the exact element that was interacted with" },
      { flag: "delegation", desc: "one listener on a parent handles all children" },
    ],
    together: [
      { cmd: "search.addEventListener(\"input\", …)", desc: "typing here filters lessons live: input event → state.query changes → render()." },
      { cmd: "event.target.closest(\"[data-id]\")", desc: "find which card was clicked using the data-* attribute from HTML." },
    ],
    demo: {
      html: "<button id=\"b\">Clicked 0 times</button>",
      css: "button { padding: 10px 16px; border-radius: 8px; }",
      js: L("let count = 0;                       // STATE",
            "const b = document.getElementById(\"b\");",
            "b.addEventListener(\"click\", () => {",
            "  count++;                          // change state",
            "  b.textContent = `Clicked ${count} times`; // redraw",
            "});"),
    },
  },
  {
    id: "arrays", name: "map & filter", category: "js",
    tagline: "turn data lists into UI lists",
    overview:
      ".map() transforms every item into something else (data → HTML). .filter() keeps only items " +
      "that pass a test. Neither changes the original array: they return new ones. This is the " +
      "single most-used pair in React.",
    syntax: "const names = users.map((u) => u.name);\nconst adults = users.filter((u) => u.age >= 18);",
    flags: [
      { flag: ".map(fn)", desc: "new array, same length, each item transformed" },
      { flag: ".filter(fn)", desc: "new array with only items where fn returns true" },
      { flag: ".find(fn)", desc: "first matching item (or undefined)" },
      { flag: "[...arr, x]", desc: "spread: copy an array while adding x" },
    ],
    together: [
      { cmd: "list.innerHTML = items.map(…).join(\"\")", desc: "data array → HTML strings → DOM. CSS styles the result." },
      { cmd: "{items.map(i => <li key={i.id}>…)}", desc: "the React version of the exact same idea." },
    ],
    demo: {
      html: "<input id=\"q\" placeholder=\"filter fruit…\" /><ul id=\"u\"></ul>",
      css: "li { padding: 2px 0; }",
      js: L("const fruit = [\"apple\", \"banana\", \"cherry\", \"grape\"];",
            "const draw = (q) => {",
            "  document.getElementById(\"u\").innerHTML = fruit",
            "    .filter((f) => f.includes(q))              // pick",
            "    .map((f) => `<li>${f}</li>`).join(\"\");     // transform",
            "};",
            "document.getElementById(\"q\").oninput = (e) => draw(e.target.value);",
            "draw(\"\");"),
    },
  },
  {
    id: "render-loop", name: "state & render loop", category: "together",
    tagline: "the pattern that leads straight into React",
    overview:
      "Keep your app's data in ONE object (state). Write ONE function (render) that turns state " +
      "into DOM. When an event fires, change the state and call render. You never poke the page " +
      "piecemeal. That is UI = f(state), the core idea of React.",
    syntax: "let state = { items: [] };\nconst render = () => { /* state → DOM */ };",
    flags: [
      { flag: "state", desc: "the single source of truth for what's on screen" },
      { flag: "render()", desc: "pure-ish function: same state, same screen" },
      { flag: "events", desc: "the only places allowed to change state" },
      { flag: "immutability", desc: "make new arrays/objects; don't edit in place" },
    ],
    together: [
      { cmd: "state.activeId = id; render();", desc: "this very app: click a card → set activeId → render() redraws sidebar and viewer." },
      { cmd: "const [x, setX] = useState(…)", desc: "React's version: setX changes state and React calls render for you." },
    ],
    demo: {
      html: "<button id=\"add\">Add task</button><ul id=\"u\"></ul>",
      css: "li { padding: 3px 0; cursor: pointer; } .done { text-decoration: line-through; color: gray; }",
      js: L("let state = { tasks: [] };                       // STATE",
            "const render = () => {                           // RENDER",
            "  u.innerHTML = state.tasks.map((t) =>",
            "    `<li class=\"${t.done ? \"done\" : \"\"}\" data-id=\"${t.id}\">${t.title}</li>`).join(\"\");",
            "};",
            "const u = document.getElementById(\"u\");",
            "add.onclick = () => {                             // EVENT",
            "  state.tasks = [...state.tasks, { id: Date.now(), title: \"task \" + (state.tasks.length + 1), done: false }];",
            "  render();",
            "};",
            "u.onclick = (e) => {                              // EVENT",
            "  const id = Number(e.target.dataset.id);",
            "  state.tasks = state.tasks.map((t) => t.id === id ? { ...t, done: !t.done } : t);",
            "  render();",
            "};"),
    },
  },
];

const CATEGORIES = ["all", "html", "css", "js", "together"];
const GLYPH = { html: "<>", css: "{}", js: "()", together: "+" };

/* -------------------------------------------------------------------------
   2. STATE
   Everything the screen shows is derived from this one object.
   Favorites persist via localStorage (wrapped in try/catch: it can fail).
   ------------------------------------------------------------------------- */
const loadFavs = () => {
  try { return new Set(JSON.parse(localStorage.getItem("webschool-favs") || "[]")); }
  catch { return new Set(); }
};
const state = { activeId: LESSONS[0].id, query: "", category: "all", favsOnly: false, favs: loadFavs() };

const saveFavs = () => {
  try { localStorage.setItem("webschool-favs", JSON.stringify([...state.favs])); } catch {}
};

/* -------------------------------------------------------------------------
   3. DOM HELPERS
   h() = "hyperscript": builds an element from (tag, props, ...children).
   Using textContent/append(string) instead of innerHTML keeps text safe from
   injected HTML. This function is basically what React.createElement is,
   and JSX is just a nicer way to write calls to it.
   ------------------------------------------------------------------------- */
const h = (tag, props = {}, ...kids) => {
  const el = document.createElement(tag);
  for (const [key, val] of Object.entries(props)) {
    if (key === "class") el.className = val;
    else if (val !== false && val != null) el.setAttribute(key, val);
  }
  el.append(...kids.flat().filter((k) => k != null && k !== false));
  return el;
};

// Grab the empty slots that index.html left for us (HTML ⇄ JS handshake: ids)
const $ = (id) => document.getElementById(id);
const searchInput = $("search-input"), searchCount = $("search-count");
const filterRow = $("filter-row"), nav = $("cmd-nav"), viewer = $("viewer");
const favsToggle = $("favs-toggle"), favsLabel = $("favs-toggle-label"), toastEl = $("toast");

/* -------------------------------------------------------------------------
   4. DERIVED DATA: computed from state each render, never stored separately
   ------------------------------------------------------------------------- */
const getVisible = () => {
  const q = state.query.trim().toLowerCase();
  return LESSONS
    .filter((l) => state.category === "all" || l.category === state.category)
    .filter((l) => !state.favsOnly || state.favs.has(l.id))
    .filter((l) => {
      if (!q) return true;
      const haystack = [l.name, l.tagline, l.overview, ...l.flags.map((f) => f.flag + f.desc)].join(" ").toLowerCase();
      return haystack.includes(q);
    });
};

/* -------------------------------------------------------------------------
   5. RENDER FUNCTIONS: state → DOM. Each is a tiny "component".
   CSS classes (cmd-card-active etc.) are how JS state becomes visual style.
   ------------------------------------------------------------------------- */
const renderFilters = () =>
  filterRow.replaceChildren(
    ...CATEGORIES.map((c) =>
      h("button", { class: "filter-chip" + (state.category === c ? " filter-chip-active" : ""), "data-cat": c, type: "button" }, c)
    )
  );

const renderNav = (visible) => {
  searchCount.textContent = state.query ? `${visible.length}` : "";
  if (!visible.length) return nav.replaceChildren(h("p", { class: "nav-empty" }, "no lessons match."));
  nav.replaceChildren(
    ...visible.map(({ id, name, category, tagline }) =>        // destructuring + map
      h("button", { class: "cmd-card" + (id === state.activeId ? " cmd-card-active" : ""), "data-id": id, type: "button" },
        h("span", { class: "cmd-card-top" },
          h("span", { class: "cmd-card-name" }, h("span", { class: "prompt-glyph" }, GLYPH[category]), name),
          h("span", { class: "cmd-card-star" + (state.favs.has(id) ? " cmd-card-star-active" : ""), "data-fav": id },
            state.favs.has(id) ? "★" : "☆")),
        h("span", { class: "cmd-card-tagline" }, tagline))
    )
  );
};

// A code line with a copy button. data-copy holds the text JS will copy.
const codeRow = (text) =>
  h("div", { class: "code-row" },
    h("code", { class: "code-block" }, text),
    h("button", { class: "copy-btn", type: "button", "data-copy": text }, "copy"));

// Live preview: HTML + CSS + JS are glued into ONE tiny page inside an iframe.
// sandbox="allow-scripts" lets the demo run JS but keeps it isolated from this page.
const buildDoc = ({ html, css, js }) =>
  `<!DOCTYPE html><meta charset="utf-8"><style>body{font:14px system-ui;margin:12px;color:#1f2430}${css}</style>` +
  `${html}<script>${js}<\/script>`;

const demoBlock = (demo) => {
  const part = (label, code) =>
    code ? h("div", { class: "term-example" }, h("span", { class: "term-example-label" }, label),
             h("pre", { class: "term-output" }, code)) : null;
  const frameSlot = h("div", {});
  const runBtn = h("button", { class: "run-btn", type: "button", "data-run": "1" }, "▶ run it");
  runBtn._frameSlot = frameSlot; // remember where to put the iframe
  return h("div", { class: "term-window" },
    h("div", { class: "term-chrome" }, h("span", { class: "term-dot term-dot-a" }),
      h("span", { class: "term-dot term-dot-b" }), h("span", { class: "term-dot term-dot-c" }),
      h("span", { class: "term-title" }, "demo.html + style.css + app.js")),
    h("div", { class: "term-body" },
      part("html", demo.html), part("css", demo.css), part("js", demo.js),
      h("div", { class: "demo-actions" }, runBtn), frameSlot),
    h("div", { style: "height:14px" }));
};

const renderViewer = () => {
  const l = LESSONS.find((x) => x.id === state.activeId);
  if (!l) return viewer.replaceChildren(h("p", { class: "viewer-empty" }, "pick a lesson from the sidebar."));
  const fav = state.favs.has(l.id);
  viewer.replaceChildren(
    h("div", { class: "viewer-header" },
      h("div", { class: "viewer-header-title" },
        h("span", { class: "prompt-glyph prompt-glyph-lg" }, GLYPH[l.category]),
        h("h1", {}, l.name), h("span", { class: "viewer-category-badge" }, l.category)),
      h("button", { class: "fav-button" + (fav ? " fav-button-active" : ""), "data-fav": l.id, type: "button" },
        fav ? "★ favorited" : "☆ favorite")),
    h("p", { class: "viewer-tagline" }, l.tagline),
    h("section", { class: "viewer-section" }, h("h2", { class: "section-heading" }, "overview"),
      h("p", { class: "section-body" }, l.overview)),
    h("section", { class: "viewer-section" }, h("h2", { class: "section-heading" }, "syntax & key parts"),
      codeRow(l.syntax),
      h("ul", { class: "flag-list" },
        l.flags.map(({ flag, desc }) =>
          h("li", { class: "flag-row" }, h("code", { class: "flag-code" }, flag), h("span", { class: "flag-desc" }, desc))))),
    h("section", { class: "viewer-section" }, h("h2", { class: "section-heading" }, "how it works with the others"),
      h("ul", { class: "pipe-list" },
        l.together.map(({ cmd, desc }) =>
          h("li", { class: "pipe-row" }, codeRow(cmd), h("p", { class: "pipe-desc" }, desc))))),
    h("section", { class: "viewer-section" }, h("h2", { class: "section-heading" }, "try it live"), demoBlock(l.demo))
  );
  viewer.scrollTop = 0;
  window.scrollTo(0, 0);
};

// THE render loop. Any state change → call this → UI matches state.
const render = () => {
  const visible = getVisible();
  renderFilters();
  renderNav(visible);
  favsToggle.setAttribute("aria-pressed", String(state.favsOnly));
  favsLabel.textContent = state.favsOnly ? "showing favorites" : "show favorites only";
};

/* -------------------------------------------------------------------------
   6. EVENTS: the ONLY code that changes state. Event delegation: one listener
   per container instead of one per button, and it keeps working after
   renderNav() rebuilds the buttons.
   ------------------------------------------------------------------------- */
let toastTimer;
const toast = (msg) => {
  toastEl.textContent = msg;
  toastEl.classList.add("toast-visible");        // CSS fades it in
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove("toast-visible"), 1400);
};

const toggleFav = (id) => {
  state.favs.has(id) ? state.favs.delete(id) : state.favs.add(id);
  saveFavs(); render(); renderViewer();
};

searchInput.addEventListener("input", (e) => { state.query = e.target.value; render(); });

favsToggle.addEventListener("click", () => { state.favsOnly = !state.favsOnly; render(); });

filterRow.addEventListener("click", (e) => {
  const chip = e.target.closest("[data-cat]");     // data-cat was set in renderFilters
  if (chip) { state.category = chip.dataset.cat; render(); }
});

nav.addEventListener("click", (e) => {
  const star = e.target.closest("[data-fav]");
  if (star) return toggleFav(star.dataset.fav);    // star first: it sits inside the card
  const card = e.target.closest("[data-id]");
  if (card) { state.activeId = card.dataset.id; render(); renderViewer(); }
});

viewer.addEventListener("click", async (e) => {
  const fav = e.target.closest("[data-fav]");
  if (fav) return toggleFav(fav.dataset.fav);

  const copy = e.target.closest("[data-copy]");
  if (copy) {
    try { await navigator.clipboard.writeText(copy.dataset.copy); toast("copied to clipboard"); }
    catch { toast("copy not available here"); }
  }

  const run = e.target.closest("[data-run]");
  if (run) {
    const lesson = LESSONS.find((x) => x.id === state.activeId);
    run._frameSlot.replaceChildren(
      h("iframe", { class: "preview-frame", sandbox: "allow-scripts", title: "live preview", srcdoc: buildDoc(lesson.demo) })
    );
    run.textContent = "↻ run again";
  }
});

/* -------------------------------------------------------------------------
   7. FIRST PAINT: in React this happens automatically when the app mounts.
   ------------------------------------------------------------------------- */
render();
renderViewer();
