import GraphService from '../tool/GraphService';

const toValidQuery = (string) => {
  let validQuery = string;
  validQuery = validQuery.replace(/"id"/g, 'id');
  validQuery = validQuery.replace(/"description"/g, 'description');
  validQuery = validQuery.replace(/"label"/g, 'label');
  validQuery = validQuery.replace(/"value"/g, 'value');
  return validQuery;
};

export default {
  get(token, store) {
    if (token) {
      const graphQuery = `
{
  feedback_by_token(token: "${token}") {
    id
    badges {
      id
      value
      description
      label
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
    const graphQuery = `mutation{feedback_update(id:"${feedback.id}",comment:"${feedback.comment}",badges:${JSON.stringify(feedback.badges)}){id}}`;
    return GraphService.query(toValidQuery(graphQuery))
      .then(response => response.feedback_update);
  },
};
