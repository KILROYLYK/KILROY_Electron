const Electron = require('electron');

/**
 * 首页
 */
module.exports = class Index {
    /**
     * 构造函数
     * @constructor Index
     */
    constructor() {
        const _this = this;
        
        _this.init();
    }
    
    /**
     * 初始化
     * @return {void}
     */
    init() {
        const _this = this;
        
        Electron.app.on('ready', () => {
            _this.onReady();
        });
        Electron.app.on('activate', () => {
            _this.onActive();
        });
        Electron.app.on('window-all-closed', () => {
            _this.onClose();
        });
    }
    
    /**
     * 准备
     * @return {void}
     */
    onReady() {
        const _this = this;
    
        _this.instance = new Electron.BrowserWindow({
            title: 'KILROY_Electron',
            icon: true, // ICON
            kiosk: false, // Kiosk模式
            show: false, // 初始化时显示
            frame: true, // 无边框
            parent: null, // 父窗口
            modal: false, // 模态窗
            backgroundColor: '#2e2c29',
            x: 0, // X位置
            y: 0, // Y位置
            center: true, // 居中
            useContentSize: false, // 除去边框
            width: 1200,
            minWidth: 1200,
            maxWidth: 1200,
            height: 800,
            minHeight: 800,
            maxHeight: 800,
            resizable: false, // 可改变尺寸
            enableLargerThanScreen: false, // 尺寸大于屏幕
            movable: true, // 可拖动
            minimizable: true, // 可最小化
            maximizable: true, // 可最大化
            closable: true, // 可关闭
            focusable: false, // 可聚焦
            alwaysOnTop: true, // 窗口置顶
            fullscreen: false, // 全屏
            fullscreenable: false, // 可全屏
            simpleFullscreen: false, // MacOS pre-Lion全屏
            skipTaskbar: true, // 任务栏显示窗口
            acceptFirstMouse: false, // 可单击页面打开
            disableAutoHideCursor: false, // 输入时隐藏鼠标
            autoHideMenuBar: false // Alt 打开菜单
        });
        
        // _this.instance.webContents.openDevTools();
        _this.instance.loadFile('_KilroyProject/_Project/_Dome/application/page/example/index.html');
        _this.instance.once('ready-to-show', () => {
            _this.instance.show();
        });
        _this.instance.on('closed', () => {
            // 清除浏览器对象
            _this.instance = null;
        });
    }
    
    /**
     * 打开时
     * @return {void}
     */
    onActive() {
        const _this = this;
        !_this.instance && _this.onReady();
    }
    
    /**
     * 关闭
     * @return {void}
     */
    onClose() {
        const _this = this;
        process.platform !== 'darwin' && Electron.app.quit();
    }
}
