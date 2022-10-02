/*
    本作品采用知识共享署名-非商业性-相同方式共享 4.0 国际许可协议进行许可。 要查看此许可证的副本，请访问
    https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh

    This work is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License. To view a copy of this license, visit 
    http://creativecommons.org/licenses/by-nc-sa/4.0/
*/

import * as methods from "./methods.js";

/*+==================分==界==线==================+*/

const chests1 = () => [
    /* [随机权重, ["物品", 占用格数(可getRndInteger获得随机数), 每格最大数量, 特殊值, 每格最小数量(省略=默认1)], ...[第n个物品(n<28)]] */
    [1, ["minecraft:apple", methods.getRndInteger(8, 10), 5, 0], ["minecraft:golden_apple", methods.getRndInteger(2, 5), 5, 0]]
]

const chests2 = () => [
    
]

const chests3 = () => [
    
]

/*+==================分==界==线==================+*/

export {
    chests1,
    chests2,
    chests3
}