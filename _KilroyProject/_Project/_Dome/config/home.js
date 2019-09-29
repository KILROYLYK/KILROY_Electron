/*global process module*/

/**
 * Home_Config
 */
class HomeWindow {
    
    /**
     * CoverWindow原型对象
     * @param {object} electron Electron对象
     * @constructor
     */
    constructor(electron) {
        const _this = this;
        
        _this.name = '首页';
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
            width: 1200,
            height: 800
        });
        
        _this.window.loadFile('_KilroyProject/_Project/_Dome/src/views/home.html');
        
        _this.window.webContents.openDevTools();
        
        _this.window.on('closed', () => {
            //清除浏览器对象
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
