import './Navbar.scss'
import Icon from '@mdi/react';
import {
    mdiHome,
    mdiThemeLightDark,
    mdiApps,
    mdiMagnify,
    mdiEmailOutline,
    mdiAccount,
    mdiBell,
    mdiViewGridOutline,
} from '@mdi/js';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { ThemeContext } from '../../../context/GlobalStyles';
import { AuthContext } from '../../../context/authen/AuthContext';

function Index() {
    const { toggleTheme } = useContext(ThemeContext);
    const { currentUser } = useContext(AuthContext)

    return (
        <div className='navbar'>
            <div className='left'>
                <Link to='/' style={{ textDecoration: 'none' }}>
                    <span>Social media</span>
                </Link>
                <Icon path={mdiThemeLightDark} size={1} onClick={toggleTheme} className="icon" />
                <Icon path={mdiHome} size={1} className='icon' />
                <Icon path={mdiViewGridOutline} size={1} className='icon' />
                <div className='search'>
                    <Icon path={mdiMagnify} size={1} className='icon' />
                    <input type='text' placeholder='Search...' />
                </div>
            </div>
            <div className='right'>
                <Icon path={mdiAccount} size={1} className='icon' />
                <Icon path={mdiEmailOutline} size={1} className='icon' />
                <Icon path={mdiBell} size={1} className='icon' />
                {currentUser && (
                    <div className='user'>
                        <img src={currentUser.profilePic} alt='avatar' />
                        <span>{currentUser.name}</span>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Index
