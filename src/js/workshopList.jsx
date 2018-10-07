import ReactDOM from "react-dom";
import React from "react";
import getProgram from './api';

export default function renderWorkshopList(domNode) {
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
                            .filter(s => s.format === 'workshop')
                    }
                })
            })
    }

    render() {
        return <ul className='unstyled c-workshoplist'>
            {this.state.program.sessions
                .map(s =>
                    <li className='c-workshoplist__workshop' key={s.sessionId}>
                        <Session session={s}/>
                    </li>
                )}
        </ul>;
    }
}
const programutvikling = [
    'f136a2829fbb468590153e8717f180eb',
    '3eca0f4eef144f92af06bd2c690b83ec',
    'fe165087637043a29acf9760bf8cb8a0',
    '636a9c63ac78464e907da64923523ba4',
    '60d1bb9774204aa4810035779a41732f'
];
const unity = '609ceea89a5f45d48b397fafc58623d1';
const java = '2c98ae61c0214cad8fb2c7ef1a894620';
class Session extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const workshop = this.props.session;
        return <div className='c-workshop'>
            <h2 className='c-workshop__title'>{workshop.title}</h2>
            <div className='c-workshop__registration'>
                {Session.getRegistration(workshop.sessionId)}
            </div>
            <p>{workshop.abstract}</p>
            <ul className='c-workshop__speakers unstyled'>
                {workshop.speakers.map(s => <li key={s.name}><Speaker speaker={s} /></li>)}
            </ul>
        </div>;
    }


    static getRegistration(sessionId) {
        if(programutvikling.indexOf(sessionId) !== -1) {
            return <p>
                Registration: Choose this workshop when buying <a href='https://tdc.hoopla.no/sales/2829805313'>your ticket</a> for a discounted bundle price. 
                You can also order ticket for the workshop directly from <a href='https://programutvikling.no/search/results?q=trondheim&submit=Search'>ProgramUtvikling</a>.
            </p>
        } else if (sessionId === java) {
            return <p>
                Registration: <a href='https://www.meetup.com/javaBin-Trondheim/events/252158179/'> at Meetup.com</a>
            </p>
        }
        return <p>Registration: To be determined</p>
    }
}


class Speaker extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const speaker = this.props.speaker;
        return <div className='c-speaker'>
          
          <div className="c-speaker__info">
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
