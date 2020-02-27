import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {connect} from 'react-redux';
import styles from './index.style';
import UltimateFlatList from '../../components/ultimate/UltimateFlatList';
import {
    getCollectionList, initLoginUser, postCancelCollect, postCollect,
    storageLoginUser
} from "../../services/accountDao";
import {alertOrder, isEmpty, isEmptyObject, isLogin, logMsg, showToast} from "../../utils/utils";
import {Images, Metrics, px2dp} from "../../configs/Theme";
import HotItem from "../Home/HotItem";
import NotData from "../comm/NotData";
import {SwipeListView} from 'react-native-swipe-list-view';

@connect(({Collections}) => ({
    ...Collections,
}))
export default class Collections extends Component {

    state = {
        collects: []
    }


    componentDidMount() {
        this.refresh()
    }

    refresh=()=>{
        if(isLogin()){
            getCollectionList({
                page: 1,
                page_size: 20
            }, data => {
                logMsg("CollectionList:", data)
                let collects = data.items.map((x,i)=>{
                    x.key = i+''
                    return x
                })
                this.setState({
                    collects
                })
            }, err => {
                logMsg("reject:", err)
            })
        }
    }

    closeRow =(rowMap, rowKey)=> {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    }

    render() {
        if(isEmptyObject(this.state.collects)){
            return <NotData backgroundColor={'#1A1B1F'}/>
        }
        return (
            <View style={{flex: 1, backgroundColor: "#1A1B1F"}}>
                <SwipeListView
                    data={this.state.collects}
                    renderItem={this._renderItem}
                    renderHiddenItem={(data, rowMap) => (
                        <TouchableOpacity style={styles.rowBack} onPress={() => {
                            let item = data.item;
                            alertOrder(global.lang.t('delete_confirm'), () => {
                                this.closeRow(rowMap,item.key)
                                postCancelCollect({
                                    target_id: item.target_type && item.target_type === 'main_event' ? item.main_event.id : item.info.id,
                                    target_type: item.target_type
                                }, data => {
                                    showToast(global.lang.t("cancelFavorite"))
                                    this.refresh()
                                }, err => {
                                    showToast(global.lang.t('err_problem'))
                                })
                            },()=>{
                                this.closeRow(rowMap,item.key)
                            });
                        }}>
                            <View style={{flex:1}}/>
                            <View style={{width:px2dp(186),height:px2dp(220),alignItems: 'center',
                            justifyContent: 'center'}}>
                                <Image source={Images.delete_collect} style={styles.delete_img}/>
                                <Text style={styles.delete_text}>{global.lang.t('delete')}</Text>
                            </View>

                        </TouchableOpacity>
                    )}
                    closeOnRowPress={true}
                    disableRightSwipe={true}
                    rightOpenValue={-95}
                />
                {/*<UltimateFlatList*/}
                {/*ref={(ref) => this.listView = ref}*/}
                {/*onFetch={this.onFetch}*/}
                {/*separator={this._separator}*/}
                {/*keyExtractor={(item, index) => `hot_race${index}`}*/}
                {/*item={this._renderItem}*/}
                {/*refreshableTitlePull={global.lang.t('pull_refresh')}*/}
                {/*refreshableTitleRelease={global.lang.t('release_refresh')}*/}
                {/*dateTitle={global.lang.t('last_refresh')}*/}
                {/*allLoadedText={global.lang.t('no_more')}*/}
                {/*waitingSpinnerText={global.lang.t('loading')}*/}
                {/*emptyView={() => <NotData/>}*/}
                {/*/>*/}
            </View>
        )
    }

    _separator = () => {
        return (
            <View style={{
                height: 1,
                backgroundColor: "#303236",
                width: Metrics.screenWidth,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <View
                    style={{
                        height: 1,
                        backgroundColor: "#998E72",
                        width: Metrics.screenWidth - 34,
                        alignSelf: 'center'
                    }}/>
            </View>
        )
    }

    _renderItem = ({item, index}) => {

        return (
            <View style={{backgroundColor: '#303236'}}>
                <HotItem item={item} collect={true} type={item.target_type}/>
                {this._separator()}
            </View>
        )
    };

    onFetch = (page = 1, startFetch, abortFetch) => {
        try {
            initLoginUser(() => {

                getCollectionList({
                    page,
                    page_size: 20
                }, data => {
                    logMsg("CollectionList:", data)
                    startFetch(data.items, 20)
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
