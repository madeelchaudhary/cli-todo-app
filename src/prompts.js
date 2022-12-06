import inquirer from "inquirer";
import { logNote } from "./logs.js";
async function askName() {
    const answers = await inquirer.prompt({
        name: "user_name",
        type: "input",
        message: "What is your name?",
        validate(input) {
            if (!input) {
                return "Name is invalid. Enter you name again!";
            }
            return true;
        },
    });
    return answers.user_name;
}
async function askTask(availableTasks) {
    const answers = await inquirer.prompt({
        name: "userChoice",
        type: "list",
        message: "Choose the task you want to perform.",
        choices: availableTasks,
    });
    return answers.userChoice;
}
function validteTodoFields(input) {
    if (!input) {
        return "Field should not be empty. Enter todo " + this.name + " again!";
    }
    return true;
}
async function askTodo() {
    const answers = await inquirer.prompt([
        {
            name: "title",
            type: "input",
            message: "Enter todo title:",
            validate: validteTodoFields,
        },
        {
            name: "description",
            type: "input",
            message: "Enter todo description:",
            validate: validteTodoFields,
        },
        {
            name: "category",
            type: "input",
            message: "Set todo category:",
            validate: validteTodoFields,
        },
    ]);
    return answers;
}
async function askSelectTodo(customMessage, todos) {
    logNote("\nYou must enter valid Todo Index. To get detailed view Press 'h + Enter'.");
    const answers = await inquirer.prompt({
        name: "todoId",
        type: "rawlist",
        message: customMessage,
        choices: todos.map((todo, i) => ({
            name: "Title: " + todo.title + ",  Category: " + todo.category,
            value: todo.id,
        })),
    });
    return answers.todoId;
}
async function askSelectTodoCategory(customMessage, categories) {
    logNote("\nYou must enter valid Todo Index.");
    const answers = await inquirer.prompt({
        name: "category",
        type: "rawlist",
        message: customMessage,
        choices: categories,
    });
    return answers.category;
}
async function askToContinue() {
    const answers = await inquirer.prompt({
        name: "userChoice",
        type: "confirm",
        message: "\nDo you want to perform another task?",
    });
    return answers.userChoice;
}
export { askName, askTask, askTodo, askSelectTodo, askSelectTodoCategory, askToContinue, };
