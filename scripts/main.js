/*
    本作品采用知识共享署名-非商业性-相同方式共享 4.0 国际许可协议进行许可。 要查看此许可证的副本，请访问
    https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh

    This work is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License. To view a copy of this license, visit 
    http://creativecommons.org/licenses/by-nc-sa/4.0/
*/

import * as mc from "mojang-minecraft";
import * as meow from "./lib/index.js";

/*+==================分==界==线==================+*/

mc.world.events.beforeChat.subscribe(m => {
    pos(m);
    command(m);
    return m;
})
mc.world.events.blockBreak.subscribe(m2 => {
    blockBreak(m2);
    return m2;
})
/*
mc.world.events.playerJoin.subscribe(m3 => {
    meow.methods.log("hello world");
    const now = meow.methods.getCurrentDate();
    meow.methods.setScoreForName("cache0", "time", now);
    return m3;
})
 */
mc.world.events.beforePistonActivate.subscribe(m4 => {
    piston(m4);
    return m4;
})
mc.world.events.beforeExplosion.subscribe(m5 => {
    explosion(m5);
    return m5;
})
mc.world.events.beforeItemUseOn.subscribe(m6 => {
    beforeItemUseOn(m6);
    return m6;
})

/*
mc.world.events.beforeItemUse.subscribe(m7 => {
    const now = meow.methods.getCurrentDate();
    meow.methods.setScoreForName("cache0", "time", now);
    beforeItemUse(m7);
    return m7;
})
 */

/*+==================分==界==线==================+*/

function pos(m) {
    let x = parseInt(m.sender.location.x);
    let y = parseInt(m.sender.location.y);
    let z = parseInt(m.sender.location.z);
    let msg = " x:" + x + ", y:" + y + ", z:" + z + " ";
    m.message = String(m.message).replace(/<pos>/g, `${msg}`);
}
function command(m) {
    if (String(m.message).startsWith("..")) {
        let cmd = String(m.message).split(".")[2].split(" ").filter((str) => { return str != "" });
        m.cancel = true;
        switch (cmd[0]) {
            case "test":
                meow.methods.log(`§fMeowHouseModule正在运行,请求来源:§3${m.sender.name}`);
                break;
            case "help":
                m.sender.runCommand(`tellraw @s {"rawtext":[{"text":"§r§fawa 还在编写中"}]}`);
                break;
            case "awa":
                m.sender.runCommand(`tellraw @s {"rawtext":[{"text":"§r§fawa"}]}`);
                if (m.sender.nameTag != "MiaoMiaoMax") return;
                let a = [
                    mc.MinecraftItemTypes.apple,

                    mc.MinecraftItemTypes.air,
                    mc.MinecraftItemTypes.endPortal,
                    mc.MinecraftItemTypes.portal,
                    mc.MinecraftItemTypes.endGateway,
                    mc.MinecraftItemTypes.invisibleBedrock
                ];
                for (let i = 0; i < a.length; i++) {
                    try {
                        let item = new mc.ItemStack(a[i], 1, 0);
                        m.sender.dimension.spawnItem(item, m.sender.location);
                    } catch(e) {meow.methods.log(e)};
                }
                /* 
                * try-1：
                * 奇奇怪怪
                * 为什么报：Unexpected type passed to function argument [0]
                * 
                * try-2:
                * 难道，改写法了？
                * 1.19.22还是正常的
                * 
                * try-3：
                * 好家伙，apple是好的，所以说
                * mojang nb
                 */
                break;
            default:
                m.sender.runCommand(`tellraw @s {"rawtext":[{"text":"§c未知的命令:${cmd[0]}。请检查命令是否存在，以及您对它是否拥有使用权限。\n输入 ..help 以查看所有命令"}]}`);
        }
    }
}

/*+==================分==界==线==================+*/

