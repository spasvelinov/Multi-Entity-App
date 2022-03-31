define([
    'ko',
    'view-model/edit'
], function (ko, viewModel) {
    'use strict';

    ko.applyBindings(new viewModel());
});