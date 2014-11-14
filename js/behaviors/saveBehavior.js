/**
 * Created with JetBrains PhpStorm.
 * User: Haris
 * Date: 9/23/14
 * Time: 12:45 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'jquery.maskedinput',"underscore.extension"


],function($, _, Backbone, Marionette){

    Dental.Behaviors.saveBehavior = Marionette.Behavior.extend({

        // behaviors have events that are bound to the views DOM

        initialize:function(){
            var self = this;
             this.listenTo(this.view,'ok', this.save, this);// backbone.modal trigeruje event 'ok'
            this.listenTo(this.view,'cancel', function(){
                self.view.model.set(self.view.model._previousAttributes, {silent:true});
                console.log("initialize view cancel event", self);
                /*if(self.view.modalForm)
                    self.view.modalForm.close();*/
            }, this);
            console.log("initialize view", this.view.cid);
        },

        save:function(modal, callback){
            if(!callback)
                callback = function(){
                if (modal){
                    modal._preventClose = false;
                    modal.close();
                }
            };

            this.saveModel(modal, this.view.model, callback);
        },

        saveModel:function(modal, model, callback){
            var view = this.view;
            //console.log("save trigered view", view);
            console.log("save trigered view", view.cid);
            if(modal){

                modal.preventClose();
            }

            var isNewModel = false;
            var options = {
                wait:true,
                success: function(model, response){
                    if(isNewModel)
                        view.collection.add(model);
                    model.trigger('change:STATUS_ID');
                    console.log("Saved success", model, view.model, response, options);
                    _.each(model.computed,function(field){
                        _.each(field.depends,function(fieldName){
                            model.trigger('change:'+fieldName);
                        });
                    });
                    //modal.preventClose();
                    //view.model.reset();
                    var focused = model.getFocusField();
                    setTimeout(function(){
                        view.$el.find("input[data-date='true']").mask("39-19-9999");
                        view.$el.find("input[name='"+focused+"']").focus();
                    },200);

                    view.collection.trigger('save:success');//u genericView se sluša. Radi refresha grida
                    //if (view.model.isNew()) {
                    view.collection.trigger('moj:add');
                    if(callback)
                        callback();
                },

                error:function(model, xhr, options){
                    console.log('error',xhr.responseText);
                    if(modal)
                    modal.preventClose();
                },

                invalid:function(model, xhr, options, error){
                    console.log("Invalid", model, xhr, options, error);
                    if(modal)
                    modal.preventClose();
                }

            };
            $('.error').removeClass('error');

            if (!model.isValid()) {
                console.log('Model error');
                if(modal)
                modal.preventClose();
                $('.has-error').removeClass('has-error');
                $('.help-inline').remove();
                console.log('this.model.validationError', model.validationError.msg);
                var rootTab = undefined;
                _.each(model.validationError, function(o){
                        var error = o.msg;
                       // var html = $('[name=' + o.field+']').parent().parent();
                    var html = $('[name=' + o.field+']').closest('.form-group');
                    //$('[NAME=GENDER]').closest('.form-group').addClass('has-error')
                        html.addClass('has-error');
                        $(html).children('div').append('<span class="help-inline error">' + (_.isArray(error) ? error.join(", ") : error) + '</span>');
                        html.find('.help-inline').show('fast');


                    _.each(model.formTabs, function(tab){
                        _.each(tab.formFields, function(field){
                             if(field.name == o.field && rootTab == undefined)
                                 rootTab = tab;
                        });

                    });

                    function activaTab(tab){
                        $('.nav-tabs a[href="#' + tab + '"]').tab('show');
                    }

                    if(rootTab)
                    activaTab(rootTab.panel);
                });


            } else{
                isNewModel = model.isNew();
                model.save(model.toJSON(), options);
                /*
                if (model.isNew()) {
                    console.log('IsNew', model.toJSON());
                    view.collection.create(model.toJSON(), options);
                } else {
                    console.log('model.save', model,options);
                    model.save(model.toJSON(), options);
                    console.log('model.save2',options);
                }*/
            }

            return false;
        }

    });
    return Dental.Behaviors.saveBehavior;
});