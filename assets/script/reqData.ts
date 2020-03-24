// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import { WS } from "./net/ws";
import { DATA } from "./net/key";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ReqData extends cc.Component {

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    protected start() {
        const userIDLabelNode = cc.find('connect/userIDLabel', this.node);
        let selectFrom = (lowerValue, upperValue) => {
            const choices = upperValue - lowerValue + 1;
            return Math.floor(Math.random() * choices + lowerValue);
        };
        userIDLabelNode.getComponent(cc.EditBox).string = selectFrom(1, 100).toString();
    }

    // update (dt) {}
    private connectNet() {
        let ip = cc.find("connect/ip", this.node).getComponent(cc.EditBox).string;
        let port = cc.find("connect/port", this.node).getComponent(cc.EditBox).string;
        if (!ip.length || !port) {
            ip = '127.0.0.1';
            // ip = '192.168.3.121';
            port = '7111';
            // tempData();
            // userID = '11111';
        }
        WS.ConnectServer(ip, port);
    }
    private createRoom(event, data) {
        let message = JSON.stringify({
            K: DATA.Key.CMCreatePriRoom,
            V: {
                Name: "123ds",
                Time: 30,
            },
        });
        WS.WS_OBJ.send(message);
    }
    private joinRoom(event, data) {
        const RN = cc.find("joinRoom/rn", this.node).getComponent(cc.EditBox).string;
        let message = JSON.stringify({
            K: DATA.Key.CMJoinPriRoom,
            V: {
                RN: Number(RN),
            },
        });
        WS.WS_OBJ.send(message);
    }
}
