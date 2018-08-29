import ReactDOM from "react-dom";
import React from "react";

export default function renderProgram(domNode) {
    ReactDOM.render(<Program />, domNode);
}

function getProgram() {
    return new Promise((resolve, reject) => {
        const url = 'https://api.trondheimdc.no/public/allSessions/TDC2018';
        fetch(url)
            .then(response => response.json())
            .then(response => {
                return resolve(response)
            })
    });
}

let stateHandler = () => {};
let stateGetter = () => null;

const addFavourites = (program) => {
    const fromStorage = localStorage.getItem('favourites');
    const favourites = fromStorage ? JSON.parse(fromStorage) : [];
    return {
        ...program,
        favourites
    }
};

const mapBySlot = (program) => {

    const slotsByTime = program.sessions
        .filter(s => s.format === 'presentation')
        .sort((a, b) => a.room.localeCompare(b))
        .reduce((acc, curr) => {
            const startTime = curr.startTime;
            if(!acc[startTime]) {
                acc[startTime] = [curr]
            } else {
                acc[startTime].push(curr);
            }
            return acc
        }, {});

    return {
        ...program,
        slots: Object.keys(slotsByTime)
            .sort()
            .map(time => ({
                startTime: time.replace('2018-10-22T', ''),
                sessions: slotsByTime[time]
            }))

    }
};

class Program extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            program: {
                sessions: [],
                slots: [],
                highlightedSession: null,
                favourites: []
            }
        };
    }

    componentDidMount() {
        getProgram()
            .then(addFavourites)
            .then(mapBySlot)
            .then(program => this.setState({program}))
            .catch(error => console.log(error));
        stateHandler = (newProgramState) => {
            this.setState({newProgramState});
            localStorage.setItem('favourites', JSON.stringify(state.favourites))
        };
        stateGetter = () => this.state
    }

    render() {
        const slots = this.state.program.slots;
        return <div>
            <section className='c-program'>
                <div className='c-program__roomColumns c-roomColumns'>
                    {[1, 2, 3, 4, 5]
                        .map(num => <div className='c-roomColumns__column c-roomColumn' key={`room${num}`}>
                            Sal <span className='c-roomColumn__number'>{num}</span>
                        </div>)}
                </div>
                {slots.map(slot => (
                    <div className='c-slot' data-time={slot.startTime} key={slot.startTime}>
                        {slot.sessions.map(session => <Session session={session} key={session.sessionId} />)}
                    </div>))}
            </section>
            <SessionModal session={this.state.highlightedSession} />
        </div>;
    }
}

const setModalSession = (session) => {
    const state = stateGetter();

    stateHandler({
        ...state,
        highlightedSession: session
    });
};

class Session extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const session = this.props.session;
        const favouriteClass = session.isFavourite ? 'c-session--favourite' : '';
        return <article className={`c-session ${favouriteClass} length${session.length}`}>
            <aside className={'c-session__timeplace c-timeplace'}>
                <time className='c-timeplace__time'>{session.startTime}</time>
                <span className='c-roomColumn c-timeplace__place'>
                    Sal <span className='c-roomColumn__number'>{session.roomNumber}</span>
                </span>
            </aside>
            <h1 className='c-session_title'>{session.title}</h1>
            <span className='c-session__speaker'>{
                session.speakers
                    .map(s => s.name)
                    .reduce((acc, curr) => {
                       return `${acc} ${curr}`
                    }, '')
            }</span>
            <FavouriteButton session={session} />
        </article>;
    }
}

const toggleFavourite = (sessionId) => {
    const state = stateGetter();

    stateHandler({
        ...state,
        favourites : [sessionId]
    });
};

class FavouriteButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className='c-favouritebtn' onClick={() => toggleFavourite(this.props.session.id)}>
            <div>
                <span className='c-favouritebtn__fav'>fav</span>
                <span className="c-favouritebtn__yes">y</span> / <span className="c-favouritebtn__no">n</span>
            </div>
        </div>;
    }
}

class SessionModal extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if(this.props.session) {
            const session = this.props.session;
            return <section className='c-session-modal'>
                <span className='c-session-modal__close'>close</span>
                <article className='c-session-modal__open-session c-open-session'>
                    <header>
                        <h1 className='c-open-session__title'>{session.title}</h1>
                        <div className='c-open-session__info c-session-info'>
                            <div className='c-session-info__fields c-fields'>
                                <dl className='c-field'>
                                    <dt>Name:</dt>
                                    <dd className='c-fields__name'>
                                        {session.speakers}
                                    </dd>
                                    <dt>Time:</dt>
                                    <dt className='c-fields__time'>
                                        {session.starttime}
                                    </dt>
                                    <dt>Room:</dt>
                                    <dd className='c-fields__room'>{session.room}</dd>
                                    <dt>Favourite</dt>
                                    <dd><FavouriteButton session={session} /></dd>
                                </dl>

                            </div>

                        </div>
                    </header>
                    <section className='c-open-session__sessioninfo c-sessioninfo'>
                        <p>{session.abstract}</p>

                        <h2>Intended audience</h2>
                        <p>{session.intendedAudience}</p>

                        <h2>Speakers</h2>
                        {session.speakers
                            .map(speaker => <figure key={speaker.id}>
                                <img
                                    className='c-open-session__speakerimage'
                                    src={profilePicture(speaker.pictureUrl)} alt={`Profile image ${speaker.name}`} />
                                <figcaption>
                                    <p>{speaker.bio}</p>
                                </figcaption>
                            </figure>)}
                    </section>
                </article>
            </section>;
        } else {
            return null;
        }
    }
}

function profilePicture(url) {
    return url.replace('d=mm', 's=240&d=retro');
}