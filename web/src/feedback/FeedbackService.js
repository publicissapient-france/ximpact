import GraphService from '../tool/GraphService';

export default {
  get(id, store) {
    if (id) {
      const graphQuery = encodeURI(`
{
  feedback(id: "${id}") {
    badges
    comment
    customer {
      firstname
    }
    xebian {
      firstname
    }
    impact
  }
}
`);
      return GraphService.query(graphQuery)
        .then(response => store.commit('setFeedback', response.feedback));
    }
    return Promise.reject();
  },
};
