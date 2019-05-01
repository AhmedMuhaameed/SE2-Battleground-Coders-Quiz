const model = require('../model/quiz');
const modelDB = require('../model/quizDB');
const mongoose = require('mongoose');
const key = require('../config');


test('connect to database', async () =>{
    await mongoose
    .connect(key.mongoURI, {useNewUrlParser: true})
    .then(() => {
        console.log(`connected to database`)
    })
    .catch(err => {
        console.log(err)
    })

    mongoose.Promise = global.Promise
})

const db = new model(modelDB);

test('addQuizJson quiz 1', async () => {

    // change quiz

    let newQuiz = {
        "size": 5,
        "question": ["How many degrees are in a triangle?","The Pythagorean theorem holds true for which type of triangle?","What is the biggest angle?","A polygon is a figure that is closed and has straight lines. Is this a polygon?","C=2*Pi*r (Circumference of a Circle)"
        ],
        "choices": [["90","360","180"],["All triangles","Right angled triangle","Isosceles triangle"],["Right","Acute","Obtuse"],["yes","no"],["True","False"]],
        "answer": [[180],["Right angled triangle"],["Obtuse"],["yes"],["True"]],
        "field": "Geometry"
    }

    let quiz = await db.addQuizJson(newQuiz);
    expect(quiz).not.toBeNull();
})

test('getQuizJson', async ()=>{
    //expect.assertions(1);
    let quiz = await db.getQuizJson();
    expect(quiz).not.toBeNull();
})

test('getQuizJson', async ()=>{
    //expect.assertions(1);
    let quizzes = await db.getQuizzesJson();
    expect(quizzes).not.toBeNull();
})

test('delete all data', async () => {
    let res = await modelDB.deleteMany({});
    expect(res).not.toBeNull();
})

test('addQuizJson quiz 2', async () => {

    // change quiz

    let newQuiz = {
        "size": 3,
        "field": "Geography",
        "question": ["Mexico is part of North America.?", "California, New Mexico and Canada are all_____________.", "What line of latitude is at 0 degrees?"],
        "choices": [["True", "False"], ["States", "Countries", "In North America"], ["Equator", "Prime Meridian", "Time Zones"]],
        "answer": ["True", "In North America", "Equator"]
    }

    let quiz = await db.addQuizJson(newQuiz);
    expect(quiz).not.toBeNull();
})

test('close connection with mongo db', async () => {
    await mongoose.disconnect();
})
