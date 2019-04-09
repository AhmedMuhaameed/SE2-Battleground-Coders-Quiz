var bodyParser = require('body-parser');
const quizModel = require('../models/quizModel');

var data = [{ question: 'what\'s your name? ', choice: ['Ehab', 'Magdy', 'Abd El-Rahman'], correct: 0 },
{ question: 'what\'s your age? ', choice: ['20', '19', '21'], correct: 2 },
{ question: 'How are you', choice: ['Fine', 'Good', 'Upset'], correct: 1 }];
var answer = [];

var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function (app) {
    app.use(bodyParser.json()); // to support JSON bodies
    app.use(bodyParser.urlencoded({ extended: true })); // to support URL-encoded bodies

    app.get('/quiz', function (req, res) {
        res.render('quiz', { questions: data });
        console.log("again");
    });

    app.get('/quiz_success', function (req, res) {
        console.log("IN GET-Quiz_Success");
        res.send(answer);
    })

    app.post('/quiz_success', urlencodedParser, function (req, res) {
        var score = 0;
        for (var i = 0; i < data.length; i++) {
            console.log('user answer: ' + req.body[i]);
            console.log("correct answer: " + data[i].correct);
            if (data[i].correct == req.body[i]) {
                score++;
            }
        }
        console.log("score: " + score);
        res.send((score * 1.0 / data.length) * 100.0 + "%");
    });

    app.get('/addQuiz', function (req, res) {
        res.render('addQuiz', { queryString: req.query });
    })

    app.post('/addQuiz_success', urlencodedParser, function (req, res) {
        console.log("req.body: " + req.body);
        if (!req.body) return res.send(404);
        
        var finalData = [{field: req.body[100]}, { question: req.body[0], choices: [req.body[4], req.body[5], req.body[6]], answer: '' },
        { question: req.body[1], choices: [req.body[14], req.body[15], req.body[16]], answer: '' },
        { question: req.body[2], choices: [req.body[24], req.body[25], req.body[26]], answer: '' }];
        console.log("finalData.length = " + finalData.length);
        /*
		quizModel.create(finalData).then(function(req, res){
            res.render('addQuiz_success', { inputData: finalData });
        })
		*/
        res.render('addQuiz_success', { inputData: finalData });
        //res.json(finalData);
    })

    app.delete('/quiz/:question', function (req, res) {
        data = data.filter(function (todo) {
            return todo.item.replace(/ /g, '-') !== req.params.item;
        });
        res.json(data);

    });
}