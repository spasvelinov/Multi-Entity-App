define([], function () {
    return {
        set: function (key, value) {
            localStorage.setItem(key, JSON.stringify(value));
        },
        get: function (key) {
            return JSON.parse(localStorage.getItem(key));
        },
        clear: function () {
            localStorage.clear();
        }
    }
});
