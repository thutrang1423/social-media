import './Posts.scss'
import Post from '../../features/post'
import { useQuery } from '@tanstack/react-query'
import { makeRequest } from '../../../axios'

function Index({ userId }) {
    const { isLoading, error, data } = useQuery({
        //useQuery: Gọi dữ liệu bất đồng bộ (fetch data), isLoading: Boolean Đang tải dữ liệu hay không, error: Object chứa lỗi nếu request thất bại.
        queryKey: ['posts'], //queryKey: ['posts']	Tên định danh cho query, dùng để cache và tự động refetch khi cần.
        queryFn: () =>  //queryFn: Hàm thực thi yêu cầu dữ liệu, ở đây là GET /posts.
            makeRequest.get('/posts?userId=' + userId).then((res) => res.data),
    })

    // console.log(data)

    return (
        <div className='posts'>
            {error
                ? 'Something went wrong'
                : isLoading
                    ? 'loading'
                    : data.map((post) => (<Post post={post} key={post.id} />
                    ))}
        </div>
    )
}

export default Index
