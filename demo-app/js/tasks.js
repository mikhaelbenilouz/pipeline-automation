var App = App || {};

(function () {
  App.tasks = {
    getAll: function (filters) {
      var tasks = App.store.get('tasks') || [];

      if (!filters) return tasks;

      if (filters.status) {
        tasks = tasks.filter(function (t) { return t.status === filters.status; });
      }

      if (filters.priority) {
        tasks = tasks.filter(function (t) { return t.priority === filters.priority; });
      }

      if (filters.search) {
        var term = filters.search.toLowerCase();
        tasks = tasks.filter(function (t) {
          return (t.title && t.title.toLowerCase().indexOf(term) !== -1) ||
            (t.description && t.description.toLowerCase().indexOf(term) !== -1);
        });
      }

      return tasks;
    },

    getById: function (id) {
      var tasks = App.store.get('tasks') || [];
      for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === id) return tasks[i];
      }
      return null;
    },

    create: function (data) {
      var tasks = App.store.get('tasks') || [];
      var task = {
        id: App.store.generateId(),
        title: data.title || '',
        description: data.description || '',
        status: data.status || 'todo',
        priority: data.priority || 'medium',
        dueDate: data.dueDate || null,
        assignee: data.assignee || null,
        tags: data.tags || [],
        attachment: data.attachment || null,
        createdAt: new Date().toISOString().split('T')[0]
      };
      tasks.push(task);
      App.store.set('tasks', tasks);
      return task;
    },

    update: function (id, data) {
      var tasks = App.store.get('tasks') || [];
      for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === id) {
          for (var key in data) {
            if (data.hasOwnProperty(key) && key !== 'id') {
              tasks[i][key] = data[key];
            }
          }
          App.store.set('tasks', tasks);
          return tasks[i];
        }
      }
      return null;
    },

    delete: function (id) {
      var tasks = App.store.get('tasks') || [];
      var filtered = tasks.filter(function (t) { return t.id !== id; });
      App.store.set('tasks', filtered);
    },

    getStats: function () {
      var tasks = App.store.get('tasks') || [];
      var stats = { total: tasks.length, todo: 0, inprogress: 0, done: 0 };
      for (var i = 0; i < tasks.length; i++) {
        if (stats.hasOwnProperty(tasks[i].status)) {
          stats[tasks[i].status]++;
        }
      }
      return stats;
    }
  };
})();
