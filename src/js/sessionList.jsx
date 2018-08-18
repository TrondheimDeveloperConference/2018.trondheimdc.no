import ReactDOM from "react-dom";
import React from "react";

export default function renderSpeakerList(domNode) {
    ReactDOM.render(<SessionList />, domNode);
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

class SessionList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            program: {
                sessions: []
            }
        };
    }

    componentDidMount() {
        getProgram()
            .then(program => this.setState({program}))
    }

    render() {
        return <ul className='unstyled c-sessionlist'>
            {this.state.program.sessions
                .filter(s => s.format === 'presentation')
                .map(s =>
                <li className='c-sessionlist__session' key={s.sessionId}>
                    <Session session={s}/>
                </li>
            )}
        </ul>;
    }
}

class Session extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false
        };
    }

    render() {
        const session = this.props.session;
        return <div className='c-session'>
            <h2 className='c-session__title'>{session.title}</h2>
            <p className='c-session__abstract'>{session.abstract}</p>
            <ul className='c-session__speakers unstyled'>
                {session.speakers.map(s => <li key={s.name}><Speaker speaker={s} /></li>)}
            </ul>
        </div>;
    }
}


class Speaker extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const speaker = this.props.speaker;
        return <div className='c-speaker'>
            <span className='c-speaker__name'>{speaker.name}</span>
            <img src={speaker.pictureUrl} alt={`Profile image ${speaker.name}`} />
            <p className='c-speaker__bio'>{speaker.bio}</p>
        </div>;
    }
}