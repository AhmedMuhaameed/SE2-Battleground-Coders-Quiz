# SE2-Battleground-Coders-Quiz



## Table of contents
* [Contributors] (#Contributors)
* [Our Schema] (#Our Schema)
* [Some picture help you how to use Quiz API](#Some picture help you how to use Quiz API)
* [Info] (#Info)



## Contributors
* Ahmed Ehab Hussein 20160007
* Ahmed Mohamed Abd El-Rahman 20160029
* Ahmed Mohamed Magdy 20160033



#### Quiz API
* To take quiz ```/quiz``` by get request
* To add quiz ```/addQuiz.json``` by post request don't forget to pass data like or scheme, it will mention later
* Todelete quiz ```/deleteQuiz.json/:id``` by delete request id refer to id of quiz
* To get all quizzes ```/quizzes.json``` by post request



## Our Schema
* We use mongo database
```
{
    size:{
        type: Number
    },
    field: {
        type:String
    },
    question: [
        {
            type: String,
            required: [true, 'question field is required']
        }
    ],
    choices: [
        [
            {
                type: String,
                required: [true, 'choices field is required']
            }
        ]
    ],
    answer: [
        {
            type: Array,
            required: [true, 'answer field is required']
        }
    ]
}
```



# Some picture help you how to use Quiz API
* get all quizzes
![get all quizzes](https://github.com/AhmedMuhaameed/SE2-Battleground-Coders-Quiz/blob/master/images/post%20quizzes.PNG)


* get quiz
![take quiz](https://github.com/AhmedMuhaameed/SE2-Battleground-Coders-Quiz/blob/master/images/get%20quiz.PNG)


* add quiz
![add quiz](https://github.com/AhmedMuhaameed/SE2-Battleground-Coders-Quiz/blob/master/images/post%20addQuiz.PNG)


* delete quiz
![delete quiz](https://github.com/AhmedMuhaameed/SE2-Battleground-Coders-Quiz/blob/master/images/delete%20deleteQuiz.PNG)



## Info
* we use node js
* we use express ```npm install express```
* we use body-parser ```npm install body-parser```
* we use ejs ```npm install ejs```
* we use mongoose ```npm install mongoose```
* we use mongo database and our database called quiz and our collections called quizcollections
