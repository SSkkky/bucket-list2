import List from './List';
import Write from './Write';

function Home() {
    return (
        <div className='todoHome'>
            <p>Today</p>
            <div className='Home-list-cont'>
                <div className='line-cont'></div>
                <List/>
            </div>
            <button>+</button>
        <Write/>
        </div>
    );
}

export default Home;