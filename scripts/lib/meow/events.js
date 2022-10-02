/*
    本作品采用知识共享署名-非商业性-相同方式共享 4.0 国际许可协议进行许可。 要查看此许可证的副本，请访问
    https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh

    This work is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License. To view a copy of this license, visit 
    http://creativecommons.org/licenses/by-nc-sa/4.0/
*/

import * as mc from "mojang-minecraft";
import * as methods from "./methods.js";

/*+==================分==界==线==================+*/

const events1 = () => [
    [dfksjE_bedrock, 1],/* 基岩 */
    [dfksjE_justiceFromHeaven, 2]/* 天降正义 */
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

const dfksjE_bedrock = (m2, queryNoThis) => {
    if (methods.tyrScoreForEntity("timingB", queryNoThis) === "ScoreAU") {
        methods.log("严重错误:检测到核心不完整,正在尝试修复");
        try { queryNoThis.runCommand("scoreboard objectives add timingB dummy bedrock_cd") } catch (e) { methods.log(`尝试修复失败，请重新初始化，失败原因：${e}`); return true; };
        methods.log("修复成功");
    } else if (methods.tyrScoreForEntity("timingB", m2.player) !== "ScoreBU") return true;
    methods.setScoreForEntity("timingB", queryNoThis, 600);
    methods.setScoreForEntity("timingB", m2.player, 600);
    const block = mc.MinecraftBlockTypes.bedrock.createDefaultBlockPermutation();
    m2.block.setPermutation(block);
    queryNoThis.runCommand(`say @${m2.player.name},看这是什么`);
    queryNoThis.addTag("bedrock");
    return false;
}
const dfksjE_justiceFromHeaven = (m2, queryNoThis) => {
    queryNoThis.runCommand(`say @${m2.player.name},天降正义`);
    const explosionOptions = new mc.ExplosionOptions();
    explosionOptions.breaksBlocks = false;
    const explodeNoBlocksLoc = m2.player.location;
    m2.dimension.createExplosion(explodeNoBlocksLoc, 5, explosionOptions);
    m2.dimension.spawnEntity("minecraft:lightning_bolt", m2.player.location);
    m2.dimension.spawnEntity("minecraft:lightning_bolt", m2.player.location);
    m2.dimension.spawnEntity("minecraft:lightning_bolt", m2.player.location);
    return true;
}
const dfksjE_bigSurprise = (m2, queryNoThis) => {
    queryNoThis.runCommand(`say @${m2.player.name},《大惊喜》`);
    const creeper = m2.dimension.spawnEntity("minecraft:creeper<minecraft:become_charged>", m2.player.location);
    creeper.triggerEvent("minecraft:start_exploding");
    return true;
}
const dfksjE_zombieSiege = (m2, queryNoThis) => {
    queryNoThis.runCommand(`say @${m2.player.name},僵尸围岛`);
    for (let i = 0; i < 10; i++) {
        const zombie = m2.dimension.spawnEntity("minecraft:zombie", m2.player.location);
        zombie.addEffect(mc.MinecraftEffectTypes.fireResistance, 12000, 0, false);
    }
    return true;
}