function blockBreak(m2) {
    meow.methods.addScoreForEntity("level0", m2.player);
    if (m2.dimension.getBlock(new mc.BlockLocation(m2.block.x, m2.block.y - 1, m2.block.z)).id == "meow:chaos_recloser") {
        const entityIntensify = {
            type:"meow:meow_mod",
            name:"§d§f§k§v§5§r§l§3刷新点§r",
            location:new mc.Location(m2.block.x + 0.5, m2.block.y + 1.5, m2.block.z + 0.5),
            closest:1,
            maxDistance:0.3
        }
        const querys = m2.dimension.getEntities(entityIntensify);
        for (const queryNoThis of querys) {
            const nowTime = [meow.methods.getCurrentDate(), meow.methods.getCurrentTime()];
            let playerGM = false;
            try { playerGM = m2.player.runCommand("testfor @s[m=!c]").victim.length } catch (e) { };
            if (queryNoThis.hasTag("bedrock")) {
                if (m2.brokenBlockPermutation.type.id == "minecraft:bedrock") {
                    if (playerGM) {
                        queryNoThis.runCommand("gamerule dotiledrops false");
                        meow.methods.setScoreForEntity("dotiledrops", queryNoThis);
                    }
                    try {
                        m2.player.runCommand("scoreboard players reset @s timingB");
                        queryNoThis.runCommand("scoreboard players reset @s timingB");
                    } catch (e) { };
                    queryNoThis.runCommand(`say @${m2.player.nameTag},为什么不见了`);
                }
                queryNoThis.removeTag("bedrock");
            }
            if (queryNoThis.hasTag("barrel")) {
                if (m2.brokenBlockPermutation.type.id == "minecraft:barrel" && playerGM) {
                    queryNoThis.runCommand("gamerule dotiledrops false");
                    meow.methods.setScoreForEntity("dotiledrops", queryNoThis);
                }
                queryNoThis.removeTag("barrel");
            }
            // if(queryNoThis.hasTag("air"))return;
            // queryNoThis.addTag("air");
            // meow.methods.log(m2.player.name+" §3awa");
            meow.methods.addScoreForEntity("level1", m2.player);
            let cache0 = meow.methods.getScoreForEntity("cache0", m2.player, false, true);
            let cache1 = meow.methods.getScoreForEntity("cache1", m2.player, false, true, 1);
            let level3 = meow.methods.getScoreForEntity("level3", m2.player, false, true);
            let timing0 = meow.methods.getScoreForEntity("timing0", queryNoThis, false, true);
            let timing1 = meow.methods.getScoreForEntity("timing1", queryNoThis, false, true);
            let timing2 = meow.methods.getScoreForEntity("timing2", queryNoThis, false, true);
            let timing3 = meow.methods.getScoreForEntity("timing3", queryNoThis, false, true);
            switch ("ScoreAU") {
                case cache0:
                case cache1:
                case level3:
                case timing0:
                case timing1:
                case timing2:
                case timing3:
                    meow.methods.log("严重错误:检测到核心不完整,请重新初始化核心");
                    // queryNoThis.removeTag("air");
                    return;
            }
            cache0++;
            meow.methods.addScoreForEntity("cache0", m2.player);
            if (cache0 >= cache1 && level3 < 100) {
                level3++;
                cache1 = Math.floor(cache1 + Math.sqrt(level3 * 2) + level3 * 9 + cache1 / (level3 * 2));
                meow.methods.setScoreForEntity("cache0", m2.player);
                meow.methods.setScoreForEntity("cache1", m2.player, cache1);
                meow.methods.addScoreForEntity("level3", m2.player);
                // if(level3==1)m2.player.runCommand(`function MeowHouseModule/Achievement/first_block`);
            }
            if (level3 < 100) m2.player.runCommand(`titleraw @s actionbar {"rawtext":[{"text":"§2xp:§a${cache0}/§b${cache1}, §6level:§e${level3}"}]}`);
            else m2.player.runCommand(`titleraw @s actionbar {"rawtext":[{"text":"§2xp:§a已满级, §6level:§e${level3}"}]}`);
            if ((nowTime[1] - timing0) >= 1) { timing0 = 0; meow.methods.setScoreForEntity("timing0", queryNoThis, nowTime[1]); };
            if (timing0 == 0) dfksj01(m2, nowTime, queryNoThis, level3, timing1, timing2, timing3);
            if (timing0 != 0) dfksj00(m2, nowTime, queryNoThis, level3);
            // dfksj00(m2, nowTime, queryNoThis, m2 level3);
            // queryNoThis.removeTag("air");
            return;
        }
    }
}

function dfksj00(m2, level3) {
    let a;
    if (level3 < 5) a = 0;
    else if (level3 < 10) a = 1;
    else a = 2;
    const blocks = [
        ["minecraft:log", 3, "old_log_type"],
        ["minecraft:log2", 1, "new_log_type"],
        ["minecraft:stone", 6, "stone_type"],
        ["minecraft:cobblestone", 0],
        ["minecraft:mossy_cobblestone", 0]
    ]
    const l = [[1, 2, -1, 3, -1], [1, 2, 3, 4, -1], [1, 2, 3, 4, 5]];
    const random0 = meow.methods.getRndInteger(1, meow.methods.arrNonNegative(l[a]));
    const random1 = meow.methods.getRndInteger(0, blocks[l[a].findIndex((_) => _ == random0)][1]);
    meow.methods.log(blocks[l[a].findIndex((_) => _ == random0)][0]);
    let b = mc.MinecraftBlockTypes.get(blocks[l[a].findIndex((_) => _ == random0)][0]).createDefaultBlockPermutation();
    if (random1 != 0) {
        const c = b.getProperty(blocks[l[a].findIndex((_) => _ == random0)][2]);
        b.getProperty(blocks[l[a].findIndex((_) => _ == random0)][2]).value = c.validValues[random1];
    }
    m2.block.setPermutation(b);
}

