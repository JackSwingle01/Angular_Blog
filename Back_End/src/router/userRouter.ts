import express, { Router } from 'express';
import { User } from '../model/userModel';
import jwt from 'jsonwebtoken';

import { authRouter, JWTKey } from './authRouter';

let userRouter: Router = express.Router();

//memory to store list of users
let userArray: User[] = [];

//test users//
userArray.push(new User('123', 'test', 'user', 'test@user.com', 'pass123'));
userArray.push(new User('001', "jack", 'swingle', 'jack@swingle.com', 'mypassword'));

//returns a copy of a user without the password field.
function RemovePassword(user: User) {
    let newUser = new User();
    newUser = Object.assign(newUser, user);
    delete (<any>newUser).password;
    return newUser;
}

//returns a user by id
function FindUser(id: string): User {
    return <User>userArray.find(user => user.userId == id);
}

//Login [GET] ../{user}/{pwd}/

userRouter.get('/:user/:pwd', (req, res, next) => {
    let user: string = req.params.user;
    let pwd: string = req.params.pwd;
    let reqUser = FindUser(user);
    if (reqUser && reqUser.isValidUser() && pwd == reqUser.password) {
        let token = jwt.sign({
            exp: Math.floor((Date.now() / 1000) + (60 * 60)),
            data: {
                userId: reqUser.userId,
                name: reqUser.emailAddress
            }
        }, JWTKey);

        res.send({ token: token });
    } else {
        res.status(401).send({ message: 'Invalid Credentials' });
    }
});

// [GET] ../Users/
userRouter.get('/', authRouter);
userRouter.get('/', (req, res, next) => {

    let cloneUserArray: User[] = [];
    for (let i: number = 0; i < userArray.length; i++) {
        cloneUserArray[i] = RemovePassword(userArray[i]);
    }
    res.send(cloneUserArray);

});

// [GET] ../Users/{id}
userRouter.get('/:id', authRouter);
userRouter.get('/:id', (req, res, next) => {
    //get user by id
    let id: string = req.params.id;
    let reqUser = new User();
    Object.assign(reqUser, FindUser(id));

    //check if user was found
    if (reqUser.userId != '') {
        //remove password before sending
        res.send(RemovePassword(reqUser));
    }
    else {
        //404 not found
        res.status(404).send({ message: 'User Not Found.', status: 404 });
    }
});

// [POST] ../Users 
userRouter.post('/', (req, res, next) => {
    let newUser = new User();
    newUser = Object.assign(newUser, req.body);
    // newUser.userId = '';

    if (!newUser.isValidUser()) {
        //check if all fields are filled
        res.status(406).send({ message: `Invalid Format\n userId:${req.body.userId} \n password: ${newUser.password}`, status: 406 });
    } else if (!newUser.hasValidEmail()) {
        //if invalid email format
        res.status(406).send({ message: 'Invalid Email Format' });
    }
    else if (FindUser(newUser.userId)) {
        //check if id already exists
        res.status(409).send({ message: 'A user with that id already exists.', status: 409 });
    }
    else {
        //if new user passes all validation
        userArray.push(newUser);
        res.status(201).send(RemovePassword(newUser));
    }
});

// [PATCH] ../Users/{id}
userRouter.patch('/:id', authRouter);
userRouter.patch('/:id', (req, res, next) => {
    let id: string = req.params.id;
    let updatedUser = FindUser(id);
    if (updatedUser) {
        if (req.body.firstName) {
            updatedUser.firstName = req.body.firstName;
        }
        if (req.body.lastName) {
            updatedUser.lastName = req.body.lastName;
        }
        if (req.body.emailAddress) {
            updatedUser.emailAddress = req.body.emailAddress;
            if (!updatedUser.hasValidEmail()) {
                res.status(406).send({ message: "Invalid Email Format" });
            }
        }
        if (req.body.password) {
            updatedUser.password = req.body.password;
        }
        userArray[userArray.indexOf(FindUser(id))] = updatedUser;
        res.status(200).send(RemovePassword(updatedUser));
    }
    else {
        res.status(404).send({ message: 'User Not Found', status: '404' });
    }
});

// [DELETE] ../Users/{id}
userRouter.delete('/:id', authRouter);
userRouter.delete('/:id', (req, res, next) => {
    let id: string = req.params.id;
    let delUser = FindUser(id);
    if (delUser) {
        userArray.splice(userArray.indexOf(delUser), 1);
        res.status(204).send({ message: 'User Deleted.', status: 204 });
    } else {
        res.status(404).send({ message: 'User Not Found.', status: 404 });
    }
});

export { userRouter };