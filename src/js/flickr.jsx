import React from 'react';
import ReactDOM from 'react-dom';

export default function renderImages(domNode) {
    ReactDOM.render(<FlickrImages />, domNode);
}

function getImages() {
    return new Promise((resolve, reject) => {
        const url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=00622ccfe6e4d518ca49b0b5105abb54&user_id=trondheimdc&tags=Approved&format=json&nojsoncallback=1&extras=o_dims&per_page=500';
        fetch(url).then(response => response.json())
            .then(response => {
                return resolve(
                    response.photos
                            .photo
                            .filter(p => p.o_height < p.o_width))
            })
    });
}

function sample(array, number) {
    const indexes = [];
    while (indexes.length < number) {
        const index = Math.floor(Math.random() * array.length);
        if(indexes.indexOf(index) === -1) {
            indexes.push(index);
        }
    }
    return indexes.map(i => array[i])
}

class FlickrImages extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            photos: []
        };
    }

    componentDidMount() {
        getImages()
            .then(photos => sample(photos, 9))
            .then(photos => this.setState({photos}))
    }

    render() {
        return <ul className='unstyled c-imagelist'>
            {this.state.photos.map(p =>
                <li className='c-imagelist__image' key={p.id}>
                    <img src={`https://farm${p.farm}.staticflickr.com/${p.server}/${p.id}_${p.secret}_c.jpg`} />
                </li>
            )}
        </ul>;
    }
}