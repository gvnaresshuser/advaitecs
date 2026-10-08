//7. Combining Exports from an Index File (Barrel Export)
//4. index.js (barrel file)
export { default as sayHello } from './sayHello';//exporting as named export
// Note: This is a default export from sayHello.js, but we are exporting it as a named export here.
// This allows us to import it using named imports in other files.
export { greet } from './greet';
export { add } from './math';

/*
File contents for each module referenced in your utils/index.js barrel file:

📁 utils/
├── sayHello.js
├── greet.js
├── math.js
└── index.js
*/