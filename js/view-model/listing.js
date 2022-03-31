define([
    'ko',
    'model/component/localStorage',
    'model/taskManagement',
    'action/redirect'
], function(ko, storage, taskManagement, redirectAction) {
    'use strict';
    
    return function indexViewModel() {
        let self = this,
            tasks = taskManagement.getAllTasks();

        self.tasks = ko.observableArray(tasks);
        self.isClearButtonEnabled = ko.computed(function () {
            let visible = true;
            if (self.tasks.length > 10) {
                visible = false;
            }
            return visible;
        }, self);

        self.taskRedirect = function (data, event) {
            const id = data.id;

            storage.set('current-task', id);
            redirectAction('edit');
        };

        self.newAction = function () {
            redirectAction('edit');
            storage.set('current-task', null);
            return true;
        };

        self.deleteTask = function (data, event) {
            const id = data.id;

            taskManagement.delete(id);
            self.reloadTasks();
            return true;
        };

        self.clearAllTasks = function () {
            let tasks = taskManagement.getAllTasks();

            for (let i = 0; i < tasks.length; i++) {
                taskManagement.delete(tasks[i].id);
            }

            self.reloadTasks();
        };
 
        self.reloadTasks = function () {
            self.tasks(taskManagement.getAllTasks());
        };
    };
});
