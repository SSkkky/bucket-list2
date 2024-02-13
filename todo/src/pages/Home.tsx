import List from './List';
import Write from './Write';
import { writeStore } from '../context/store';
import '../styles/main.scss'

function Home() {
    const { isOnWrite, setIsOnWrite } = writeStore();

    const onClickWriteBtn = () => {
        setIsOnWrite(true);
    }

    return (
        <div className={`todoHome ${isOnWrite ? 'active' : 'inactive'}`}>
            <div className='Home-cont'>
                <p className='Today'>Today</p>
                <div className='Home-list-cont'>
                    <div className='line-cont'></div>
                    <List/>
                </div>
            </div>
            <button className='writeBtn' onClick={onClickWriteBtn}>+</button>
            <Write/>
            <div className='menu-cont'>
                <button>⎇</button>
                <button>⌘</button>
            </div>
        </div>
    );
}

export default Home;