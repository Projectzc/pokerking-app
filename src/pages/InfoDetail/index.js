import React, {Component} from 'react';
import {View, Text, ScrollView, FlatList, TouchableOpacity, Image} from 'react-native';
import {connect} from 'react-redux';
import styles from './index.style';
import {getInfoDetail} from '../../services/accountDao'
import {getBg, isEmptyObject, logMsg, mul, shareHost, shareTo, strNotNull, utcDate} from "../../utils/utils";
import RenderHtml from '../comm/RenderHtml';
import {Images, Metrics} from "../../configs/Theme";
import NotData from '../comm/NotData'
import {getBaseUrl} from "../../configs/fetch";

@connect(({InfoDetail}) => ({
    ...InfoDetail,
}))
export default class InfoDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            info_detail: {},
            hot_infos: {},
            err: false
        };
    }

    componentDidMount() {
        this.refresh()
    }

    refresh = () => {
        const {id} = this.props.params;
        getInfoDetail({id: id}, data => {
            logMsg("info_detail", data);
            this.props.navigation.setParams({
                title: data.info.title,
                onRight: () => {
                    let param = {
                        shareLink: `${shareHost()}/infos/${this.props.params.id}`,
                        shareTitle: data.info.title,
                        shareText: data.info.title,
                        shareImage: data.info.image
                    };
                    shareTo(param)
                    logMsg('分享')

                }
            })
            this.setState({
                info_detail: data.info,
                hot_infos: data.hot_infos
            })
        }, err => {
            this.setState({
                err: true
            })
        })


    }

    render() {
        const {info_detail, err, hot_infos} = this.state;
        if (isEmptyObject(info_detail) && err) {
            return <NotData
                onPress={() => {
                    this.refresh()
                }}
                backgroundColor={'#FFFFFF'}/>
        }
        return (
            <ScrollView style={styles.detail_view}>
                <View style={{height: 20}}/>
                <View style={{
                    marginLeft: 18,
                    marginRight: 18,
                    paddingBottom: 80,
                    width: Metrics.screenWidth - 36
                }}>
                    <RenderHtml
                        html={info_detail.description}/>
                </View>

                {!isEmptyObject(hot_infos) ? this._head() : null}

                {!isEmptyObject(hot_infos) ? <FlatList data={hot_infos}
                                                       style={{
                                                           alignSelf: 'center',
                                                           backgroundColor: "#FFFFFF",
                                                           width: Metrics.screenWidth - 34,
                                                           paddingBottom: 20
                                                       }}
                                                       ItemSeparatorComponent={this._separator}
                                                       keyExtractor={(item, index) => index + 'sd'}
                                                       renderItem={this._renderItem}
                /> : null}

            </ScrollView>
        )
    }

    _head = () => {
        return (
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: Metrics.screenWidth - 34,
                alignSelf: 'center'
            }}>
                <View style={{width: 2, height: 24, backgroundColor: "#303236", marginRight: 12}}/>
                <Text style={{color: '#303236', fontSize: 16, fontWeight: 'bold'}}>{global.lang.t('hot_race')}</Text>
            </View>
        )
    }

    _renderItem = (info, index) => {
        const {item} = info;
        return <TouchableOpacity key={index}
                                 style={{flexDirection: 'row', paddingTop: 18, paddingBottom: 18}}
                                 activeOpacity={1} onPress={() => {
            router.toInfoDetail(item.id)
        }}>
            <Image style={styles.race_img}
                   source={strNotNull(item.image) ? {uri: item.image} : Images.empty_bg}/>
            <View style={styles.right_view}>
                <Text style={styles.race_content_txt}
                      numberOfLines={2}>{item.title}</Text>
                <Text style={styles.bottom_txt}>{utcDate(item.created_at, 'MM/DD  HH:mm')}</Text>

            </View>
        </TouchableOpacity>
    }


    _separator = () => {
        return <View
            style={{width: Metrics.screenWidth - 34, alignSelf: 'center', height: 1, backgroundColor: "#CCCCCC"}}/>
    }
}
