/*
 * HTML Foundations lessons.
 *
 * Each lesson has:
 *   title        Shown in the lesson list and as the lesson heading.
 *   explanation  Short teaching text.
 *   challenge    What the student must build.
 *   starter      Code placed in the editor when the lesson is first opened.
 *   hint         Shown when the student presses "Hint".
 *   test(doc)    Returns true when the answer is correct. `doc` is the student's
 *                code parsed by DOMParser, so student scripts never run.
 *
 * Loaded as a classic script (not an ES module) so the app works from file://.
 */
const LESSONS = [
  {
    title: '1. Your First Heading',
    explanation: 'HTML uses tags to describe content. The <h1> element creates a main heading.',
    challenge: 'Create an h1 heading containing exactly Hello, Ethiopia!',
    starter: '<h1></h1>',
    hint: 'Put Hello, Ethiopia! between <h1> and </h1>.',
    test: doc => doc.querySelector('h1')?.textContent.trim() === 'Hello, Ethiopia!'
  },
  {
    title: '2. Headings and Paragraphs',
    explanation: 'Use <h1> for a main heading and <p> for paragraphs.',
    challenge: 'Create one h1 heading and at least two nonempty paragraphs.',
    starter: '<h1>My Story</h1>\n<p></p>\n<p></p>',
    hint: 'Use two separate <p>...</p> elements.',
    test: doc =>
      !!doc.querySelector('h1') &&
      [...doc.querySelectorAll('p')].filter(e => e.textContent.trim()).length >= 2
  },
  {
    title: '3. Links',
    explanation: 'The <a> element creates links. Its href attribute tells the browser where to go.',
    challenge: 'Create a link with a nonempty href and visible text.',
    starter: '<a href=""></a>',
    hint: 'Example: <a href="https://example.org">Visit example</a>',
    test: doc =>
      [...doc.querySelectorAll('a[href]')].some(
        e => e.getAttribute('href')?.trim() && e.textContent.trim()
      )
  },
  {
    title: '4. Images',
    explanation: 'The <img> element displays images. The alt attribute describes the image for accessibility.',
    challenge: 'Create an img with a nonempty src and descriptive alt attribute.',
    starter: '<img src="" alt="">',
    hint: 'Use <img src="photo.jpg" alt="A mountain at sunrise">. The file may not exist in this starter project.',
    test: doc =>
      [...doc.querySelectorAll('img')].some(
        e => e.getAttribute('src')?.trim() && e.getAttribute('alt')?.trim()
      )
  },
  {
    title: '5. Lists',
    explanation: 'Use <ul> for bullet lists, <ol> for numbered lists, and <li> for each item.',
    challenge: 'Create an ordered or unordered list with three nonempty items.',
    starter: '<ul>\n  <li></li>\n</ul>',
    hint: 'Add three <li>Item</li> elements inside <ul> or <ol>.',
    test: doc =>
      [...doc.querySelectorAll('ul,ol')].some(
        list => [...list.children].filter(e => e.tagName === 'LI' && e.textContent.trim()).length >= 3
      )
  }
];
