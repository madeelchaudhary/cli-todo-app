import chalk from "chalk";
import chalkAnimation from "chalk-animation";

import Todo from "./todo.js";
import { getAString, sleep } from "./utils.js";

async function welcome(userName: string) {
  const beautifyStr = getAString(60, "*");
  const rainbowTitle = chalkAnimation.rainbow(
    `\n${beautifyStr}
                  Hello, ${userName.toUpperCase()}!
       You have a simple Todo app that works on CLI.\n${beautifyStr}\n`
  );

  rainbowTitle.start();
  await sleep();
  rainbowTitle.stop();
}

async function closingMessage() {
  const karaokeTitle = chalkAnimation.karaoke("See you again!");
  karaokeTitle.start();
  await sleep();
  karaokeTitle.stop();
}

const logError = (error: unknown | any) => {
  console.log(`${chalk.bold.red(chalk.bgWhite(error))}\n`);
};

const logNote = (note: string) => {
  console.log(`${chalk.bold.cyan(chalk.bgWhite(note))}\n`);
};

const logTodos = (todos: Todo[]) => {
  todos.forEach((todo, i) => {
    console.log(
      `\t${i + 1}). ${chalk.bold.gray("Title: ") + chalk.blue(todo.title)}\t ${
        chalk.bold.gray("Category: ") + chalk.blue(todo.category)
      }\n\t    ${
        chalk.bold.gray("Description: ") + chalk.blue(todo.description)
      }`
    );
  });
};

export { welcome, closingMessage, logError, logNote, logTodos };
