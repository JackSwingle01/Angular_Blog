import express, { Router } from 'express';
import { Post } from '../model/postModel';
import { authRouter } from './authRouter';
// import { currentUser } from './userRouter';

let postRouter: Router = express.Router();

let postArray: Post[] = [];

postArray.push(new Post(1, new Date(), 'Post 1', 'test', '123', 'img.jpg', new Date()));
// postArray.push(new Post());

function FindPost(id: number): Post {
    return <Post>postArray.find(post => post.postId == id);
}
function FindPostsByUser(id: string): Post[] {
    return postArray.filter(post => post.userId == id);
}

//[GET] ../Posts
postRouter.get('/', (req, res, next) => {
    if (postArray.length > 0) {
        res.send(postArray.sort((a, b) => {
            return a.createdDate.getTime() - b.createdDate.getTime();
        }));
    } else {
        res.status(404).send({ message: 'No Posts Found' })
    }
});

//[GET] ../Posts/{postId}
postRouter.get('/:id', (req, res, next) => {

    //get post by id
    let id: number = parseInt(req.params.id);
    let reqPost = new Post();
    Object.assign(reqPost, FindPost(id));

    //check if user was found
    if (reqPost.postId != -1) {
        res.send(reqPost);
    }
    else {
        //404 not found
        res.status(404).send({ message: 'Post Not Found.', status: 404 });
    }
});

//[POST] ../Posts
postRouter.post('/', authRouter); //auth required
postRouter.post('/', (req, res, next) => {
    let newPost = new Post();
    newPost = Object.assign(newPost, req.body);

    if (postArray.length == 0) {
        newPost.postId = 1;
    } else {
        newPost.postId = postArray.sort((a, b) => {
            return a.lastUpdated.getTime() - b.lastUpdated.getTime();
        })[postArray.length - 1].postId + 1; // gets the largest postId and adds 1
    }
    newPost.userId = res.locals.currentUser;

    if (!newPost.isValidPost()) {
        //check if all fields are filled
        res.status(406).send({ message: 'Invalid Format.' + newPost.postId + newPost.userId, status: 406 });
    } else if (FindPost(newPost.postId)) {
        //check if id already exists
        do {
            newPost.postId++;
        } while (FindPost(newPost.postId));
        postArray.push(newPost);
        res.status(201).send(newPost);
        // res.status(409).send({ message: 'A post with that id already exists.', status: 409 });
    }
    else {
        //if new post passes all validation
        postArray.push(newPost);
        res.status(201).send(newPost);
    }
});

//[PATCH] ../Posts/{id}
postRouter.patch('/:id', authRouter); //auth required
postRouter.patch('/:id', (req, res, next) => {
    let id: number = parseInt(req.params.id);
    let updatedPost = FindPost(id);
    if (updatedPost) { //if the post is found
        if (res.locals.currentUser == updatedPost.userId) { //logged in user must match creator of post
            if (req.body.title) {
                updatedPost.title = req.body.title; //edit title
            }
            if (req.body.content) {
                updatedPost.content = req.body.content; //edit content
            }
            if (req.body.headerImage) {
                updatedPost.headerImage = req.body.headerImage; //edit image
            }
            updatedPost.lastUpdated = new Date(); //update lastUpdated date
            postArray[postArray.indexOf(FindPost(id))] = updatedPost;
            res.status(200).send(updatedPost);
        } else {
            res.status(401).send({ message: 'Wrong User' });
        }
    }
    else {
        res.status(404).send({ message: 'Post Not Found', status: '404' });
    }
});

//[DELETE] ../Posts/{postId} 
postRouter.delete('/:id', authRouter); //auth required
postRouter.delete('/:id', (req, res, next) => {
    let id: number = parseInt(req.params.id);
    let delPost = FindPost(id);


    if (!delPost) {
        res.status(404).send({ message: 'Post Not Found.', status: 404 });

    } else if (res.locals.currentUser != delPost.userId) {
        res.status(401).send({ message: 'Unauthorized.' });
    }
    else {
        postArray.splice(postArray.indexOf(delPost), 1);
        res.status(204).send({ message: 'Post Deleted.', status: 204 });
    }
});

//[GET] ../Posts/Users/{userId} 
postRouter.get('/User/:id', (req, res, next) => {
    let id = req.params.id;
    let reqPosts: Post[] = [];
    Object.assign(reqPosts, FindPostsByUser(id));
    if (reqPosts.length != 0) {
        res.send(reqPosts);
    } else {
        res.status(404).send({ message: 'No Posts Found.', status: 404 });
    }
});

export { postRouter };