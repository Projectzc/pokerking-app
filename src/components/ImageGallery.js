/**
 * Created by lorne on 2017/2/9.
 */
import React, {PropTypes} from 'react';
import {
    Modal, ActivityIndicator, View, CameraRoll, Platform
} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';



export default class ImageGallery extends React.Component {

    state = {
        img: ''
    }


    render() {

        const {images, index} = this.props.params;
        return (
            <View style={{flex: 1}}>
                <ImageViewer
                    loadingRender={() => {
                        return <ActivityIndicator
                            color='white'/>
                    }}
                    saveToLocalByLongPress={false}
                    onLongPress={(image) => {

                    }}
                    imageUrls={images}
                    index={index}
                    onClick={() => router.pop()}/>

            </View>
        )
    }
}