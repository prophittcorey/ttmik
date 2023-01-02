(function() {
  "use strict";

  /*
   *
   * We want to find all romanization and replace it with a blank string. In
   * general, it seems romanization follows a space and is wrapped in brackets.
   * We may need additional regular expressions to match additional patterns,
   * but it seems this works good enough for now.
   *
   */
  var regexp = [
    /\W\[.*?\]/g, /* matches: <space>[<anything>] */
  ];

  /*
   *
   * At this time, we're only replacing content within the lesson's content
   * paragraphs. We may need to add additional selectors if romanization is used
   * elsewhere.
   *
   * */
  var selectors = [
    '.tab-content-lesson > p',
  ];

  selectors.forEach(function (selector) {
    regexp.forEach(function (regex) {
      document.querySelectorAll(selector).forEach(el => {
        var text = el.innerText;

        if (!text) {
          return;
        }

        var matches = text.match(regex);

        if (!matches) {
          return;
        }

        matches.forEach(t => {
          el.innerText = el.innerText.replace(t, '');
        });
      });
    });
  });
})();
