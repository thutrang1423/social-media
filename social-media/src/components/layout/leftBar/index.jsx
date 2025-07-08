import './LeftBar.scss'
import Friend from '../../../assets/image/friend.png'
import Group from '../../../assets/image/group.png'
import Image from '../../../assets/image/image.png'
import Message from '../../../assets/image/message.png'
import Video from '../../../assets/image/video.png'
import Map from '../../../assets/image/map.png'
import Email from '../../../assets/image/email.png'
import { AuthContext } from '../../../context/authen/authContext';
import { useContext } from 'react'



function Index() {
    const { currentUser } = useContext(AuthContext)

    if (!currentUser) {
        return <div className='leftBar'>Loading user...</div>;
    }

    return (
        <div className='leftBar'>
            <div className='container'>
                <div className='menu'>
                    <div className='user'>
                        <img
                            src={currentUser.profilePic}
                            alt=''
                        />
                        <span>{currentUser.name}</span>
                    </div>
                    <div className='item'>
                        <img
                            src={Friend}
                            alt=''
                        />
                        <span>Friends</span>
                    </div>
                    <div className='item'>
                        <img
                            src={Group}
                            alt=''
                        />
                        <span>Group</span>
                    </div>
                    <div className='item'>
                        <img
                            src={Image}
                            alt=''
                        />
                        <span>Image</span>
                    </div>
                    <div className='item'>
                        <img
                            src={Message}
                            alt=''
                            style={{ width: '30px' }}
                        />
                        <span>Message</span>
                    </div>
                    <div className='item'>
                        <img
                            src={Video}
                            alt=''
                        />
                        <span>Video</span>
                    </div>
                </div>
                <hr />
                <div className='menu'>
                    <span>Your shortcuts</span>
                    <div className='item'>
                        <img
                            src={Map}
                            alt=''
                        />
                        <span>Map</span>
                    </div>
                    <div className='item'>
                        <img
                            src={Email}
                            alt=''
                        />
                        <span>Email</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Index
