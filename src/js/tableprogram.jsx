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

        stateGetter = () => this.state
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
                {['1','2','3', '4', '5'].map( room => (
                  <div key={room} className="c-slot__room accent-border">Sal <span className="text-white">{room}</span></div>
                ))}
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
        return <article className={`c-session ${favouriteClass} length${session.length}`} onClick={() => setModalSession(session)} style={{ '--room': session.room.replace(' ', '').toLowerCase()}}>
            <h1 className='c-session__info'>
              <span className='c-session_title__title'>{session.title}</span>
            </h1>
            <div className='c-session__speakers'>{
              session.speakers
                .map(s => s.name)
                .reduce((acc, curr) => {
                   return `${acc} ${curr}`
                  }, '')
                }
                <span className="hidden-on-desktop c-session__room">,
                <span className=' text-white block text-bold mr-4'> {session.room}</span>
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
      console.log(session);
        if(session) {
            const session = this.props.session;
            return <section className='c-modal'>
              <div className="c-modal__inner">
                <button className='c-session-modal__close'>close</button>
                <article className='c-session-modal__open-session c-open-session'>
                    <header className="c-modal__header">
                        <h1 className='accent-border inline-block'>{session.title}</h1>
                        <div className='c-open-session__info c-session-info'>
                            <div className='c-session-info__fields c-fields'>
                                <dl className='c-field'>
                                    <dt>Name:</dt>
                                    <dd className='c-fields__name'>
                                      {session.speakers.map(s => s.name)}
                                    </dd>
                                    <dt>Time:</dt>
                                    <dt className='c-fields__time'>
                                        {session.startTime}
                                    </dt>
                                    <dt>Room:</dt>
                                    <dd className='c-fields__room'>{session.room}</dd>
                                    <dt>Favourite</dt>
            {/* 
                                    <dd><FavouriteButton key={session.id} session={session} /></dd>
                */}
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

function profilePicture(url) {
    return url.replace('d=mm', 's=240&d=retro');
}
