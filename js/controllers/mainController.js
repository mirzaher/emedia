/**
 * Created with JetBrains PhpStorm.
 * User: Haris
 * Date: 7/30/13
 * Time: 9:50 AM
 * To change this template use File | Settings | File Templates.
 */
define(['jquery',
    'backbone',
    'bootstrap',
    'marionette',
    'layouts/mainLayout',
    'typeahead', 'jquery.mobile'
], function($, Backbone, Bootstrap, Marionette, MainLayout){

    return {
        start: function(){
            console.log('start controller');
            Dental.views = {};
            Dental.collection = {};
            this.firstPage = true;
        },

        showHome:function(){
          var template =[
              '<div data-role="header">',
                ' <h1>EMedia Music</h1>',
              '</div>',
              '<div data-role="content">',
                '<h3>Emedia library system</h3>',
                '<ul data-role="listview"  data-inset="true">',
                '     <li><a href="#players">Page 1</a></li>',
                '      <li><a href="#page2">Page 2</a></li>',
                '   </ul>',
              '</div>'].join("\n");
            var self = this;
            var MojView = Marionette.CompositeView.extend({
                template: _.template(template),
                events:{
                    "click li":function(e){
                        e.stopPropagation();
                        e.preventDefault();
                        Backbone.history.navigate('#players', true);
                    }
                }
            });

            this.changePage(new MojView());
        },

        showPlayers: function() {
            console.log("showPlayers");

            var MojModel = Backbone.Model.extend({
                defaults:{
                    id:null,
                    NAME:undefined
                },
                url: appConfig.RESTUri +'players'

            });

            var Collection = Backbone.Collection.extend({
                model:MojModel,
                url: appConfig.RESTUri +'players'
            });

            var collection = new Collection();
            var Itemview = Marionette.ItemView.extend({
                template:_.template(
                    '<div class="col-xs-2">'+
                    '<%- id %> '+
                    '</div> '+
                    '<div class="col-xs-8">'+
                    '<%- NAME %>'+
                    '</div>'
                ),
                tagName:'div',
                className:'item'
            });

            var Masteriew = Marionette.CollectionView.extend({
                tagName:'div',
                className:'divContainer',
                childView:Itemview,
                collection:collection
            });


            //Dental.views.mainLayout.middle.show(new Masteriew());
            var self = this;
            collection.fetch({
                crossDomain: true,
                dataType:"jsonp",
                error:function(a, b, c){
                    console.log("abc", a,b,c);
                },
                success:function(a, b, c){
                    //console.log("abc success", a,b,c);
                }

            }).done(function(){
                self.changePage(new Masteriew());
            });


        },

        changePage:function (page) {
            console.log('page', page);
            /*$(page.el).attr('data-role', 'page');
            $(page.el).attr('data-theme', 'b');
            $(page.el).attr('data-content-theme', 'b');*/
            page.render();
            $('body').append($(page.el));
            console.log('page el', page.el);
            var transition = "slidefade";
            //var transition = $.mobile.defaultPageTransition;

            if (this.firstPage) {
                transition = 'none';
                this.firstPage = false;
            }
            $.mobile.changePage($(page.el), {changeHash:false, transition: transition});
        }

    };
});