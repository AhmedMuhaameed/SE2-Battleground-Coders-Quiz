# SE2-Battleground-Coders-Quiz

## Contributors
* Ahmed Ehab Hussein 20160007
* Ahmed Mohamed Abd El-Rahman 20160029
* Ahmed Mohamed Magdy 20160033

#### Quiz API
* take quiz ```/quiz``` by get request
* add quiz ```/addQuiz.json``` by post request don't forget to pass data like or scheme, it will mention later
* delete quiz ```/deleteQuiz.json/:id``` by delete request id refer to id of quiz
* get all quizzes ```/quizzes.json``` by post request

## Our Schema
* we use mongo database
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

