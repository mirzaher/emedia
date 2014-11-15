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
                    NAME:undefined
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

            Dental.collections.playerCollection = new PlayerCollection();
            Dental.collections.clientCollection = new ClientCollection();
        },

        showHome:function(){
            var self = this;
            var ClientItemView = Marionette.ItemView.extend({
                model:Dental.models.client,
                template:_.template(
                    ' <a href="#"><%=NAME%></a>'
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
                '<header id="header" data-role="header"></header>'+
                '<div id="main" data-role="content">'+
                '<ul data-role="listview" data-inset="true"></ul>'+
                '</div>'+
                '<footer data-role="footer" class="footer">'+
                '</footer>';

            var View = Backbone.Marionette.CompositeView.extend({
                template : _.template(template),
                childViewContainer : '#main ul',
                childView:ClientItemView,
                collection:Dental.collections.clientCollection,
                events:{
                    'pagehide':'_onPageHide'
                },

                _onPageHide:function(){
                    this.remove();
                }
            });

            //self.changePage(new View());


            Dental.collections.clientCollection.fetch({
                crossDomain: true,
                dataType: "jsonp"

            }).done(function(){
            self.changePage(new View());
        });
        },

        showPlayers: function(clientId) {
            console.log("showPlayers");
            var self = this;
            var PlayerItemView = Marionette.ItemView.extend({
                model:Dental.models.player,
                template:_.template(
                    ' <a href="#"><%=NAME%></a>'
                ),
                tagName:'li',
                events:{
                    "click a":function(e){
                        console.log('ClientItemView click');
                    }
                }

            });

            var template =
                '<header id="header" data-role="header"></header>'+
                '<div id="main" data-role="content">'+
                '<ul data-role="listview" data-inset="true"></ul>'+
                '</div>'+
                '<footer data-role="footer" class="footer">'+
                '</footer>';

            var View = Backbone.Marionette.CompositeView.extend({
                template : _.template(template),
                childViewContainer : '#main ul',
                childView:PlayerItemView,
                collection:Dental.collections.playerCollection,
                events:{
                    'pagehide':'_onPageHide'
                },

                _onPageHide:function(){
                    this.remove();
                }
            });



            Dental.collections.playerCollection.clientId = clientId;

            Dental.collections.playerCollection.fetch({
                crossDomain: true,
                dataType: "jsonp"
            }).done(function(){
                self.changePage(new View());
            });

        },

        changePage:function (page) {
            page.on("pagehide", function(){
                alert("taj sm");
            });
            page.render();
            //Dental.body.show(page, { preventClose: true });
            console.log('page', page, $(page.el));

            $('body').append($(page.el));
            $(page.el).attr('data-role', 'page');
            $(page.el).attr('data-theme', 'b');
            $(page.el).attr('data-content-theme', 'b');

            var transition = "slide";

            if (this.firstPage) {
                transition = 'none';
                this.firstPage = false;
            }
            $.mobile.changePage($(page.el), {changeHash:false, transition: transition});


        }

    };
});