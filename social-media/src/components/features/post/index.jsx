import './Post.scss';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import { Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from '../../../axios';
import Comments from '../../layout/comments';
import { useState, useContext } from 'react';
import moment from 'moment';
import { AuthContext } from '../../../context/authen/AuthContext';

function Index({ post }) {
    const [commentOpen, setCommentOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);


    const { currentUser } = useContext(AuthContext);

    const { isLoading, error, data } = useQuery({
        queryKey: ['likes', post.id],
        queryFn: () => makeRequest.get('/likes?postId=' + post.id).then(res => res.data),
    });

    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: (liked) => {
            if (liked) {
                return makeRequest.delete('/likes?postId=' + post.id);
            } else {
                return makeRequest.post('/likes', { postId: post.id });
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['likes', post.id] });
        },
    });

    const deleteMutation = useMutation({
        mutationFn: () => {
            return makeRequest.delete('/posts/' + post.id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] });
        },
    });

    const handleLike = () => {
        if (data) {
            mutation.mutate(data.includes(currentUser.id));
        }
    };

    const handleDelete = () => {
        deleteMutation.mutate()
    }

    return (
        <div className="post">
            <div className='container'>
                <div className='user'>
                    <div className='userInfo'>
                        <img src={post.profilePic ? `/upload/${post.profilePic}` : '/defaultProfile.png'} alt='' />
                        <div className='details'>
                            <Link
                                to={`/profile/${post.userId}`}
                                style={{ textDecoration: 'none', color: 'inherit' }}
                            >
                                <span className='name'>{post.name}</span>
                            </Link>
                            <span className='date'>{moment(post.createdAt).fromNow()}</span>
                        </div>
                    </div>
                    <MoreHorizOutlinedIcon onClick={() => setMenuOpen(!menuOpen)} />
                    {menuOpen && post.userId === currentUser.id &&
                        (<button onClick={handleDelete}>
                            Delete
                        </button>
                        )}
                </div>
                <div className='content'>
                    <p>{post.desc}</p>
                    <img src={post.img ? `/upload/${post.img}` : '/defaultPost.png'} alt='' />
                </div>
                <div className='info'>
                    <div className='item'>
                        {isLoading ? (
                            'loading'
                        ) : Array.isArray(data) && data.includes(currentUser.id) ? (
                            <FavoriteOutlinedIcon style={{ color: 'red' }} onClick={handleLike} />
                        ) : (
                            <FavoriteBorderOutlinedIcon onClick={handleLike} />
                        )}
                        <span>{Array.isArray(data) ? data.length : 0} Likes</span>
                    </div>
                    <div className='item' onClick={() => setCommentOpen(!commentOpen)}>
                        <TextsmsOutlinedIcon />
                        12 Comments
                    </div>
                    <div className='item'>
                        <ShareOutlinedIcon />
                        Share
                    </div>
                </div>
                {commentOpen && <Comments postId={post.id} />}
            </div>
        </div>
    );
}

export default Index;
