import { randomNum } from "./utils.js";

let todos: Todo[] = [];
let categories: { name: string; todoId: string }[] = [];

class Todo {
  public title: string;
  public description: string;
  public category: string;
  public id: string;

  constructor(title: string, description: string, category: string) {
    this.title = title;
    this.description = description;
    this.category = category;
    this.id = Date.now().toString() + randomNum(1000, 9999).toString();
  }

  save() {
    todos.push(this);
    const categoryExistIndex = categories.findIndex(
      (item) => item.name === this.category
    );
    if (categoryExistIndex === -1) {
      categories.push({ name: this.category, todoId: this.id });
    }
  }

  static fetchAll() {
    return todos;
  }

  static updateById(todoId: string, updatedTodo: Todo) {
    const existingTodoIndex = todos.findIndex((todo) => todo.id === todoId);
    todos[existingTodoIndex] = updatedTodo;
  }

  static deleteById(todoId: string) {
    const updatedTodos = todos.filter((item) => item.id !== todoId);
    const updatedCategories = categories.filter(
      (item) => item.todoId !== todoId
    );
    todos = updatedTodos;
    categories = updatedCategories;
  }

  static fetchByCategory(category: string) {
    const todosByCategory = todos.filter((todo) => todo.category === category);
    return todosByCategory;
  }
}

export default Todo;
export { categories };
