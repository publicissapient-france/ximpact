const uuid = require('uuid');
const moment = require('moment');

class Comment {
  constructor(text, authorEmail) {
    this.text = text;
    this.authorEmail = authorEmail;
    this.id = uuid.v4();
    this.createdAt = moment().valueOf();
  }
}

module.exports = Comment;
