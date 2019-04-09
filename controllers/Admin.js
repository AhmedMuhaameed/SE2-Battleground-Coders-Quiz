class Admin
{
  	constructor(id,first_name,last_name,password,email,users_list,quiz_list,result_list){
        this.id = id,
        this.first_name = first_name,
        this.last_name = last_name,
        this.password = password,
        this.email = email,
        this.users_list = users_list,
        this.quiz_list = quiz_list,
        this.result_list = result_list
    }

    get_first_name(){
        return this.first_name;
    }
}

let a = new Admin(1, 'a', 'a', 123, 'a@a.com', [], [], []);
console.log(a.id);
a.id = 5
console.log(a.id);