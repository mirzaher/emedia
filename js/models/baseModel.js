/**
 * Created with JetBrains PhpStorm.
 * User: Haris
 * Date: 7/25/13
 * Time: 4:56 PM
 * To change this template use File | Settings | File Templates.
 */

define(["backbone","config", , 'backbone.compute'], function (Backbone) {

    window.BaseModel = Backbone.Model.extend({

    id: undefined,

    RESTUri: appConfig.RESTUri,

    _setOriginalAttributes : function() {
        this._originalAttributes = this.toJSON();
        return this;
    },

    reset : function() {
        this.set(this._originalAttributes);
        return this;
    },

    initialize:function(){
        this._setOriginalAttributes();
        this.computedFields = new Backbone.ComputedFields(this);
    },

    getFocusField:function(tabName){
        var self = this;
        var selector =undefined;
        _.each(self.formTabs, function(tab){
            if((tabName == undefined || tabName == tab.panel) && tab.focused && selector == undefined)
                selector = tab.focused;
        });
        return selector;

    },

    checkField: function(error, fieldValue, fieldName, errorMsg, comparator){
        if(comparator) {
            if (!comparator(fieldValue)){
                error.push({
                    field:fieldName,
                    msg:errorMsg
                });
            }
        } else {
            if (!fieldValue) {
                error.push({
                    field:fieldName,
                    msg:errorMsg
                });
            }
        }

    }

   });

    return window.BaseModel;
});
