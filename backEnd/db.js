'use strict';
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

// Must set URL as System environment variable
const mongo_url = process.env.MONGO_URL
const dbName = 'review-me';

var database = (db) => {
    return 'mongodb://'+mongo_url+'/'+db;
}
//josefelq: Not really an issue but something pretty useful under some circumstances(dont know if your project needs it): 
//Try using a connection pool for your database: this means reusing the mongodb connection, i.e. connect once and reuse the object.
//It's recommended by the developers of mongodb, more info here: 
//https://mongodb.github.io/node-mongodb-native/driver-articles/mongoclient.html
exports.find = (col, query, callback) => {
    var mongo_url = database(dbName);
    MongoClient.connect(mongo_url, (err, db) => {
        console.log("Connecting to: "+mongo_url);
        var collection = db.collection(col);
        collection.find(query).toArray((err, docs) => {
            assert.equal(err, null);
            callback(docs);
            console.log('Closing connection...');
            db.close();
        });
    });
}

exports.insert = (col, val, callback) => {
    var mongo_url = database(dbName);
    MongoClient.connect(mongo_url, (err, db) => {
        console.log("Connecting to: "+mongo_url);
        var collection = db.collection(col);
        collection.insert(val, (err, doc) =>{
            if(err) throw err;
            callback(doc);
            console.log('Closing connection...');
            db.close();
        });
    });
}

exports.delete = (col, query, callback) => {
    var mongo_url = database(dbName);
    MongoClient.connect(mongo_url, (err, db) => {
        console.log("Connecting to: "+mongo_url);
        var collection = db.collection(col);
        collection.remove(query, (err, doc) => {
            if(err) throw err;
            callback(doc);
            console.log('Closing connection...');
            db.close();
        });
    });
}

exports.update = (col, query, update, more, callback) => {
    var mongo_url = database(dbName);
    MongoClient.connect(mongo_url, (err, db) => {
        console.log("Connecting to: "+mongo_url);
        var collection = db.collection(col);
        collection.update(query, update, more, (err, doc) => {
            if(err) throw err;
            callback(doc);
            console.log('Closing connection...');
            db.close();
        });
    });
}

exports.aggregate = (col, query, callback) => {
    var mongo_url = database(dbName);
    MongoClient.connect(mongo_url, (err, db) => {
        console.log("Connecting to: "+mongo_url);
        var collection = db.collection(col);
        collection.aggregate(query, (err, doc) => {
            if(err) throw err;
            callback(doc);
            console.log('Closing connection...');
            db.close();
        })
    });
}
