(function() {
  "use strict";

  // NOTE: We only need to do this on levels 1, 2 and 3.
  // NOTE: Check lessons 5 and 10 for some edge cases with brackets.

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

  /*
   *
   * Some cases exist where we don't want to remove bracketed info. Mainly, some
   * grammatical explanations.
   *
   */
  var exceptions = [
    /* special cases for level 1, lesson 5 grammatical explanation */
    function (text, target) {
      return text && target.trim() == '[be]';
    },
  ];

  var isException = function (text, target) {
    var matched = false;

    exceptions.forEach(function (f) {
      if (f(text, target)) {
        matched = true;
      }
    });

    return matched
  };

  selectors.forEach(function (selector) {
    document.querySelectorAll(selector).forEach(el => {
      regexp.forEach(function (regex) {
        var text = el.innerText;

        if (!text) return;

        var matches = text.match(regex);

        if (!matches) return;

        matches.forEach(t => {
          if (isException(text, t)) return;

          el.innerHTML = el.innerHTML.replace(t, '');
        });
      });
    });
  });
})();
