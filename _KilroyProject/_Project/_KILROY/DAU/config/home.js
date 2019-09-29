/**
 * Home_Config
 */
class HomeWindow {
    
    /**
     * HomeWindow原型对象
     * @param {object} electron Electron对象
     * @constructor
     */
    constructor(electron) {
        const _this = this;
        
        _this.name = 'DAU计算工具';
        _this.electron = electron;
        _this.window = null;
    }
    
    /**
     * 初始化
     * @return {void}
     */
    init() {
        const _this = this;
        
        _this.electron.app.on('ready', () => {
            _this.ready();
        });
        _this.electron.app.on('activate', () => {
            _this.active();
        });
        _this.electron.app.on('window-all-closed', () => {
            _this.close();
        });
    }
    
    /**
     * 准备
     * @return {void}
     */
    ready() {
        const _this = this;
        
        _this.window = new _this.electron.BrowserWindow({
            title: 'KILROY_LYK',
            icon: '_KilroyProject/_Index/src/img/favicon.ico',
            path: '_KilroyProject/_Project/_KILROY/DAU',
            kiosk: false, //kiosk模式
            show: false, //初始化时显示
            frame: true, //无边框
            parent: null, //父窗口
            modal: false, //模态窗
            backgroundColor: '#2e2c29',
            x: 0, //X位置
            y: 0, //Y位置
            center: true, //居中
            useContentSize: true, //除去边框
            transparent: false,
            width: 1500,
            minWidth: 1200,
            maxWidth: 1920,
            height: 1000,
            minHeight: 800,
            maxHeight: 1080,
            resizable: true, //可改变尺寸
            enableLargerThanScreen: false, //尺寸大于屏幕
            movable: true, //可拖动
            minimizable: true, //可最小化
            maximizable: true, //可最大化
            closable: true, //可关闭
            focusable: true, //可聚焦
            alwaysOnTop: false, //窗口置顶
            fullscreen: false, //全屏
            fullscreenable: true, //可全屏
            simpleFullscreen: true, //MacOS pre-Lion全屏
            skipTaskbar: true, //任务栏显示窗口
            acceptFirstMouse: false, //可单击页面打开
            disableAutoHideCursor: false, //输入时隐藏鼠标
            autoHideMenuBar: false //Alt 打开菜单
        });
        
        // _this.window.webContents.openDevTools();
        // _this.window.loadURL('');
        _this.window.loadFile('_KilroyProject/_Project/_KILROY/DAU/view/home.html');
        _this.window.once('ready-to-show', () => {
            _this.window.show();
        });
        _this.window.on('closed', () => {
            _this.window = null;
        });
    }
    
    /**
     * 打开中
     * @return {void}
     */
    active() {
        const _this = this;
        if (!_this.window) _this.ready();
    }
    
    /**
     * 关闭
     * @return {void}
     */
    close() {
        const _this = this;
        if (process.platform !== 'darwin') _this.electron.app.quit();
    }
}

module.exports = HomeWindow;
