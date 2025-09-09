1. What is the difference between var, let, and const?

Answer:

JavaScript provides three ways to declare variables: var, let, and const, but they differ in scope, hoisting behaviour, and re-assignment rules.
var → Function or global scope. Allows re-declaration and updates within the same scope.
let → Block scope. Allows updates but not re-declaration in the same block.
const → Block scope. Cannot be reassigned after the initial assignment.


2) What is the difference between map(), forEach(), and filter?

Answer:

forEach
Executes a provided function once for each array element.
Does not return a new array (returns undefined).
Used mainly for side effects like logging or updating values.
map
Creates a new array by transforming each element.
Does not modify the original array.
Best when you need a new array with changed data.
filter
Creates a new array with only elements that pass a test.
Does not modify the original array.
Useful for selecting a subset of data.


3) What are arrow functions in ES6?

Answer:

Arrow functions provide a shorter and cleaner syntax for writing functions. They were introduced in ES6 to make code more concise and organized. They also handle the this keyword differently, making them useful in many scenarios.


4) How does destructuring assignment work in ES6?

Answer:

Destructuring allows extracting values from arrays or objects into variables in a concise way.
Array Destructuring → Assign array values directly to variables.
Object Destructuring → Extract properties into variables.
Default Values → Use fallback values if something is missing.
Skipping Items → Ignore certain values when extracting.
Nested Destructuring → Extract values from nested arrays/objects in one step.
This makes code shorter, cleaner, and easier to understand.


5) Explain template literals in ES6. How are they different from string concatenation?

Answer:

Template literals are strings written with backticks. They:
Allow variable interpolation with ${ }.
Support multiline strings.
Can include expressions directly.
Difference from Concatenation:
Concatenation with + is longer and harder to read.
Template literals are cleaner, easier, and more flexible.