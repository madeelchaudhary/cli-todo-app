#! /usr/bin/env node

import {
  askName,
  askSelectTodo,
  askSelectTodoCategory,
  askTask,
  askToContinue,
  askTodo,
} from "./src/prompts.js";
import Todo, { categories } from "./src/todo.js";
import {
  closingMessage,
  logError,
  logNote,
  logTodos,
  welcome,
} from "./src/logs.js";

enum AvailableTasks {
  VIEW,
  VIEW_BY_CATEGORY,
  ADD,
  UPDATE,
  DELETE,
}

let userName: string;

async function init() {
  do {
    try {
      const userChosenTaskStr = await askTask(
        Object.keys(AvailableTasks).slice(5)
      );
      const userChosenTask = +AvailableTasks[userChosenTaskStr];

      // **** WHEN TASK IS ===ADD=== ****
      if (userChosenTask === AvailableTasks.ADD) {
        const userEnteredTodo = await askTodo();
        const todo = new Todo(
          userEnteredTodo.title,
          userEnteredTodo.description,
          userEnteredTodo.category
        );
        todo.save();
        logNote("Todo added successfully.");
      } else if (userChosenTask === AvailableTasks.UPDATE) {
        // **** WHEN TASK IS ===UPDATE=== ****
        const todos = Todo.fetchAll();
        if (todos.length <= 0) {
          throw "Todo list is empty. Enter a todo.";
        }
        const userChosenTodoId = await askSelectTodo(
          "Select todo you want to update.",
          todos
        );
        const userTodoEntries = await askTodo();
        const updatedTodo = new Todo(
          userTodoEntries.title,
          userTodoEntries.description,
          userTodoEntries.category
        );
        Todo.updateById(userChosenTodoId, updatedTodo);
        logNote("Todo updated successfully");
      } else if (userChosenTask === AvailableTasks.DELETE) {
        // **** WHEN TASK IS ===DELETE=== ****
        const todos = Todo.fetchAll();
        if (todos.length <= 0) {
          throw "Todo list is empty. Enter a todo.";
        }
        const userChosenTodoId = await askSelectTodo(
          "Select todo you want to delete.",
          todos
        );
        Todo.deleteById(userChosenTodoId);
        logNote("Todo deleted successfully");
      } else if (userChosenTask === AvailableTasks.VIEW) {
        // **** WHEN TASK IS ===VIEW=== ****
        const todos = Todo.fetchAll();
        if (todos.length <= 0) {
          throw "Todo list is empty. Enter a todo.";
        }
        logTodos(todos);
      } else if (userChosenTask === AvailableTasks.VIEW_BY_CATEGORY) {
        // **** WHEN TASK IS ===VIEW_BY_CATEGORY=== ****
        if (categories.length <= 0) {
          throw "There are no categories available. Please add one.";
        }
        const allCategories = categories.map((item) => item.name);
        const userChosenCategory = await askSelectTodoCategory(
          "Select the category.",
          allCategories
        );
        const todosByCategory = Todo.fetchByCategory(userChosenCategory);
        if (todosByCategory.length <= 0) {
          logNote("No todos exist with this category.");
        } else {
          logTodos(todosByCategory);
        }
      } else {
        throw "Task is invalid!";
      }
    } catch (error) {
      logError(error);
    }
  } while (await askToContinue());

  await closingMessage();
  process.exit(0);
}

userName = await askName();
await welcome(userName);
init();
