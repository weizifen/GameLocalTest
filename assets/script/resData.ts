// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import { DATA } from "./net/key";

const {ccclass, property} = cc._decorator;

@ccclass
export default class RedData extends cc.Component {
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    protected start() {
        // todo
    }

    // update (dt) {}
    protected onEnable() {
        EventBus.addListener(DATA.SKey.SMCreatePriRoom, this.respCreateRoom, this);
        EventBus.addListener(DATA.SKey.SMJoinPriRoom, this.respJoinRoom, this);
        EventBus.addListener(DATA.SKey.SMReady, this.respReady, this);

    }
    protected onDisable() {
        EventBus.removeListenerByTarget(this);
    }
    private respCreateRoom(res: any) {
        console.log(res);
        const retObj = cc.find("createRoom/status", this.node).getComponent(cc.Label);
        if (res.Ret === 2) {
            retObj.string = "创建失败";
        }
        if (res.Ret === 4) {
            retObj.string = "已有房间";
        }
    }
    private respJoinRoom(res: any) {
        if (res.Ret === 1) {
            cc.find("joinRoom/rn", this.node).getComponent(cc.EditBox).string = res.RN;
        }
    }
    private respReady(res: any) {
        console.log("玩家准备");
        const userIDLabel = cc.find('connect/userIDLabel', this.node).getComponent(cc.EditBox).string;
        const readyLabel = cc.find("gameCore/ready/label", this.node).getComponent(cc.Label);
        if (res.Ret === 1 && Number(userIDLabel) === res.UID) {
            readyLabel.string = "本人已经准备";
        }
    }
}
