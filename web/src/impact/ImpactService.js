import _ from 'lodash';
import GraphService from '../tool/GraphService';

export default {
  customers: [],
  xebians: [],
  fetchData() {
    const graphQuery = encodeURI('{xebians{email,id}customers{email,id}}');
    return GraphService.query(graphQuery)
      .then((response) => {
        this.customers.length = 0;
        this.xebians.length = 0;
        _.each(response.customers, customer => this.customers.push(customer));
        _.each(response.xebians, xebian => this.xebians.push(xebian));
      });
  },
  createImpact(xebian, customer, impact) {
    const graphQuery = encodeURI(`mutation{impact_create(xebianId:"${xebian.id}",customerId:"${customer.id}",description:"${impact}"){id}}`);
    return GraphService.query(graphQuery);
  },
};
