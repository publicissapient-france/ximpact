const vogels = require('../config/vogels');

vogels.createTables({
  Xebians: {},
  Customers: {},
  Impacts: {},
  Feedbacks: {},
}, (err) => {
  if (err) {
    console.log('Error creating tables: ', err);
  } else {
    console.log('Tables has been created');
  }
});