function dfksj01(m2, nowTime, queryNoThis, level3, timing1, timing2, timing3) {
    let i;
    if (level3 < 5) i = 0;
    else if (level3 < 7) i = 1;
    else if (level3 < 10) i = 2;
    else if (level3 < 12) i = 3;
    else if (level3 < 16) i = 4;
    else if (level3 < 20) i = 5;
    else if (level3 < 30) i = 6;
    else i = 7;
    let l1 = /* 事件 */[0, 0, 0, 5, 5, 5, 5, 5];
    let l2 = /* 箱子 */[0, 50, 40, 45, 50, 75, 95, 195];
    let l3 = /* 生物 */[0, 0, 20, 25, 25, 35, 40, 50];
    let l4 = /* 方块 */[100, 150, 190, 210, 220, 225, 230, 230];
    let l5 = /* 凑数 */500 - l1[i] - l2[i] - l3[i] - l4[i];
    let l6 = () => { let la = [];[l1[i], l2[i], l3[i], l4[i], l5].forEach((_, i) => { if (_ > 0) la.push(i + 1) }); return la }
    let random0 = meow.methods.getRndInteger(1, [l1[i], l2[i], l3[i], l4[i], l5].sort((a, b) => { return b - a }).shift(0, 0));
    let random1;
    // meow.methods.log(random0);
    let l = (a) => {
        let b = l6();
        let r = meow.methods.getRndInteger(0, b.length - 1);
        b.forEach((_) => {
            switch (_) {
                case 1: { l1[i] -= a; break; };
                case 2: { l2[i] -= a; break; };
                case 3: { l3[i] -= a; break; };
                case 4: { l4[i] -= a; break; };
                case 5: { l5 -= a; break; };
            }
        })
        random0 -= a;
        return b[r];
    }
    while (random0 >= 50) random1 = l(50);
    while (random0 >= 10) random1 = l(10);
    while (random0 >= 5) random1 = l(5);
    while (random0 > 0) random1 = l(1);
    random1 = 2;    //awa
    meow.methods.log(random1);
    switch (random1) {
        case 1:
            if ((nowTime[1] - timing1) >= 1200) { timing1 = 0; meow.methods.setScoreForEntity("timing1", queryNoThis); };
            if (timing1 == 0) dfksjE00(m2, nowTime, queryNoThis, level3); else dfksj00(m2, level3); break;
        case 2:
            if ((nowTime[1] - timing2) >= 600) { timing2 = 0; meow.methods.setScoreForEntity("timing2", queryNoThis); };
            if (timing2 == 0) dfksjC00(m2, nowTime, queryNoThis, level3); else dfksj00(m2, level3); break;
        case 3:
            if ((nowTime[1] - timing3) >= 600) { timing3 = 0; meow.methods.setScoreForEntity("timing3", queryNoThis); };
            if (timing3 == 0) dfksje00(m2, nowTime, queryNoThis, level3); else dfksj00(m2, level3); break;
        case 4: { dfksjB00(m2, nowTime, queryNoThis, level3); break; };
        case 5: { dfksj00(m2, level3); break; };
        default: { dfksj00(m2, level3); break; };
    }

    // const random0 = Math.floor((Math.random() * 500) + 1);
    // meow.methods.log(random0);
    // let i;
    // const l1 = /*事件*/[[-1, -1], [-1, -1], [-1, -1], [0, 5], [0, 5], [0, 5], [0, 5], [0, 5]];
    // const l2 = /*箱子*/[[-1, -1], [0, 50], [0, 40], [6, 50], [6, 65], [6, 80], [6, 100], [6, 200]];
    // const l3 = /*生物*/[[-1, -1], [-1, -1], [41, 60], [51, 75], [66, 90], [81, 115], [101, 140], [201, 250]];
    // const l4 = /*方块*/[[0, 100], [51, 200], [61, 250], [76, 270], [91, 295], [116, 325], [141, 355], [251, 470]];
    // const l5 = /*凑数*/[[101, 500], [201, 500], [251, 500], [271, 500], [296, 500], [326, 500], [356, 500], [471, 500]];
    // if (level3 < 5) i = 0;
    // else if (level3 < 7) i = 1;
    // else if (level3 < 10) i = 2;
    // else if (level3 < 12) i = 3;
    // else if (level3 < 16) i = 4;
    // else if (level3 < 20) i = 5;
    // else if (level3 < 30) i = 6;
    // else i = 7;
    // meow.methods.log(i);
    // if(random0 >= l1[i][0] && random0 <= l1[i][1] && timing1 == 0)dfksjE00(m2, nowTime, queryNoThis, level3);
    // if(random0 >= l2[i][0] && random0 <= l2[i][1] && timing2 == 0)dfksjC00(m2, nowTime, queryNoThis, level3);
    // if(random0 >= l3[i][0] && random0 <= l3[i][1] && timing3 == 0)dfksje00(m2, nowTime, queryNoThis, level3);
    // if(random0 >= l4[i][0] && random0 <= l4[i][1])dfksjB00(m2, nowTime, queryNoThis, level3);
    // if(random0 >= l5[i][0] && random0 <= l5[i][1])dfksj00(m2, level3);
    // if(random0 >= l1[i][0] && random0 <= l1[i][1] && timing1 != 0){dfksj00(m2, level3);meow.methods.log("miao");}
    // if(random0 >= l1[i][0] && random0 <= l1[i][1] && timing2 != 0){dfksj00(m2, level3);meow.methods.log("miao");}
    // if(random0 >= l1[i][0] && random0 <= l1[i][1] && timing3 != 0){dfksj00(m2, level3);meow.methods.log("miao");}
}

