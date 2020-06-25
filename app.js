const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
let studentArr = []

app.get("/get", (req, res) => {
    res.send("Hello World...!!!")
})


app.post("/new", (req, res) => {

    let student = req.body
    studentArr.push(student)
    res.send(studentArr)
})

app.get("/get/:id", (req, res) => {
    let id = Number(req.params.id)
    const found = studentArr.find(element => element.studentId === id);
    console.log('found', found)
    res.json(found)
})

app.get("/getall", (req, res) => {

    res.json(studentArr)
})

app.delete("/delete/:id", (req, res) => {
    let id = Number(req.params.id)
    studentArr = studentArr.filter(element => element.studentId !== id);
    res.json(studentArr)
})

// name, age, studentId, class
app.put("/update/:id", (req, res) => {
    let id = req.params.id
    let studentBody = req.body;
    const student = studentArr.find(element => element.studentId == id);
    console.log('student', student)
    studentArr = studentArr.filter(element => element.studentId != id);

    let tempstudent = {studentId : id}

    studentBody.name ? tempstudent.name = studentBody.name : tempstudent.name = student.name

    // if (studentBody.name) {
    //     tempstudent.name = studentBody.name
    // } else {
    //     tempstudent.name = student.name

    // }
    if (studentBody.age) {

        tempstudent.age = studentBody.age
    } else {
        tempstudent.age = student.age

    }
    if (studentBody.class) {

        tempstudent.class = studentBody.class
    } else {
        tempstudent.class = student.class
    }

    studentArr.push(tempstudent)


    res.json(tempstudent)
})


app.listen(port, () => console.log(`app listening at http://localhost:${port}`))