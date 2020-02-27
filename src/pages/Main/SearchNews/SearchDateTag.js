/**
 *作者：lorne
 *时间：2019/7/9
 *功能：
 */
import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Base from "../../Base";
import SearchResultList from "./SearchResultList";
import {logMsg} from "../../../utils/utils";


export default class SearchDateTag extends Component{


    componentDidMount(){
        const {searchParams} = this.props.params
        const {type,value} = searchParams
        this.searchList && this.searchList.search({[type]:value})
    }

    render(){
        const {searchParams} = this.props.params
        return <Base showNav
        title={searchParams.value}>
            <SearchResultList ref={ref=>this.searchList = ref}/>

        </Base>
    }

}