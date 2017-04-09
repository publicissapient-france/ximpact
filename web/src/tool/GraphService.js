import Axios from 'axios';

export default {
  query(graphQuery) {
    return Axios({
      method: 'post',
      url: 'http://localhost:4000/graphql',
      headers: {
        'Content-Type': 'application/graphql',
      },
      data: graphQuery,
    }).then((response) => {
      if (response.data.errors) {
        throw new Error(response.data.errors[0].message);
      }
      return response.data.data;
    });
  },
};
