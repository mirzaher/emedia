define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'tpl!templates/MainLayoutTemplate.html'
],function($, _, Backbone, Marionette, template){
    var mainLayout = Marionette.LayoutView.extend({

        template: template,

    //    tagName:'div',

        regions:{
            leftSide:"#leftContainer",
            middle:"#middleContainer",
            rightSide:"#rightContainer",
            grid1:'#grid1',
            grid2:'#grid2',
            grid3:'#grid3'
        },


//        className:'navbar navbar-fixed-top',

        initialize: function () {
           // _.bindAll(this);
        },

        events: {
        }



    });
    return mainLayout;
});