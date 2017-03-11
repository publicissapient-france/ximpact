import Axios from 'axios';

export default {
  customers: [],
  xebians: [],
  fetchData() {
    const query = encodeURI('{xebians{email}customers{email}}');
    Axios.post(`http://localhost:4000/graphql?query=${query}`)
      .then((response) => {
        this.customers.push(response.data.customers);
        this.xebians.push(response.data.xebians);
      });
  },
};
