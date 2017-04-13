import _ from 'lodash';
import GraphService from '../tool/GraphService';

export default {
  customers: [],
  createCustomer(email) {
    const graphQuery = `mutation{customer_create(email:"${email}"){id}}`;
    return GraphService.query(graphQuery)
      .then(response => response.customer_create);
  },
  updateCustomer(customer) {
    const graphQuery = `
mutation {
  customer_update(id: "${customer.id}", email: "${customer.email}", firstname: "${customer.firstname}", lastname: "${customer.lastname}", company: "${customer.company}") {
    id
  }
}`;
    return GraphService.query(graphQuery);
  },
  fetchCustomers() {
    const graphQuery = '{customers{id,email,firstname,lastname, company}}';
    return GraphService.query(graphQuery)
      .then((response) => {
        this.customers.length = 0;
        _.each(response.customers, x => this.customers.push(x));
      });
  },
};