function dfksjE00(m2, nowTime, queryNoThis, level3) {/* 事件 */
    // meow.methods.setScoreForEntity("timing1", queryNoThis, nowTime[1]);
    meow.methods.addScoreForEntity("cache0", m2.player);
    let threshold0 = meow.methods.getScoreForEntity("threshold0", queryNoThis, false, true);
    if (threshold0 === "ScoreAU") {
        meow.methods.log("严重错误:检测到核心不完整,正在尝试修复");
        try { queryNoThis.runCommand("scoreboard objectives add threshold0 dummy 事件阈值") } catch (e) { meow.methods.log(`尝试修复失败，请重新初始化，失败原因：${e}`); return; };
        threshold0 = meow.methods.getScoreForEntity("threshold0", queryNoThis, false, true);
        if (threshold0 != "ScoreAU") meow.methods.log("修复成功");
    }
    if (threshold0 == 0 || nowTime[0] != threshold0.toString().slice(0, 6)) { threshold0 = (nowTime[0] + "00"); meow.methods.setScoreForEntity("threshold0", queryNoThis, threshold0); };
    // if (Number(threshold0.toString().slice(6, 8)) < 10) meow.methods.addScoreForEntity("threshold0", queryNoThis);
    // else { dfksj00(m2, level3); return; };
    let i;
    if (level3 < 16) i = 0;
    else if (level3 < 20) i = 1;
    else i = 2;
    let l1 = /* 1 */[0, 1, 1];
    let l2 = /* 2 */[1, 1, 2];
    let l3 = /* 3 */[1, 2, 2];
    let l6 = () => { let la = [];[l1[i], l2[i], l3[i]].forEach((_, i) => { if (_ > 0) la.push(i + 1) }); return la }
    let random0 = meow.methods.getRndInteger(1, [l1[i], l2[i], l3[i]].sort((a, b) => { return b - a }).shift(0, 0));
    let random1
    while (random0 > 0) {
        let arr = l6();
        let r = meow.methods.getRndInteger(0, arr.length - 1);
        arr.forEach((_) => {
            switch (_) {
                case 1: { l1[i]--; break; };
                case 2: { l2[i]--; break; };
                case 3: { l3[i]--; break; };
            }
        })
        random0--;
        random1 = arr[r];
    }
    random1 = 1;    //awa
    meow.methods.log(random1);
    let block;
    switch (random1) {
        case 1: { block = dfksjE10(m2, queryNoThis); break; };
        case 2: { block = dfksjE20(m2, queryNoThis); break; };
        // case 3: { block = dfksjE30(m2, queryNoThis); break; };
    }
    if (block) dfksj00(m2, level3);
}
function dfksjE01(m2, queryNoThis, events) {/* 事件-随机模块 */
    let arr = [];
    events.forEach((_) => arr.push(_[1]));
    let random0 = meow.methods.getRndInteger(1, arr.sort((a, b) => { return b - a }).shift(0, 0));
    arr = [[],[]];
    events.forEach((_) => arr[0].push(_[1]));
    let random1;
    while (random0 > 0) {
        arr[1] = [];
        arr[0].forEach((_, i) => { if (_ > 0) arr[1].push(i) });
        let r = meow.methods.getRndInteger(0, arr[1].length - 1);
        arr[1].forEach((_) => { arr[0][_]-- });
        random0--;
        random1 = arr[1][r];
    }
    random1 = 0;    // awa
    meow.methods.log(random1);
    return meow.theEvents.events(events[random1][0](m2, queryNoThis));
}
function dfksjE10(m2, queryNoThis) {
    meow.methods.addScoreForEntity("cache0", m2.player);
    return dfksjE01(m2, queryNoThis, meow.theEvents.events1());
}

function dfksjE20(m2, queryNoThis) {
    meow.methods.addScoreForEntity("cache0", m2.player);
    return dfksjE01(m2, queryNoThis, meow.theEvents.events2());
}

