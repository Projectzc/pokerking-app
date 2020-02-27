import React, {PureComponent} from 'react';
import {
    Image, Text, Platform, TextInput, View, StyleSheet
} from 'react-native';
import {Images} from "../../configs/Theme";

const styles = StyleSheet.create({
    contains: {
        height: 30,
        width: '70%',
        backgroundColor: '#6A543B',
        borderRadius: 6,
        flexDirection: 'row',
        alignItems: 'center'
    },
    search: {
        height: 17,
        width: 17,
        marginLeft: 20
    },
    txt_search: {
        fontSize: 12,
        color: '#998E72',
        marginLeft: 9
    },
    input: {
        position: 'absolute',
        flex: 1,
        paddingTop: 4,
        paddingBottom: 4,
        width: '90%',
        color: '#DAB68A',
        fontSize: 16,
        marginLeft: 8
    }
})


export default class SearchBar extends PureComponent {

    state = {
        text: ''
    }

    clearInput = () => {
        this.setState({
            text: ''
        })
        this.input && this.input.clear()
    }

    render() {
        const {text} = this.state;
        let hide = text.length > 0;
        return <View
            style={styles.contains}>

            {hide ? null : <Image source={Images.search_gray}
                                  style={styles.search}/>}

            {hide ? null : <Text style={styles.txt_search}>{global.lang.t('search_text')}</Text>}
            <TextInput
                ref={ref => this.input = ref}
                underlineColorAndroid={'transparent'}
                selectionColor={'#FFE9AD'}
                onChangeText={text => {
                    this.setState({text})
                    this.props.keyword(text)
                }}
                style={styles.input}/>

        </View>
    }
}