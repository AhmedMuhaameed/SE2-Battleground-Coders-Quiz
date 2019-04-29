const mongoose = require('mongoose')

module.exports = class Quiz {
    constructor(quizDB){
        this.QuizDB = quizDB
    }

    async getQuizzes(req, res) {
        this.QuizDB
            .find({})
            .then((quizzes => {
                //console.log(`\n\nquizzes.json ==> \n${quizzes}\n\n`)
                res.render('quizzes', {quizzes:quizzes})
            }))
            .catch((err => {
                console.log(err)
            }))
    }

    async getQuizzesJson(req, res) {
        this.QuizDB
            .find({})
            .then((quizzes => {
                console.log(`\n\nquizzes.json ==> \n${quizzes}\n\n`)
                return quizzes;
                //res.json(quizzes)
            }))
            .catch((err => {
                console.log(err)
            }))
    }

    async getQuiz(req, res) {
        this.QuizDB
            .find({})
            .then((quiz => {
                console.log(`\n\nquiz ==> \n${quiz}\n\n`);
                res.render('quiz', {quiz: quiz[Math.floor(Math.random()*quiz.length)]})
            }))
            .catch((err => {
                console.log(err);
            }))
    }

    async getQuizJson(req, res) {
        this.QuizDB
            .find({})
            .then((quiz => {
                console.log(`\n\nquiz.json ==> \n${quiz}\n\n`);
                return quiz;
                //res.json(quiz[Math.floor(Math.random()*quiz.length)])
            }))
            .catch((err => {
                console.log(err);
            }))
    }

    async addQuizJson(req, res) {
        let quiz = new this.QuizDB({
            size:req.body.size,
            field:req.body.field,
            question:req.body.question,
            choices:req.body.choices,
            answer:req.body.answer
        })
        quiz.save()
            .then(data => {
                //console.log(data);
                //res.json(data)
                return data;
            })
            .catch(err => {
                console.log(err);
            })
    }

    async calculateScore(req, res) {
        let score = 0;
        this.QuizDB.findOne({_id:req.body.id})
            .then((quiz => {
                for(var i = 0; i < quiz.size; i++)
                {
                    console.log(`\n\nquiz.answer[${i}] ==> \n${quiz.answer[i]}\n`);
                    console.log(`\nreq.body.question_${i}_answers ==> \n`);
                    console.log(req.body[`question_${i}_answers`]);
                    console.log(`\n\n`);
                    if(quiz.answer[i] == req.body[`question_${i}_answers`]){
                        score++;
                    }
                }
                let result = {
                    number_of_questions: quiz.size,
                    number_of_correct_answer: score,
                    ratio: `${(score / quiz.size)*100}%`
                }
                //res.json(result);
                return result;
            }))
    }
    
    async deleteQuiz(req, res) {
        this.QuizDB
            .deleteOne({_id: req.body.id})
            .exec()
            .then(quiz => {
                if(res.status >= 200 && res.status <= 400) return quiz;
            })
            .catch(err => {
                res.status(500).json({
                    error: err
                })
            })
    }

    async deleteQuizJson(req, res) {
        this.QuizDB
            .deleteOne({_id: req.params.id})
            .exec()
            .then(quiz => {
                //res.status(200).json(quiz)
                if(res.status >= 200 && res.status <= 400) return quiz;
            })
            .catch(err => {
                res.status(500).json({
                    error: err
                })
            })
    }
}
