export interface CommentVotePayload {
    userId: string;
    commentId: string;
    vote: boolean;
}