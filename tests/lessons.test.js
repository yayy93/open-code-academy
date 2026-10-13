// Structural checks on lessons.js. Run with: node --test
// Validator behaviour needs a real DOM, so it is tested in tests/validators.html.
const test = require('node:test');
const assert = require('node:assert/strict');
const { loadScript } = require('./load-script');

const LESSONS = loadScript('lessons.js')('LESSONS');
const TEXT_FIELDS = ['title', 'explanation', 'challenge', 'starter', 'hint'];

test('there is at least one lesson', () => {
  assert.ok(Array.isArray(LESSONS));
  assert.ok(LESSONS.length > 0);
});

LESSONS.forEach((lesson, i) => {
  test(`lesson ${i} has every required field`, () => {
    for (const field of TEXT_FIELDS) {
      assert.equal(typeof lesson[field], 'string', `${field} should be a string`);
      assert.ok(lesson[field].trim(), `${field} should not be empty`);
    }
    assert.equal(typeof lesson.test, 'function', 'test should be a function');
  });
});

test('lesson titles are unique', () => {
  const titles = LESSONS.map(lesson => lesson.title);
  assert.equal(new Set(titles).size, titles.length);
});
