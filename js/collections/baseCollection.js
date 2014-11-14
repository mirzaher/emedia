/**
 * Created with JetBrains PhpStorm.
 * User: Haris
 * Date: 7/26/13
 * Time: 11:05 AM
 * To change this template use File | Settings | File Templates.
 */

define(["backbone","config", "backbone.paginator"], function (Backbone) {
    window.BaseCollection = Backbone.PageableCollection.extend({
        RESTUri: appConfig.RESTUri,
        state: {
            firstPage: 1,
            lastPage: null,
            currentPage: null,
            pageSize: 20,
            totalPages: null,
            totalRecords: null,
            sortKey: null,
            order: -1
        },
        mode : "server"

    });

    // Returns the Model class
    return window.BaseCollection;
});
