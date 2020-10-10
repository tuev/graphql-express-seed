import { ObjectId } from 'mongodb'
import { InputType, Field } from 'type-graphql'

@InputType()
export class TodoInput {
  @Field()
  title!: string

  @Field()
  content!: string
}

@InputType()
export class TodoUpdate {
  @Field()
  id!: ObjectId

  @Field({ nullable: true })
  title?: string

  @Field({ nullable: true })
  content?: string
}
