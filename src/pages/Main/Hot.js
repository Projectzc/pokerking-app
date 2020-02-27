import React, {PureComponent} from "react";
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native'

import NotData from "../comm/NotData";
import UltimateFlatList from "../../components/ultimate/UltimateFlatList";
import {Images, Metrics, px2dp, px2sp} from "../../configs/Theme";
import ImageLoad from "../../components/ImageLoad";
import {alertOrder, isLogin, showToast, strNotNull, unix_format} from "../../utils/utils";
import CollectBtn from "../comm/CollectBtn";

/**
 *作者：lorne
 *时间：2019/6/26
 *功能：
 */


const Hot = ({onFetch, onPress, onShare}) => (
    <UltimateFlatList
        ref={(ref) => this.listView = ref}
        onFetch={onFetch}
        keyExtractor={(item, index) => `hot_race${index}`}
        item={(item, index) => _renderItem(item, index, onPress, onShare)}
        refreshableTitlePull={global.lang.t('pull_refresh')}
        refreshableTitleRelease={global.lang.t('release_refresh')}
        dateTitle={global.lang.t('last_refresh')}
        allLoadedText={global.lang.t('no_more')}
        waitingSpinnerText={global.lang.t('loading')}
        emptyView={() => <NotData/>}
    />
)


const _renderItem = (item, index, onPress, onShare) => (
    <TouchableOpacity
        activeOpacity={1}
        onPress={() => onPress && onPress(item)}
        key={`hot${index}`}
        style={styles.item}>
        <ImageLoad style={styles.img}
                   source={{uri: item.image}}/>
        <View style={styles.content}>
            <Text style={styles.title}>{item.title}</Text>
            <View style={{flexDirection: 'row', width: '100%', alignItems: 'center', marginTop: 5}}>
                <Image style={{height: px2dp(32), width: px2dp(32), alignSelf: 'center', marginRight: 7}}
                       source={Images.hot_gary}/>
                {strNotNull(item.source) ? <Text numberOfLines={1} style={styles.time}>{item.source}</Text> : null}
                <Text numberOfLines={1} style={styles.time2}>
                    {global.lang.t(`month${unix_format(item.created_at, 'MM')}`)}{unix_format(item.created_at, ` DD,YYYY`)}
                </Text>
                <View style={{flex: 1}}/>
                <CollectBtn item={item}
                            type={'info'}
                            btnStyle={{height: px2dp(44), width: px2dp(44), marginRight: 18, alignSelf: 'flex-end'}}
                           />
                <TouchableOpacity
                    onPress={() => {
                        // if (isLogin()) {
                        //     onShare && onShare(item)
                        // } else {
                        //     router.toLogin()
                        // }
                        onShare && onShare(item)
                    }}>
                    <Image style={{height: px2dp(32), width: px2dp(40), marginRight: px2dp(20), alignSelf: 'flex-end'}}
                           source={Images.share}/>
                </TouchableOpacity>

            </View>

        </View>

    </TouchableOpacity>
)

const styles = StyleSheet.create({
    item: {
        paddingHorizontal: px2dp(22),
        marginTop: px2dp(18),
        alignItems: 'center'
    },
    img: {
        height: px2dp(336),
        width: Metrics.screenWidth - 24
    },
    title: {
        color: '#FFE9AD',
        fontSize: px2sp(32)
    },
    time: {
        color: '#998E72',
        fontSize: px2sp(28),
        maxWidth: '40%',
        marginRight: 14
    },
    time2: {
        color: '#998E72',
        fontSize: px2sp(28)
    },
    content: {
        marginVertical: px2dp(24)
    },

})

export default Hot
