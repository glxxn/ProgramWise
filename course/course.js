/* ProgramWise — course page behavior.
   The sidebar HTML is never hand-written per page: this script builds it
   from COURSE_SECTIONS (course-data.js) every time a course page loads.
   Edit course-data.js once and every page's menu updates automatically. */

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
    '(#.*$)' +
    "|('(?:\\\\.|[^'\\\\])*'|\"(?:\\\\.|[^\"\\\\])*\")" +
    '|\\b(\\d+\\.?\\d*)\\b' +
    '|\\b(' + PY_KEYWORDS.join('|') + ')\\b',
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

function currentFileName() {
  const path = window.location.pathname;
  const name = path.substring(path.lastIndexOf('/') + 1);
  return name || 'basics.html';
}

function renderSidebar(currentFile) {
  const container = document.getElementById('courseNav');
  if (!container || typeof COURSE_SECTIONS === 'undefined') return;

  let html = '';
  COURSE_SECTIONS.forEach(function (topic) {
    const isCurrentTopic = topic.file === currentFile;
    html += '<div class="lp-group' + (isCurrentTopic ? ' open' : '') + '">';
    html += '  <div class="lp-group-row">';
    html += '    <a class="lp-group-link' + (isCurrentTopic ? ' active' : '') + '" href="' + topic.file + '">' + topic.title + '</a>';
    html += '    <button type="button" class="lp-group-toggle" aria-label="Toggle ' + topic.title + '"><span class="chevron">\u25B6</span></button>';
    html += '  </div>';
    html += '  <ul class="lp-sublist">';
    topic.subs.forEach(function (sub) {
      html += '<li><a href="' + topic.file + '#' + sub.id + '" class="lp-sublink" data-file="' + topic.file + '" data-id="' + sub.id + '">' + sub.title + '</a></li>';
    });
    html += '  </ul>';
    html += '</div>';
  });

  container.innerHTML = html;
}

document.addEventListener('DOMContentLoaded', function () {
  const currentFile = currentFileName();
  renderSidebar(currentFile);

  /* ---- Accordion: only the chevron toggles, so the title text still
     navigates to that topic's page like a normal link ---- */
  document.querySelectorAll('.lp-group-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      btn.closest('.lp-group').classList.toggle('open');
    });
  });

  /* ---- Sub-section links: same page -> smooth scroll; other page ->
     normal navigation (browser jumps to the anchor once it loads) ---- */
  const sublinks = Array.from(document.querySelectorAll('.lp-sublink'));

  function setActive(link) {
    sublinks.forEach(function (l) { l.classList.remove('active'); });
    link.classList.add('active');
    const group = link.closest('.lp-group');
    if (group) group.classList.add('open');
  }

  const sidebar = document.getElementById('lpSidebar');
  function closeMobileSidebar() {
    if (sidebar) sidebar.classList.remove('mobile-open');
  }

  sublinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      if (link.dataset.file === currentFile) {
        const target = document.getElementById(link.dataset.id);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          history.replaceState(null, '', '#' + link.dataset.id);
          setActive(link);
        }
      }
      closeMobileSidebar();
    });
  });

  /* ---- Scroll-spy, limited to sub-sections that live on this page ---- */
  const spyTargets = [];
  sublinks.forEach(function (link) {
    if (link.dataset.file === currentFile) {
      const el = document.getElementById(link.dataset.id);
      if (el) spyTargets.push({ el: el, link: link });
    }
  });

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const match = spyTargets.find(function (t) { return t.el === entry.target; });
          if (match) setActive(match.link);
        }
      });
    }, { rootMargin: '-100px 0px -70% 0px', threshold: 0 });

    spyTargets.forEach(function (t) { observer.observe(t.el); });
  }

  /* ---- Mobile sidebar show/hide toggle ---- */
  const toggleBtn = document.getElementById('sidebarToggle');
  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener('click', function () {
      sidebar.classList.toggle('mobile-open');
    });
  }

  /* ---- Syntax highlighting for the static code blocks ---- */
  document.querySelectorAll('.code-block').forEach(function (block) {
    block.innerHTML = highlightPython(block.textContent);
  });
});
