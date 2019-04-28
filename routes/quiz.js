const express = require('express');
const Quiz = require('../model/quiz');
const QuizDB = require('../model/quizDB');
const router = express.Router()

const quiz = new Quiz(QuizDB);

router.post('/quizzes', (req, res) => {
    quiz.getQuizzes(req, res);
})

router.post('/quizzes.json', (req, res) => {
    quiz.getQuizzesJson(req, res);
})

router.get('/quiz', (req, res) => {
    quiz.getQuiz(req, res);
})

router.get('/quiz.json', (req, res) => {
    quiz.getQuizJson(req, res);
})

router.post('/grade.json', (req, res) => {
    quiz.calculateScore(req, res);
})

router.post('/addQuiz.json', (req, res) => {
    quiz.addQuizJson(req, res);
})

router.post('/deleteQuiz', (req, res) => {
    quiz.deleteQuiz(req, res);
})

router.delete('/deleteQuiz.json/:id', (req, res) => {
    quiz.deleteQuizJson(req, res);
})

module.exports = router