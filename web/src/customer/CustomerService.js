import _ from 'lodash';
import GraphService from '../tool/GraphService';

export default {
  customers: [],
  createCustomer(email) {
    const graphQuery = encodeURI(`mutation{customer(email:"${email}",firstName:"a",lastName:"a",company:"a"){id}}`);
    return GraphService.query(graphQuery)
      .then(response => response.customer_create);
  },
  fetchCustomers() {
    const graphQuery = encodeURI('{customers{id,email,firstName,lastName, company}}');
    return GraphService.query(graphQuery)
      .then((response) => {
        this.customers.length = 0;
        _.each(response.customers, x => this.customers.push(x));
      });
  },
};
