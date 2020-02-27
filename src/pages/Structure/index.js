import React, {Component} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import Pdf from 'react-native-pdf';
import {Images, Metrics} from "../../configs/Theme";
import {isStrNull, logMsg} from "../../utils/utils";
import NotData from "../comm/NotData";
import ImageMark from '../../components/ImageMark'

@connect(({Structure}) => ({
    ...Structure,
}))
export default class Structure extends Component {


    componentDidMount() {

    }

    getLastType = (pdf) => {

        let index = pdf.lastIndexOf("."); //（考虑严谨用lastIndexOf(".")得到）得到"."在第几位
        let last_string = pdf.substring(index); //截断"."之前的，得到后缀
        if (last_string === ".pdf") {  //根据后缀，判断是否符合图片格式
            return "pdf"
        } else if (last_string === ".png" || last_string === ".jpg" || last_string === ".jpeg") {
            return "other"
        }
    }

    render() {
        const {pdf} = this.props.params;
        if (isStrNull(pdf)) {
            return <NotData/>
        } else {
            let last_type = this.getLastType(pdf);
            const source = {uri: this.props.params.pdf, cache: true};
            return (
                <View style={styles.container}>
                    {last_type === "pdf" ? <Pdf
                            source={source}
                            loadProgress={(p => {
                                logMsg(p)
                            })}
                            onLoadComplete={(numberOfPages, filePath) => {
                                console.log(`number of pages: ${numberOfPages}`);
                            }}
                            onPageChanged={(page, numberOfPages) => {
                                console.log(`current page: ${page}`);
                            }}
                            onError={(error) => {
                                console.log(error);
                            }}
                            style={styles.pdf}/> :
                        <View style={{marginTop:10,marginBottom:10}}>
                            <ImageMark
                                key={pdf}
                                src={pdf}
                                alt="structure"/>
                        </View>}

                </View>
            )
        }

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingBottom: 50
    },
    pdf: {
        flex: 1,
        width: Metrics.screenWidth,
    }
});
