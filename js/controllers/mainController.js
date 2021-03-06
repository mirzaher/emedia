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
    'typeahead', 'jquery.mobile', 'jquery.jplayer', 'jplayer.playlist'
], function($, Backbone, Bootstrap, Marionette) {

    return {
        start: function() {
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
                    STATUS: {
                        STATUS_NAME: '',
                        index: -1
                    },
                    imageStatusIcon: 'icon-gray'
                },
                url: appConfig.RESTUri + 'players'
            });

            var client = Backbone.Model.extend({
                defaults: {
                    id: null,
                    NAME: undefined,
                    status: "1"
                }
            });

            var track = Backbone.Model.extend({
                defaults: {
                    id: null,
                    START_TIME: undefined,
                    TRACKNAME: ""
                }
            });

            Dental.models.client = client;
            Dental.models.player = player;
            Dental.models.track = track;

            var PlayerCollection = Backbone.Collection.extend({
                model: player,
                url: function() {
                    return appConfig.RESTUri + 'players/' + this.clientId;
                },

                comparator: function(model) {
                    var status = model.get('STATUS');
                    var daniStr = status.STATUS_NAME.split('d ');
                    var dani = '';

                    if (_.isArray(daniStr) && daniStr.length == 2)
                        dani = Dental.helper.pad(daniStr[0], 5) + ' ' + daniStr[1];
                    else
                        dani = Dental.helper.pad('', 5) + ' ' + daniStr[0];
                    //console.log('dani',dani);
                    return status ? status.index + dani + model.get('NAME') : model.get('NAME');
                }

            });

            var ClientCollection = Backbone.Collection.extend({
                status: '1',
                model: client,
                url: function() {
                    return appConfig.RESTUri + 'clients/' + this.status;
                }

            });

            var PlayerAliveCollection = Backbone.Collection.extend({
                url: function() {
                    return appConfig.RESTUri + 'playersAlive/' + this.clientId;
                }
            });


            var TrackCollection = Backbone.Collection.extend({
                playerId: '',
                model: track,
                url: function() {
                    return appConfig.RESTUri + 'playlist/' + this.playerId;
                }

            });

            Dental.collections.playerCollection = new PlayerCollection();
            Dental.collections.clientCollection = new ClientCollection();
            Dental.collections.playerAliveCollection = new PlayerAliveCollection();
            Dental.collections.trackCollection = new TrackCollection();
            setInterval(self.alive, 30000);
            alert("interval");

        },

        alive: function(callback) {
            try {

                if (self.viewIsClosed)
                    return;
                var id = Dental.collections.playerCollection.clientId;
                var c = Dental.collections.playerAliveCollection;
                if (id) {
                    c.clientId = id;
                    c.fetch({
                        crossDomain: true,
                        dataType: "jsonp"
                    }).done(function() {
                        $.mobile.loading('show');
                        _.each(Dental.collections.playerCollection.models, function(m) {
                            var model = c.find(function(model) {
                                return model.get('id') == m.get('id');
                            });
                            var status = model ? model.get('STATUS') : undefined;
                            if (status) {
                                m.set('STATUS', status, {
                                    silent: true
                                });
                                if (status.STATUS_NAME.indexOf("Online") >= 0)
                                    m.set('imageStatusIcon', 'icon-green', {
                                        silent: true
                                    });
                                else {
                                    if (status.index == 1)
                                        m.set('imageStatusIcon', 'icon-blue', {
                                            silent: true
                                        });
                                    else if (status.index == 2)
                                        m.set('imageStatusIcon', 'icon-gray', {
                                            silent: true
                                        });
                                }
                            }
                        });

                        console.log('beffore sort');
                        Dental.collections.playerCollection.sort();
                        console.log('after sort');
                        $.mobile.loading('hide');
                        if (callback)
                            callback();

                    });
                }
            } catch (error) {
                alert("error: " + error.message);
            }

        },

        showHome: function() {
            var self = this;
            var ClientItemView = Marionette.ItemView.extend({
                model: Dental.models.client,
                template: _.template(
                    '<a class="ui-btn" href="#"><%=NAME%></a>'
                ),
                tagName: 'li data-icon="arrow-r"',
                events: {
                    "click a": function(e) {
                        console.log('ClientItemView click');
                        e.stopPropagation();
                        e.preventDefault();
                        var url = '#players/' + this.model.get('id');
                        console.log('ClientItemView click', url);

                        Backbone.history.navigate(url, true);
                    }
                }

            });

            var template =
                // '<header id="header" data-role="header"></header>'+
                '<div data-role="header">' +
                '   <h1>Lista klijenata</h1>' +
                '<a href="#" data-icon="gear" class="ui-btn-right">Opcije</a>' +
                '  <div data-role="navbar">' +
                '      <ul>' +
                '          <li data-status="1"><a href="#" class="ui-btn-active">Aktivni</a></li>' +
                '          <li data-status="2"><a href="#">Neaktivni</a></li>' +
                '      </ul>' +
                ' </div><!-- /navbar -->' +
                '</div><!-- /header -->' +
                '<div id="main" data-role="content">' +
                '<ul data-role="listview"></ul>' +
                '</div>' +
                '<footer data-role="footer" class="footer" data-position="fixed">' +
                '<div data-role="footer">' +
                '   <div data-role="navbar">' +
                '           <ul>' +
                '               <li><a href="#" data-icon="grid">Zbirno</a></li>' +
                '           </ul>' +
                '       </div><!-- /navbar -->' +
                '   </div><!-- /footer -->' +
                '</footer>';

            var View = Backbone.Marionette.CompositeView.extend({
                template: _.template(template),
                childViewContainer: '#main ul',
                childView: ClientItemView,
                collection: Dental.collections.clientCollection,
                events: {
                    'pagehide': '_onPageHide',
                    'click [data-role=header]>[data-role=navbar]>ul>li': 'click',
                    'click [data-role=footer]>[data-role=navbar]>ul>li': 'clickFooter'
                },

                click: function(e) {
                    //var self = this;
                    this.collection.status = $(e.currentTarget).data('status');
                    this.collection.fetch({
                        crossDomain: true,
                        dataType: "jsonp"
                    }).done(function() {
                        //self.render();
                    });


                },


                clickFooter: function(e) {
                    console.log("Click footer");
                    var self = this;
                    var id = $(e.currentTarget).data('fileId');
                    var src = "http://server.enamedia.ba/api/stream/10100";
                    var url = "/jPlayer/examples/pink.flag/demo-02.htm";
                    //Backbone.history.navigate(url, true);

                },

                _onPageHide: function() {
                    this.remove();
                },

                onRender: function(a, b, c) {
                    console.log('onRender', a, b, c);
                    //                    if(!this.isFirstRender)
                    $(this.el).trigger('create');
                }


            });
            try {

                Dental.collections.clientCollection.fetch({
                    crossDomain: true,
                    dataType: "jsonp",
                    success: function() {
                        alert("Dental.collections.clientCollection.fetch done");
                        self.changePage(new View());
                    },
                    error: function(a, b, c) {
                        alert("Dental.collections.clientCollection.fetch error" + a + b + c);
                        self.changePage(new View());
                    },

                });

            } catch (err) {
            alert("Dental.collections.clientCollection catch" + err.message);
            }
            alert("Dental.collections.clientCollection.fetch");

        },

        showPlaylist: function(playerId) {
            var self = this;
            var TrackItemView = Marionette.ItemView.extend({
                model: Dental.models.client,
                template: _.template(
                    '<a class="ui-btn" href="#"><%=FILE_ID%></a>'
                ),
                tagName: 'li'
            });

            var template =
                // '<header id="header" data-role="header"></header>'+
                '<div data-role="header">' +
                '</div><!-- /header -->' +
                '<div id="main" data-role="content">' +
                '   <div id="jquery_jplayer_1" class="jp-jplayer"></div>' +
                '   <div id="jp_container_1" class="jp-video-270p" role="application" aria-label="media player">' +
                '       <div class="jp-type-playlist">' +
                '           <div class="jp-gui jp-interface">' +
                '               <div class="jp-volume-controls">' +
                '                   <button class="jp-mute" role="button" tabindex="0">mute</button>' +
                '                   <button class="jp-volume-max" role="button" tabindex="0">max volume</button>' +
                '                   <div class="jp-volume-bar">' +
                '                       <div class="jp-volume-bar-value"></div>' +
                '                   </div>' +
                '               </div>' +
                '           <div class="jp-controls-holder">' +
                '               <div class="jp-controls">' +
                '                   <button class="jp-previous" role="button" tabindex="0">previous</button>' +
                '                   <button class="jp-play" role="button" tabindex="0">play</button>' +
                '                   <button class="jp-stop" role="button" tabindex="0">stop</button>' +
                '                   <button class="jp-next" role="button" tabindex="0">next</button>' +
                '               </div>' +
                '           <div class="jp-progress">' +
                '               <div class="jp-seek-bar">' +
                '                   <div class="jp-play-bar"></div>' +
                '               </div>' +
                '           </div>' +
                '           <div class="jp-current-time" role="timer" aria-label="time">&nbsp;</div>' +
                '           <div class="jp-duration" role="timer" aria-label="duration">&nbsp;</div>' +
                /*     '           <div class="jp-toggles">'+
                     '               <button class="jp-repeat" role="button" tabindex="0">repeat</button>'+
                     '               <button class="jp-shuffle" role="button" tabindex="0">shuffle</button>'+
                     '           </div>'+*/
                '       </div>' +
                '   </div>' +
                '   <div class="jp-playlist">' +
                '       <ul>' +
                '           <li>&nbsp;</li>' +
                '       </ul>' +
                '   </div>' +
                '   <div class="jp-no-solution">' +
                '       <span>Update Required</span>' +
                '           To play the media you will need to either update your browser to a recent version or update your <a href="http://get.adobe.com/flashplayer/" target="_blank">Flash plugin</a>.' +
                '   </div>' +
                '</div>' +
                //              '</div>'+
                //                '</div>'+
                '<footer data-role="footer" class="footer" data-position="fixed">' +
                '   <div data-role="footer">' +
                '   </div><!-- /footer -->' +
                '</footer>';

            var View = Backbone.Marionette.CompositeView.extend({
                template: _.template(template),
                //childViewContainer : '#main ul',
                //childView:TrackItemView,
                //collection:Dental.collections.trackCollection,

                _onPageHide: function() {
                    this.remove();
                },

                startPlay: function() {
                    var tracks = [];
                    _.each(Dental.collections.trackCollection.models, function(m) {
                        tracks.push({
                            title: m.get("FILE_ID"),
                            mp3: "http://server.enamedia.ba/api/stream/" + m.get("FILE_ID")
                        })
                    });
                    console.log("tracks", tracks.length);
                    var p = new jPlayerPlaylist({
                        jPlayer: "#jquery_jplayer_1",
                        cssSelectorAncestor: "#jp_container_1"
                    }, tracks, {
                        //swfPath: "../../dist/jplayer",
                        supplied: "mp3",
                        wmode: "window",
                        useStateClassSkin: true,
                        autoBlur: false,
                        smoothPlayBar: true,
                        keyEnabled: true,
                        preload: "auto"
                    });

                },

                onRender: function(a, b, c) {
                    var self = this;
                    console.log('onRender', a, b, c);
                    $(this.el).trigger('create');
                    //setTimeout(this.startPlay, 5000);
                }

            });

            Dental.collections.trackCollection.playerId = playerId;
            Dental.collections.trackCollection.fetch({
                crossDomain: true,
                dataType: "jsonp"
            }).done(function() {
                self.changePage(new View());
            });
        },

        showPlayers: function(clientId) {
            console.log("showPlayers");
            var self = this;
            var PlayerItemView = Marionette.ItemView.extend({
                model: Dental.models.player,
                template: _.template(
                    '<a href="#" style="padding-right:7.5em" class="ui-btn ui-btn-icon-left <%=imageStatusIcon%>">' +
                    '   <%=NAME%> ' +
                    '</a>' +
                    '<p class="ui-li-aside"><strong><%=STATUS.STATUS_NAME%></strong></p>'
                ),
                tagName: 'li',
                events: {
                    "click a": function(e) {
                        console.log('ClientItemView click');
                        e.stopPropagation();
                        e.preventDefault();
                        var url = '#playlist/' + this.model.get('id');
                        console.log('ClientItemView click', url);

                        Backbone.history.navigate(url, true);
                    }
                },
                initialize: function() {
                    this.listenTo(this.model, 'change', this.render);
                }

            });

            var template =
                '<div id="header" data-role="header">' +
                '   <h1><%=onlineMsg%> <%=offlineMsg%></h1>' +
                ' </div>' +
                '<div id="main" data-role="content">' +
                '<ul data-role="listview" ></ul>' +
                '</div>' +
                '<footer data-role="footer" class="footer" data-position="fixed">' +
                '<div data-role="footer">' +
                '   <div data-role="navbar">' +
                '           <ul>' +
                '               <li><a href="#" data-icon="grid">Summary</a></li>' +
                '               <li><a href="#" data-icon="star" class="ui-btn-active">Favs</a></li>' +
                '               <li><a href="#" data-icon="gear">Setup</a></li>' +
                '           </ul>' +
                '       </div><!-- /navbar -->' +
                '   </div><!-- /footer -->' +
                '</footer>';

            var PlayersView = Marionette.CompositeView.extend({
                template: _.template(template), // _.template('<ul data-role="listview" data-split-icon="gear" data-split-theme="b" data-inset="true"></ul>'),
                childView: PlayerItemView,
                childViewContainer: '#main ul',
                collection: Dental.collections.playerCollection,
                events: {
                    'pagehide': '_onPageHide'
                },

                initialize: function() {
                    this.listenTo(this.collection, 'sort', this.render);
                },

                serializeData: function() {
                    var total = _.countBy(this.collection.models, function(model) {

                        switch (model.get('STATUS').index) {
                            case 0:
                                return 'onlineCount';
                                break;
                            case 1:
                                return 'offlineCount';
                                break;
                            case 2:
                                return 'offlineCount';
                                break;
                            default:
                                return 'Nepoznato';
                        }

                    });

                    console.log('total', total);
                    return {
                        onlineMsg: total.onlineCount ? 'Online:' + total.onlineCount : 'Online:-',
                        offlineMsg: total.offlineCount ? 'Offline:' + total.offlineCount : 'Offline:-'
                    };

                },

                _onPageHide: function() {
                    self.viewIsClosed = true;
                    this.remove();
                },

                onRender: function(a, b, c) {
                    console.log('onRender', a, b, c);
                    if (!this.isFirstRender)
                        $(this.el).trigger('create');
                }

            });

            Dental.collections.playerCollection.reset();
            var view = new PlayersView();
            view.isFirstRender = true;
            self.changePage(view);
            view.isFirstRender = false;

            Dental.collections.playerCollection.clientId = clientId;
            self.viewIsClosed = false;
            Dental.collections.playerCollection.fetch({
                crossDomain: true,
                dataType: "jsonp"
            }).done(function() {
                console.log('onCallback');
                self.alive(function() {})
            });

        },

        changePage: function(page) {
            console.log('page', page);
            var self = this;

            $(page.el).attr('data-role', 'page');
            //$(page.el).attr('data-theme', 'b');
            //$(page.el).attr('data-content-theme', 'b');
            page.render(afterRender);

            function afterRender() {
                $('body').append($(page.el));
                var transition = "slidefade";

                if (self.firstPage) {
                    transition = 'none';
                    self.firstPage = false;
                }
                $.mobile.changePage($(page.el), {
                    changeHash: false,
                    transition: transition
                });
            }
            afterRender();
            if (page.startPlay)
                page.startPlay();
            //setTimeout(afterRender, 1000);
        }

    };
});