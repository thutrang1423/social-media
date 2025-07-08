import { useContext, useState } from 'react'
import './Comments.scss'
import { AuthContext } from '../../../context/authen/AuthContext'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { makeRequest } from '../../../axios'
import moment from 'moment'

function Index({ postId }) {
    const [desc, setDesc] = useState('')
    const { currentUser } = useContext(AuthContext)

    const queryClient = useQueryClient()

    const { isLoading, error, data } = useQuery({
        //useQuery: Gọi dữ liệu bất đồng bộ (fetch data), isLoading: Boolean Đang tải dữ liệu hay không, error: Object chứa lỗi nếu request thất bại.
        queryKey: ['comments', postId], //queryKey: ['posts']	Tên định danh cho query, dùng để cache và tự động refetch khi cần.
        queryFn: () =>  //queryFn: Hàm thực thi yêu cầu dữ liệu, ở đây là GET /posts.
            makeRequest.get('/comments?postId=' + postId).then((res) => res.data),
    })

    const mutation = useMutation({
        mutationFn: (newComment) => makeRequest.post('/comments', newComment),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['comments', postId] })
        },
    })

    const handleClick = (e) => {
        e.preventDefault();
        mutation.mutate({ desc, postId });
        setDesc('');
    }


    return (
        <div className='comments'>
            <div className='write'>
                <img src={`/upload/${currentUser.profilePic}`} alt='' />
                <input
                    type='text'
                    placeholder='Share your thoughts'
                    value={desc}
                    onChange={e => setDesc(e.target.value)}
                />
                <button onClick={handleClick}>Send</button>
            </div>
            {isLoading ? (
                'Loading...'
            ) : error ? (
                'Something went wrong!'
            ) : Array.isArray(data) && data.length > 0 ? (
                data.map((comment) => (
                    <div className='comment' key={comment.id}>
                        <img src={`/upload/${comment.profilePic}`} alt='' />
                        <div className='info'>
                            <span>{comment.name}</span>
                            <p>{comment.desc}</p>
                        </div>
                        <span className='date'>{moment(comment.createdAt).fromNow()}</span>
                    </div>
                ))
            ) : (
                <p>No comments yet.</p>
            )}
        </div>
    )
}

export default Index
