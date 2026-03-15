var App = App || {};

(function () {
  // ========================================
  // localStorage wrapper
  // ========================================

  App.store = {
    get: function (key) {
      try {
        var data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
      } catch (e) {
        return null;
      }
    },

    set: function (key, value) {
      localStorage.setItem(key, JSON.stringify(value));
    },

    generateId: function () {
      return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
    }
  };

  // ========================================
  // Seed data
  // ========================================

  function seedData() {
    if (App.store.get('users') && App.store.get('tasks')) return;

    var users = [
      { id: App.store.generateId(), name: 'Admin', email: 'admin@demo.com', role: 'admin', avatar: null },
      { id: App.store.generateId(), name: 'Marie Dupont', email: 'marie@demo.com', role: 'user', avatar: null },
      { id: App.store.generateId(), name: 'Jean Martin', email: 'jean@demo.com', role: 'user', avatar: null },
      { id: App.store.generateId(), name: 'Sophie Bernard', email: 'sophie@demo.com', role: 'user', avatar: null }
    ];

    App.store.set('users', users);

    var tasks = [
      {
        id: App.store.generateId(),
        title: 'Corriger le bug d\'affichage du menu',
        description: 'Le menu déroulant ne se ferme pas correctement sur la page d\'accueil.',
        status: 'todo',
        priority: 'high',
        assignee: users[1].id,
        dueDate: '2026-03-20',
        tags: ['bug'],
        createdAt: '2026-03-10'
      },
      {
        id: App.store.generateId(),
        title: 'Ajouter la fonctionnalité d\'export PDF',
        description: 'Permettre aux utilisateurs d\'exporter leurs rapports au format PDF.',
        status: 'inprogress',
        priority: 'high',
        assignee: users[2].id,
        dueDate: '2026-03-25',
        tags: ['feature'],
        createdAt: '2026-03-08'
      },
      {
        id: App.store.generateId(),
        title: 'Rédiger la documentation API',
        description: 'Documenter tous les endpoints de l\'API REST pour les développeurs.',
        status: 'inprogress',
        priority: 'medium',
        assignee: users[3].id,
        dueDate: '2026-03-22',
        tags: ['documentation'],
        createdAt: '2026-03-05'
      },
      {
        id: App.store.generateId(),
        title: 'Refonte de la page de profil',
        description: 'Moderniser le design de la page profil utilisateur.',
        status: 'todo',
        priority: 'medium',
        assignee: users[1].id,
        dueDate: '2026-03-28',
        tags: ['design'],
        createdAt: '2026-03-12'
      },
      {
        id: App.store.generateId(),
        title: 'Optimiser les requêtes de la liste des tâches',
        description: 'La page de listing est lente quand il y a beaucoup de tâches.',
        status: 'done',
        priority: 'high',
        assignee: users[2].id,
        dueDate: '2026-03-10',
        tags: ['bug'],
        createdAt: '2026-03-01'
      },
      {
        id: App.store.generateId(),
        title: 'Créer les maquettes du dashboard',
        description: 'Préparer les maquettes Figma pour le nouveau dashboard analytique.',
        status: 'done',
        priority: 'medium',
        assignee: users[3].id,
        dueDate: '2026-03-08',
        tags: ['design'],
        createdAt: '2026-02-28'
      },
      {
        id: App.store.generateId(),
        title: 'Mettre à jour les dépendances du projet',
        description: 'Plusieurs packages ont des mises à jour de sécurité en attente.',
        status: 'todo',
        priority: 'low',
        assignee: users[0].id,
        dueDate: '2026-04-01',
        tags: ['feature'],
        createdAt: '2026-03-14'
      },
      {
        id: App.store.generateId(),
        title: 'Écrire les tests unitaires du module auth',
        description: 'Couvrir les cas de login, logout et gestion de session.',
        status: 'inprogress',
        priority: 'medium',
        assignee: users[0].id,
        dueDate: '2026-03-18',
        tags: ['feature'],
        createdAt: '2026-03-11'
      },
      {
        id: App.store.generateId(),
        title: 'Corriger l\'encodage des caractères spéciaux',
        description: 'Les accents ne s\'affichent pas correctement dans les notifications.',
        status: 'todo',
        priority: 'low',
        assignee: users[1].id,
        dueDate: '2026-03-12',
        tags: ['bug'],
        createdAt: '2026-03-06'
      },
      {
        id: App.store.generateId(),
        title: 'Rédiger le guide utilisateur',
        description: 'Créer un guide pas à pas pour les nouveaux utilisateurs de la plateforme.',
        status: 'done',
        priority: 'low',
        assignee: users[3].id,
        dueDate: '2026-03-05',
        tags: ['documentation'],
        createdAt: '2026-02-25'
      }
    ];

    App.store.set('tasks', tasks);
  }

  // ========================================
  // Auth guard
  // ========================================

  App.auth = {
    check: function () {
      var session = App.store.get('session');
      if (!session) {
        window.location.href = 'index.html';
        return false;
      }
      return true;
    },

    getCurrentUser: function () {
      var session = App.store.get('session');
      return session ? session.user : null;
    }
  };

  // ========================================
  // Utilitaires
  // ========================================

  App.utils = {
    formatDate: function (dateString) {
      if (!dateString) return '';
      var d = new Date(dateString);
      var day = String(d.getDate()).padStart(2, '0');
      var month = String(d.getMonth() + 1).padStart(2, '0');
      var year = d.getFullYear();
      return day + '/' + month + '/' + year;
    },

    getUrlParam: function (name) {
      var params = new URLSearchParams(window.location.search);
      return params.get(name);
    },

    showNotification: function (message, type) {
      type = type || 'info';
      var container = document.querySelector('.toast-container');
      if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
      }

      var toast = document.createElement('div');
      toast.className = 'toast toast-' + type;
      toast.textContent = message;
      container.appendChild(toast);

      setTimeout(function () {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 3000);
    },

    populateSelect: function (selectElement, items, valueField, labelField) {
      if (!selectElement) return;
      var current = selectElement.value;
      var firstOption = selectElement.querySelector('option[value=""]');
      selectElement.innerHTML = '';
      if (firstOption) selectElement.appendChild(firstOption);

      items.forEach(function (item) {
        var option = document.createElement('option');
        option.value = item[valueField];
        option.textContent = item[labelField];
        selectElement.appendChild(option);
      });

      if (current) selectElement.value = current;
    },

    confirmDelete: function (message) {
      return new Promise(function (resolve) {
        var overlay = document.createElement('div');
        overlay.className = 'modal-overlay open';

        overlay.innerHTML =
          '<div class="modal">' +
            '<div class="modal-title">Confirmation</div>' +
            '<div class="modal-body">' + message + '</div>' +
            '<div class="modal-actions">' +
              '<button class="btn btn-secondary" data-action="cancel">Annuler</button>' +
              '<button class="btn btn-danger" data-action="confirm">Supprimer</button>' +
            '</div>' +
          '</div>';

        document.body.appendChild(overlay);

        function cleanup(result) {
          document.body.removeChild(overlay);
          resolve(result);
        }

        overlay.querySelector('[data-action="cancel"]').addEventListener('click', function () {
          cleanup(false);
        });
        overlay.querySelector('[data-action="confirm"]').addEventListener('click', function () {
          cleanup(true);
        });
        overlay.addEventListener('click', function (e) {
          if (e.target === overlay) cleanup(false);
        });
      });
    }
  };

  // ========================================
  // Layouts
  // ========================================

  App.layouts = {
    renderNavbar: function (container) {
      if (!container) return;
      var user = App.auth.getCurrentUser();
      var initials = user ? user.name.split(' ').map(function (w) { return w[0]; }).join('').toUpperCase() : '?';
      var userName = user ? user.name : 'Utilisateur';

      container.innerHTML =
        '<nav class="navbar">' +
          '<a href="dashboard.html" class="navbar-brand">TaskFlow</a>' +
          '<div class="navbar-nav">' +
            '<a href="dashboard.html" data-page="dashboard">Dashboard</a>' +
            '<a href="users.html" data-page="users">Utilisateurs</a>' +
          '</div>' +
          '<div class="navbar-user" id="navbar-user-toggle">' +
            '<div class="navbar-user-avatar">' + initials + '</div>' +
            '<span class="navbar-user-name">' + userName + '</span>' +
            '<div class="navbar-dropdown" id="navbar-dropdown">' +
              '<a href="profile.html">Profil</a>' +
              '<div class="navbar-dropdown-divider"></div>' +
              '<a href="#" id="btn-logout">Déconnexion</a>' +
            '</div>' +
          '</div>' +
        '</nav>';

      var toggle = document.getElementById('navbar-user-toggle');
      var dropdown = document.getElementById('navbar-dropdown');

      toggle.addEventListener('click', function (e) {
        e.stopPropagation();
        dropdown.classList.toggle('open');
      });

      document.addEventListener('click', function () {
        dropdown.classList.remove('open');
      });

      var logoutBtn = document.getElementById('btn-logout');
      if (logoutBtn) {
        logoutBtn.addEventListener('click', function (e) {
          e.preventDefault();
          localStorage.removeItem('session');
          window.location.href = 'index.html';
        });
      }
    },

    renderSidebar: function (container, options) {
      if (!container) return;
      options = options || { status: true, priority: true };

      var html = '<aside class="sidebar">';

      if (options.status) {
        html +=
          '<div class="sidebar-section">' +
            '<div class="sidebar-section-title">Statut</div>' +
            '<div class="sidebar-filter-group">' +
              '<div class="form-check">' +
                '<input type="checkbox" id="filter-todo" value="todo" checked>' +
                '<label for="filter-todo">À faire</label>' +
              '</div>' +
              '<div class="form-check">' +
                '<input type="checkbox" id="filter-inprogress" value="inprogress" checked>' +
                '<label for="filter-inprogress">En cours</label>' +
              '</div>' +
              '<div class="form-check">' +
                '<input type="checkbox" id="filter-done" value="done" checked>' +
                '<label for="filter-done">Terminé</label>' +
              '</div>' +
            '</div>' +
          '</div>';
      }

      if (options.priority) {
        html +=
          '<div class="sidebar-section">' +
            '<div class="sidebar-section-title">Priorité</div>' +
            '<div class="sidebar-filter-group">' +
              '<div class="form-check">' +
                '<input type="checkbox" id="filter-high" value="high" checked>' +
                '<label for="filter-high">Haute</label>' +
              '</div>' +
              '<div class="form-check">' +
                '<input type="checkbox" id="filter-medium" value="medium" checked>' +
                '<label for="filter-medium">Moyenne</label>' +
              '</div>' +
              '<div class="form-check">' +
                '<input type="checkbox" id="filter-low" value="low" checked>' +
                '<label for="filter-low">Basse</label>' +
              '</div>' +
            '</div>' +
          '</div>';
      }

      html += '</aside>';
      container.innerHTML = html;

      container.addEventListener('change', function (e) {
        if (e.target.type === 'checkbox') {
          var statusBoxes = container.querySelectorAll('[id^="filter-todo"], [id^="filter-inprogress"], [id^="filter-done"]');
          var priorityBoxes = container.querySelectorAll('[id^="filter-high"], [id^="filter-medium"], [id^="filter-low"]');

          var statuses = [];
          statusBoxes.forEach(function (cb) { if (cb.checked) statuses.push(cb.value); });
          var priorities = [];
          priorityBoxes.forEach(function (cb) { if (cb.checked) priorities.push(cb.value); });

          document.dispatchEvent(new CustomEvent('sidebar-filter-change', {
            detail: { statuses: statuses, priorities: priorities }
          }));
        }
      });
    },

    renderFooter: function (container) {
      if (!container) return;
      container.innerHTML = '<footer class="footer">&copy; 2026 TaskFlow. Tous droits réservés.</footer>';
    }
  };

  // ========================================
  // Initialisation
  // ========================================

  function setActiveNavLink() {
    var page = window.location.pathname.split('/').pop().replace('.html', '');
    if (!page || page === 'index') return;

    var links = document.querySelectorAll('.navbar-nav a');
    links.forEach(function (link) {
      var linkPage = link.getAttribute('data-page');
      if (linkPage === page) {
        link.classList.add('active');
      } else if (page.startsWith('user') && linkPage === 'users') {
        link.classList.add('active');
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    seedData();

    var isLoginPage = window.location.pathname.endsWith('index.html') ||
      window.location.pathname.endsWith('/');

    if (!isLoginPage) {
      App.auth.check();
    }

    var navbarContainer = document.getElementById('navbar-container');
    var sidebarContainer = document.getElementById('sidebar-container');
    var footerContainer = document.getElementById('footer-container');

    if (navbarContainer) App.layouts.renderNavbar(navbarContainer);
    if (sidebarContainer) App.layouts.renderSidebar(sidebarContainer);
    if (footerContainer) App.layouts.renderFooter(footerContainer);

    setActiveNavLink();
  });
})();
