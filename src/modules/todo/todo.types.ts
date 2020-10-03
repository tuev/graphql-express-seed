import { getModelForClass } from '@typegoose/typegoose'
import { Field, ObjectType } from 'type-graphql'

@ObjectType({ description: 'Object representing Todo model' })
export class Todo {
  @Field()
  title!: string

  @Field()
  content!: string
}

export const TodoModel = getModelForClass(Todo, {
  schemaOptions: { timestamps: true },
})
