const express = require('express');
const Quiz = require('../model/quiz');
const QuizDB = require('../model/quizDB');
const router = express.Router()

const quiz = new Quiz(QuizDB);

router.post('/quizzes', (req, res) => {
    quiz.getQuizzes(req, res);
})

router.post('/quizzes.json', (req, res) => {
    //let quizzes =  quiz.getQuizzesJson();
    quiz.getQuizzesJson(req, res);
    //res.json(quizzes);
})

router.get('/quiz', (req, res) => {
    quiz.getQuiz(req, res);
})

router.get('/quiz.json', (req, res) => {
    //let quizVar =  quiz.getQuizJson();
    //console.log(quizVar);
    quiz.getQuizJson(req, res);
    //res.json(quizVar);
})

router.post('/grade.json', (req, res) => {
    let score =  quiz.calculateScore(req, res);
    //quiz.calculateScore(req, res);
    res.json(score);
})

router.post('/addQuiz.json', (req, res) => {
    //let quizVar =  quiz.addQuizJson(req, res);
    quiz.addQuizJson(req, res);
    //res.json(quizVar);
})

router.post('/deleteQuiz', (req, res) => {
    quiz.deleteQuiz(req, res);
})

router.delete('/deleteQuiz.json/:id', (req, res) => {
    //let quizVar =  quiz.deleteQuizJson(req, res);
    quiz.deleteQuizJson(req, res);
    //res.json(quizVar);
})

module.exports = router
