import { ObjectId } from 'mongodb'
import { InputType, Field } from 'type-graphql'

@InputType()
export class TodoInput {
  @Field()
  title!: string

  @Field()
  content!: string
}

export class TodoUpdate extends TodoInput {
  @Field()
  id!: ObjectId
}
