/**
 * Created with JetBrains PhpStorm.
 * User: Haris
 * Date: 7/26/13
 * Time: 10:56 AM
 * To change this template use File | Settings | File Templates.
 */
// Filename: router.js
define([
    'jquery',
    'backbone',
    'bootstrap',
    'marionette'


],  function ($, Backbone, Bootstrap, Marionette) {

    var my = Marionette.AppRouter.extend({

        appRoutes: {
            "": "showHome",
            "players": "showPlayers"
        },

        before: function( route ) {

            // Do something with every route before it's routed. "route" is a string
            // containing the route fragment just like regular Backbone route
            // handlers. If the url has more fragments, the before callback will
            // also get them, eg: before: function( frag1, frag2, frag3 )
            // (just like regular Backbone route handlers).
            console.log('The before filter ran and the route was foo!', route);
            // Returning false from inside of the before filter will prevent the
            // current route's callback from running, and will prevent the after
            // filter's callback from running.

        }


    });
    return my;
});

