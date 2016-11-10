/**
 * Created with JetBrains PhpStorm.
 * User: Haris
 * Date: 7/26/13
 * Time: 10:27 AM
 * To change this template use File | Settings | File Templates.
 */

define(['marionette',
        'routers/mainRouter',
        'controllers/mainController'
    ],

    function(Marionette, mainRouter, mainController) {
        var initialize = function() {
            alert("initialize" );
            Dental.AppRouter = {};
            Dental.AppControllers = {};
            Dental.addRegions({
                body: 'body',
                header: '#header',
                main: '#main',
                footer: '#footer'
            });


            $.ajaxSetup({
                beforeSend: function() {
                    $.mobile.loading('show');
                    alert("before send");
                },
                complete: function() {
                    $.mobile.loading('hide');
                    alert("complete");
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    alert("Error: " + textStatus + ": " + errorThrown);
                },

                statusCode: {
                    401: function() {
                        // Redirec the to the login page.
                        var error = "Morate se logirati.";
                        alert(error);
                        //Backbone.history.navigate('#login',{ trigger:true});


                    },
                    403: function() {
                        // 403 -- Access denied
                        var error = "Nemate prava pristupa.";
                        alert(error);
                        window.location.replace('#denied');
                    },
                    402: function(obj) {
                        // 403 -- Access denied
                        console.log('obj', obj);
                        alert(obj.responseText);
                    }

                }
            });

            Dental.vent.on("routing:started", function() {
                if (!Backbone.History.started) {
                    Backbone.history.start();
                    console.log('routing:started trigered');
                }

            });


            Dental.vent.on("refresh:all", function() {
                console.log('refresh:all');

            });



            Dental.addInitializer(function() {
                console.log('init1');
                Dental.helper = {};
                Dental.helper.pad = function(value, size) {
                    var s = String(value);
                    while (s.length < (size || 2)) {
                        s = "0" + s;
                    }
                    return s;
                };

                Dental.AppRouter.main = new mainRouter({
                    controller: mainController
                });
                mainController.start();
                Dental.AppControllers.mainController = mainController;

                alert("Start controller");
            });


            Dental.addInitializer(function() {
                console.log('init4');
                Dental.vent.trigger('routing:started');

            });

            Dental.on("initialize:after", function(options) {
                console.log('initialize:after trigered');

            });



            Dental.start();
            var gOldOnError = window.onerror;
            // Override previous handler.
            window.onerror = function myErrorHandler(errorMsg, url, lineNumber) {
                alert(errorMsg);

                if (gOldOnError)
                // Call previous handler.
                    return gOldOnError(errorMsg, url, lineNumber);

                // Just let default handler run.
                return false;
            };



        };
        return {
            initialize: initialize
        };
    });