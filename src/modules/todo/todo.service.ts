import { ObjectId } from 'mongodb'
import { TodoInput, TodoUpdate } from './todo.inputs'
import { Todo, TodoModel } from './todo.types'

class TodoService {
  public async getTodoList(): Promise<Todo[]> {
    return TodoModel.find()
  }

  public async getTodo(id: string): Promise<Todo | null> {
    return TodoModel.findById(id)
  }

  public async createTodo(todo: TodoInput): Promise<Todo> {
    return TodoModel.create(todo)
  }

  public async updateTodo(todo: TodoUpdate): Promise<Todo | null> {
    const updateData = {
      ...(todo.title ? { title: todo.title } : {}),
      ...(todo.content ? { content: todo.content } : {}),
    }
    return TodoModel.findByIdAndUpdate(todo.id, updateData, { new: true })
  }

  public async deleteTodo(id: ObjectId): Promise<Todo | null> {
    return TodoModel.findOneAndDelete({ _id: id })
  }
}

export default new TodoService()
