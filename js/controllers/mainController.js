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
        start: function () {
            console.log('start controller');
            var self = this;
            Dental.views = {};
            Dental.collections = {};
            Dental.models = {};
            this.firstPage = true;
            var player = Backbone.Model.extend({
                defaults: {
                    id: null,
                    NAME: undefined,
                    ALIVE_STATUS: '',
                    imageStatus: 'icon-gray'
                },
                url: appConfig.RESTUri + 'players'
            });

            var client = Backbone.Model.extend({
                defaults: {
                    id: null,
                    NAME: undefined
                },
                url: appConfig.RESTUri + 'players'
            });

            Dental.models.client = client;
            Dental.models.player = player;

            var PlayerCollection = Backbone.Collection.extend({
                model: player,
                // url: appConfig.RESTUri +'players/{clientId}',
                url: function () {
                    return appConfig.RESTUri + 'players/' + this.clientId;
                }

            });

            var ClientCollection = Backbone.Collection.extend({
                model: client,
                url: appConfig.RESTUri + 'clients'
            });

            var PlayerAliveCollection = Backbone.Collection.extend({
                url: function () {
                    return appConfig.RESTUri + 'playersAlive/' + this.clientId;
                }
            });

            Dental.collections.playerCollection = new PlayerCollection();
            Dental.collections.clientCollection = new ClientCollection();
            Dental.collections.playerAliveCollection = new PlayerAliveCollection();

            setInterval(self.alive, 30000);


        },

        alive: function () {
            if (self.viewIsClosed)
                return;
            var id = Dental.collections.playerCollection.clientId;
            var c = Dental.collections.playerAliveCollection;
            if (id) {
                c.clientId = id;
                c.fetch({
                    crossDomain: true,
                    dataType: "jsonp"
                }).done(function () {
                    _.each(Dental.collections.playerCollection.models, function (m) {
                        var model = c.find(function (model) {
                            return model.get('id') == m.get('id');
                        });
                        var status = model ? model.get('NAME') : '';
                        m.set('ALIVE_STATUS', status);
                        if (status && status.indexOf("Online") >= 0)
                            m.set('imageStatus', 'icon-green');
                        else
                            m.set('imageStatus', 'icon-gray');

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
                tagName:'li data-icon="arrow-r"',
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
               // '<header id="header" data-role="header"></header>'+
                '<div data-role="header" style="overflow:hidden;">'+
                 '   <h1>Im a header</h1>'+
                '<a href="#" data-icon="gear" class="ui-btn-right">Options</a>'+
                 '  <div data-role="navbar">'+
                 '      <ul>'+
                 '          <li><a href="#">One</a></li>'+
                 '          <li><a href="#">Two</a></li>'+
                 '          <li><a href="#">Three</a></li>'+
                 '      </ul>'+
                 ' </div><!-- /navbar -->'+
                '</div><!-- /header -->'+
                '<div id="main" data-role="content">'+
                '<ul data-role="listview" data-inset="true"></ul>'+
                '</div>'+
                '<footer data-role="footer" class="footer">'+
                '<div data-role="footer">'+
            '   <div data-role="navbar">'+
            '           <ul>'+
            '               <li><a href="#" data-icon="grid">Summary</a></li>'+
            '               <li><a href="#" data-icon="star" class="ui-btn-active">Favs</a></li>'+
            '               <li><a href="#" data-icon="gear">Setup</a></li>'+
            '           </ul>'+
            '       </div><!-- /navbar -->'+
            '   </div><!-- /footer -->'+
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

            Dental.collections.clientCollection.fetch({
                crossDomain: true,
                dataType: "jsonp"

            }).done(function(){
            self.changePage(new View());
        });
        },
/*
*
* <a href="#">
         <img src="../_assets/img/album-bb.jpg">
     <h2>Broken Bells</h2>
     <p>Broken Bells</p></a>*/
        showPlayers: function(clientId) {
            console.log("showPlayers");
            var self = this;
            var PlayerItemView = Marionette.ItemView.extend({
                model:Dental.models.player,
                template:_.template(
                    '<a href="#" class="ui-btn ui-btn-icon-left <%=imageStatus%>">'+
                    '   <%=NAME%> ' +
                    '</a>'+
                    '<p class="ui-li-aside"><strong><%=ALIVE_STATUS%></strong></p>'
                ),
                tagName:'li data-icon="arrow-r"',
                events:{
                    "click a":function(e){
                        console.log('ClientItemView click');
                    }
                },
                initialize: function() {
                    this.listenTo(this.model, 'change', this.render);
                }

            });

            var template =
                // '<header id="header" data-role="header"></header>'+
                '<div data-role="header" style="overflow:hidden;">'+
                '   <h1>Im a header</h1>'+
                '<a href="#" data-icon="gear" class="ui-btn-right">Options</a>'+
                '  <div data-role="navbar">'+
                '      <ul data-role="listview" data-split-icon="gear" data-split-theme="b" data-inset="true">'+
                '          <li><a href="#">One</a></li>'+
                '          <li><a href="#">Two</a></li>'+
                '          <li><a href="#">Three</a></li>'+
                '      </ul>'+
                ' </div><!-- /navbar -->'+
                '</div><!-- /header -->'+
                '<div id="main" data-role="content">'+
                '<ul data-role="listview" data-inset="true"></ul>'+
                '</div>'+
                '<footer data-role="footer" class="footer">'+
                '<div data-role="footer">'+
                '   <div data-role="navbar">'+
                '           <ul>'+
                '               <li><a href="#" data-icon="grid">Summary</a></li>'+
                '               <li><a href="#" data-icon="star" class="ui-btn-active">Favs</a></li>'+
                '               <li><a href="#" data-icon="gear">Setup</a></li>'+
                '           </ul>'+
                '       </div><!-- /navbar -->'+
                '   </div><!-- /footer -->'+
                '</footer>';

            var PlayersView = Marionette.CompositeView.extend({
                template:_.template(template),// _.template('<ul data-role="listview" data-split-icon="gear" data-split-theme="b" data-inset="true"></ul>'),
                childView:PlayerItemView,
                childViewContainer:'#main ul',
                collection:Dental.collections.playerCollection,
                events:{
                    'pagehide':'_onPageHide'
                },

                _onPageHide:function(){
                    self.viewIsClosed = true;
                    this.remove();
                }
            });

            Dental.collections.playerCollection.clientId = clientId;
            self.viewIsClosed = false;
            Dental.collections.playerCollection.fetch({
                crossDomain: true,
                dataType: "jsonp"
            }).done(function(){
                self.alive();
                setTimeout(function(){
                    self.changePage(new PlayersView());
                },100)

            });

        },

        changePage:function (page) {
            console.log('page', page);

            $(page.el).attr('data-role', 'page');
            //$(page.el).attr('data-theme', 'b');
            //$(page.el).attr('data-content-theme', 'b');

            page.render();
            $('body').append($(page.el));
            var transition = "slidefade";

            if (this.firstPage) {
                transition = 'none';
                this.firstPage = false;
            }
            $.mobile.changePage($(page.el), {changeHash:false, transition: transition});
            //$.mobile.changePage($(Dental.main.el), {changeHash:false, transition: transition});

        }

    };
});