import List from './List';
import Write from './Write';
import '../styles/main.scss'

function Home() {
    return (
        <div className='todoHome'>
            <div className='Home-cont'>
                <p className='Today'>Today</p>
                <div className='Home-list-cont'>
                    <div className='line-cont'></div>
                    <List/>
                </div>
            </div>
            <button className='writeBtn'>+</button>
            <Write/>
            <div className='menu-cont'>
                <button>⎇</button>
                <button>⌘</button>
            </div>
        </div>
    );
}

export default Home;