import GraphService from '../tool/GraphService';
import moment from '../tool/Moment';
import Constant from '../constant';

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
    const graphQuery = `mutation{feedback_update(id:"${feedback.id}",comment:"${feedback.comment}"){id}}`;
    return GraphService.query(graphQuery)
      .then(response => response.feedback_update);
  },
  create(xebianId, comment, impactId) {
    const graphQuery = `mutation {
    feedback_create(
      xebianId:"${xebianId}",
      comment:"${comment}",
      impactId:"${impactId}")
      {
        comment
        updated_at
        xebian {
          firstname
          lastname
        }
      }
    }`;
    return GraphService.query(graphQuery)
      .then((response) => {
        response.feedback_create.updated_at = moment(response.feedback_create.updated_at,
          Constant.backendDateFormat).format(Constant.appDateFormat);
        return response.feedback_create;
      });
  },
};
