import express, { Router } from 'express';
import jwt from 'jsonwebtoken';


let authRouter: Router = express.Router();
const JWTKey = "B652CE94AB2DE51E78A33B0FB0C0B0F82BC5F1D4FDC4B203219BD8C1CFEBD741";

authRouter.use('/', (req, res, next) => {

    if (req.headers['authorization']) {
        try {
            let verifiedToken = jwt.verify(req.headers['authorization'].replace('Bearer', '').replace(' ', ''), JWTKey) as any;
            if (verifiedToken) {
                if (verifiedToken.data.userId) {
                    res.locals.currentUser = verifiedToken.data.userId;
                    next();
                }
            } else {
                res.status(401).send({ message: 'Invalid Token' });
            }
        } catch {
            res.status(401).send({ message: 'Invalid Token' });
        }
    } else {
        res.status(401).send({ message: 'Invalid Token' });
    }

});

export { authRouter, JWTKey };
