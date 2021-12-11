import React from 'react';
import {apiURL} from "../config";

const ImageThumbnail = props => {
    let imageNotAvailable = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgOinP1I4DJR8UXKbif9pXj4UTa1dar-CfGBr4mmSXNfOySMXxPfwa023_n0gvkdK4mig&usqp=CAU';
    let image = imageNotAvailable;
    
    if (props.image) {
        image = apiURL + '/uploads/' + props.image;
    }

    return <img src={image} className='img_thumbnail' alt='Artist' />
};

export default ImageThumbnail;