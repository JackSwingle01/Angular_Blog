export class Post {


    postId: number;
    createdDate: Date;
    title: string;
    content: string;
    userId: string;
    headerImage: string;
    lastUpdated: Date;


    constructor(postId: number = -1,
        createdDate: Date = new Date(),
        title: string = '',
        content: string = '',
        userId: string = '',
        headerImage: string = '',
        lastUpdated: Date = new Date()) {

        this.postId = postId;
        this.createdDate = createdDate;
        this.title = title;
        this.content = content;
        this.userId = userId;
        this.headerImage = headerImage;
        this.lastUpdated = lastUpdated;
    }

    public isValidPost() {
        return (this.title && this.content);
        // return true;
    }
}