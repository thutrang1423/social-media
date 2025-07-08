import { useContext } from 'react'
import './Stories.scss'
import { AuthContext } from '../../../context/authen/AuthContext'

function Index() {

    const { currentUser } = useContext(AuthContext)

    //Temporary
    const stories = [
        {
            id: 1,
            name: "Thu Trang1",
            img: "https://tse1.mm.bing.net/th/id/OIP.YZtNDhCINNEuXokKKyR7nAHaE8?pid=ImgDet&w=182&h=121&c=7&o=7&rm=3"
        },
        {
            id: 2,
            name: "Thu Trang2",
            img: "https://tse1.mm.bing.net/th/id/OIP.kzHNtvcMFY6Q1ge34SKZPQHaE8?pid=ImgDet&w=182&h=121&c=7&o=7&rm=3"
        },
        {
            id: 3,
            name: "Thu Trang3",
            img: "https://tse2.mm.bing.net/th/id/OIP.VHLjqJ40YWhY9jFi_VvGkgHaEo?pid=ImgDet&w=182&h=114&c=7&o=7&rm=3"
        },
        {
            id: 4,
            name: "Thu Trang4",
            img: "https://tse4.mm.bing.net/th/id/OIP.J3NK-Jc1LEDcKuCcRmALkwHaE8?pid=ImgDet&w=182&h=121&c=7&o=7&rm=3"
        },
    ]

    return (
        <div className='stories'>
            <div className='story'>
                <img src={currentUser.profilePic} alt='' />
                <span>{currentUser.name}</span>
                <button>+</button>
            </div>
            {stories.map(story => (
                <div className='story' key={story.id}>
                    <img src={story.img} />
                    <span>{story.name}</span>
                </div>
            ))}
        </div>
    )
}

export default Index
