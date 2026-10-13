/*
 * Loads one of the app's classic browser scripts into an isolated Node VM
 * context, so tests can use its top-level functions and constants without a
 * browser and without adding module.exports to shipped code.
 */
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

/**
 * @param {string} file  Path relative to the project root, e.g. 'progress.js'.
 * @returns {(expression: string) => any}  Evaluates an expression in the script's scope.
 */
function loadScript(file) {
  const context = vm.createContext({});
  const source = fs.readFileSync(path.join(__dirname, '..', file), 'utf8');
  vm.runInContext(source, context, { filename: file });
  // Top-level const/let live in the context's script scope, not on the global
  // object, so they are read back by evaluating an expression in that context.
  return expression => vm.runInContext(expression, context);
}

module.exports = { loadScript };
