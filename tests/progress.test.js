// Unit tests for progress.js. Run with: node --test
const test = require('node:test');
const assert = require('node:assert/strict');
const { loadScript } = require('./load-script');

const evaluate = loadScript('progress.js');
const parseProgress = evaluate('parseProgress');
const countCompleted = evaluate('countCompleted');

// Objects created inside the VM have a different Object.prototype, so compare
// through JSON rather than with deepEqual's prototype check.
const plain = value => JSON.parse(JSON.stringify(value));

test('storage key is unchanged, so existing saved progress still loads', () => {
  assert.equal(evaluate('PROGRESS_KEY'), 'oca-html-mvp-v1');
});

test('no saved data gives empty progress', () => {
  assert.deepEqual(plain(parseProgress(null)), { code: {}, done: {} });
  assert.deepEqual(plain(parseProgress('')), { code: {}, done: {} });
});

test('corrupt JSON gives empty progress instead of throwing', () => {
  assert.deepEqual(plain(parseProgress('{not json')), { code: {}, done: {} });
});

test('saved code and completion are preserved', () => {
  const raw = JSON.stringify({ code: { 0: '<h1>Hi</h1>' }, done: { 0: true } });
  assert.deepEqual(plain(parseProgress(raw)), { code: { 0: '<h1>Hi</h1>' }, done: { 0: true } });
});

test('missing fields are filled in', () => {
  assert.deepEqual(plain(parseProgress('{"done":{"2":true}}')), { code: {}, done: { 2: true } });
  assert.deepEqual(plain(parseProgress('{"code":{"1":"<p>x</p>"}}')), { code: { 1: '<p>x</p>' }, done: {} });
});

test('countCompleted counts only truthy entries', () => {
  assert.equal(countCompleted({}), 0);
  assert.equal(countCompleted({ 0: true, 1: false, 3: true }), 2);
});
