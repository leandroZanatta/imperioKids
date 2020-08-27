import React from 'react';
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from 'react-image-gallery';




export default function SliderDestaques() {


    const images = [
        {
            original: 'http://lorempixel.com/1000/600/nature/1/',
            description: 'Aqui ficam informações do título',
            thumbnail: 'http://lorempixel.com/250/150/nature/1/',
        },
        {
            original: 'http://lorempixel.com/1000/600/nature/2/',
            thumbnail: 'http://lorempixel.com/250/150/nature/2/'
        },
        {
            original: 'http://lorempixel.com/1000/600/nature/3/',
            thumbnail: 'http://lorempixel.com/250/150/nature/3/'
        }
    ]

    return (
        <ImageGallery
            items={images}
            showNav={false}
            showThumbnails={false}
            showFullscreenButton={false}
            showPlayButton={false}
            autoPlay={true}
            slideDuration={400}
            slideInterval={6000}
            showBullets={true}
        />
    );
}
