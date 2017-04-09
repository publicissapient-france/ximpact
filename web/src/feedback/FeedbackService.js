import GraphService from '../tool/GraphService';

export default {
  get(token, store) {
    if (token) {
      const graphQuery = `
{
  feedback_by_token(token: "${token}") {
    id
    badges {
      id
    }
    comment
    customer {
      firstname
    }
    xebian {
      firstname
    }
    impact {
      description
    }
  }
}
`;
      return GraphService.query(graphQuery)
        .then(response => store.commit('setFeedback', response.feedback_by_token));
    }
    return Promise.reject();
  },
  update(feedback) {
    const graphQuery = `
    mutation {
      feedback_update(id: "${feedback.id}", comment: "${feedback.comment}", badges: "${JSON.stringify(feedback.badges)}")
      {
        id
      }
    }`;
    return GraphService.query(graphQuery)
      .then(response => response.feedback_update);
  },
};
