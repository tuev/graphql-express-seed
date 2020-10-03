import { TodoInput, TodoUpdate } from './todo.inputs'
import { Todo } from './todo.types'
import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import todoService from './todo.service'

@Resolver(() => Todo)
export class TodoResolver {
  @Query(() => Todo, { nullable: true })
  async todo(@Arg('id') id: string): Promise<Todo | null> {
    return todoService.getTodo(id)
  }

  @Query(() => [Todo])
  async todos(): Promise<Todo[]> {
    return todoService.getTodoList()
  }

  @Mutation(() => Todo)
  async addTodo(@Arg('todo') todo: TodoInput): Promise<Todo> {
    return todoService.createTodo(todo)
  }

  @Mutation(() => Todo, { nullable: true })
  async updateTodo(@Arg('todo') todo: TodoUpdate): Promise<Todo | null> {
    return todoService.updateTodo(todo)
  }
}
