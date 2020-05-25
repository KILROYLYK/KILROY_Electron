import '../../../_Base/css/common.less';
import '../../../_Base/css/public.less';

import { W, D, Base } from '../../../_Base/javascript/window.ts';

import Config from './config'; // 配置
import Function from './function'; // 函数

/**
 * Global
 */
export default class Global {
    readonly static W: Window = W;
    readonly static D: Document = D;
    
    readonly static Base: object = Base;
    
    public static Width: number = W.innerWidth;
    public static Height: number = W.innerHeight;
    
    readonly static Config: object = Config; // 配置
    readonly static Function: object = Function; // 函数
    
    public static Main: any = null; // React主对象
}
