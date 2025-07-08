import './home.scss'
import Posts from '../../components/layout/posts'
import Stories from '../../components/layout/stories'
import Share from '../../components/layout/share'

function Index() {
    return (
        <div className='home'>
            <Stories />
            <Share />
            <Posts />
        </div>
    )
}

export default Index
