const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express();
const { makeExecutableSchema } = require('graphql-tools')
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')

app.use(cors());

const { Person } = require('./model')
const schema = require('./schema')
const resolvers = require('./resolvers');

mongoose.connect('mongodb://pixelspy:soleilmahana10@ds157528.mlab.com:57528/herokutest');


//   ,
//    (err) => {
//   if(err) {
//     return console.log(err)
//   }
//
//   console.log('mongoose OK');
// }
// );

const execSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers
});

app.use('/graphql', express.json(), graphqlExpress({ schema: execSchema, context: { Person }}))
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql'}))

app.listen(3000, (err) => {
  if(err) {
    console.log('err : ', err);
  }
  console.log('connected');
})