function dfksjC00(m2, nowTime, queryNoThis, level3) {/* 宝箱 */
    // meow.methods.setScoreForEntity("timing2", queryNoThis, nowTime[1]);
    meow.methods.addScoreForEntity("cache0", m2.player);
    queryNoThis.addTag("barrel");
    let threshold1 = meow.methods.getScoreForEntity("threshold1", queryNoThis, false, true);
    if (threshold1 === "ScoreAU") {
        meow.methods.log("严重错误:检测到核心不完整,正在尝试修复");
        try { queryNoThis.runCommand("scoreboard objectives add threshold1 dummy 事件阈值") } catch (e) { meow.methods.log(`尝试修复失败，请重新初始化，失败原因：${e}`); return; };
        threshold1 = meow.methods.getScoreForEntity("threshold1", queryNoThis, false, true);
        if (threshold1 != "ScoreAU") meow.methods.log("修复成功");
    }
    if (threshold1 == 0 || nowTime[0] != threshold1.toString().slice(0, 6)) { threshold1 = (nowTime[0] + "00"); meow.methods.setScoreForEntity("threshold1", queryNoThis, threshold1); };
    // if (Number(threshold1.toString().slice(6, 8)) < 10) meow.methods.addScoreForEntity("threshold1", queryNoThis);
    // else { dfksj00(m2, level3); return; };
    const barrel = mc.MinecraftBlockTypes.barrel.createDefaultBlockPermutation();
    barrel.getProperty("facing_direction").value = 1;
    m2.block.setPermutation(barrel);
    let i;
    if (level3 < 16) i = 0;
    else if (level3 < 20) i = 1;
    else i = 2;
    let l1 = /* 1 */[0, 1, 1];
    let l2 = /* 2 */[1, 1, 2];
    let l3 = /* 3 */[1, 2, 2];
    let l6 = () => { let la = [];[l1[i], l2[i], l3[i]].forEach((_, i) => { if (_ > 0) la.push(i + 1) }); return la }
    let random0 = meow.methods.getRndInteger(1, [l1[i], l2[i], l3[i]].sort((a, b) => { return b - a }).shift(0, 0));
    let random1
    while (random0 > 0) {
        let arr = l6();
        let r = meow.methods.getRndInteger(0, arr.length - 1);
        arr.forEach((_) => {
            switch (_) {
                case 1: { l1[i]--; break; };
                case 2: { l2[i]--; break; };
                case 3: { l3[i]--; break; };
            }
        })
        random0--;
        random1 = arr[r];
    }
    random1 = 1;    //awa
    meow.methods.log(random1);
    switch (random1) {
        case 1: { dfksjC10(m2); break; };
        // case 2: { dfksjC20(m2); break; };
        // case 3: { dfksjC30(m2); break; };
    }
}
function dfksjC01(m2, loots, random0Max, random0Min = 1) {/* 宝箱-随机模块 */
    let random0 = meow.methods.getRndInteger(random0Min, random0Max);
    let loot;
    let random1;
    while (random0 > 0) {
        loot = [];
        random0--;
        loots.forEach((_, i) => { if (_[0] >= 0) loot.push(i) });
        // meow.methods.log(loot.toString());
        random1 = meow.methods.getRndInteger(0, loot.length - 1);
        // meow.methods.log(loot[random1]);
        loots[loot[random1]][0]--;
    }
    meow.methods.log(loot[random1]);
    // const block = m2.dimension.getBlock(m2.block.location);
    // const inventoryComponent = block.getComponent("minecraft:inventory");
    // const inventoryContainer = inventoryComponent.container;
    // inventoryContainer.setItem(meow.methods.getRndInteger(0, 25), new ItemStack(Items.apple, meow.methods.getRndInteger(1, 32), 0));
    for (let i = 1; i < loots[loot[random1]].length; i++) {
        let slots = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26];
        while (loots[loot[random1]][i][1] > 0) {
            let random2 = meow.methods.getRndInteger(0, slots.length - 1);
            loots[loot[random1]][i][1]--;
            let minQ = 1;
            if (loots[loot[random1]][i].length > 4) minQ = loots[loot[random1]][i][4];
            m2.dimension.runCommand(`replaceitem block ${m2.block.x} ${m2.block.y} ${m2.block.z} slot.container ${slots[random2]} ${loots[loot[random1]][i][0]} ${meow.methods.getRndInteger(minQ, loots[loot[random1]][i][2])} ${loots[loot[random1]][i][3]}`)
            slots.splice(random2, 1);
        }
    }
}
function dfksjC10(m2) {
    dfksjC01(m2, meow.theChests.chests1(), 1);
}

