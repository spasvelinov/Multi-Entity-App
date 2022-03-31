define([
    'model/component/localStorage'
], function (storage) {
    'use strict';

    return function (action) {
        const redirectUrl = location.href.split('/').slice(0, -1).join('/') + '/' + action + '.html';

        window.location.href = redirectUrl;
    }
});