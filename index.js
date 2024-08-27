import { Command } from "commander";
import fs from "fs";

const program = new Command();

program
    .name("Todo")
    .version("1.0.0")
    .description("Simple Todo CLI");

program.command("add <todo>").action((todo) => {
    fs.appendFileSync("todo.txt", `${todo}\n`);
    console.log("Added todo: ", todo);
});

program.command("list").action(() => {
    const todos = fs.readFileSync("todo.txt", "utf-8");
    console.log(todos);
});

program.command(("completed <todo>")).action((todo) => {
    const todos = fs.readFileSync("todo.txt", "utf-8").split("\n");
    const newTodos = todos.map((t) => {
        if (t === todo) {
            return `${t} - Completed`;
        }
        return t;
    });
    fs.writeFileSync("todo.txt", newTodos.join("\n"));
    console.log("Marked todo as completed: ", todo);
});

program.parse(process.argv);