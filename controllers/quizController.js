var bodyParser = require('body-parser');
const quizModel = require('../models/quizModel');

var data = {
    field: 'CS',
    size: 3, 
    question: ['what\'s your name? ', 'what\'s your age? ', 'How are you ?'], 
    choices: [['Ehab', 'Magdy', 'Abd El-Rahman'], ['20', '19', '21'], ['Fine', 'Good', 'Upset']], 
    answer: ['Ehab', '21', 'Good']
};

function clone(a) 
{
    return JSON.parse(JSON.stringify(a));
}

var answer = [];

var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function (app) {
    app.use(bodyParser.json()); // to support JSON bodies
    app.use(bodyParser.urlencoded({ extended: true })); // to support URL-encoded bodies


    app.get('/test', function (req, res) {

        const node = new quizModel({
            size: 3,
            field: "Asd",
            question: ["zxc", "q2", 'q3'],
            choices: [["qwe", "Qasdssde"], ["C1", "C2", "c3"]],
            answer: ["ZXC", "Qasdssde", "C3"]
        });

        const initStep = new quizModel({
            size: data.size,
            field: data.field,
            question: data.question,
            choices: data.choices,
            answer: data.answer
        });
        
        //console.log(node);

                
        quizModel.find({}, function(err, res)
        {
            if(err) console.error(err);
            else
            {
                console.log("All Quizes")
                for(var i = 0; i < res.length; i++)
                {
                    console.log(res[i]);
                }
                data = res;
            }
        })
        console.log("*****************");
        //console.log(data);
        res.json(data);
        
        /*
        initStep.save(function (err, x) {
            if (err) console.error(err);
            else{
                console.log("qwewqe");
                res.json(data);
            }
        });
        */
          
    })

    app.get('/quiz', function (req, res) {
        quizModel.find({}, function(err, quizzes)
        {//5cb24d427f95a010f4d23914
            if(err) console.error(err);
            else
            {
                console.log("All Quizes")
                console.log("res == " + quizzes);
                let quiz = quizzes[Math.floor(Math.random()*quizzes.length)];
                res.render('quiz', {node: quiz});
            }
        })
    });

    app.post('/quiz_success', urlencodedParser, function (req, res) {
        var score = 0;
        console.log("quiz_success");
        quizModel.find({_id:req.body.id}, function(err, data){
            if(err) console.error(err);
            else{
                console.log("Data with id = ", req.body.id)
                console.log(data[0]);
                for (var i = 0; i < data[0].size; i++) {
                    console.log('user answer: ' + data[0].choices[i][req.body[i]]);
                    console.log("correct answer: " + data[0].answer[i]);
                    if (data[0].answer[i] == data[0].choices[i][req.body[i]]) {
                        score++;
                    }
                }
                console.log("score: " + score);
                res.json({Score: (score * 1.0 / data[0].size) * 100.0 + "%"});
            }
        })
    });

    /*===========================Admin==============*/
    app.get('/adminQuizController', function(req, res){
        quizModel.find({}, function(err, quizzes){
            if(err) console.error(err);
            else{
                res.render('AdminQuizController', {node: quizzes});
            }
        })
    })

    app.post('/tempPageForAdmin', function(req, res){
        console.log("lol")
        quizModel.deleteOne({_id:req.body.id}, function(err, data){
            res.redirect('/adminQuizController');
        })
    })

    app.get('/addQuiz', function (req, res) {
        res.render('addQuiz', { queryString: req.query });
    })

    app.post('/addQuiz_success', urlencodedParser, function (req, res) {
        console.log("req.body: " + req.body);
        if (!req.body) return res.send(404);
        
        var finalData = {
            size: 3,
            field: req.body[100],
            question: [req.body[0], req.body[1], req.body[2]],
            choices: [[req.body[4], req.body[5], req.body[6]], [req.body[14], req.body[15], req.body[16]],  [req.body[24], req.body[25], req.body[26]]],
            answer: [req.body[7], req.body[17], req.body[27]]
        };

        const add_quiz = new quizModel(
            {
                size: 3,
                field: finalData.field,
                question: finalData.question,
                choices: finalData.choices,
                answer: finalData.answer
            }
        )

        add_quiz.save(function(err, x){
            if(err) console.error(err)
            else{
                console.log(finalData);
                //res.json(finalData);
            }
        })

        console.log("finalData.length = " + finalData.size);
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
