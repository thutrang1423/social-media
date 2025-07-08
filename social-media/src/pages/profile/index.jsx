import './profile.scss'
import FacebookIcon from '@mui/icons-material/Facebook'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import InstagramIcon from '@mui/icons-material/Instagram'
import PinterestIcon from '@mui/icons-material/Pinterest'
import TwitterIcon from '@mui/icons-material/Twitter'
import PlaceIcon from '@mui/icons-material/Place'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined'
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined'
import Posts from '../../components/layout/posts'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { makeRequest } from '../../axios'
import { useLocation } from 'react-router-dom'
import { useContext, useState } from 'react'
import { AuthContext } from '../../context/authen/AuthContext'
import Update from '../../components/layout/update'

function Index() {
    const [openUpdate, setOpenUpdate] = useState(false)
    const { currentUser } = useContext(AuthContext)
    const userId = parseInt(useLocation().pathname.split('/')[2])

    const { isLoading, error, data } = useQuery({
        queryKey: ['user', userId],
        queryFn: () => makeRequest.get('/users/find/' + userId).then(res => res.data),
    })

    const { isLoading: rIsLoading, data: relationshipData } = useQuery({
        queryKey: ['relationship', userId],
        queryFn: () => makeRequest.get('/relationships?followedUserId=' + userId).then(res => res.data),
    })

    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: (following) => {
            if (following) {
                return makeRequest.delete('/relationships?userId=' + userId);
            } else {
                return makeRequest.post('/relationships', { userId });
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['relationship', userId] });
        },
    });

    const handleFollow = () => {
        if (data) {
            mutation.mutate(relationshipData.includes(currentUser.id));
        }
    };

    return (
        <div className='profile'>
            {isLoading ? 'loading' :
                <>
                    <div className='images'>
                        <img src={`/upload/${data.coverPic}`} alt='cover' className='cover' />
                        <img src={`/upload/${data.profilePic}`} alt='profile' className='profilePic' />
                    </div>
                    <div className='profileContainer'>
                        <div className='uInfo'>
                            <div className='left'>
                                <a href={data.facebook || '#'} target='_blank'>
                                    <FacebookIcon fontSize='small' />
                                </a>
                                <a href={data.instagram || '#'} target='_blank'>
                                    <InstagramIcon fontSize='small' />
                                </a>
                                <a href={data.pinterest || '#'} target='_blank'>
                                    <PinterestIcon fontSize='small' />
                                </a>
                                <a href={data.twitter || '#'} target='_blank'>
                                    <TwitterIcon fontSize='small' />
                                </a>
                                <a href={data.linkedin || '#'} target='_blank'>
                                    <LinkedInIcon fontSize='small' />
                                </a>
                            </div>
                            <div className='center'>
                                <span>{data.name}</span>
                                <div className='info'>
                                    <div className='item'>
                                        <PlaceIcon />
                                        <span>{data.city || 'Unknown'}</span>
                                    </div>
                                    <div className='item'>
                                        <LanguageOutlinedIcon />
                                        <span>{data.website || 'No website'}</span>
                                    </div>
                                </div>
                                {rIsLoading ? (
                                    'loading'
                                ) : userId === currentUser.id ? (
                                    <button onClick={() => setOpenUpdate(true)}>update</button>
                                ) : (
                                    <button onClick={handleFollow}>
                                        {relationshipData.includes(currentUser.id)
                                            ? 'Following'
                                            : 'Follow'}
                                    </button>
                                )}
                            </div>
                            <div className='right'>
                                <EmailOutlinedIcon />
                                <MoreVertOutlinedIcon />
                            </div>
                        </div>
                        <Posts userId={userId} />
                    </div>
                </>}
            {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={data} />}
        </div>
    )
}

export default Index
