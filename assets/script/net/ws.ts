export class WS {
    private static web_socket = null;
    public static WS_OBJ = null;
    public static ConnectServer(ip, port) {
        let connectStateLabel = cc.find("Canvas/connect/connectState").getComponent(cc.Label);
        let userID = cc.find('Canvas/connect/userIDLabel').getComponent(cc.EditBox).string;

        let socketUrl = 'ws://' + ip + ':' + port;
        if (this.web_socket) {
            this.web_socket.close();
            this.web_socket = null;
        }
        this.web_socket = new WebSocket(socketUrl);
        this.WS_OBJ = this.web_socket;
        this.web_socket.onmessage = (event) => {

            let response = JSON.parse(event.data);
            console.log("response is :");
            console.log(response);
            let value = response.V;
            let code = response.K;
            console.log(code);
            // console.log(value);
            if (!value) {
                return;
            }
            let res = EventBus.dispatch(code, null, value);
            // if (code == 702) {
            //     this.inputRoomNumLabel.string = value.RN;
            // }
        };

        this.web_socket.onopen = (event) => {
            connectStateLabel.string = '已经连接';
            // 模拟账号服务器请求
            let message = JSON.stringify({
                K: 1,
                V: {
                    UID: Number(userID),
                },
            });
            this.web_socket.send(message);
        };
        this.web_socket.onclose = (event) => {
            connectStateLabel.string = '连接断开';
        };

        this.web_socket.onerror = (event) => {
            connectStateLabel.string = '连接错误';
        };
    }
}
