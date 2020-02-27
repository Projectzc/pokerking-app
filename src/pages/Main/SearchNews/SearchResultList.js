/**
 *作者：lorne
 *时间：2019/7/9
 *功能：
 */
import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import UltimateFlatList from '../../../components/ultimate/UltimateFlatList';
import {ImageLoad} from '../../../components'
import {Images, Metrics, px2dp, px2sp, wh} from "../../../configs/Theme";
import {isEmpty, logMsg, utcDate} from "../../../utils/utils";
import {infosSearch} from "../../../services/raceDao";
import NotData from "../../comm/NotData";

export default class SearchResultList extends Component {

    search = (params) => {
        this.searchParams = params
        this.list && this.list.refresh()
    }

    render() {
        return <View style={styles.container}>
            <UltimateFlatList
                ref={ref => this.list = ref}
                firstLoader={false}
                onFetch={this.onFetch}
                separator={() => <View style={styles.line}/>}
                keyExtractor={(item, index) => `search${index}`}
                item={this._renderItem}
                paginationFetchingView={() => <View/>}
                emptyView={() => <TouchableOpacity
                    onPress={() => {
                        this.props.onPress && this.props.onPress()
                    }}
                    style={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingTop: px2dp(132)
                    }}>
                    <Image style={{height: px2dp(132), width: px2dp(126)}}
                           source={Images.no_search}/>

                    <Text style={{
                        color: '#484A50', fontSize: 15,
                        marginTop: px2dp(38)
                    }}>没有找到相关文章</Text>
                </TouchableOpacity>}
            />
        </View>
    }

    onFetch = (page = 1, startFetch, endFetch) => {
        try {
            if (this.searchParams) {
                infosSearch({page, ...this.searchParams}, data => {
                    if (data && data.infos ) {
                        startFetch(data.infos, 18)
                    } else {
                        endFetch()
                    }
                }, err => {
                    endFetch()
                })
            } else {
                endFetch()
            }
        } catch (e) {
            endFetch()
        }

    }

    _renderItem = (item, index) => {
        const {id, image, title, source, created_at} = item
        let date = utcDate(created_at, 'MM-DD')
        return <View style={styles.item}
                     key={`search_result_item${index}`}>
            {isEmpty(image) ? <View style={styles.banner}/> : <ImageLoad style={styles.banner}
                                                                         source={{uri: image}}/>}

            <TouchableOpacity style={{height: px2dp(150), marginLeft: px2dp(22)}} onPress={() => {
                router.toInfoDetail(id)
            }}>
                <Text style={styles.title}>{title}</Text>
                <View style={{flex: 1}}/>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={styles.source}>{source}</Text>
                    <Text style={[styles.source, {marginLeft: px2dp(20)}]}>{date}</Text>
                </View>
            </TouchableOpacity>
        </View>

    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1A1B1F'
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        height: px2dp(220),
        paddingHorizontal: px2dp(34)
    },
    banner: {
        ...wh(258, 150)
    },
    title: {
        fontSize: px2sp(32),
        color: '#FFE9AD',
        width: px2dp(400)
    },
    source: {
        fontSize: px2sp(24),
        color: '#998E72'
    },
    line: {
        backgroundColor: '#998E72',
        height: px2dp(2),
        marginHorizontal: px2dp(34)
    }
})
