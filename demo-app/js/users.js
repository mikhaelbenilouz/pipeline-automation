var App = App || {};

(function () {
  App.users = {
    getAll: function () {
      return App.store.get('users') || [];
    },

    getById: function (id) {
      var users = this.getAll();
      for (var i = 0; i < users.length; i++) {
        if (users[i].id === id) return users[i];
      }
      return null;
    },

    create: function (data) {
      var users = this.getAll();
      var user = {
        id: App.store.generateId(),
        name: data.name || '',
        email: data.email || '',
        role: data.role || 'user',
        avatar: data.avatar || null
      };
      users.push(user);
      App.store.set('users', users);
      return user;
    },

    update: function (id, data) {
      var users = this.getAll();
      for (var i = 0; i < users.length; i++) {
        if (users[i].id === id) {
          if (data.name !== undefined) users[i].name = data.name;
          if (data.email !== undefined) users[i].email = data.email;
          if (data.role !== undefined) users[i].role = data.role;
          if (data.avatar !== undefined) users[i].avatar = data.avatar;
          App.store.set('users', users);
          return users[i];
        }
      }
      return null;
    },

    delete: function (id) {
      var users = this.getAll();
      var filtered = [];
      for (var i = 0; i < users.length; i++) {
        if (users[i].id !== id) filtered.push(users[i]);
      }
      App.store.set('users', filtered);
    }
  };
})();
