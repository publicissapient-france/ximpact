module.exports = {
  createCustomer: () => ({
    query: `
mutation {
    customer_create(firstName: "Mark", lastName: "Knopfler", email: "mknopfler@direstraits.com", company: "Dire Straits") {
        id,
        firstName,
        lastName,
        email,
        company
    }
}
`,
  }),

  createXebian: () => ({
    query: `
mutation {
    xebian(firstName: "Kurt", lastName: "Cobain", email: "kcobain@nirvana.com") {
        id,
        firstName,
        lastName,
        email
    }
}
`,
  }),

  createImpact: (xebian, customer) => ({
    query: `mutation {
    impact(description:"Etre rapide", xebianId:"${xebian.id}", customerId:"${customer.id}") {
        id,
        description
    }
}
`,
  }),

  createFeedback: (impact, xebian) => ({
    query: `mutation {
    feedback(comment:"Super Xebian", impactId:"${impact.id}", xebianId:"${xebian.id}") {
        comment
    }
}`,
  }),
};
