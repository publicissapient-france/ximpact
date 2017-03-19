module.exports = {
  createCustomer: () => ({
    query: `
mutation {
    customer_create(email: "mknopfler@direstraits.com") {
        id
        email
    }
}
`,
  }),

  createXebian: () => ({
    query: `
mutation {
    xebian_create(email: "kcobain@nirvana.com") {
        id
        email
    }
}
`,
  }),

  createImpact: (xebian, customer) => ({
    query: `mutation {
    impact(description:"Etre rapide", xebianId:"${xebian.id}", customerId:"${customer.id}") {
        id
        description
        xebianId
        customerId
    }
}
`,
  }),

  createFeedback: (impact, xebian) => ({
    query: `mutation {
    feedback_create(impactId:"${impact.id}", xebianId:"${xebian.id}") {
        id
        createdAt
        xebianId
        customerId
        impactId
    }
}`,
  }),

  updateFeedback: (impact, xebian, feedback, customer) => ({
    query: `mutation {
    feedback_update(comment:"Excellent mois!", id:"${feedback.id}", impactId:"${impact.id}", xebianId:"${xebian.id}", customerId:"${customer.id}") {
        id
        comment
        xebianId
        customerId
        impactId
        createdAt
        updatedAt
        
    }
}`,
  }),
};
