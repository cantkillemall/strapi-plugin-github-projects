module.exports = [
  {
    method: 'GET',
    path: '/repos',
    handler: 'getReposController.index',
    config: {
      policies: [
        'admin::isAuthenticatedAdmin',
        {
          name: "admin::hasPermissions",
          config: {
            actions: [
              "plugin::github-projects.repos.read",
              "plugin::github-projects.projects.read",
            ]
          }
        }
      ],
      // auth: false
    },
  },
  {
    method: 'POST',
    path: '/project',
    handler: 'projectController.create',
    config: {
      policies: [
        'admin::isAuthenticatedAdmin',
        {
          name: "admin::hasPermissions",
          config: {
            actions: [
              "plugin::github-projects.projects.create",
            ]
          }
        }
      ],
      // auth: false
    },
  },
  {
    method: 'DELETE',
    path: '/project/:id',
    handler: 'projectController.delete',
    config: {
      policies: ['admin::isAuthenticatedAdmin', {
        name: "admin::hasPermissions",
        config: {
          actions: [
            "plugin::github-projects.projects.delete",
          ]
        }
      }],
      // auth: false
    },
  },
  {
    method: 'POST',
    path: '/projects',
    handler: 'projectController.createAll',
    config: {
      policies: ['admin::isAuthenticatedAdmin', {
        name: "admin::hasPermissions",
        config: {
          actions: [
            "plugin::github-projects.projects.create",
          ]
        }
      }],
      // auth: false
    },
  },
  {
    method: 'DELETE',
    path: '/projects',
    handler: 'projectController.deleteAll',
    config: {
      policies: ['admin::isAuthenticatedAdmin', {
        name: "admin::hasPermissions",
        config: {
          actions: [
            "plugin::github-projects.projects.delete",
          ]
        }
      }],
      // auth: false
    },
  },
  {
    method: 'GET',
    path: '/projects',
    handler: 'projectController.find',
    config: {
      // policies: ['admin::isAuthenticatedAdmin', {
      //   name: "admin::hasPermissions",
      //   config: {
      //     actions: [
      //       "plugin::github-projects.projects.delete",
      //     ]
      //   }
      // }],
      auth: false
    },
  },
  {
    method: 'GET',
    path: '/projects/:id',
    handler: 'projectController.findOne',
    config: {
      // policies: ['admin::isAuthenticatedAdmin', {
      //   name: "admin::hasPermissions",
      //   config: {
      //     actions: [
      //       "plugin::github-projects.projects.delete",
      //     ]
      //   }
      // }],
      auth: false
    },
  },
];
