
const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const cors = require('cors');
const { json } = require('body-parser');
const { nanoid } = require('nanoid');

dotenv.config({ path: './config.env' });

const app = express();

app.use(cors());
app.use(json()); //middleware to parse json data

let todos = [
	{
		id: nanoid(),
		title: 'todo 1',
		completed: true,
	},
	{
		id: nanoid(),
		title: 'todo 2',
		completed: false,
	},
	{
		id: nanoid(),
		title: 'todo 3',
		completed: false,
	},
	{
		id: nanoid(),
		title: 'todo 4',
		completed: false,
	},
	{
		id: nanoid(),
		title: 'todo 5',
		completed: false,
	},
];

app.get('/todos', (req, res) => res.send(todos));

app.post('/todos', (req, res) => {
	const todo = { title: req.body.title, id: nanoid(), completed: false };
	todos.push(todo);
	return res.send(todo);
});

app.patch('/todos/:id', (req, res) => {
	const id = req.params.id;
	const index = todos.findIndex((todo) => todo.id == id);
	const completed = Boolean(req.body.completed);
	if (index > -1) {
		todos[index].completed = completed;
	}
	return res.send(todos[index]);
});

app.delete('/todos/:id', (req, res) => {
	const id = req.params.id;
	const index = todos.findIndex((todo) => todo.id == id);
	if (index > -1) {
		todos.splice(index, 1);
	}

	res.send(todos);
});

const PORT = 7000;

app.listen(PORT, console.log(`Server running on port ${PORT}`.green.bold));


/*

const express = require('express')
const { json } = require("body-parser")
const { colors } = require('colors')
const app = express()
const { nanoid } = require("nanoid")
app.use(json())
const todos =
	[{
		id: 1,
		name: "eating",
		completed: false

	},
	{
		id: nanoid(),
		name: "sleeping",
		completed: false
	},
	{
		id: nanoid,
		name: "dancing",
		completed: false
	}]
app.get("/", (req, res) => {
	res.send("hey you are in home page")
})
app.get("/todos", (req, res) => {
	res.send(todos)
})
app.post("/todos", (req, res) => {
	const todo = { id: nanoid(), name: "cooking", completed: false }
	todos.push(todo)
	return res.send(todos)
})
app.patch("/todos/:id", (req, res) => {
	const id = req.params.id
	const index = todos.findIndex(todo => todo.id === id)
	const completed = Boolean(req.body.completed)
	todos[index].completed = completed
	return res.send(todos[index])
})
app.delete("/todos/:id", (req, res) => {
	const id = req.params.id
	const newTodo = todos.filter(todo => todo.id != id)
	return res.send(newTodo)

})
app.listen(3000, console.log("connected to the server".green.italic))
*/


