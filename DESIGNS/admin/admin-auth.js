/* Auth — client-side localStorage guard */
var AdminAuth = (function () {
  var KEY = 'admin_auth';
  var USER = { email: 'admin@nureallhi.dev', pass: 'admin123' };

  function isLoggedIn() { return localStorage.getItem(KEY) === '1'; }

  function login(email, pass) {
    if (email === USER.email && pass === USER.pass) {
      localStorage.setItem(KEY, '1');
      return true;
    }
    return false;
  }

  function logout() {
    localStorage.removeItem(KEY);
    location.href = 'login.html';
  }

  function guard() {
    if (!isLoggedIn()) { location.href = 'login.html'; return false; }
    return true;
  }

  function getUser() { return isLoggedIn() ? USER.email : null; }

  return { login: login, logout: logout, guard: guard, isLoggedIn: isLoggedIn, getUser: getUser };
})();
