var mysql = require('mysql');

var dbConnection = mysql.createConnection({
  user: "root",
  password: "plantlife",
  database: "chat"
  // port: 3306,
  // host: "127.0.0.1"
});

exports.getRoomID = function(roomName){
  dbConnection.connect();
  var id;
  dbConnection.query('SELECT id FROM room WHERE name = "' + roomName + '";', function(err, rows, fields){
    id = rows[0].id;
  });
  dbConnection.end();
  return id;
};

exports.getRoomMessages = function(roomName){
  var id = exports.getRoomID(roomName);
  dbConnection.connect();
  var messages;
  dbConnection.query('SELECT message, createdAt, modifiedAt, username FROM messages INNER JOIN users ON users.id = messages.user_id WHERE room_id = "' + id + '";', function(err, rows, fields){
    messages = rows;
  });
  dbConnection.end();
  return messages;
};

exports.getUserID = function(userName){
  dbConnection.connect();
  var id = dbConnection.query('SELECT id FROM users WHERE username = ' + userName + ';');
  dbConnection.end();
  return id;
};

exports.putDataDB = function(data, roomName) {
  var userID = exports.getUserID(data.username);
  var roomID = exports.getRoomID(roomName);
  dbConnection.connect();
  dbConnection.query('INSERT INTO messages (messages, user_id, room_id) VALUES (' + data.text + ',' + userID + ',' + roomID + ');');
  dbConnection.end();
};
