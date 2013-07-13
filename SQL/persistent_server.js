var mysql = require('mysql');

var dbConnection = mysql.createConnection({
  user: "root",
  password: "plantlife",
  database: "chat"
  // port: 3306,
  // host: "127.0.0.1"
});

var getRoomID = function(roomName, callback){
  dbConnection.query('SELECT id FROM rooms WHERE name = "' + roomName + '";', function(err, rows, fields){
    if ( rows[0] ) { // it exists run callback
      callback(rows[0].id);
    } else { // create it and pass the callback through
      createNewRoom(roomName, callback);
    }
  });
};

var createNewRoom = function(roomName, callback){
  dbConnection.query('INSERT INTO rooms (name) VALUES ("'+ roomName +'");', function(err, rows, fields){
    getRoomID(roomName, callback);
  });
};

var getUserID = function(userName, callback){
  dbConnection.query('SELECT id FROM users WHERE username = "' + userName + '";', function(err, rows, fields){
    if ( rows[0] ) { // it exists run callback
      callback(rows[0].id);
    } else { // create it and pass the callback through
      createNewUser(userName, callback);
    }
  });
};

var createNewUser = function(userName, callback){
  dbConnection.query('INSERT INTO users (username) VALUES ("'+ userName +'");', function(err, rows, fields){
    getUserID(userName, callback);
  });
};

exports.getRoomMessages = function(roomName, callback){
  getRoomID(roomName, function(id){
    dbConnection.query('SELECT content, created, username FROM messages INNER JOIN users ON users.id = messages.user_id WHERE room_id = "' + id + '";', function(err, rows, fields){
      callback(rows);
    });
  });
};

exports.putDataDB = function(roomName, userName, messageObj, callback) {
  getUserID(userName, function(userID){
    getRoomID(roomName, function(roomID){
      dbConnection.query('INSERT INTO messages (content, user_id, room_id) VALUES ("'+ messageObj.content + '",' + userID + ',' + roomID + ');', function(err, rows, fields){
        err ? callback(false) : callback(true);
      });
    });
  });
};

exports.openConnection = function(){
  dbConnection.connect();
};

exports.closeConnection = function(){
  dbConnection.end();
};
