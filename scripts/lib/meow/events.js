/*
    本作品采用知识共享署名-非商业性-相同方式共享 4.0 国际许可协议进行许可。 要查看此许可证的副本，请访问
    https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh

    This work is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License. To view a copy of this license, visit 
    http://creativecommons.org/licenses/by-nc-sa/4.0/
*/

import * as mc from "@minecraft/server";
import * as methods from "./methods.js";

/*+==================分==界==线==================+*/

const events1 = () => [
    [dfksjE_bedrock, 1],/* 基岩 */
    [dfksjE_justiceFromHeaven, 3]/* 天降正义 */
]

const events2 = () => [
    [dfksjE_bigSurprise, 1],/* 《大惊喜》 */
    [dfksjE_zombieSiege, 3]/* 僵尸围岛 */
]

const events3 = () => [

]

/*+==================分==界==线==================+*/

const events = (eve) => eve;/* 暴露执行接口 */

export {
    events,
    events1,
    events2,
    events3
}

/*+==================分==界==线==================+*/

const dfksjE_bedrock = (meowEvent, queryNoThis) => {
    if (methods.tyrScoreForEntity("timingB", queryNoThis) === "ScoreAU") {
        methods.log("严重错误:检测到核心不完整,正在尝试修复");
        try { queryNoThis.runCommandAsync("scoreboard objectives add timingB dummy bedrock_cd") } catch (e) { methods.log(`尝试修复失败，请重新初始化，失败原因：${e}`); return true; };
        methods.log("修复成功");
    } else if (methods.tyrScoreForEntity("timingB", meowEvent.player) !== "ScoreBU") return true;
    methods.setScoreForEntity("timingB", queryNoThis, 600);
    methods.setScoreForEntity("timingB", meowEvent.player, 600);
    const block = mc.MinecraftBlockTypes.bedrock.createDefaultBlockPermutation();
    meowEvent.block.setPermutation(block);
    queryNoThis.runCommandAsync(`say @${meowEvent.player.name},看这是什么`);
    queryNoThis.addTag("bedrock");
    return false;
}
const dfksjE_justiceFromHeaven = (meowEvent, queryNoThis) => {
    queryNoThis.runCommandAsync(`say @${meowEvent.player.name},天降正义`);
    const explosionOptions = { breaksBlocks: false };
    const explodeNoBlocksLoc = meowEvent.player.location;
    meowEvent.dimension.createExplosion(explodeNoBlocksLoc, 5, explosionOptions);
    meowEvent.dimension.spawnEntity("minecraft:lightning_bolt", meowEvent.player.location);
    meowEvent.dimension.spawnEntity("minecraft:lightning_bolt", meowEvent.player.location);
    meowEvent.dimension.spawnEntity("minecraft:lightning_bolt", meowEvent.player.location);
    return true;
}
const dfksjE_bigSurprise = (meowEvent, queryNoThis) => {
    queryNoThis.runCommandAsync(`say @${meowEvent.player.name},《大惊喜》`);
    const creeper = meowEvent.dimension.spawnEntity("minecraft:creeper<minecraft:become_charged>", meowEvent.player.location);
    creeper.triggerEvent("minecraft:start_exploding");
    return true;
}
const dfksjE_zombieSiege = (meowEvent, queryNoThis) => {
    queryNoThis.runCommandAsync(`say @${meowEvent.player.name},僵尸围岛`);
    for (let i = 11; --i;) {
        const zombie = meowEvent.dimension.spawnEntity("minecraft:zombie", meowEvent.player.location);
        zombie.addEffect(mc.MinecraftEffectTypes.fireResistance, 12000, 0, false);
        methods.setScoreForEntity("lifeTime", zombie, 2400);
    }
    return true;
}