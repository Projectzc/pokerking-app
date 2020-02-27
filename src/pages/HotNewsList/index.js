import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import UltimateFlatList from '../../components/ultimate/UltimateFlatList';
import {Metrics} from "../../configs/Theme";
import HotItem from '../Home/HotItem';
import {logMsg} from "../../utils/utils";
import {getInfoList, initLoginUser} from "../../services/accountDao";
import NotData from "../comm/NotData";
import propTypes from 'prop-types';

@connect(({HotNewsList}) => ({
    ...HotNewsList,
}))
export default class HotNewsList extends Component {

    static propTypes = {
        isSearch: propTypes.bool
    };


    componentDidMount() {
        this.searchKey = '';
    };

    search = (keywords) => {
        this.searchKey = keywords;
        this.newsList.refresh()
    };

    refresh = () => {
        this.newsList && this.newsList.refresh()
    }

    _separator = () => {
        return (
            <View
                style={{height: 1, backgroundColor: "#998E72", width: Metrics.screenWidth - 34, alignSelf: 'center'}}/>
        )
    };

    _renderItem = (item, index) => {
        return (
            <HotItem item={item} type={'hot_list'}/>
        )
    };

    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#1A1B1F'}}>
                <UltimateFlatList
                    firstLoader={true}
                    ref={(ref) => this.newsList = ref}
                    onFetch={this.onFetch}
                    separator={this._separator}
                    keyExtractor={(item, index) => `hot_race${index}`}
                    item={this._renderItem}
                    refreshableTitlePull={global.lang.t('pull_refresh')}
                    refreshableTitleRelease={global.lang.t('release_refresh')}
                    dateTitle={global.lang.t('last_refresh')}
                    allLoadedText={global.lang.t('no_more')}
                    waitingSpinnerText={global.lang.t('loading')}
                    emptyView={() => <NotData/>}
                />
            </View>
        )
    }

    onFetch = (page = 1, startFetch, abortFetch) => {
        try {
            initLoginUser(() => {
                getInfoList({
                    page,
                    page_size: 20,
                    keyword: this.searchKey
                }, data => {
                    logMsg("InfoList:", data)
                    startFetch(data.infos, 18)
                }, err => {
                    logMsg("reject:", err)
                    abortFetch()
                })
            })

        } catch (err) {
            abortFetch();
        }
    };
}
