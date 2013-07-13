var mysql = require('mysql');

var dbConnection = mysql.createConnection({
  user: "root",
  password: "plantlife",
  database: "chat"
  // port: 3306,
  // host: "127.0.0.1"
});

exports.getRoomID = function(roomName, callback){
  dbConnection.connect();
  dbConnection.query('SELECT id FROM rooms WHERE name = "' + roomName + '";', function(err, rows, fields){
    callback(rows[0].id);
  });
  dbConnection.end();
};

exports.getRoomMessages = function(roomName, callback){
  dbConnection.connect();
  exports.getRoomID(roomName, function(id){
    dbConnection.query('SELECT message, createdAt, modifiedAt, username FROM messages INNER JOIN users ON users.id = messages.user_id WHERE room_id = "' + id + '";', function(err, rows, fields){
      callback(rows);
    });
  });
  dbConnection.end();
};

exports.getUserID = function(userName){
  dbConnection.connect();
  dbConnection.query('SELECT id FROM users WHERE username = "' + userName + '";', function(err, rows, fields){
    callback(rows[0].id);
  });
  dbConnection.end();
};

exports.putDataDB = function(data, roomName, callback) {
  exports.getUserID(data.username, function(userID){
    exports.getRoomID(roomName, function(roomID){
      dbConnection.connect();
      dbConnection.query('INSERT INTO messages (messages, user_id, room_id) VALUES (' + data.text + ',' + userID + ',' + roomID + ');', function(err, rows, fields){
        // check result and callback with true or false
        callback(true);
      });
      dbConnection.end();
    });
  });
};
