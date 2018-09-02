import ReactDOM from "react-dom";
import React from "react";
import getProgram from './api';

export default function renderSpeakerList(domNode) {
    ReactDOM.render(<SessionList />, domNode);
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
            .then(program => {
                this.setState({
                    program : {
                        sessions: program.sessions
                            .filter(s => s.format === 'presentation')
                            .filter(s => s.title.toLowerCase().indexOf('part 2') === -1)
                    }
                })
            })
    }

    render() {
        return <ul className='unstyled c-sessionlist'>
            {this.state.program.sessions
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
            <div class="c-speaker__info">
            <img src={profilePicture(speaker.pictureUrl)} alt={`Profile image ${speaker.name}`} />
            <span className='c-speaker__name'>{speaker.name}</span>
            </div>
            <p className='c-speaker__bio'>{speaker.bio}</p>
        </div>;
    }
}

function profilePicture(url) {
    return url.replace('d=mm', 's=240&d=retro');
}
