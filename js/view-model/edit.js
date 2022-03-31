define([
	'ko',
	'jquery',
	'model/taskManagement',
	'model/component/localStorage',
	'action/redirect'
], function(ko, $, taskManagement, storage, redirectAction) {
	'use strict';

	function getDescriptionPart(text) {
		return '<p>' + text + '</p>';
	}

	return function editViewModel() {
		let self = this,
			task = taskManagement.getById(storage.get('current-task')),
			assigned = '',
			position = '',
			title = '',
			description = '';

		if (task) {
			assigned = task.assigned;
			position = task.position;
			title = task.title;
			description = task.description;
		}

		self.availableAssigned = ko.observableArray(['Oleks', 'Spas', 'Ivan', 'Martin', 'Venci']);
		self.availablePositions = ko.observableArray(['backend', 'frontend', 'qa', 'fullstack', 'designer']);

		self.selectedAssigned = ko.observable(assigned);
		self.selectedPosition = ko.observable(position);
		self.title = ko.observable(title);
		self.description = ko.observable(description);

		self.fullDescription = ko.computed(function() {
			if (self.title().length) {
				return getDescriptionPart(self.title()) + getDescriptionPart(self.description()) + getDescriptionPart(self.selectedAssigned()) + getDescriptionPart(self.selectedPosition());
			}
		}, self);

		self.submitForm = function() {
			let form = $('#form'),
				valid = true;

			form.validate({
				rules: {
					description: {
						required: true
					},
					title: {
						required: true
					}
				},
				messages: {
					title: {
						required: "Please, fill out title!"
					},
					description: {
						required: "Please, fill out description!"
					}
				},
				errorPlacement: function(error, element) {
					valid = false;
					let item = element.parents('.item');
					item.append(error);
				}
			})

			if (form.valid()) {
				let task = taskManagement.getById(storage.get('current-task'));
				if (task) {
					task.title = self.title();
					task.description = self.description();
					task.position = self.selectedPosition();
					task.assigned = self.selectedAssigned();
				} else {
					task = {
						title: self.title(),
						description: self.description(),
						position: self.selectedPosition(),
						assigned: self.selectedAssigned()
					};
				}
				taskManagement.save(task);
				redirectAction('index');
			}

			return false;
		};

		self.backAction = function() {
			redirectAction('index');
		}
	}
});
