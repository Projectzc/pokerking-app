import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import UltimateFlatList from "../../components/ultimate/UltimateFlatList";
import NotData from "../comm/NotData";
import {alertOrder, isEmptyObject, logMsg, showToast, unix_format} from "../../utils/utils";
import {delCancelNoti, getInfoList, getNotices, initLoginUser} from "../../services/accountDao";
import {Images, Metrics, px2dp, px2sp} from "../../configs/Theme";
import styles from './index.style';
import {SwipeListView} from 'react-native-swipe-list-view';

@connect(({RankList}) => ({
    ...RankList,
}))
export default class RankList extends Component {

    constructor(props){
        super(props)
        let {applies} = props.params;
        if(!isEmptyObject(applies)){
            applies = applies.map((x,i)=>{
                x.key = i+''
                return x
            })
        }
        this.state = {
            applies
        }

    }




    componentDidMount() {
        this.props.navigation.setParams({
            onLeft: () => {
                this.props.params.refresh()
                router.pop()
            }
        });
    }

    refresh = ()=>{
        getNotices(data => {
            let applies = data.applies
            applies = applies.map((x,i)=>{
                x.key = i+''
                return x
            })
            this.setState({
                applies
            })
        })
    }

    closeRow =(rowMap, rowKey)=> {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    }

    render() {
        const {applies} = this.state;
        if (isEmptyObject(applies)) {
            return <NotData/>
        }
        return (
            <View style={{flex: 1, backgroundColor: "#F5F0F0"}}>
                <SwipeListView
                    data={applies}
                    listViewRef={(listViewRef) => this.listView = listViewRef}
                    renderItem={this._renderItem}
                    renderHiddenItem={(data, rowMap) => (
                        <TouchableOpacity style={styles.rowBack3} onPress={() => {
                            let item = data.item;
                            alertOrder(global.lang.t('delete_confirm'), () => {
                                this.closeRow(rowMap,item.key)
                                delCancelNoti({
                                    id: item.id
                                }, data => {
                                    showToast(global.lang.t("delete_success"))
                                    this.refresh()
                                }, err => {
                                    showToast(global.lang.t('err_problem'))
                                })
                            },()=>{
                                this.closeRow(rowMap,item.key)
                            });
                        }}>
                            <View style={{flex: 1}}/>
                            <View style={{
                                width: px2dp(186), height: px2dp(186), alignItems: 'center',
                                justifyContent: 'center'
                            }}>
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
                {/*style={{paddingTop:20}}*/}
                {/*ref={(ref) => this.listView = ref}*/}
                {/*onFetch={this.onFetch}*/}
                {/*separator={this._separator}*/}
                {/*keyExtractor={(item, index) => `instantList${index}`}*/}
                {/*item={this._renderItem}*/}
                {/*pagination={false}*/}
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

    getTime = (created_at, type) => {
        let month = unix_format(created_at,'MM')
        let race_start_time = global.localLanguage === 'en' ? `${global.lang.t(`month${month}`)}` + unix_format(created_at, type) :
            unix_format(created_at, `YYYY${global.lang.t('year')}MM${global.lang.t('month')}DD${global.lang.t('day2')} HH:mm`);
        return race_start_time;
    }

    _separator = () => {
        return (
            <View
                style={{height: 20, width: Metrics.screenWidth, alignSelf: 'center'}}/>
        )
    };

    _renderItem = ({item, index}) => {
        return (
            <View style={{
                width: Metrics.screenWidth - 20,
                alignSelf: 'center',
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: 20
            }}>
                <Text style={styles.time_text}>{this.getTime(item.created_at, ` DD,YYYY HH:mm`)}</Text>
                <View
                    key={`rank_list${index}`}
                    style={styles.item}>
                    <Text style={styles.title}>{item.content}</Text>
                    {/*<Text style={styles.title}>{global.lang.t('notice1')}<Text style={styles.title2}>{item.title}</Text></Text>*/}
                    {/*<Text style={styles.title3}>{'盲注300/600NLH '}<Text style={styles.title}> {global.lang.t('notice2')}</Text><Text style={styles.title4}> 5</Text><Text style={styles.title}> {global.lang.t('notice3')}</Text></Text>*/}
                    {/*<Text style={styles.title}>{global.lang.t('notice2')}</Text>*/}
                </View>
            </View>
        )
    };

    onFetch = (page = 1, startFetch, abortFetch) => {
        const {applies} = this.props.params;
        try {
            startFetch(applies, 18)

        } catch (err) {
            abortFetch();
        }
    };
}
