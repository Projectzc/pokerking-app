import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import styles from './index.style'
import {Metrics} from "../../configs/Theme";
import RenderHtml from '../comm/RenderHtml';
import {getEventInfo} from "../../services/eventsDao";
import {isEmptyObject, isStrNull, logMsg, shareHost, shareTo} from "../../utils/utils";
import NotData from "../comm/NotData";

@connect(({RaceMessage}) => ({
    ...RaceMessage,
}))
export default class RaceMessage extends Component {

    state = {
        event_info: {}
    };

    componentDidMount() {
        getEventInfo({id: this.props.params.id}, data => {
            logMsg("event_info", data);
            this.props.navigation.setParams({
                title: data.event.name,
                onRight: () => {
                    let param = {
                        shareTitle: data.event.name,
                        shareText: data.event.name,
                        shareImage: data.event.logo,
                        shareLink: `${shareHost()}/main_events/${this.props.params.id}`
                    };
                    shareTo(param)
                    logMsg('分享')

                }
            });

            this.setState({
                event_info: data.event
            })
        });
    }

    render() {
        const {description} = this.state.event_info;
        if(isStrNull(description)){
            return <NotData/>
        }
        return (
            <ScrollView style={styles.message_view}>
                <View style={{
                    marginTop: 20,
                    marginLeft: 18,
                    marginRight: 18,
                    paddingBottom: 80,
                    width: Metrics.screenWidth - 36
                }}>
                    <RenderHtml
                        html={description}/>
                </View>
            </ScrollView>
        )
    }
}
