import express from 'express';
import bodyParser from 'body-parser';
import { userRouter } from './router/userRouter';
import { postRouter } from './router/postRouter';

import path from 'path';

const port = 3000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//[ANY] ../Users
app.use('/Users', userRouter);

//[ANY] ../Posts
app.use('/Posts', postRouter);

//[ANY] ../*
app.use('/',(req,res,next) =>{
   res.sendFile(path.resolve(__dirname + '/../Public/html/help.html'));
});

app.listen(port);