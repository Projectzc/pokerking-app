import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    View, Image,
    TouchableOpacity
} from 'react-native';

import Swiper from 'react-native-swiper';
import {Metrics} from '../../themes';
import {getAvatar, getBg, logMsg} from "../../utils/utils";



const Height = Metrics.reallySize(164)
export default class MainBanner extends Component {

    render() {
        const {home_banners} = this.props;
        if (home_banners && home_banners.length > 0)
            return (
                <View style={{height: Height, marginTop: -1}}>
                    <Swiper
                        activeDotStyle={stylesM.activeDot}
                        dotStyle={stylesM.dot}
                        autoplayTimeout={3}
                        autoplay>
                        {home_banners.map((item, key) => {
                            return <TouchableOpacity
                                key={`banner${item.source_id}`}
                                activeOpacity={1}
                                onPress={() => {
                                    if (item.source_type === 'info') {
                                        router.toInfoDetail(item.source_id)
                                    } else if (item.source_type === 'event_info') {
                                        router.toEventDetail(item.source_id,0)
                                    }
                                }}>
                                <Image
                                    style={{height: Height, width: '100%'}}
                                       source={getBg(item.image)}/>
                            </TouchableOpacity>

                        })}

                    </Swiper>
                </View>


            );
        else
            return <View style={{height: Height}}/>
    }


}

const stylesM = StyleSheet.create({
    activeDot: {
        backgroundColor: 'white',
        width: 18,
        height: 4,
        borderRadius: 2,
        marginBottom: 0
    },
    dot: {
        backgroundColor: 'rgba(0,0,0,.2)',
        width: 9,
        height: 4,
        borderRadius: 2,
        marginBottom: 0
    }

});