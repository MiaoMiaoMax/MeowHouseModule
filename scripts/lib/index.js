/*
    本作品采用知识共享署名-非商业性-相同方式共享 4.0 国际许可协议进行许可。 要查看此许可证的副本，请访问
    https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh

    This work is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License. To view a copy of this license, visit 
    http://creativecommons.org/licenses/by-nc-sa/4.0/
*/

export * as theEvents from "./meow/events.js";
export * as theChests from "./meow/chests.js";
export * as theEntitys from "./meow/entitys.js";
export * as theBlocks from "./meow/blocks.js";

export * as achievements from "./meow/achievements.js";

import {
    log,
    runCommand,
    tyrScoreForName,
    getScoreForName,
    setScoreForName,
    addScoreForName,
    tyrScoreForEntity,
    getScoreForEntity,
    setScoreForEntity,
    addScoreForEntity,
    Score,
    score,
    getNowTime,
    getCurrentDate,
    getCurrentTime,
    getCurrentTimes,
    getRndInteger,
    arrSum,
    arrNonNegative
} from "./meow/methods.js";

export {
    log,
    runCommand,
    tyrScoreForName,
    getScoreForName,
    setScoreForName,
    addScoreForName,
    tyrScoreForEntity,
    getScoreForEntity,
    setScoreForEntity,
    addScoreForEntity,
    Score,
    score,
    getNowTime,
    getCurrentDate,
    getCurrentTime,
    getCurrentTimes,
    getRndInteger,
    arrSum,
    arrNonNegative
}

import {
    tryEnchantment,
    randomEnchantment
} from "./minecraft/enchantmentLists.js";

const minecraft = {
    tryEnchantment,
    randomEnchantment
}

export { minecraft };