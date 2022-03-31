require.config({
    baseUrl: "js",
    paths: {
        ko: "lib/knockout",
        jquery: "lib/jquery.min",
        "jquery-validate": "https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.19.3/jquery.validate"
    },
    shim: {
        "jquery-validate": ["jquery"]
    }
});