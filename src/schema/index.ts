import { buildSchema } from 'type-graphql'
// import * as path from "path";
import { ObjectId } from 'mongodb'
import { ObjectIdScalar } from '../scalars/mongoId'
import { TypegooseMiddleware } from '../middlewares/typegoose'
import { TodoResolver } from '../modules/todo/todo.resolvers'

const schema = buildSchema({
  resolvers: [TodoResolver],
  dateScalarMode: 'timestamp',
  scalarsMap: [{ type: ObjectId, scalar: ObjectIdScalar }],
  globalMiddlewares: [TypegooseMiddleware],
  // emitSchemaFile: path.resolve(__dirname, "schema.gql"),
})

export default schema
