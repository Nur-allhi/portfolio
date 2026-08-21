/* Sidebar + mobile drawer */
var AdminNav = (function () {
  function init() {
    var burger = document.getElementById('burger');
    var sidebar = document.getElementById('sidebar');
    var overlay = document.getElementById('overlay');
    if (!burger || !sidebar) return;

    function setOpen(open) {
      sidebar.classList.toggle('open', open);
      overlay.classList.toggle('show', open);
      burger.classList.toggle('x', open);
      burger.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    }

    burger.addEventListener('click', function () { setOpen(!sidebar.classList.contains('open')); });
    overlay.addEventListener('click', function () { setOpen(false); });
    window.addEventListener('keydown', function (e) { if (e.key === 'Escape') setOpen(false); });
    window.addEventListener('resize', function () { if (window.innerWidth > 820) setOpen(false); });

    /* focus trap */
    sidebar.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab') return;
      var focusable = sidebar.querySelectorAll('a, button');
      var first = focusable[0], last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
  }

  function toast(msg, type) {
    var wrap = document.getElementById('toasts');
    if (!wrap) return;
    var el = document.createElement('div');
    el.className = 'toast';
    el.innerHTML = '<span class="dot dot-' + (type === 'error' ? 'err' : 'ok') + '"></span>' + msg;
    wrap.appendChild(el);
    setTimeout(function () { el.classList.add('out'); }, 3000);
    setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 3400);
  }

  return { init: init, toast: toast };
})();
