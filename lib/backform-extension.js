/**
 * Created with JetBrains PhpStorm.
 * User: Haris
 * Date: 9/28/14
 * Time: 2:04 PM
 * To change this template use File | Settings | File Templates.
 */

define(['jquery',
    'underscore',
    'backbone',
    'backform','typeahead'], function($, _){

    var form = Backform.Form = Backform.Form.extend({
    render: function() {
        var self = this;
        this.removeCells();
        this.$el.empty();
        var form = this,
            $form = this.$el,
            model = this.model;

        this.fields.each(function(field) {
            var control = new (field.get("control"))({
                field: field,
                model: model
            });
            $form.append(control.render().$el);
            self.cells.push(control);
        });
        return this;
    },

    removeCells:function(){
        if(this.cells){
            for (var i = 0; i < this.cells.length; i++) {
                var cell = this.cells[i];
                cell.remove.apply(cell, arguments);
            }
        }
        this.cells = [];
    },

    remove: function () {
        this.removeCells();
        return Backbone.View.prototype.remove.apply(this, arguments);
    },

    getControl:function(fieldName){
        var self = this;
        var cell = undefined;
        _.each(self.cells, function(c){
            if(c.field.get('name') == fieldName)
                cell = c;
        });
        return cell;
    }
    });




    var isDate = Backform.isDate = function isDate(value, sepVal, dayIdx, monthIdx, yearIdx) {
        try {
            //Change the below values to determine which format of date you wish to check. It is set to dd/mm/yyyy by default.
            var DayIndex = dayIdx !== undefined ? dayIdx : 2;
            var MonthIndex = monthIdx !== undefined ? monthIdx : 1;
            var YearIndex = yearIdx !== undefined ? yearIdx : 0;
            //value = value.replace(/-/g, "/").replace(/\./g, "/");
            //console.log('Day, Month, Year',value, DayIndex,MonthIndex,YearIndex );

            var SplitValue = value.split(sepVal || "-");
            var OK = true;
            if (!(SplitValue[DayIndex].length == 1 || SplitValue[DayIndex].length == 2)) {
                OK = false;
            }
            if (OK && !(SplitValue[MonthIndex].length == 1 || SplitValue[MonthIndex].length == 2)) {
                OK = false;
            }
            if (OK && SplitValue[YearIndex].length != 4) {
                OK = false;
            }
            if (OK) {
                var Day = parseInt(SplitValue[DayIndex], 10);
                var Month = parseInt(SplitValue[MonthIndex], 10);
                var Year = parseInt(SplitValue[YearIndex], 10);
              //  console.log('Day, Month, Year', Day, Month, Year, new Date().getFullYear());
                if (OK = ((Year > 1900) && (Year <= new Date().getFullYear()))) {
                    if (OK = (Month <= 12 && Month > 0)) {
                        var LeapYear = (((Year % 4) == 0) && ((Year % 100) != 0) || ((Year % 400) == 0));

                        if(OK = Day > 0)
                        {
                            if (Month == 2) {
                                OK = LeapYear ? Day <= 29 : Day <= 28;
                            }
                            else {
                                if ((Month == 4) || (Month == 6) || (Month == 9) || (Month == 11)) {
                                    OK = Day <= 30;
                                }
                                else {
                                    OK = Day <= 31;
                                }
                            }
                        }
                    }
                }
            }
            return OK;
        }
        catch (e) {
            return false;
        }
    }





    var TypeaheadControl = Backform.TypeaheadControl = Backform.InputControl.extend({
    defaults: {
        type: "text",
        options: {},
        source:{}
    },

    initialize:function(){
        this.__proto__.constructor.__super__.initialize.apply(this, arguments);
        var self = this;
        var arg = this.field.get("options");
        this.lookup = arg.lookup;
        var col = this.lookup.collection();
        console.log(' TypeaheadControl initialize', col);

        this.listenTo(col, "add", function(a, b){
            console.log('add',a);
            self.model.set(self.field.get("name"), a.id);
            self.render();

        });


    },

    template: _.template([
        '<label class="<%=Backform.controlLabelClassName%>"><%-label%></label>',
        '<div class="<%=Backform.controlsClassName%>">',
        '  <input type="<%=type%>" class="<%=Backform.controlClassName%> typeahead" name="<%=name%>" data-nested="<%=nested%>" value="<%-lookupValue()%>" data-lookupValue="<%-value%>" placeholder="<%-placeholder%>" <%=disabled ? "disabled" : ""%> <%=required ? "required" : ""%> />',
        ' <a type="button" name="<%=name%>" class="btn btn-success <%if(disabled){ %> disabled <%}%>"  >',
        '    <%=options.buttonAddNewTitle ? options.buttonAddNewTitle : "Dodaj..."%>',
        ' </a>',
        '</div>'
    ].join("\n")),

    events: {
        "typeahead:selected": "proba",
        "focus input": "clearInvalid",
        "click a":"test"

    },

    getValueFromDOM: function() {
        return this.$el.find("input").data("lookupValue");
    },

    test:function(a){
        //console.log('taj sma', this);
        var options = this.field.get("options");
        options.addNew();
  //      this.$el.find("input").data("lookupValue", b.value2);
//        this.onChange(a);

    },

    proba:function(a,b,c){
        //console.log('taj sma', a, b);
        this.$el.find("input").data("lookupValue", b.value2);
        this.onChange(a);

    },

    getSource: function(models){
        //console.log('getSource models', models);
        var self = this;
        var numbers = new Bloodhound({
            datumTokenizer: function(d) { return Bloodhound.tokenizers.whitespace(d.value); },
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            limit:4,
            local: _.map(models, function(model) {
                return {
                        value2: model.get('id') ,
                        value: self.getValue(model)
                    };
            })
        });

        numbers.initialize();

        return numbers
    },

    getValue:function(model){
        if(model == undefined)
            return "";

        var value ="";

        _.each(this.lookup.fields, function(field){
            value += value==""?model.get(field):" "+model.get(field);
        });
        return value;
    },

    mojRender: function() {
        console.log("mojRender", this);
        var self = this;
        var field = _.defaults(this.field.toJSON(), this.defaults),
            attributes = this.model.toJSON(),
            value = field.nested ? this.keyPathAccessor(attributes[field.name], field.nested) : attributes[field.name],
            data = _.extend(field, {value: value,
                lookupValue:function(){
                    console.log('self.lookup.collection().models', self.lookup.collection(), value);
                    var o = _.find(self.lookup.collection().models, {id:value});
                    return self.getValue( o);
                },
                attributes: attributes});
        console.log("mojRender data", data);
        this.$el.html(this.template(data));
        this.updateInvalid();
        return this;
    },

    render: function() {
        //console.log('typeahead render',this);

        //Backform.InputControl.prototype.render.apply(this, arguments);
        var options = this.field.get("options");
        //this.lookup = options.lookup;
        this.mojRender();

        options.source = this.getSource(this.lookup.collection().models).ttAdapter();
        console.log('lookupProba options',options);
        //lookupCollection
        //this.$el.find("input").typeahead(this.field.get("options"));
        this.$el.find("input").typeahead({
                hint: true,
                highlight: true,
                minLength: 1
            },options
        );
        return this;
    }
});

    var CellFormatter = Backform.CellFormatter = function () {};
    _.extend(CellFormatter.prototype, {

        /**
         Takes a raw value from a model and returns an optionally formatted string
         for display. The default implementation simply returns the supplied value
         as is without any type conversion.

         @member Backgrid.CellFormatter
         @param {*} rawData
         @param {Backbone.Model} model Used for more complicated formatting
         @return {*}
         */
        fromRaw: function (rawData, model) {
            return rawData;
        },

        /**
         Takes a formatted string, usually from user input, and returns a
         appropriately typed value for persistence in the model.

         If the user input is invalid or unable to be converted to a raw value
         suitable for persistence in the model, toRaw must return `undefined`.

         @member Backgrid.CellFormatter
         @param {string} formattedData
         @param {Backbone.Model} model Used for more complicated formatting
         @return {*|undefined}
         */
        toRaw: function (formattedData, model) {
            return formattedData;
        }

    });



    var NumberFormatter = Backform.NumberFormatter = function (options) {
        _.extend(this, this.defaults, options || {});

        if (this.decimals < 0 || this.decimals > 20) {
            throw new RangeError("decimals must be between 0 and 20");
        }
    };

    NumberFormatter.prototype = new CellFormatter();

    _.extend(NumberFormatter.prototype, {

        /**
         @member Backgrid.NumberFormatter
         @cfg {Object} options

         @cfg {number} [options.decimals=2] Number of decimals to display. Must be an integer.

         @cfg {string} [options.decimalSeparator='.'] The separator to use when
         displaying decimals.

         @cfg {string} [options.orderSeparator=','] The separator to use to
         separator thousands. May be an empty string.
         */
        defaults: {
            decimals: 2,
            decimalSeparator: ',',
            orderSeparator: '.'
        },

        HUMANIZED_NUM_RE: /(\d)(?=(?:\d{3})+$)/g,

        /**
         Takes a floating point number and convert it to a formatted string where
         every thousand is separated by `orderSeparator`, with a `decimal` number of
         decimals separated by `decimalSeparator`. The number returned is rounded
         the usual way.

         @member Backgrid.NumberFormatter
         @param {number} number
         @param {Backbone.Model} model Used for more complicated formatting
         @return {string}
         */
        fromRaw: function (number, model) {
            //console.log('fromRaw', number, this);
            if (_.isNull(number) || _.isUndefined(number) || number == '') return '';
            number = number.toFixed(~~this.decimals);

            var parts = number.split('.');
            var integerPart = parts[0];
            var decimalPart = parts[1] ? (this.decimalSeparator || '.') + parts[1] : (this.decimalSeparator+'00' || '.00');

            return integerPart.replace(this.HUMANIZED_NUM_RE, '$1' + this.orderSeparator) + decimalPart + ' KM';
        },

        /**
         Takes a string, possibly formatted with `orderSeparator` and/or
         `decimalSeparator`, and convert it back to a number.

         @member Backgrid.NumberFormatter
         @param {string} formattedData
         @param {Backbone.Model} model Used for more complicated formatting
         @return {number|undefined} Undefined if the string cannot be converted to
         a number.
         */
        toRaw: function (formattedData, model) {
            //console.log('toRaw', formattedData, this);
            formattedData = formattedData.replace('KM','');
            formattedData = formattedData.trim();

            if (formattedData === '') return null;

            var rawData = '';

            var thousands = formattedData.split(this.orderSeparator);
            for (var i = 0; i < thousands.length; i++) {
                rawData += thousands[i];
            }

            var decimalParts = rawData.split(this.decimalSeparator);
            rawData = '';
            for (var i = 0; i < decimalParts.length; i++) {
                rawData = rawData + decimalParts[i] + '.';
            }

            if (rawData[rawData.length - 1] === '.') {
                rawData = rawData.slice(0, rawData.length - 1);
            }

            var result = (rawData * 1).toFixed(~~this.decimals) * 1;
            if (_.isNumber(result) && !_.isNaN(result)) return result;
        }

    });


    var InputCurrencyControl = Backform.InputCurrencyControl = Backform.InputControl.extend({
        defaults: {
            type: "text"
        },



        initialize: function (options) {
            //console.log('options', options, this);
            Backform.Control.prototype.initialize.apply(this, arguments);
            this.formatter = new NumberFormatter();
            var formatter = this.formatter;
            formatter.decimals = this.decimals;
            formatter.decimalSeparator = this.decimalSeparator;
            formatter.orderSeparator = this.orderSeparator
            _.bindAll(this,'render');

        },

        decimals: NumberFormatter.prototype.defaults.decimals,

        /** @property {string} [decimalSeparator='.'] */
        decimalSeparator: NumberFormatter.prototype.defaults.decimalSeparator,

        /** @property {string} [orderSeparator=','] */
        orderSeparator: NumberFormatter.prototype.defaults.orderSeparator,

        template: _.template([
            '<label class="<%=Backform.controlLabelClassName%>"><%-label%></label>',
            '<div class="<%=Backform.controlsClassName%>">',
            '  <input type="<%=type%>" style="text-align: right;" class="<%=Backform.controlClassName%>" name="<%=name%>" data-nested="<%=nested%>" value="<%-value%>" placeholder="<%-placeholder%>" <%=disabled ? "disabled" : ""%> <%=required ? "required" : ""%> />',
            '</div>',
        ].join("\n")),
        events: {
            "change input": "onChange",
            "focus input": "clearInvalid"
        },

        getValueFromDOM: function() {
            var val = this.$el.find("input").val();
            var newValue = this.formatter.toRaw(val, this.model);
            var newValueFromRaw = this.formatter.fromRaw(newValue, this.model);
            this.$el.find("input").val(newValueFromRaw);
            //console.log('getValueFromDOM', this, val, newValue);
            return newValue;
        },

        render: function() {
            //console.log('this', this);
            var self = this;
            var model = this.model;
            var field = _.defaults(this.field.toJSON(), this.defaults),
                attributes = this.model.toJSON(),
                value = field.nested ? this.keyPathAccessor(attributes[field.name], field.nested) : attributes[field.name];
                var newValue = this.formatter.fromRaw(value, model);
                data = _.extend(field, {value: newValue, attributes: attributes});
            //this.model.lookupCollection.models
            this.$el.html(this.template(data));
            this.updateInvalid();
            return this;
        }

    });

    /*date control*/

    var InputDateControl = Backform.InputDateControl = Backform.InputControl.extend({
        defaults: {
            type: "text"
        },

        initialize: function (options) {
            //console.log('options', options, this);
            Backform.Control.prototype.initialize.apply(this, arguments);
            this.formatter = new NumberFormatter();
            var formatter = this.formatter;
            _.bindAll(this,'render');

        },

        template: _.template([
            '<label class="<%=Backform.controlLabelClassName%>"><%-label%></label>',
            '<div class="<%=Backform.controlsClassName%>">',
            '  <input type="<%=type%>" style="text-align: left;" class="<%=Backform.controlClassName%>" name="<%=name%>" data-date="true" data-nested="<%=nested%>" value="<%-value%>" placeholder="<%-placeholder%>" <%=disabled ? "disabled" : ""%> <%=required ? "required" : ""%> />',
            '</div>'
        ].join("\n")),
        events: {
            "change input": "onChange",
            "focus input": "clearInvalid"
        },
        includeDate:true,
        DATE_RE: /^([+\-]?\d{4})-(\d{2})-(\d{2})$/,
        TIME_RE: /^(\d{2}):(\d{2}):(\d{2})(\.(\d{3}))?$/,
        ISO_SPLITTER_RE: /T|Z| +/,

        _convert: function (data, iso, validate) {
            //console.log('date', data);
            if ((data + '').trim() === '' || (data == undefined)) return null;
            var lpad = this.lpad;
            var date, time = null;
            if (_.isNumber(data)) {
                var jsDate = new Date(data);
                date = lpad(jsDate.getUTCFullYear(), 4, 0) + '-' + lpad(jsDate.getUTCMonth() + 1, 2, 0) + '-' + lpad(jsDate.getUTCDate(), 2, 0);
                time = lpad(jsDate.getUTCHours(), 2, 0) + ':' + lpad(jsDate.getUTCMinutes(), 2, 0) + ':' + lpad(jsDate.getUTCSeconds(), 2, 0);
            }
            else {
                data = data.trim();
                var parts = data.split(this.ISO_SPLITTER_RE) || [];
                date = this.DATE_RE.test(parts[0]) ? parts[0] : '';
                //console.log('datetest', date);
                time = date && parts[1] ? parts[1] : this.TIME_RE.test(parts[0]) ? parts[0] : '';
            }

            var YYYYMMDD = this.DATE_RE.exec(date) || [];
            var HHmmssSSS = this.TIME_RE.exec(time) || [];

            if (validate) {
                if (this.includeDate && _.isUndefined(YYYYMMDD[0])) return;
                if (this.includeTime && _.isUndefined(HHmmssSSS[0])) return;
                if (!this.includeDate && date) return;
                if (!this.includeTime && time) return;
            }

            var jsDate = new Date(Date.UTC(YYYYMMDD[1] * 1 || 0,
                YYYYMMDD[2] * 1 - 1 || 0,
                YYYYMMDD[3] * 1 || 0,
                HHmmssSSS[1] * 1 || null,
                HHmmssSSS[2] * 1 || null,
                HHmmssSSS[3] * 1 || null,
                HHmmssSSS[5] * 1 || null));

            var result = '';

            if (this.includeDate) {
                if (iso)
                result = lpad(jsDate.getUTCFullYear(), 4, 0) + '-' + lpad(jsDate.getUTCMonth() + 1, 2, 0) + '-' + lpad(jsDate.getUTCDate(), 2, 0);
                else result = lpad(jsDate.getUTCDate(), 2, 0) + '-' + lpad(jsDate.getUTCMonth() + 1, 2, 0) + '-' + lpad(jsDate.getUTCFullYear(), 4, 0);
            }

            if (this.includeTime) {
                result = result + (this.includeDate ? 'T' : '') + lpad(jsDate.getUTCHours(), 2, 0) + ':' + lpad(jsDate.getUTCMinutes(), 2, 0) + ':' + lpad(jsDate.getUTCSeconds(), 2, 0);

                if (this.includeMilli) {
                    result = result + '.' + lpad(jsDate.getUTCMilliseconds(), 3, 0);
                }
            }

            if (this.includeDate && this.includeTime) {
                result += "Z";
            }

            return result;
        },

        getValueFromDOM: function() {
            var val = this.$el.find("input").val();
            var parts = val.split('-') || [];
            var DD = parts[0];
            var MM = parts[1];
            var YYYY = parts[2];
            var jsDate = YYYY+'-'+MM+'-'+DD;
            var newValue = undefined;
            if(isDate(jsDate)){
                newValue = this._convert(jsDate, true, true);
            } else alert('Pogrešan unos datuma');

            //console.log('getValueFromDOM', this, val, newValue, DD, MM, YYYY);
            return newValue;
        },

        lpad:function (str, length, padstr) {
            var paddingLen = length - (str + '').length;
            paddingLen =  paddingLen < 0 ? 0 : paddingLen;
            var padding = '';
            for (var i = 0; i < paddingLen; i++) {
                padding = padding + padstr;
            }
            return padding + str;
        },

        render: function() {
            //console.log('this', this);
            var self = this;
            var model = this.model;
            var field = _.defaults(this.field.toJSON(), this.defaults),
                attributes = this.model.toJSON(),
                value = field.nested ? this.keyPathAccessor(attributes[field.name], field.nested) : attributes[field.name];
            //var newValue = this.formatter.fromRaw(value, model);
            //var jsDate = new Date(value);
            var newValue = this._convert(value);
            data = _.extend(field, {value: newValue, attributes: attributes});
            this.$el.html(this.template(data));
            this.updateInvalid();
            return this;
        }


    });


/*
*
* Grid
* */

    var row  = Backbone.View.extend({
        tagName:'li',
        initialize: function (options) {
            //console.log('initialize row ', this, options);
            this.masterField = options.masterField;
            this.listenTo(this.model, "change", this.render);
            this.listenTo(this.model, 'destroy', this.remove);
        },

        template: _.template([
            '<div> ',
            '<a href="#"><%=label%></a>',
            '<button class="destroy"></button>',
            '</div>'
        ].join("\n")),

        events: {
            "click a":"test",
            "click .destroy" : "clear"
        },

        clear: function() {
            this.model.destroy();
            return this;
        },

        test:function(e){
            e.preventDefault();
            this.model.collection.trigger('backform:gridcontrol:edit', this.model, this);
        },

        render:function(){
            var model = this.model;
            var labelFields = this.masterField.get("options").labelFields;
            var label = "";
            _.each(labelFields, function(fieldName){
                label += label==""?model.get(fieldName):" "+model.get(fieldName);
            });
            var data = {label:label};
            this.$el.html(this.template(data));
            this.delegateEvents();
            return this;
        }

    });


    var GridControl = Backform.GridControl = Backform.Control.extend({
        childView:row,
        initialize: function (options) {

            Backform.Control.prototype.initialize.apply(this, arguments);
            _.bindAll(this,'render');

            var field = _.defaults(this.field.toJSON(), this.defaults),
                attributes = this.model.toJSON(),
                value = field.nested ? this.keyPathAccessor(attributes[field.name], field.nested) : attributes[field.name];
//            this.parent_id = value;
            this.collection =  field.options.getCollection();
            //this.field = field;
            this.listenTo(this.collection, 'add', this.render);
           // this.listenTo(this.collection, 'reset', this.render);
           // this.listenTo(this.collection, 'all', this.render);

        },
        template: _.template([
            '<label class="<%=Backform.controlLabelClassName%>"><%-label%></label>',
            '<div class="col-sm-8">',
            '  <ul id="todo-list">',
            '  </ul>',
            '  <div class="btn btn-success btn-xs"><%-labelButton%></div>',
            '</div>'
        ].join("\n")),

        events: {
          //  "change input": "onChange",
            "focus input": "clearInvalid",
            "click div.btn":"click"
        },

        click:function(){
            var options = this.field.get('options');
            var canAdd = true;
            var f = options.childField();
            var self = this;
            var models = [];
            var field = _.defaults(this.field.toJSON(), this.defaults),
                attributes = this.model.toJSON(),
                value = field.nested ? this.keyPathAccessor(attributes[field.name], field.nested) : attributes[field.name];

            _.each(this.collection.models, function(m){
                if (m.get(f) == value)
                    models.push(m);
            });

            _.each(options.canAddNew, function(o){
                if((_.isFunction(o.condition) && o.condition(models)) || (!_.isFunction(o.condition) && o.condition)){
                    alert(o.message);
                    canAdd = false;
                }
            });
            if(canAdd)
            this.collection.trigger('backform:gridcontrol:add', this.collection, this);
        },

        getValueFromDOM: function() {
            var val = this.$el.find("input").val();
            return '';
        },

        addOne:function(field){
            var self = this;
            var control = new self.childView({model: field, masterField:this.field});
            self.$el.find('ul').append(control.render().$el);
            self.cells.push(control);
        },

        addAll: function() {
            var self = this;
            var f = this.field.get('options').childField();
            var field = _.defaults(this.field.toJSON(), this.defaults),
                attributes = this.model.toJSON(),
                value = field.nested ? this.keyPathAccessor(attributes[field.name], field.nested) : attributes[field.name];


            var dodaj = function() {

                _.each(self.collection.models, function(m){
                    if (m.get(f) == value)
                        self.addOne(m);
                });
            };

            dodaj();
/*            if(self.collection.length == 0)
                self.collection.fetch({silent:true}).then(dodaj);//Aktivirace se event add na kolekciji, koji će opet pozvati render tako da nije potrebno ovdje pozivati "dodaj"
            else dodaj();*/
        },

        render: function() {
            var self = this;
            this.removeCells();
            var field = _.defaults(this.field.toJSON(), this.defaults),
                attributes = this.model.toJSON(),
                value = field.nested ? this.keyPathAccessor(attributes[field.name], field.nested) : attributes[field.name];
            data = _.extend(field, {value: value, attributes: attributes});
            console.log('render field',field, attributes);
            self.$el.html(self.template(data));
            self.addAll(field);
            self.updateInvalid();
                return self;
        },

        removeCells:function(){
            if(this.cells){
                for (var i = 0; i < this.cells.length; i++) {
                    var cell = this.cells[i];
                    cell.remove.apply(cell, arguments);
                }
            }
            this.cells = [];
        },

        remove: function () {
            this.removeCells();
            return Backbone.View.prototype.remove.apply(this, arguments);
        }


    });




});