function dfksje00(m2, nowTime, queryNoThis, level3) {/* 生物 */
    // meow.methods.setScoreForEntity("timing3", queryNoThis, nowTime[1]);
    let threshold3 = meow.methods.getScoreForEntity("threshold3", queryNoThis, false, true);
    if (threshold3 === "ScoreAU") {
        meow.methods.log("严重错误:检测到核心不完整,正在尝试修复");
        try { queryNoThis.runCommand("scoreboard objectives add threshold3 dummy 生物阈值") } catch (e) { meow.methods.log(`尝试修复失败，请重新初始化，失败原因：${e}`); return; };
        threshold3 = meow.methods.getScoreForEntity("threshold3", queryNoThis, false, true);
        if (threshold3 != "ScoreAU") meow.methods.log("修复成功");
    }
    if (threshold3 == 0 || nowTime[0] != threshold3.toString().slice(0, 6)) { threshold3 = (nowTime[0] + "00"); meow.methods.setScoreForEntity("threshold3", queryNoThis, threshold3); };
    // if (Number(threshold3.toString().slice(6, 8)) < 15) meow.methods.addScoreForEntity("threshold3", queryNoThis);
    // else { dfksj00(m2, level3); return; };
    let i;
    if (level3 < 12) i = 0;
    else if (level3 < 16) i = 1;
    else if (level3 < 20) i = 2;
    else if (level3 < 30) i = 3;
    else i = 4;
    let l1 = /* 稀有生物 */[0, 0, 0, 0, 1];
    let l2 = /* 主世界 */[5, 10, 30, 35, 40];
    let l3 = /* 下界 */[0, 0, 2, 3, 5];
    let l4 = /* 末地 */[0, 0, 1, 2, 3];
    let l6 = () => { let la = [];[l1[i], l2[i], l3[i], l4[i]].forEach((_, i) => { if (_ > 0) la.push(i + 1) }); return la }
    let random0 = meow.methods.getRndInteger(1, [l1[i], l2[i], l3[i], l4[i]].sort((a, b) => { return b - a }).shift(0, 0));
    let random1;
    let l = (a) => {
        let b = l6();
        let r = meow.methods.getRndInteger(0, b.length - 1);
        b.forEach((_) => {
            switch (_) {
                case 1: { l1[i] -= a; break; };
                case 2: { l2[i] -= a; break; };
                case 3: { l3[i] -= a; break; };
                case 4: { l4[i] -= a; break; };
            }
        })
        random0 -= a;
        return b[r];
    }
    while (random0 >= 10) random1 = l(10);
    while (random0 >= 5) random1 = l(5);
    while (random0 > 0) random1 = l(1);
    //random1 = 4;    //awa
    meow.methods.log(random1);

    switch (random1) {
        case 1: { dfksje10(m2); break; };
        case 2: { dfksje20(m2); break; };
        case 3: { dfksje30(m2); break; };
        case 4: { dfksje40(m2); break; };
    }
    dfksj00(m2, level3);
}
function dfksje01(m2, entitys, random0Max, random0Min, lifeTime) {/* 生物-随机模块 */
    let random0 = meow.methods.getRndInteger(random0Min, random0Max);
    // meow.methods.log(random0);
    let entity;
    let random1;
    while (random0 > 0) {
        entity = [];
        random0--;
        entitys.forEach((_, i) => { if (_[1] >= 0) entity.push(i) });
        // meow.methods.log(entity.toString());
        random1 = meow.methods.getRndInteger(0, entity.length - 1);
        // meow.methods.log(entity[random1]);
        entitys[entity[random1]][1]--;
    }
    meow.methods.log(entitys[entity[random1]][0]);
    const spwn = m2.dimension.spawnEntity(entitys[entity[random1]][0], new mc.BlockLocation(m2.block.x, m2.block.y + 1, m2.block.z));
    if (meow.methods.tyrScoreForEntity("lifeTime", spwn) === "ScoreAU") {
        meow.methods.log("严重错误:检测到核心不完整,正在尝试修复");
        try { m2.dimension.runCommand("scoreboard objectives add lifeTime dummy 生物寿命") } catch (e) { meow.methods.log(`尝试修复失败，请重新初始化，失败原因：${e}`); return; };
        meow.methods.log("修复成功");
    }
    meow.methods.setScoreForEntity("lifeTime", spwn, lifeTime);
}
function dfksje10(m2) {/* 稀有生物 */
    meow.methods.addScoreForEntity("cache0", m2.player);
    dfksje01(m2, meow.theEntitys.entitys1(), 1, 1, 6000);
}
function dfksje20(m2) {/* 主世界 */
    dfksje01(m2, meow.theEntitys.entitys2(), 3, 1, 1200);
}
function dfksje30(m2) {/* 下界 */
    dfksje01(m2, meow.theEntitys.entitys3(), 2, 1, 900);
}
function dfksje40(m2) {/* 末地 */
    dfksje01(m2, meow.theEntitys.entitys4(), 5, 1, 900);
}

