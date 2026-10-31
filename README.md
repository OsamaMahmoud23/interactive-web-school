🎓 WebSchool — Interactive Web Development Lab

Learn HTML, CSS, and Modern JavaScript by running them live.

WebSchool is an interactive, zero-build, vanilla JavaScript educational platform designed to teach the fundamentals of modern web development. It demonstrates how HTML, CSS, and JavaScript interact together using the core state-driven rendering pattern (DATA -> STATE -> RENDER -> EVENTS).

✨ Features

⚡ Zero Build Step: Runs directly in the browser using pure Vanilla JavaScript, HTML5, and CSS3.

🧪 Live Code Sandbox: Embedded iframe preview system allowing users to run interactive demos safely.

🗂️ Categorized Lessons:

HTML: Semantic tags, Page Structure, Forms & Inputs, Lists & Tables.

CSS: Box Model, Flexbox, Grid, Custom Properties (Variables), & Positioning.

JavaScript: ES6+ Syntax, DOM Manipulation, Event Handling, Array methods (map, filter).

Together: Reactive UI architecture and State Management loops leading up to React concepts.

🔍 Real-time Search & Filter: Search across all lesson contents, tags, and code snippets dynamically.

⭐ Favorites & Persistence: Star key lessons with client-side state saved directly in localStorage.

🎨 Dark Terminal UI: Clean, developer-centric UI styled with JetBrains Mono design tokens.

🛠️ Architecture & Core Concepts

This application serves as a living lesson for understanding frontend fundamentals before transitioning to frameworks like React:

[ DATA STORE ] ──► [ STATE ] ──► [ RENDER LOOP ] ──► [ INTERACTIVE DOM ]
                                        ▲                     │
                                        └──── [ EVENTS ] ◄────┘



Data Store: Plain JavaScript objects representing learning modules.

State-Driven UI: Everything rendered is a pure function of the application state.

Hyperscript Engine (h function): Custom lightweight DOM helper mimicking React.createElement.

🚀 Quick Start

No Node.js or package manager (npm / yarn) required!

Clone the repository:

git clone https://github.com/YOUR_USERNAME/webschool.git



Open index.html directly in any web browser or use VS Code Live Server.

📁 Project Structure

webschool/
├── index.html   # Semantic layout structure (Nouns)
├── style.css    # Design tokens, layouts, and dark theme (Adjectives)
└── app.js       # Store, state management, render engine & demos (Verbs)



📜 License

Distributed under the MIT License. See LICENSE for more information.
