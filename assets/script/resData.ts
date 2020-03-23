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
        EventBus.addListener(DATA.Key.CMCreatePriRoom, this.respCreateRoom, this);
    }
    protected onDisable() {
        EventBus.removeListenerByTarget(this);
    }
    private respCreateRoom(res: any) {
        console.log(res);
        if (res.Ret === 2) {
            cc.find("createRoom/status", this.node).getComponent(cc.Label).string = "创建失败";
        }
    }
}
