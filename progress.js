/*
 * Pure helpers for saved student progress. They have no DOM or storage access,
 * so they can be unit-tested in Node (see tests/progress.test.js).
 *
 * Saved progress shape (version 1):
 *   {
 *     code: { [lessonIndex]: "<student html>" },
 *     done: { [lessonIndex]: true }
 *   }
 */
const PROGRESS_KEY = 'oca-html-mvp-v1';

/**
 * Turns the raw string read from storage into a progress object.
 * Missing or unparseable data yields empty progress.
 * @param {string|null} raw
 */
function parseProgress(raw) {
  let saved;
  try {
    saved = JSON.parse(raw || '{}');
  } catch {
    saved = {};
  }
  saved.code ??= {};
  saved.done ??= {};
  return saved;
}

/**
 * Counts lessons marked as completed.
 * @param {Object<string, boolean>} done
 */
function countCompleted(done) {
  return Object.values(done).filter(Boolean).length;
}
