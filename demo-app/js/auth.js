var App = App || {};
App.auth = App.auth || {};

(function () {
  var PASSWORDS = {
    admin: 'admin123',
    user: 'user123'
  };

  App.auth.login = function (email, password) {
    var users = App.store.get('users') || [];
    var user = null;

    for (var i = 0; i < users.length; i++) {
      if (users[i].email === email) {
        user = users[i];
        break;
      }
    }

    if (!user) {
      return { success: false, error: 'Identifiants incorrects' };
    }

    var expected = user.role === 'admin' ? PASSWORDS.admin : PASSWORDS.user;

    if (password !== expected) {
      return { success: false, error: 'Identifiants incorrects' };
    }

    var rememberMe = false;
    var checkbox = document.getElementById('remember-me');
    if (checkbox) {
      rememberMe = checkbox.checked;
    }

    App.store.set('session', {
      user: user,
      rememberMe: rememberMe,
      loggedAt: new Date().toISOString()
    });

    return { success: true };
  };

  App.auth.logout = function () {
    localStorage.removeItem('session');
    window.location.href = 'index.html';
  };

  App.auth.isAuthenticated = function () {
    return !!App.store.get('session');
  };
})();
