var pg = require("pg");
require("dotenv").config();

var connection = process.env.DATABASE_URL;

const client = new pg.Client(connection);
client.connect();

const insertMessage = (messageText, scheduledTime, phoneNumber) => {
  client
    .query(
      "INSERT INTO messages (message_text, scheduled_time, user_id) values ($1, $2, (select user_id from users where phone_number = $3 AND verified_status = true))",
      [messageText, scheduledTime, phoneNumber]
    )
    .then(() => console.log("Message created successfully"))
    .catch(err => console.log("Message not created: " + err));
};

module.exports.insertMessage = insertMessage;
