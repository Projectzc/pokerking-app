import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {Images, Metrics} from "../../configs/Theme";
import UltimateFlatList from "../../components/ultimate/UltimateFlatList";
import NotData from "../comm/NotData";
import TopBar from "../comm/TopBar";
import styles from './index.style'
import {getUserId, isEmptyObject, isStrNull, logMsg, utcDate} from "../../utils/utils";
import {getNotices, getUnread, postNotifications} from "../../services/accountDao";

@connect(({NoticesPage}) => ({
    ...NoticesPage,
}))
export default class NoticesPage extends Component {

    state = {
        notices: {}
    }


    componentDidMount() {
        this.refresh();
    }

    refresh = () => {
        this.props.navigation.setParams({
            onLeft: () => {
                router.pop()
            }
        });

        getNotices(data => {
            logMsg("notices", data)
            this.setState({
                notices: data
            })
        })
    }

    _date = (type) => {
        if (isEmptyObject(type) || isEmptyObject(type[0])) {
            return ''
        } else if (isStrNull(type[0].created_at)) {
            return ''
        } else {
            return utcDate(type[0].created_at, 'YYYY/MM/DD')
        }
    }

    _content = (type) => {
        if (isEmptyObject(type) || isEmptyObject(type[0])) {
            return ''
        } else if (isStrNull(type[0].content)) {
            return ''
        } else {
            return type[0].content
        }
    }

    intoList = (type) => {
        postNotifications({type: type}, data => {
            logMsg("读取了吗", type,data)
            this.refresh()
            getUnread(getUserId())
        })
    }

    render() {
        const {notices} = this.state;
        if(isEmptyObject(notices)){
            return <NotData backgroundColor={'#1A1B1F'}/>
        }
        const {applies, events, apply_unread_counts, event_unread_counts} = this.state.notices
        return (
            <View style={{flex: 1, backgroundColor: "#1A1B1F"}}>
                <View style={{width: Metrics.screenWidth, backgroundColor: "#998E72", height: 1}}/>
                <TouchableOpacity style={styles.item_view} onPress={() => {
                    this.intoList('event')
                    router.toInstantList(events, this.refresh);
                }}>
                    <View style={styles.img_view}>
                        <Image style={styles.notices1_img} source={Images.notices1}/>
                        {event_unread_counts > 0 ? <View style={styles.unread_counts}/> : null}
                    </View>
                    <View style={styles.mid_view}>
                        <Text style={styles.instants_news}>{global.lang.t('instants_news')}</Text>
                        <Text style={styles.contents} numberOfLines={1}>{this._content(events)}</Text>
                    </View>
                    <View style={{flex: 1}}/>
                    <Text style={styles.time_text}>{this._date(events)}</Text>
                </TouchableOpacity>
                <View style={{width: Metrics.screenWidth - 17, marginLeft: 17, backgroundColor: "#998E72", height: 1}}/>
                <TouchableOpacity style={styles.item_view} onPress={() => {
                    this.intoList('apply')
                    router.toRankList(applies, this.refresh);
                }}>
                    <View style={styles.img_view}>
                        <Image style={styles.notices1_img} source={Images.notices2}/>
                        {apply_unread_counts > 0 ? <View style={styles.unread_counts}/> : null}
                    </View>
                    <View style={styles.mid_view}>
                        <Text style={styles.instants_news}>{global.lang.t('rank_status')}</Text>
                        <Text style={styles.contents} numberOfLines={1}>{this._content(applies)}</Text>
                    </View>
                    <View style={{flex: 1}}/>
                    <Text style={styles.time_text}>{this._date(applies)}</Text>
                </TouchableOpacity>
                <View style={{width: Metrics.screenWidth - 17, marginLeft: 17, backgroundColor: "#998E72", height: 1}}/>
            </View>
        )
    }

}
