import _ from 'lodash';
import GraphService from '../tool/GraphService';

export default {
  xebians: [],
  xebian: {
    id: '',
    email: '',
    firstName: '',
    lastName: '',
    impacts: [],
  },
  createXebian(email) {
    const graphQuery = encodeURI(`mutation{xebian(email:"${email}",firstName:"a",lastName:"a"){id}}`);
    return GraphService.query(graphQuery)
      .then(response => response.xebian);
  },
  fetchXebians() {
    const graphQuery = encodeURI('{xebians{id,email,firstName,lastName}}');
    return GraphService.query(graphQuery)
      .then((response) => {
        this.xebians.length = 0;
        _.each(response.xebians, x => this.xebians.push(x));
      });
  },
  getXebian() {
    // const graphQuery =
    // return GraphService.query(graphQuery)
    //   .then((response) => {
    //     _.merge(this.xebian, response.xebian);
    //   });
    _.merge(this.xebian, {
      id: 'be3b6f58-07db-44ed-8fa3-928ad702f840',
      email: 'blacroix@xebia.fr',
      firstName: 'Benjamin',
      lastName: 'Lacroix',
      impacts: [
        {
          description: 'Faire preuve d\'initiative et accompagner l\'équipe en place.',
          feedbacks: [
            {
              comment: 'Très bien.',
            },
            {
              comment: 'Bien.',
            },
            {
              comment: 'Ok.',
            },
          ],
        },
        {
          description: 'Lead de l\'équipe en place',
          feedbacks: [
            {
              comment: 'Très bien.',
            },
            {
              comment: 'Bien.',
            },
            {
              comment: 'Ok.',
            },
          ],
        },
      ],
    });
  },
};