function dfksjB00(m2, nowTime, queryNoThis, level3) {/* 方块 */
    let i;
    if (level3 < 5) i = 0;
    else if (level3 < 7) i = 1;
    else if (level3 < 10) i = 2;
    else if (level3 < 15) i = 3;
    else i = 4;
    let l1 = /* 贵重方块 */[0, 0, 1, 2, 2];
    let l2 = /* 矿物 */[10, 90, 70, 55, 35];
    let l3 = /* 主世界 */[5, 10, 30, 35, 40];
    let l4 = /* 下界 */[0, 0, 5, 10, 12];
    let l5 = /* 末地 */[0, 0, 2, 5, 10];
    let l6 = () => { let la = [];[l1[i], l2[i], l3[i], l4[i], l5[i]].forEach((_, i) => { if (_ > 0) la.push(i + 1) }); return la }
    let random0 = meow.methods.getRndInteger(1, [l1[i], l2[i], l3[i], l4[i], l5[i]].sort((a, b) => { return b - a }).shift(0, 0));
    let random1;
    // meow.methods.log([l1[i], l2[i], l3[i], l4[i], l5[i]].sort((a, b) => { return b - a }).shift(0, 0));
    // meow.methods.log(random0);
    let l = (a) => {
        let b = l6();
        let r = meow.methods.getRndInteger(0, b.length - 1);
        b.forEach((_) => {
            switch (_) {
                case 1: { l1[i] -= a; break; };
                case 2: { l2[i] -= a; break; };
                case 3: { l3[i] -= a; break; };
                case 4: { l4[i] -= a; break; };
                case 5: { l5[i] -= a; break; };
            }
        })
        random0 -= a;
        return b[r];
    }
    while (random0 >= 10) random1 = l(10);
    while (random0 >= 5) random1 = l(5);
    while (random0 > 0) random1 = l(1);
    //random1 = 1;    //awa
    meow.methods.log(random1);
    let threshold2 = meow.methods.getScoreForEntity("threshold2", queryNoThis, false, true);
    if (threshold2 === "ScoreAU") {
        meow.methods.log("严重错误:检测到核心不完整,正在尝试修复");
        try { queryNoThis.runCommand("scoreboard objectives add threshold2 dummy 贵重方块阈值") } catch (e) { meow.methods.log(`尝试修复失败，请重新初始化，失败原因：${e}`); return; };
        threshold2 = meow.methods.getScoreForEntity("threshold2", queryNoThis, false, true);
        if (threshold2 != "ScoreAU") meow.methods.log("修复成功");
    }
    // meow.methods.log(`${nowTime[0]}, ${threshold2.toString().slice(0, 6)}, ${Number(threshold2.toString().slice(6, 8))}`);
    // if(nowTime[0] != threshold2.toString().slice(0, 6))meow.methods.log(`aaaaaaaaaaaaaaaaaa`);
    switch (random1) {
        case 1:
            if (threshold2 == 0 || nowTime[0] != threshold2.toString().slice(0, 6)) { threshold2 = (nowTime[0] + "00"); meow.methods.setScoreForEntity("threshold2", queryNoThis, threshold2); };
            if (Number(threshold2.toString().slice(6, 8)) < 15) dfksjB10(m2, queryNoThis); /* meow.methods.log(`好，${threshold2}`); */
            else dfksj00(m2, level3);
            break;
        case 2: { dfksjB20(m2); break; };
        case 3: { dfksjB30(m2); break; };
        case 4: { dfksjB40(m2); break; };
        case 5: { dfksjB50(m2); break; };
        default: { dfksj00(m2, level3); break; };
    }
}
function dfksjB01(m2, blocks, random0Max, random0Min = 1) {/* 方块-随机模块 */
    let random0 = meow.methods.getRndInteger(random0Min, random0Max);
    // meow.methods.log(random0);
    let block;
    let random1;
    while (random0 > 0) {
        block = [];
        random0--;
        blocks.forEach((_, i) => { if (_[1] >= 0) block.push(i) });
        // meow.methods.log(block.toString());
        random1 = meow.methods.getRndInteger(0, block.length - 1);
        // meow.methods.log(block[random1]);
        blocks[block[random1]][1]--;
    }
    meow.methods.log(blocks[block[random1]][0]);
    const b = MinecraftBlockTypes.get(blocks[block[random1]][0]).createDefaultBlockPermutation();
    m2.block.setPermutation(b);
}
function dfksjB10(m2, queryNoThis) {/* 贵重方块 */
    meow.methods.addScoreForEntity("threshold2", queryNoThis);
    meow.methods.addScoreForEntity("cache0", m2.player);
    dfksjB01(m2, meow.theBlocks.blocks1(), 3);
}
function dfksjB20(m2) {/* 矿物 */
    dfksjB01(m2, meow.theBlocks.blocks2(), 12, 3);
}
function dfksjB30(m2) {/* 主世界 */
    dfksjB01(m2, meow.theBlocks.blocks3(), 10, 4);
}
function dfksjB40(m2) {/* 下界 */
    dfksjB01(m2, meow.theBlocks.blocks4(), 8, 2);
}
function dfksjB50(m2) {/* 末地 */
    dfksjB01(m2, meow.theBlocks.blocks5(), 3);
}

