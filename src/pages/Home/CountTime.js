import React, {Component} from 'react';
import {View, Text, Button, TouchableOpacity,StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Metrics, px2dp} from "../../configs/Theme";
import PercentageCircle from "./PercentageCircle";
import {getRemainTime, getSubTime} from "../../utils/utils";

export default class CountTime extends Component{

  state = {
    day:'--',
    hours:'--',
    minutes:'--',
    seconds:'--',
    dayTotal:0
  }

  componentDidMount(){

    const {begin_time, end_time} = this.props.recentEvent
    this.counting(begin_time * 1000, end_time * 1000)

  }

  componentWillUnmount(){
    clearInterval(this.intervalTimer)
  }

  counting = (startTime, endTime) => {

    this.intervalTimer = setInterval(() => {
      // 得到剩余时间
      let remainTime = getRemainTime(startTime)

      // 倒计时
      if (remainTime.total > 0) {

        this.setState({
          day:remainTime.days,
          hours:remainTime.hours,
          minutes:remainTime.minutes,
          seconds:remainTime.seconds
        })
        //倒计时结束
      } else if (remainTime.total <= 0) {
        clearInterval(this.intervalTimer);
        let toEndTime = getRemainTime(endTime)
        let raceStatus = global.lang.t('processing')
        if (toEndTime.total < 0) {
          raceStatus = '----'
        }
        this.setState({
          day:'--',
          hours:'--',
          minutes:'--',
          seconds:'--',
        })
      }
    }, 1000)
  };

    render(){
        const {recentEvent} = this.props
        const {day,hours,minutes,seconds,dayTotal} = this.state
        let secP = (seconds/60)*100
        let minP = (minutes/60)*100
        let houP = (hours/60)*100
        houP=houP?houP:0
        minP=minP?minP:0
        secP=secP?secP:0
        return (
            <LinearGradient
                colors={['#E1BB8D', '#8B6941']}
                style={styles.container}>
                <Text style={styles.title} numberOfLines={1} ellipsizeMode={'tail'}>{recentEvent.name}</Text>
                <View style={{flexDirection:'row',alignItems:'center',marginTop:px2dp(14)}}>
                  <View
                    style={{alignItems:'center'}}>
                    <PercentageCircle radius={px2dp(60)} percent={dayTotal} color={"#FFF"} innerColor={'#B28F64'} bgcolor={'#4C4530'}>
                      <Text style={styles.lbNum}>{day}</Text>

                    </PercentageCircle>
                    <Text style={styles.lbTime}>{global.lang.t('day')}</Text>
                  </View>
                  <View
                    style={{alignItems:'center',marginLeft:px2dp(30)}}>
                    <PercentageCircle radius={px2dp(60)} percent={houP} color={"#FFF"} innerColor={'#B28F64'} bgcolor={'#4C4530'}>
                      <Text style={styles.lbNum}>{hours}</Text>

                    </PercentageCircle>
                    <Text style={styles.lbTime}>{global.lang.t('time')}</Text>
                  </View>
                  <View
                    style={{alignItems:'center',marginLeft:px2dp(30)}}>
                    <PercentageCircle radius={px2dp(60)} percent={minP} color={"#FFF"} innerColor={'#B28F64'} bgcolor={'#4C4530'}>
                      <Text style={styles.lbNum}>{minutes}</Text>

                    </PercentageCircle>
                    <Text style={styles.lbTime}>{global.lang.t('minute')}</Text>
                  </View>
                  <View
                    style={{alignItems:'center',marginLeft:px2dp(30)}}>
                    <PercentageCircle radius={px2dp(60)} percent={secP} color={"#FFF"} innerColor={'#B28F64'} bgcolor={'#4C4530'}>
                      <Text style={styles.lbNum}>{seconds}</Text>

                    </PercentageCircle>
                    <Text style={styles.lbTime}>{global.lang.t('second')}</Text>
                  </View>

                </View>

            </LinearGradient>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:px2dp(248),
        borderRadius:px2dp(12),
        alignItems:'center'
    },
    title:{
        color:'#FFF',
        fontSize:14,
        marginTop:px2dp(14)
    },
    lbTime:{
        color:'#FFF',
        fontSize:12,
        marginTop:px2dp(14)
    },
    lbNum:{
        color:'#FFF',
        fontSize:14
    }
})
