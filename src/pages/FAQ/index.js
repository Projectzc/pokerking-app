import React, {Component} from 'react';
import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import {connect} from 'react-redux';
import styles from './index.style';
import {Images, Metrics} from "../../configs/Theme";
import {isEmptyObject} from "../../utils/utils";
import NotData from "../comm/NotData";


@connect(({FAQ}) => ({
    ...FAQ,
}))
export default class FAQ extends Component {

    questions = [{id: 0, title: global.lang.t('FAQ_title1'), question: global.lang.t('FAQ_reply1')},
        {id: 1, title: global.lang.t('FAQ_title2'), question: global.lang.t('FAQ_reply2')},
        {id: 2, title: global.lang.t('FAQ_title3'), question: global.lang.t('FAQ_reply3')},
        {id: 3, title: global.lang.t('FAQ_title4'), question: global.lang.t('FAQ_reply4')},
        {id: 4, title: global.lang.t('FAQ_title5'), question: global.lang.t('FAQ_reply5')}];

    state = {
        faq_questions: []
    };

    componentDidMount() {
        let question = this.questions;
        question.map(item => {
            item.isSelect = false
        })
        this.setState({
            faq_questions: question
        })
    }

    render() {
        const {faq_questions} = this.state;
        if (isEmptyObject(faq_questions)) {
            return <NotData/>
        }
        return (
            <View style={{flex: 1}}>
                <FlatList
                    data={faq_questions}
                    showsHorizontalScrollIndicator={false}
                    ItemSeparatorComponent={this._separator}
                    renderItem={this._renderItem}/>
            </View>
        )
    }

    _separator = () => {
        return <View style={{height: 1, width: Metrics.screenWidth}}/>
    };

    _renderItem = ({item, index}) => {
        const {faq_questions} = this.state;
        const {title, question} = item;
        return (
            <View>
                <TouchableOpacity style={[styles.faq_view, {backgroundColor: item.isSelect ? '#ECECEE' : "white"}]}
                                  activeOpacity={1} onPress={() => {
                    faq_questions.forEach((x) => {
                        if (x.isSelect) {
                            x.isSelect = false
                        }else{
                            x.isSelect = item.id === x.id
                        }
                    });
                    this.setState({
                        faq_questions: [...faq_questions]
                    });
                }}>
                    <Text style={styles.txt}>{title}</Text>
                    <View style={{flex: 1}}/>
                    <Image style={item.isSelect ? styles.image2 : styles.image}
                           source={item.isSelect ? Images.question_bottom : Images.right_gray}/>
                </TouchableOpacity>
                {item.isSelect ? <View style={{marginLeft: 18, marginRight: 18, marginBottom: 26}}>
                    <Text style={styles.txt2}>{question}</Text>
                </View> : null}
            </View>
        )
    }
}
