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
            Dental.collections = {};
            Dental.models ={};
            this.firstPage = true;
            var player = Backbone.Model.extend({
                defaults:{
                    id:null,
                    NAME:undefined,
                    ALIVE_STATUS:'N/A'
                },
                url: appConfig.RESTUri +'players'
            });

            var client = Backbone.Model.extend({
                defaults:{
                    id:null,
                    NAME:undefined
                },
                url: appConfig.RESTUri +'players'
            });

            Dental.models.client = client;
            Dental.models.player = player;

            var PlayerCollection = Backbone.Collection.extend({
                model:player,
               // url: appConfig.RESTUri +'players/{clientId}',
                url: function () {
                    return appConfig.RESTUri +'players/'+ this.clientId;
                }

            });

            var ClientCollection = Backbone.Collection.extend({
                model:client,
                url: appConfig.RESTUri +'clients'
            });

            var PlayerAliveCollection = Backbone.Collection.extend({
                url: function () {
                    return appConfig.RESTUri +'playersAlive/'+ this.clientId;
                }
            });

            Dental.collections.playerCollection = new PlayerCollection();
            Dental.collections.clientCollection = new ClientCollection();
            Dental.collections.playerAliveCollection = new PlayerAliveCollection();
            var alive = function(){
                Dental.collections.playerAliveCollection.clientId = Dental.collections.playerCollection.clientId();
                Dental.collections.playerAliveCollection.fetch().done(function(){
                    _.each(Dental.collections.playerCollection.models, function(m){
                        m.set('ALIVE_STATUS', m.NAME);
                    })
                });
            }

        },

        showHome:function(){
            var self = this;
            var ClientItemView = Marionette.ItemView.extend({
                model:Dental.models.client,
                template:_.template(
                    '<a href="#"><%=NAME%></a>'
                ),
                tagName:'li',
                events:{
                    "click a":function(e){
                        console.log('ClientItemView click');
                        e.stopPropagation();
                        e.preventDefault();
                        var url = '#players/'+this.model.get('id');
                        console.log('ClientItemView click', url);

                        Backbone.history.navigate(url, true);
                    }
                }

            });

            /*var ClientsView = Marionette.CollectionView.extend({
                tagName:'ul data-role="listview" data-inset="true"',
                childView:ClientItemView,
                collection:Dental.collections.clientCollection
            });*/


            var template =
                '<div data-role="page" data-theme="b">'+
                '<header id="header" data-role="header"></header>'+
                '<div id="main" data-role="content">'+
                '<ul data-role="listview" data-inset="true"></ul>'+
                '</div>'+
                '<footer data-role="footer" class="footer">'+
                '</footer>'+
                '</div>';

            var View = Backbone.Marionette.CompositeView.extend({
                template : _.template(template),
                childViewContainer : '#main ul',
                childView:ClientItemView,
                collection:Dental.collections.clientCollection
            });

           /* setTimeout(function(){
                self.changePage(new View());
            },5000);

*/

            Dental.body.show(new View());
            Dental.collections.clientCollection.fetch({
                crossDomain: true,
                dataType: "jsonp"

            });
        },

        showPlayers: function(clientId) {
            console.log("showPlayers");
            var PlayerItemView = Marionette.ItemView.extend({
                model:Dental.models.player,
                template:_.template(
                    ' <span> <%=ALIVE_STATUS%></span> <a href="#"><%=NAME%></a>'
                ),
                tagName:'li',
                events:{
                    "click a":function(e){
                        console.log('ClientItemView click');
                    }
                }

            });

            var PlayersView = Marionette.CollectionView.extend({
                tagName:'ul data-role="listview" data-inset="true"',
                childView:PlayerItemView,
                collection:Dental.collections.playerCollection
            });
            Dental.collections.playerCollection.clientId = clientId;

            Dental.collections.playerCollection.fetch({
                crossDomain: true,
                dataType: "jsonp"
            });

            var view = new PlayersView();
//            Dental.main.show(view);

           this.changePage(view);
        },

        changePage:function (page) {
            console.log('page', page);

            //$(page.el).attr('data-role', 'page');
            //$(page.el).attr('data-theme', 'b');
            //$(page.el).attr('data-content-theme', 'b');

            page.render();
            $('body').append($(page.el));
            var transition = "slidefade";
            //var transition = $.mobile.defaultPageTransition;

            if (this.firstPage) {
                transition = 'none';
                this.firstPage = false;
            }
            $.mobile.changePage($(page.el), {changeHash:false, transition: transition});
            //$.mobile.changePage($(Dental.main.el), {changeHash:false, transition: transition});

        }

    };
});