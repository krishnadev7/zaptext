interface Props{
    id: String,
    currentUserId: String,
    parentId: String,
    content: String,
    author: {
        id: String,
        name: String,
        image: String
    }
    community: {
        id: String,
        name: String,
        image: String
    } | null,
    comments: {
        author: {
            image: String
        }
    }[],
    createdAt: String
}

const ThreadCard = ({
    id,
    currentUserId,
    parentId,
    content,
    author,
    community,
    comments,
    createdAt
}:Props) => {
    return(
        <article>
            <h2>{content}</h2>
        </article>
    )
}

export default ThreadCard;