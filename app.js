/*
 * Open Code Academy: page behaviour.
 * Depends on LESSONS (lessons.js) and the progress helpers (progress.js),
 * which must be loaded first.
 */

const $ = id => document.getElementById(id);

let current = 0;

// ---- Saved progress -------------------------------------------------------

let saved;
try {
  saved = parseProgress(localStorage.getItem(PROGRESS_KEY));
} catch {
  // Storage itself is unavailable (e.g. blocked by browser settings).
  saved = parseProgress(null);
}

/** Writes progress to localStorage, warning the student if that fails. */
function persist() {
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(saved));
  } catch {
    $('feedback').textContent = 'Storage unavailable. Your work may not persist.';
  }
}

// ---- Rendering ------------------------------------------------------------

/** Rebuilds the lesson list and the progress summary. */
function renderNav() {
  $('lessons').replaceChildren();
  LESSONS.forEach((lesson, i) => {
    const button = document.createElement('button');
    button.textContent = (saved.done[i] ? '✓ ' : '') + lesson.title;
    button.className = i === current ? 'active' : '';
    button.onclick = () => openLesson(i);
    $('lessons').append(button);
  });
  $('progress').textContent = `${countCompleted(saved.done)} of ${LESSONS.length} lessons completed`;
}

/** Shows lesson `i`, restoring the student's saved code if there is any. */
function openLesson(i) {
  current = i;
  const lesson = LESSONS[i];
  $('title').textContent = lesson.title;
  $('explanation').textContent = lesson.explanation;
  $('challenge').textContent = lesson.challenge;
  $('editor').value = saved.code[i] ?? lesson.starter;
  $('feedback').textContent = '';
  preview();
  renderNav();
}

/** Renders the editor contents in the sandboxed iframe. */
function preview() {
  // The iframe's empty sandbox attribute blocks scripts and top-level navigation.
  $('preview').srcdoc = $('editor').value;
}

// ---- Event handlers -------------------------------------------------------

// Autosave on every keystroke.
$('editor').addEventListener('input', () => {
  saved.code[current] = $('editor').value;
  persist();
});

$('run').onclick = preview;

$('hint').onclick = () => {
  $('feedback').textContent = LESSONS[current].hint;
};

$('check').onclick = () => {
  // Parse rather than execute the student's code; DOMParser never runs scripts.
  const html = $('editor').value;
  const doc = new DOMParser().parseFromString(html, 'text/html');

  let passed = false;
  try {
    passed = !!LESSONS[current].test(doc);
  } catch {
    // A test that throws counts as a failed check.
  }

  if (passed) {
    saved.done[current] = true;
    persist();
    $('feedback').textContent = '✓ Great work! Lesson complete.';
    renderNav();
  } else {
    $('feedback').textContent = 'Not quite. Review the challenge or request a hint.';
  }
  preview();
};

openLesson(0);
