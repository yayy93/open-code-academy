# Open Code Academy — HTML Foundations MVP

An experimental offline-first Windows HTML learning app. No accounts, cloud services, or package installation required.

## Start on Windows
1. Download and extract the ZIP archive.
2. Double-click `Start-Academy.bat`, or open `index.html` in Edge/Chrome.
3. Complete the five included exercises offline.

This prototype opens a local HTML file directly; it does not require a server. Progress is stored in the browser's localStorage for the file origin. **Browser handling of file:// localStorage varies**: verify that progress survives browser restarts on the target Windows laptop. For production, use a bundled local HTTP server or packaged desktop app with reliable persistent storage.

## Current features
- Five interactive HTML lessons with hints and rule-based validation
- Sandboxed HTML preview (scripts disabled)
- Local saved code and completion progress, subject to browser file-storage behavior
- No dependencies, CDN assets, telemetry, or internet calls

## Limitations and next steps
- This is a five-lesson proof of concept, not the full ten-lesson syllabus.
- The checker is intentionally simple and tests DOM structure, not visual appearance or HTML validity.
- The preview is sandboxed without scripts; still treat submitted code as untrusted.
- Lesson 4 tests image markup, but no image asset is bundled, so the sample image may not display.
- Test persistence on Windows; then migrate to a bundled local server with reliable storage before public release.
- Add lesson authoring format, accessibility checks, localization, and more lessons.
- Do not use this validation approach to execute untrusted Java/Python programs.

## Files
- `index.html`: page structure
- `style.css`: styling
- `lessons.js`: lesson content and answer checks
- `progress.js`: pure helpers for reading saved progress
- `app.js`: page behaviour and saving
- `Start-Academy.bat`: Windows launcher (kept with CRLF line endings by `.gitattributes`)
- `tests/`: automated tests

Scripts are plain classic `<script>` files with no build step. Do not convert them to ES modules or load files with `fetch()`: Chromium blocks both on `file://` pages.

## Running the tests
No installation is needed.

- **Validator tests:** open `tests/validators.html` in a browser. It checks every lesson against known correct and incorrect answers, and confirms that each lesson's starter code does not already pass.
- **Unit tests:** with Node.js 20 or newer, run `node --test` from the project folder. These cover saved-progress parsing and the structure of `lessons.js`.

When you add or change a lesson, add matching cases to `tests/validators.html`.
