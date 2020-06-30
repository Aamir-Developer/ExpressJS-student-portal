const express = require('express')
const mongoose = require('mongoose')
const app = express()
const studentData =  require('./model/studentschema')
const port = process.env.PORT || 3000
app.use(express.json())

// Database logic
let uri = "mongodb+srv://aamir2021:92119211@cluster0.0ynpe.mongodb.net/studentdata?retryWrites=true&w=majority"

 mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
},(err) => {
    if (err) console.log("err while connecting to db");
    else{console.log("connection is successful")}
} );

mongoose.set('useCreateIndex', true);

// const Cat = mongoose.model('Cat', { name: String });

// const kitty = new Cat({ name: 'Zildjian' });
// kitty.save().then(() => console.log('meow'));

let studentArr = []

app.get("/get", (req, res) => {
    res.send("Hello World...!!!")
})


app.post("/new", (req, res) => {

    let student = req.body
    const data = new studentData(student)
    data.save().then((resp) => res.send({user : resp}))
    .catch(err =>  res.send(err))

    // studentArr.push(student)
    // res.send(studentArr)
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