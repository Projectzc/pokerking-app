import React, {Component} from 'react';
import {View, Text, Button, TouchableOpacity, Image, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {logMsg, convertDate, strNotNull, utcDate, isStrNull, getBg, mul} from "../../utils/utils";
import styles from './index.style';
import {Images, Metrics} from "../../configs/Theme";

const WIDTH = Metrics.screenWidth;

export default class HotItem extends Component {

    getImg = (type, item) => {
        let img = Images.empty_bg;
        if (type === 'info') {
            img = item.info.preview_image
        } else if (type === 'main_event') {
            img = item.main_event.logo
        } else {
            img = item.image
        }
        return getBg(img)
    }
    getTitle = (type, item) => {
        let title = item.title;
        if (type === 'info') {
            title = item.info.title
        } else if (type === 'main_event') {
            title = item.main_event.name
        }
        return title
    }
    getData = (type, item, date) => {
        let data = utcDate(item.created_at, date)
        if (type === 'info') {
            data = utcDate(item.info.created_at, date)
        } else if (type === 'main_event') {
            data = utcDate(item.main_event.begin_time, date)
        }
        return data
    }

    render() {
        const {type, item,collect} = this.props;
        const {id, image, title, source, created_at, hot} = item;
        return (
            <TouchableOpacity style={styles.event_view}
                              onPress={() => {
                                  if (type && type === 'event') {
                                      if(collect){
                                          router.toRaceMessage(id)
                                      }else{
                                          router.toEventDetail(id, this.props.event_id)
                                      }

                                  } else if (type && type === 'main_event') {
                                      if(collect){
                                          router.toRaceMessage(item.main_event.id)
                                      }else{
                                          router.toEventDetail(item.main_event.id, 0)
                                      }

                                  } else if (type && type === 'info') {
                                      router.toInfoDetail(item.info.id)
                                  } else {
                                      router.toInfoDetail(id)
                                  }
                              }}>
                <Image style={styles.race_img}
                       source={this.getImg(type, item)}/>
                <View style={styles.right_view}>
                    <Text style={[styles.race_content_txt, {
                        maxWidth: Number(mul(WIDTH, 0.56)),
                        color: "#FFE9AD"
                    }]}
                          numberOfLines={2}>{this.getTitle(type, item)}</Text>
                    {type && (type === 'event' || type === 'info' || type === 'main_event') ?
                        <View style={styles.right_bottom_view}>
                            <Text style={styles.bottom_txt}>{this.getData(type, item, 'MM/DD  HH:mm')}</Text>
                        </View> : <View style={styles.right_bottom_view}>
                            {this.props.type && this.props.type === 'hot_list' && hot ?
                                <View style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: Metrics.reallySize(34),
                                    height: Metrics.reallySize(18),
                                    borderRadius: 3,
                                    borderWidth: 1,
                                    borderColor: "#EA5163",
                                    marginRight: 10
                                }}>
                                    <Text style={{color: "#998E72", fontSize: 12}}>{global.lang.t('hot')}</Text>
                                </View> : null}
                            {strNotNull(source) ?
                                <Text numberOfLines={1} style={[styles.bottom_txt, {
                                    marginRight: 10,
                                    maxWidth: this.props.type && this.props.type === 'hot_list' && hot ? Number(mul(WIDTH, 0.32)) : Number(mul(WIDTH, 0.4))
                                }]}>#{source}</Text> : null}
                            <Text style={styles.bottom_txt}>{this.getData(type, item, 'MM-DD')}</Text>
                        </View>}

                </View>
            </TouchableOpacity>
        )
    }
}