/*+==================分==界==线==================+*/

function piston(m4) {
    const a = m4.piston.attachedBlocks;// 受活塞影响的方块的location数组
    for (let i = 0; i < a.length; i++) {
        const block = m4.dimension.getBlock(a[i]).id;
        // let str = `§3dimension:§r${m4.dimension.id} §2x:${a[i].x}, y:${a[i].y}, z:${a[i].z} §3block:§r${block}`;
        switch (block) {
            case "minecraft:anvil":
            case "minecraft:sand":
            case "minecraft:gravel":
            case "minecraft:chest":
            case "minecraft:barrel":
            case "minecraft:trapped_chest":
            case "minecraft:frame":
            case "minecraft:glow_frame":
            case "minecraft:furnace":
            case "minecraft:lit_furnace":
            case "minecraft:blast_furnace":
            case "minecraft:lit_blast_furnace":
            case "minecraft:smoker":
            case "minecraft:lit_smoker":
            case "minecraft:concretepowder":
            case "minecraft:dispenser":
            case "minecraft:dropper":
                m4.cancel = true;
                // str += " §4是阻止对象";
                // break;
                return;
        }
        // meow.methods.log(str);
    }
}

/*+==================分==界==线==================+*/

function explosion(m5) {
    if (!m5.source) return;// 过滤没有实体的爆炸
    if (m5.source.hasTag("explosion")) return;// 过滤已有标签实体的爆炸，因为给代替的爆炸设置了source
    if (String(m5.source.id).startsWith("meow:")) return;// 过滤喵喵屋自己的东西
    m5.source.addTag("explosion");
    m5.cancel = true;
    const explosionOptions = new mc.ExplosionOptions();
    explosionOptions.breaksBlocks = false;
    explosionOptions.source = m5.source;// 防出现被自己炸的现象，例如：苦力怕被代替的爆炸炸死
    const explodeNoBlocksLoc = m5.source.location;
    let radius;
    switch (m5.source.id) {
        case "minecraft:creeper":
            radius = 3;
            if (m5.source.getComponent("minecraft:is_charged")) radius = 6;
            break;
        case "minecraft:ender_crystal":
            radius = 6;
            break;
        case "minecraft:fireball":
            radius = 1;
            break;
        case "minecraft:tnt_minecart":
            radius = 3;
            break;
        case "minecraft:tnt":
            radius = 4;
            break;
        case "minecraft:wither_skull_dangerous":
        case "minecraft:wither_skull":
            radius = 1;
            break;
        case "minecraft:wither":
            radius = 7;
            break;
        case "meow:radiation_area_effect_cloud":
            radius = 35;
            break;
        default:
            radius = 5;
    }
    const str = "§3dimension:§r" + m5.dimension.id + " §2x:" + parseInt(m5.source.location.x) + ", y:" + parseInt(m5.source.location.y) + ", z:" + parseInt(m5.source.location.z) + " §3source:§r" + m5.source.id + " §3radius:§r" + radius;
    meow.methods.log(str);
    // world.getDimension(m5.dimension.id).createExplosion(explodeNoBlocksLoc, 15, explosionOptions);
    m5.dimension.createExplosion(explodeNoBlocksLoc, radius, explosionOptions);
    m5.source.removeTag("explosion");
}

/*+==================分==界==线==================+*/

function beforeItemUseOn(m6) {
    try {
        const { item, source } = m6;
        const dimension = source.dimension;
        const block = dimension.getBlock(m6.blockLocation);
        if (block.id.startsWith("minecraft:")) {
            const blockPerm = block.permutation.getAllProperties();
            for (var i = 0; i < blockPerm.length; i++) {
                let str = blockPerm[i].name + " = " + blockPerm[i].value;
                meow.methods.log(str);
            }
        }
        // meow.methods.log(block.id);
        // meow.methods.log(item.id);
        // meow.methods.log(dimension);
        // meow.methods.log(source.id);
    } catch (e) { meow.methods.log(e) };
    return;

    // let b = MinecraftBlockTypes.get("minecraft:meow.methods.log").createDefaultBlockPermutation();
    // let c = b.getProperty("old_log_type")?.validValues;
    // let d = b.getProperty("old_log_type").value;
    // meow.methods.log(typeof(c));
    // meow.methods.log(d);

    // let b = MinecraftBlockTypes.get("minecraft:meow.methods.log").createDefaultBlockPermutation();
    // let c = b.getProperty("old_log_type");
    // let d = c.validValues;
    // let e = c.value;
    // meow.methods.log(typeof(d));
    // meow.methods.log(e);
}

/*
function beforeItemUse(m7){
    const { item, source } = m7;
    meow.methods.log(item.id);
    meow.methods.log(source.id);

    //kill
    // m7.source.kill();
}
 */

// 萌新造的破轮子(