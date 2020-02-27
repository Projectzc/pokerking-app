# Pokerking
一、登陆
1、手机+验证码登录

二、注册
1、手机验证码+密码注册

三、主页

pokekingAndroid
┌────────────┬──────────────────────────────────────────────────────────────────┐
│ Name       │ Deployment Key                                                   │
├────────────┼──────────────────────────────────────────────────────────────────┤
│ Production │ u9yPhapNmEVmA8mQCShhCyz78kOc4ac6d3c3-441d-44e7-b580-2dcf21f4b042 │
├────────────┼──────────────────────────────────────────────────────────────────┤
│ Staging    │ BLo1hyClpTkU3sbRyAR8lSM4EHIB4ac6d3c3-441d-44e7-b580-2dcf21f4b042 │
└────────────┴──────────────────────────────────────────────────────────────────┘
pokekingIos
┌────────────┬──────────────────────────────────────────────────────────────────┐
│ Name       │ Deployment Key                                                   │
├────────────┼──────────────────────────────────────────────────────────────────┤
│ Production │ OxZYqZ8WkZOziy-399Y2XTUbkqUX4ac6d3c3-441d-44e7-b580-2dcf21f4b042 │
├────────────┼──────────────────────────────────────────────────────────────────┤
│ Staging    │ D0Av6NFDnpl8IZIzooNUAe4Jsp774ac6d3c3-441d-44e7-b580-2dcf21f4b042 │
└────────────┴──────────────────────────────────────────────────────────────────┘




发布热ios更新:
code-push release-react pokekingIos ios -m --description "热更新测试-点击更新后请稍等片刻-修复bug" -d Production

code-push release-react pokekingIos ios -m -d Production &&
code-push release-react pokekingAndroid android -m -d Production

发布热android更新:
code-push release-react pokekingAndroid android -m --description "热更新测试-点击更新后请稍等片刻-修复bug" -d Production
code-push release-react pokekingAndroid android  -d Production

查看ios发布情况K
 code-push deployment h pokekingIos Production
┌───────┬────────────────┬─────────────┬───────────┬──────────────────────────┬──────────────────────┐
│ Label │ Release Time   │ App Version │ Mandatory │ Description              │ Install Metrics      │
├───────┼────────────────┼─────────────┼───────────┼──────────────────────────┼──────────────────────┤
│ v1    │ 2 hours ago    │ 4.6         │ Yes       │ 热更新测试                    │ Active: 17% (1 of 6) │
│       │                │             │           │                          │ Total: 3             │
├───────┼────────────────┼─────────────┼───────────┼──────────────────────────┼──────────────────────┤
│ v2    │ an hour ago    │ 4.6         │ Yes       │ 热更新测试-点击更新后请稍等片刻-首页输入框变化 │ Active: 50% (3 of 6) │
│       │                │             │           │                          │ Total: 4             │
├───────┼────────────────┼─────────────┼───────────┼──────────────────────────┼──────────────────────┤
│ v3    │ 30 minutes ago │ 4.6         │ Yes       │ 热更新测试-抽奖问题               │ Active: 33% (2 of 6) │
│       │                │             │           │                          │ Total: 2             │
└───────┴────────────────┴─────────────┴───────────┴──────────────────────────┴──────────────────────┘


查看android发布情况
 code-push deployment h pokekingAndroid Production
┌───────┬──────────────┬─────────────┬───────────┬──────────────────────────┬──────────────────────┐
│ Label │ Release Time │ App Version │ Mandatory │ Description              │ Install Metrics      │
├───────┼──────────────┼─────────────┼───────────┼──────────────────────────┼──────────────────────┤
│ v1    │ an hour ago  │ 4.7         │ Yes       │ 热更新测试-点击更新后请稍等片刻-首页输入框变化 │ No installs recorded │
└───────┴──────────────┴─────────────┴───────────┴──────────────────────────┴──────────────────────┘


"Kings Live" is the Texas Hold'em event information platform, which can view news and events information at home and abroad, as well as view the offline queuing process to provide more convenient services for Texas Hold'em fans.

Deco Race: Professional Texas Hold'em events have everything you need, and the structure of the event is clear.

Game table: The offline queue registration process is mastered by one hand, and the number of queues is viewed in real time.

Hot News: Check out Texas Hold'em Madden News at any time
“Kings Live” 是德州扑克赛事资讯平台，可以查看到国内外的新闻和赛事信息，同时还可以查看线下比赛报名排队进程，为德州扑克爱好者提供更便捷的服务。

德扑赛事：专业德州扑克赛事应有尽有，赛事结构信息清晰

游戏桌：线下比赛报名排队进程一手掌握，实时查看排队人数

热门资讯：随时查看德州扑克劲爆资讯
