import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from 'react-image-gallery';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({

}));


GaleriaProduto.propTypes = {
    images: PropTypes.array.isRequired
};

export default function GaleriaProduto(params) {
    const classes = useStyles();

    const { images } = params;

    return (
        <ImageGallery
            items={images}
            showNav={false}
            thumbnailPosition='left'
            disableSwipe
            slideDuration={0}
            showThumbnails={true}
            showFullscreenButton={false}
            showPlayButton={false}
            autoPlay={false}
            showBullets={false}
        />
    );


}

