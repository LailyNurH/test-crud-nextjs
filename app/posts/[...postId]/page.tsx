export default function PostDetail({params}: {params: {postId : string}}){
    return (
        <div>Detail {params.postId[0]}</div>
    )
}