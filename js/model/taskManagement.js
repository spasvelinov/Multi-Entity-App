define([
    'model/component/localStorage'
], function(storage) {
    'use strict';

    const key = 'tasks';

    function getUniqueId() {
        return (new Date()).getTime();
    }

    return {
        getAllTasks: function () {
            return storage.get(key) || [];
        },

        getById: function (id) {
            let tasks = this.getAllTasks();
            if (tasks) {
                for (let i = 0; i < tasks.length; i++) {
                    if (tasks[i].id === id) {
                        return tasks[i];
                    }
                }
            }
            return null;
        },

        save: function (task) {
            if (!task.id) {
                task.id = getUniqueId();
            }
            let tasks = this.getAllTasks(),
                updated = false;

            if (!tasks || !tasks.length) {
                tasks = [];
            }

            for (let i in tasks) {
                if (tasks[i].id === task.id) {
                    tasks[i] = task;
                    updated = true;
                    break;
                }
            }
        },

        delete: function (id) {
            let tasks = this.getAllTasks();

            if (!tasks || !tasks.length) {
                return;
            }

            for (let i = 0; i < tasks.length; i++) {
                if (tasks[i].id === id) {
                    tasks.splice(i, 1);
                    break;
                }
            }

            storage.set(key, tasks);
        }
    }
});
