import Axios from 'axios';

export default {
  query(graphQuery) {
    return Axios.post(`http://localhost:4000/graphql?query=${graphQuery}`)
      .then((response) => {
        if (response.data.errors) {
          throw new Error(response.data.errors[0].message);
        }
        return response.data.data;
      });
  },
};
