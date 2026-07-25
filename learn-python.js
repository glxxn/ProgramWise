/* ProgramWise — Learn Python page behavior.
   Handles: the show/hide sidebar accordion, jump-to-section links with
   scroll-spy highlighting, the mobile sidebar toggle, and a small
   regex-based syntax highlighter for the (non-executable) code blocks. */

const PY_KEYWORDS = [
  'and', 'as', 'assert', 'async', 'await', 'break', 'class', 'continue',
  'def', 'del', 'elif', 'else', 'except', 'finally', 'for', 'from',
  'global', 'if', 'import', 'in', 'is', 'lambda', 'nonlocal', 'not',
  'or', 'pass', 'raise', 'return', 'try', 'while', 'with', 'yield',
  'True', 'False', 'None'
];

function highlightPython(code) {
  const escaped = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  const tokenRegex = new RegExp(
    '(#.*$)' +                                          // comments
    "|('(?:\\\\.|[^'\\\\])*'|\"(?:\\\\.|[^\"\\\\])*\")" + // strings
    '|\\b(\\d+\\.?\\d*)\\b' +                             // numbers
    '|\\b(' + PY_KEYWORDS.join('|') + ')\\b',             // keywords
    'gm'
  );

  return escaped.replace(tokenRegex, function (match, comment, str, num, kw) {
    if (comment) return '<span class="tok-com">' + comment + '</span>';
    if (str) return '<span class="tok-str">' + str + '</span>';
    if (num) return '<span class="tok-num">' + num + '</span>';
    if (kw) return '<span class="tok-kw">' + kw + '</span>';
    return match;
  });
}

document.addEventListener('DOMContentLoaded', function () {

  /* ---- Syntax highlighting for static code blocks ---- */
  document.querySelectorAll('.code-block').forEach(function (block) {
    block.innerHTML = highlightPython(block.textContent);
  });

  /* ---- Sidebar accordion (show/hide sub-sections) ---- */
  document.querySelectorAll('.lp-group-title').forEach(function (btn) {
    btn.addEventListener('click', function () {
      btn.closest('.lp-group').classList.toggle('open');
    });
  });

  /* ---- Sidebar links: smooth-scroll + mark active ---- */
  const navLinks = Array.from(document.querySelectorAll('.lp-sublink, .lp-toplink'));

  function setActiveLink(link) {
    navLinks.forEach(function (l) { l.classList.remove('active'); });
    link.classList.add('active');
    const group = link.closest('.lp-group');
    if (group) group.classList.add('open');
  }

  navLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      const id = link.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', '#' + id);
      setActiveLink(link);
      closeMobileSidebar();
    });
  });

  /* ---- Scroll-spy: highlight the sidebar link for whatever's in view ---- */
  const spyTargets = [];
  navLinks.forEach(function (link) {
    const id = link.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if (el) spyTargets.push({ el: el, link: link });
  });

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const match = spyTargets.find(function (t) { return t.el === entry.target; });
          if (match) setActiveLink(match.link);
        }
      });
    }, { rootMargin: '-100px 0px -70% 0px', threshold: 0 });

    spyTargets.forEach(function (t) { observer.observe(t.el); });
  }

  /* ---- Mobile sidebar show/hide toggle ---- */
  const sidebar = document.getElementById('lpSidebar');
  const toggleBtn = document.getElementById('sidebarToggle');

  function closeMobileSidebar() {
    if (sidebar) sidebar.classList.remove('mobile-open');
  }

  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener('click', function () {
      sidebar.classList.toggle('mobile-open');
    });
  }
});
