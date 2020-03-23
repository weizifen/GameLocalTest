// 混编后 TS会检测参数是否存在，用js定义的全局变量需要声明才能在TS脚本中不会有虚线爆红 编译之后该文件就不存在。
// declare 定义的类型只会用于编译时的检查，编译结果中会被删除。
declare const require: any; // <-- 新增
declare const gd: any; // <-- 新增
declare const GameUpdate: any; // <-- 新增
// declare const EventBus: any; // <-- 新增
declare const window: any; // <-- 新增
declare const commonFunc: any; // <-- 新增
declare const md5: any;
declare const XXTEA: any;
declare  const AudioLC: any;
declare namespace EventBus{
    function addListener(event, callback, target);
    function addMultiEventListener(eventStart, eventEnd, callback, target);
    function removeListenerByTarget(target);
    function removeListener(event, callback, target);
    function dispatch(event, target?: any, res?: any);
} // <-- 新增

// 支持調用自身calc(' 1 + (2 * 3 - 1) / 4 * -1 ')
// calc.add(0.1, 0.2) // 0.3
// calc.sub(0.1, 0.2) // -0.1
// calc.mul(0.1, 0.2) // 0.02
// calc.div(0.1, 0.2) // 0.5
// calc.round(0.555, 2) // 0.56
declare namespace calc{
    function add(number1: number, number2: number);
    function sub(number1: number, number2: number);
    function mul(number1: number, number2: number);
    function div(number1: number, number2: number);
    function round(number1: number, number2: number);
} // <-- 新增
interface Window {
    AudioLC: any;
    commRes: any;
    calc: any;
    closeHotUpdate: any; // 热更开关
    isOpenAppVest: any; // 是否开启云盾
    serverType: any; // 服务器选择
    largeVersion: any; // 大版本更新开关  是否关闭大版本更新
    _test_:boolean;
    openBid:boolean;
}
