define([
    'ko',
    'view-model/listing'
], function (ko, viewModel) {
    'use strict';

    ko.applyBindings(new viewModel());
});