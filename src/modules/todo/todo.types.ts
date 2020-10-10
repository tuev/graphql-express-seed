import { getModelForClass, prop as Property } from '@typegoose/typegoose'
import { ObjectId } from 'mongodb'
import { Field, ObjectType } from 'type-graphql'

@ObjectType({ description: 'Object representing Todo model' })
export class Todo {
  @Field()
  readonly _id!: ObjectId

  @Field()
  @Property({ required: true })
  title!: string

  @Field()
  @Property({ required: true })
  content!: string
}

export const TodoModel = getModelForClass(Todo, {
  schemaOptions: { timestamps: true },
})
