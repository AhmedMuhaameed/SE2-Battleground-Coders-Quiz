var assert = require('assert');

const Quiz = require('../model/quiz');
const QuizDB = require('../model/quizDB');

const quiz = new Quiz(QuizDB);

describe('Get Quiz', () => {
    //let quiz = require('../model/quiz');
    it('should return null if no value', () => {
        let test = quiz.getQuizJson();
        //console.log(test);
        assert.notEqual(test, null);
    })
})

describe('Get Quizzes', () => {
  //let quiz = require('../model/quiz');
  it('should return null if no value', () => {
      let test = quiz.getQuizzesJson();
      //console.log(test);
      assert.notEqual(test, null);
  })
})

