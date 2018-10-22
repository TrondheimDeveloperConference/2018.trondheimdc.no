import ReactDOM from "react-dom";
import React from "react";
import getProgram from './api';

export default function renderProgram(domNode) {
    ReactDOM.render(<Program />, domNode);
}

let stateHandler = () => {};
let stateGetter = () => null;

const addFavourites = (program) => {
    const fromStorage = localStorage.getItem('favourites');
    const favourites = fromStorage !== 'undefined' ? JSON.parse(fromStorage) : [];

    return {
        ...program,
        favourites
    }
};

const mapBySlot = (program) => {

    const slotsByTime = program.sessions
        .filter(s => s.format === 'presentation')
        .reduce((acc, curr) => {
            const startTime = curr.startTime;
            if(!acc[startTime]) {
                acc[startTime] = [curr]
            } else {
                acc[startTime].push(curr);
            }
            return acc
        }, {});

    const mapped = {
        ...program,
        slots: Object.keys(slotsByTime)
            .sort()
            .map(time => ({
                startTime: time.replace('2018-10-22T', ''),
                sessions: slotsByTime[time].sort((a, b) => a.room.localeCompare(b.room))
            }))

    };

    return mapped;
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

        stateGetter = () => this.state;
        stateHandler = (newState) => {
            // this.setState({newState});
            this.setState({program: newState});
            localStorage.setItem('favourites', JSON.stringify(this.state.favourites))
        };

    }

    render() {
        const slots = this.state.program.slots;
        const highlighted = this.state.program.highlightedSession;
        return <div>
            <section className='c-program'>
              <div className="c-slot">
              <div className='c-slot__sessions hidden-on-mobile'>
                <div key="1" className="c-slot__room accent-border">Sal <span className="text-white">Cosmos 2</span></div>
                <div key="2" className="c-slot__room accent-border">Sal <span className="text-white">Cosmos 1A</span></div>
                <div key="3" className="c-slot__room accent-border">Sal <span className="text-white">Cosmos 1B</span></div>
                <div key="4" className="c-slot__room accent-border">Sal <span className="text-white">Cosmos 3A</span></div>
                <div key="5" className="c-slot__room accent-border">Sal <span className="text-white">Cosmos 3B</span></div>
              </div>
              </div>
                {slots.map(slot => (
                    <div className='c-slot' data-time={slot.startTime} key={slot.startTime}>
                      <h3 className='c-slot__time m-0 text-white'>
                        <div className="accent-border inline-block text-bold">
                        {slot.startTime}
                        </div>
                      </h3>
                        <div className="c-slot__sessions">
                          {slot.sessions.map(session => <Session session={session} key={session.sessionId} />)}
                        </div>
                    </div>))}
                <div className="c-slot party">
                    <h3 className='c-slot__time m-0 text-white'>
                        <div className="accent-border inline-block text-bold">
                            18:00
                        </div>
                    </h3>
                    <div className="c-slot__sessions">
                        <article className='c-session'>
                            <h1 className="c-session__info">
                                <span className="c-session_title__title">Party! Free sausages and drinks!</span>
                            </h1>
                        </article>
                    </div>
                </div>
            </section>
        <SessionModal key="omg" session={highlighted} />
        </div>;
    }
}

class Session extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        const session = this.props.session;
        const favouriteClass = session.isFavourite ? 'c-session--favourite' : '';
        const sessionRoom = getRoom(session.room);
        return <article className={`c-session ${favouriteClass} length${session.length}`} onClick={() => setModalSession(session)} style={{ '--room': session.room.replace(' ', '').toLowerCase()}}>
            <h1 className='c-session__info'>
              <span className='c-session_title__title'>{session.title}</span>
            </h1>
            <div className='c-session__speakers'>{
              session.speakers
                .map(s => s.name)
                .join()
                }
                <span className="hidden-on-desktop c-session__room">,
                    <span className=' text-white block text-bold mr-4'>
                        {sessionRoom}
                    </span>
                </span>
            </div>
            <div className="c-session__expanded">
              <span className='c-session__duration'>Duration: {session.length} minutes</span>
              <p className='abstract'>{session.abstract}</p>
            </div>
        </article>;
    }
}

const toggleFavourite = (sessionId) => {
    const state = stateGetter();

    stateHandler({
        ...state.program,
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

const setModalSession = (session) => {
    const state = stateGetter();

    stateHandler({
        ...state.program,
        highlightedSession: session
    });
};

class SessionModal extends React.Component {
    constructor({session}) {
        super();
        this.state = { session }
    }

    componentWillReceiveProps({session}){
      this.setState({...this.state, session})
    }

    render() {
        // const session = this.props.session;
        const session = this.state.session;
        if(session) {
            const session = this.props.session;
            const closeModal = () => setModalSession(null);
            const startTime = new Date(session.startTimeZulu);
            const endTime = new Date(session.endTimeZulu);
            return <section className='c-modal' onClick={closeModal}>
              <div className="c-modal__inner" onClick={(e) => e.stopPropagation()}  >
                <button className='c-session-modal__close' onClick={closeModal}>close</button>
                <article className='c-session-modal__open-session c-open-session'>
                    <header className="c-modal__header">
                        <h1 className='accent-border'>{session.title}</h1>
                        <div className='c-open-session__info c-session-info'>
                            <div className='c-session-info__fields c-fields'>
                                <div className='c-field'>
                                    <div className="c-row">
                                        <span>Name:</span>
                                        <span className='c-fields__name'>
                                          {session.speakers.map(s => s.name)}
                                        </span>
                                    </div>
                                    <div className="c-row">
                                        <span>Time:</span>
                                        <span className='c-fields__time'>
                                        {new Intl.DateTimeFormat('no-NO', {
                                              hour: 'numeric',
                                              minute: 'numeric',
                                              hour12: false,
                                              hourCycle: 'h24',
                                              timeZone: 'Europe/Oslo'
                                          }).format(startTime)} - {new Intl.DateTimeFormat('no-NO', {
                                                hour: 'numeric',
                                                minute: 'numeric',
                                                hour12: false,
                                                hourCycle: 'h24',
                                                timeZone: 'Europe/Oslo'
                                            }).format(endTime)}
                                        </span>
                                    </div>
                                    <div className="c-row">
                                        <span>Room:</span>
                                        <span className='c-fields__room'>{getRoom(session.room)}</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </header>
                    <section className='c-open-session__sessioninfo c-sessioninfo'>
                        <p>{session.abstract}</p>

                        <h2>Intended audience</h2>
                        <p>{session.intendedAudience}</p>

                        <h2>Speakers</h2>
                        {session.speakers
                            .map(speaker => <figure key={speaker.name}>
                                <img
                                    className='c-open-session__speakerimage'
                                    src={profilePicture(speaker.pictureUrl)} alt={`Profile image ${speaker.name}`} />
                                <figcaption>
                                    <p>{speaker.bio}</p>
                                </figcaption>
                            </figure>)}
                    </section>
                </article>
            </div>
            </section>;
        } else {
            return null;
        }
    }
}

function getRoom(room) {
    if(room === 'Room 1') {
        return 'Cosmos 2';
    } else if(room === 'Room 2') {
        return 'Cosmos 1A';
    } else if(room === 'Room 3') {
        return 'Cosmos 1B';
    } else if(room === 'Room 4') {
        return 'Cosmos 3A';
    } else if(room === 'Room 5') {
        return 'Cosmos 3B';
    }
}

function profilePicture(url) {
    return url.replace('d=mm', 's=240&d=retro');
}
