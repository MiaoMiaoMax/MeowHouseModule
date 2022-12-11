/*
    本作品采用知识共享署名-非商业性-相同方式共享 4.0 国际许可协议进行许可。 要查看此许可证的副本，请访问
    https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh

    This work is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License. To view a copy of this license, visit 
    http://creativecommons.org/licenses/by-nc-sa/4.0/
*/

import { getScoreForEntity, log } from "./methods"

/*+==================分==界==线==================+*/

const blocks = [
    {
        模式: 1,
        数量: 1,
        说: ["[@],awa"]
    }
]



/*+==================分==界==线==================+*/

const block = (mode, player, queryNoThis) => {
    let amount;
    switch (mode) {
        case 1:/* 单方块敲掉数 */
            amount = getScoreForEntity("level0", player);
            break;
        case 2:/* 方块敲掉数 */
            amount = getScoreForEntity("level0", player);
            break;
        case 3:/* 方块放置数 */
            amount = getScoreForEntity("level1", player);
        default:
            break;
    }
    for(let i = 0; i < blocks.length; i++) {
        if (blocks[i].模式 != mode) continue;
        if (blocks[i].数量 != amount) continue;
        for(let j = 0; Object.hasOwnProperty.call(blocks[i], "说") && j < blocks[i].说.length; j++) {
            const str = blocks[i].说[j].replaceAll("[@]", `@${player.name}`);
            queryNoThis.runCommandAsync(`say ${str}`);
        }
    }

    
} 

export {
    block
}