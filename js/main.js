require.onError = function (err) {
    if (err.requireType === 'timeout') {
        alert("Nije uspjelo učitavanje stranice. Pokušajte ponovo (pritisnite F5). " + err);
    } else {
        throw err;
    }
};


require.config({
// The shim config allows us to configure dependencies for
    // scripts that do not call define() to register a module
    shim: {
        'jquery': {
            exports: 'jQuery'
        },
        'underscore': {
            exports: '_'
        },
        'bootstrap':{
            deps : ['jquery'],
            exports: 'bootstrap'
        },
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'marionette': {
         deps : ['jquery', 'underscore', 'backbone', 'json2'],
         exports: 'Marionette'
        },
        'jquery.mobile-config': ['jquery'],
        'jquery.mobile': ['jquery','jquery.mobile-config']
    },
    paths: {
        jquery: '../lib/jquery/jquery',
        json2: '../lib/json2',
        'jquery.mobile': '../lib/jquery/mobile/jquery.mobile-1.4.5',
        "jquery.mobile-config": '../js/jquery.mobile-config',
        underscore: '../lib/backbone/underscore',
        "underscore.extension": '../lib/backbone/underscore.extension',
        backbone: '../lib/backbone/backbone',
        "backbone.compute": '../lib/backbone/backbone.compute',
        "backbone.paginator": '../lib/backbone/backbone.paginator',
        marionette:'../lib/marionette/backbone.marionette',
        tpl: '../lib/tpl',
        text: '../lib/require/text',
       bootstrap: "../lib/bootstrap/bootstrap.min",
        typeahead: '../lib/bootstrap/typeahead',
        'jquery.maskedinput': '../lib/jquery/jquery.maskedinput',
        lib: '../lib',
        templates: '../templates',
        models: '../js/models',
        collections: '../js/collections',
        routers: '../js/routers',
        controllers: '../js/controllers',
        layouts: '../js/layouts',
        regions: '../js/regions',
        views: '../js/views'


    }
});

define([
    "marionette"
], function (Marionette) {
    // The "app" dependency is passed in as "App"
    // Again, the other dependencies passed in are not "AMD" therefore don't pass a parameter to this function
    console.log('Dental create');
    Dental = new Marionette.Application();
    Dental.Behaviors = {};
    Marionette.Behaviors.behaviorsLookup = function() {
        return Dental.Behaviors;
    };

    require([

// Load our app module and pass it to our definition function
        "app",
        "config",

        "jquery.mobile",
        "collections/baseCollection",
        "models/baseModel"

        //'http://connect.facebook.net/en_US/all.js'


// Some plugins have to be loaded in order due to their non AMD compliance
// Because these scripts are not "modules" they do not pass any values to the definition function below

    ], function (App) {
        // The "app" dependency is passed in as "App"
        // Again, the other dependencies passed in are not "AMD" therefore don't pass a parameter to this function
        console.log('Dental create 2');
        $(function(){
            console.log('Dom ready');
            App.initialize();
        });

    });
});

