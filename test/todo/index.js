const express = require('express');
const app = express();
app.use(express.json());


app.get("/", (req, res) => {
    res.send("welcome to the todo api");
});

let initialTodo = [
    { title: "HTML", isCompleted: true, id: 1 },
    { title: "javascript", isCompleted: true, id: 2 },
    { title: "React", isCompleted: false, id: 3 }
];

app.get("/todos", (req, res) => {
    res.send(initialTodo);
    console.log(initialTodo);

});

app.post("/addtodo", (req, res) => {

    let data = {
        title: req.body.title,
        isCompleted: req.body.isCompleted,
        id: initialTodo.length + 1
    }
    initialTodo.push(data);
    res.status(200).send(data);
})

app.patch("/update/:id", (req, res) => {
    let { id } = req.params
    let index = initialTodo.findIndex((e) => e.id == id);

    if (index == -1) {
        res.status(404).send("this todo is not exist");
    }
    else {
        initialTodo[index].title = req.body.title;
        initialTodo[index].isCompleted = req.body.isCompleted;
        res.send(initialTodo);
    }
})

app.delete("/delete/:id", (req, res) => {
    let { id } = req.params
    let index = initialTodo.findIndex((e) => e.id == id);
    let deletedTodo = initialTodo.splice(index, 1)[0]
    let todos = initialTodo.filter((e) => e.id !== id);
    res.send({ "deletedTodo": deletedTodo, "todos": todos })
});

app.get("/todo/:id", (req, res) => {
    let { id } = req.params
    let one = initialTodo.findIndex((e) => e.id == id)
    if (one == -1) {
        res.status(404).send("invalid id ");
    }
    else {
        res.send(initialTodo[one]);
    }
})

app.get("/findbystatus", (req, res) => {
    let { isCompleted } = req.query;
    let filter = initialTodo.filter((f) => f.isCompleted.toString() === isCompleted);
    res.status(200).send(filter);
})

app.listen(8090, () => {
    console.log('listening on port 8090');
})