const usersModel = require("../model/user")
const express = require ("express");
const bodyParser = require("body-parser");

const app = express();

const Logger = require('../services/logger_services'); 
const logger = new Logger('app'); 

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());  


const idGeneretor = {
    lastId: 0,
    generateId: function() {
        return ++(this.lastId);
    },
};  


const getUser = (req, res) => { 
    const id = Number(req.params.userId);
    const user = usersModel.getUser(id);
    logger.setLogData(user);
    logger.info('You passed a user ID');
    res.status(200).json({
       message: 'You passed a user ID',
       user
    });
};

const createUser = (req, res) => { 
    let error = {};
    const user = {
        userName: req.body.userName,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        address: req.body.address,
        age: req.body.age,
        id: idGeneretor.generateId(),
    };
    
    logger.setLogData(user);
    logger.info("request recieved at /user");

    if (user.userName == null || user.userName == ""){
        logger.error("username field is empty");
        error["username"] = "username field is empty";
    };
    var userNameValidationRegEx = /^([a-z]|[0-9]|-|_)+$/;
    var isUserNameValid = userNameValidationRegEx.test(user.userName);
    if(!isUserNameValid){
        logger.error("userName field is incorrect");
		error["userName"] = "userName field is incorrect";
	} 
    if (user.password == null || user.password == ""){
        logger.error("password field is empty");
        error["password"] = "password field is empty";
    };
	if (user.password < 8) {
		logger.error("password field is incorrect");
		error["password"] = "password field is incorrect";
	}
    if (user.firstName == null || user.firstName == ""){
        logger.error("firstName field is empty");
        error["firstName"] = "firstName field is empty";
    };
    if (user.lastName == null || user.lastName == ""){
        logger.error("lastName field is empty");
        error["lastName"] = "lastName field is empty";
    };
    if (user.address == null || user.address == ""){
        logger.error("address field is empty");
        error["address"] = "address field is empty";
    };
    if (user.age == null || user.age == ""){
        logger.error("age field is empty");
        error["age"] = "age field is empty";
    };
    var ageValidationRegEx = /^([0-9])+$/;
	var isAgeValid = ageValidationRegEx.test(user.age);
	if (!isAgeValid) {
		logger.error("age field is not a number");
		error["age"] = "age field is not a number";
	}
    if(Object.keys(error).length !=0){
        logger.error("creating a user failed"),{
            "success":false
        }
        res.send("Error")
    }else{
        usersModel.createUser(user);
        logger.info("user created successfully"),{
            "success":true 
        }
        res.status(201).json({
            message: "User created",
            createdUser: user
        });
    }
    
};

const deleteUser = (req, res) => {
    const id = Number(req.params.userId);
    const deletedUser = usersModel.deleteUser(id);
    logger.setLogData(deletedUser);
    logger.info('User deleted!');
    res.status(200).json({
        message: 'User deleted!',
        deletedUser
    });
};


module.exports = {
    deleteUser,
    createUser,
    getUser
}