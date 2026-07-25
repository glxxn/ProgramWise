/* ProgramWise — shared modal behavior for License info / TCO presentation / Contact.

   The modal markup itself lives in modals.html, one copy, shared by every
   page. This script fetches that fragment, injects it into the current
   page, and then wires up open/close behavior via data attributes:
     - a trigger:  <button data-modal-open="my-modal">Open</button>
     - the modal:  <div class="pw-modal-overlay" id="my-modal" hidden> ... </div>
     - a closer inside it: <button data-modal-close>...</button>

   Edit modals.html once and every page picks up the change — no more
   copy-pasting the same modal HTML into every file.
*/
(function () {

  function injectSharedModals() {
    return fetch('modals.html')
      .then(function (res) {
        if (!res.ok) throw new Error('modals.html responded with ' + res.status);
        return res.text();
      })
      .then(function (html) {
        document.body.insertAdjacentHTML('beforeend', html);
      })
      .catch(function (err) {
        // Most likely cause: the page was opened directly as a file
        // (file://...) instead of through a web server. fetch() can't
        // load local files that way — serve the folder over http(s)
        // (or upload it to your host) and it'll work.
        console.error('ProgramWise: could not load shared modals.', err);
      });
  }

  function openModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.removeAttribute('hidden');
    document.body.classList.add('pw-modal-open');
    const closeBtn = modal.querySelector('[data-modal-close]');
    if (closeBtn) closeBtn.focus();
  }

  function closeModal(modal) {
    modal.setAttribute('hidden', '');
    document.body.classList.remove('pw-modal-open');
  }

  document.addEventListener('click', function (e) {
    const opener = e.target.closest('[data-modal-open]');
    if (opener) {
      e.preventDefault();
      openModal(opener.getAttribute('data-modal-open'));
      return;
    }

    const closer = e.target.closest('[data-modal-close]');
    if (closer) {
      const modal = closer.closest('.pw-modal-overlay');
      if (modal) closeModal(modal);
      return;
    }

    // Clicking the dimmed backdrop (not the panel itself) closes it too.
    if (e.target.classList && e.target.classList.contains('pw-modal-overlay')) {
      closeModal(e.target);
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      const open = document.querySelector('.pw-modal-overlay:not([hidden])');
      if (open) closeModal(open);
    }
  });

  injectSharedModals();
})();
