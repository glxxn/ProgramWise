/* ProgramWise — shared modal behavior for License info / TCO presentation / Contact.
   Works via data attributes, so it applies to any modal on any page that
   includes this file:
     - a trigger:  <button data-modal-open="my-modal">Open</button>
     - the modal:  <div class="pw-modal-overlay" id="my-modal" hidden> ... </div>
     - a closer inside it: <button data-modal-close>...</button>
*/
(function () {
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
})();
