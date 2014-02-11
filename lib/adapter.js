/*---------------------------------------------------------------
  :: MemoryAdapter
  -> adapter

  This memory adapter is for development only!
---------------------------------------------------------------*/

var Database = require('./database');

module.exports = (function () {

  var database = new Database();
  var adapter = {

    // Whether this adapter is syncable (yes)
    syncable: true,

    // How this adapter should be synced
    migrate: 'alter',

    // Allow a schemaless datastore
    defaults: {
      schema: false
    },

    // Save reference to collection so we have it
    registerCollection: function (conn, collection, cb) {
      var config = collection.config;
      database.registerCollection(collection.identity, config, cb);
    },

    // Return attributes
    describe: function (conn, collectionName, cb) {
      database.describe(collectionName, cb);
    },

    define: function (conn, collectionName, definition, cb) {
      database.createCollection(collectionName, definition, cb);
    },

    drop: function (conn, collectionName, relations, cb) {
      database.dropCollection(collectionName, relations, cb);
    },

    find: function (conn, collectionName, options, cb) {
      database.select(collectionName, options, cb);
    },

    create: function (conn, collectionName, values, cb) {
      database.insert(collectionName, values, cb);
    },

    update: function (conn, collectionName, options, values, cb) {
      database.update(collectionName, options, values, cb);
    },

    destroy: function (conn, collectionName, options, cb) {
      database.destroy(collectionName, options, cb);
    }

  };

  return adapter;
})();
