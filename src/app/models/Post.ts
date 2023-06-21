export interface Post {
    id: string,
    postTitle: string,
    message: string,
    create_time: string,
    edit_time: string,
    comments: [],
    votes: []
}