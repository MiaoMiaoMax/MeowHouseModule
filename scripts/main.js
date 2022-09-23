/*
    本作品采用知识共享署名-非商业性-相同方式共享 4.0 国际许可协议进行许可。 要查看此许可证的副本，请访问
    https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh

    This work is licensed under the Creative Commons 署名-非商业性使用-相同方式共享 4.0 国际 License. To view a copy of this license, visit
    http://creativecommons.org/licenses/by-nc-sa/4.0/..
*/

import { world, ExplosionOptions, BlockLocation, MinecraftBlockTypes, ItemStack, MinecraftItemTypes, EntityQueryOptions, Location, MinecraftEffectTypes } from "mojang-minecraft";

/*+==================分==界==线==================+*/

//log
function log(a) {
    world.getDimension("overworld").runCommand(`say ${a}`);
}

//ScoreForName
function tyrScoreForName(a, b, getLog) {
    if (!world.scoreboard.getObjectives().find((_) => _.id == a)) {
        if (getLog) log(`tyrScore:错误,目标记分板(${a})不存在`);
        return "ScoreAU";
    }
    if (!world.scoreboard.getObjective(a).getScores().find((_) => _.participant.displayName == b)) {
        if (getLog) log(`tyrScore:错误,目标对象(${b})在目标记分板(${a})中未定义分数`);
        return "ScoreBU";
    }
    return "true";
}
function getScoreForName(a, b, getLog = false, rectify = false, c = 0) {
    if (tyrScoreForName(a, b, getLog) == "ScoreAU") return "ScoreAU";
    if (tyrScoreForName(a, b, getLog) == "ScoreBU" && !rectify) return "ScoreBU";
    if (tyrScoreForEntity(a, b, getLog) == "ScoreBU" && rectify) {
        setScoreForName(a, b, c);
        if (getLog) log(`自动纠正:已为目标对象(${b})在目标记分板(${a})中定义分数(${c})`);
        return c;
    }
    const score = world.scoreboard.getObjective(a).getScores().find((_) => _.participant.displayName == b).score;
    if (getLog) log(`getScore:目标对象(${b})在目标记分板(${a})中的分数为(${score})`);
    return score;
}
function setScoreForName(a, b, score = 0, getLog = false) {
    if (tyrScoreForName(a, b, getLog) == "ScoreAU") return;
    world.getDimension("overworld").runCommand(`scoreboard players set ${b} ${a} ${score}`);
    if (getLog) log(`setScore:将目标对象(${b})在目标记分板(${a})中的分数设为(${score})`);
}
function addScoreForName(a, b, c = 1, getLog = false, isReturn = false) {
    if (tyrScoreForName(a, b, getLog) == "ScoreAU") return log(`addScore:错误,目标记分板(${a})不存在`);
    const score = getScoreForName(a, b, false, true);
    world.getDimension("overworld").runCommand(`scoreboard players add ${b} ${a} ${c}`);
    if (getLog) log(`addScore:目标对象(${b})在目标记分板(${a})中的分数现为(${score}+${c}=${score + c})`);
    if (isReturn) return score;
}

//ScoreForEntity
function tyrScoreForEntity(a, b, getLog) {
    if (!world.scoreboard.getObjectives().find((_) => _?.id == a)) {
        if (getLog) log(`tyrScore:错误,目标记分板(${a})不存在`);
        return "ScoreAU";
    }
    if (!world.scoreboard.getObjective(a).getScores().find((_) => _.participant.id == b.scoreboard?.id)) {
        if (getLog) log(`tyrScore:错误,目标对象(${b.id})在目标记分板(${a})中未定义分数`);
        return "ScoreBU";
    }
    return "true";
}
function getScoreForEntity(a, b, getLog = false, rectify = false, c = 0) {
    if (tyrScoreForEntity(a, b, getLog) == "ScoreAU") return "ScoreAU";
    if (tyrScoreForEntity(a, b, getLog) == "ScoreBU" && !rectify) return "ScoreBU";
    if (tyrScoreForEntity(a, b, getLog) == "ScoreBU" && rectify) {
        setScoreForEntity(a, b, c);
        if (getLog) log(`自动纠正:已为目标对象(${b.id})在目标记分板(${a})中定义分数(${c})`);
        return c;
    }
    const score = world.scoreboard.getObjective(a).getScores().find((_) => _.participant.id == b.scoreboard.id).score;
    if (getLog) log(score);
    return score;
}
function setScoreForEntity(a, b, score = 0, getLog = false) {
    if (tyrScoreForEntity(a, b, getLog) == "ScoreAU") return;
    b.runCommand(`scoreboard players set @s ${a} ${score}`);
    if (getLog) log(`setScore:将目标对象(${b, id})在目标记分板(${a})中的分数设为(${score})`);
}
function addScoreForEntity(a, b, c = 1, getLog = false, isReturn = false) {
    if (tyrScoreForEntity(a, b, getLog) == "ScoreAU") return log(`addScore:错误,目标记分板(${a})不存在`);
    const score = getScoreForEntity(a, b, false, true);
    b.runCommand(`scoreboard players add @s ${a} ${c}`);
    if (getLog) log(`addScore:目标对象(${b.id})在目标记分板(${a})中的分数现为(${score}+${c}=${score + c})`);
    if (isReturn) return score;
}

//getTime
function getNowTime() {
    const now = new Date;
    const timeY = `${now.getFullYear()}`.slice(2);  //年
    let timeM;                                      //月
    let timeD;                                      //日
    let timeH;                                      //时
    let timem;                                      //分
    let timeS;                                      //秒
    if ((now.getMonth() + 1) < 10) timeM = `0${now.getMonth() + 1}`;
    else timeM = `${now.getMonth() + 1}`;
    if (now.getDate() === 0) timeD = `00`;
    else if (now.getDate() < 10) timeD = `0${now.getDate()}`;
    else timeD = `${now.getDate()}`;
    if (now.getHours() === 0) timeH = `00`;
    else if (now.getHours() < 10) timeH = `0${now.getHours()}`;
    else timeH = `${now.getHours()}`;
    if (now.getMinutes() === 0) timem = `00`;
    else if (now.getMinutes() < 10) timem = `0${now.getMinutes()}`;
    else timem = `${now.getMinutes()}`;
    if (now.getSeconds() === 0) timeS = `00`;
    else if (now.getSeconds() < 10) timeS = `0${now.getSeconds()}`;
    else timeS = `${now.getSeconds()}`;
    let time = [timeY, timeM, timeD, timeH, timem, timeS];
    return time;
}
function getCurrentDate() {
    let now = getNowTime();
    let time = now[0] + now[1] + now[2];
    return time;
}
function getCurrentTime() {
    let now = getNowTime();
    let time = now[1] + now[2] + now[3] + now[4] + now[5];
    return time;
}

//关于数值的相关操作
function getRndInteger(min, max) {
    if (min == max) return min;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function arrSum(arr) {
    let sum = 0;
    arr.forEach((_) => { sum += _ });
    return sum;
}
function arrNonNegative(arr) {
    let a = 0;
    arr.forEach((_) => { if (_ >= 0) a++ });
    return a;
}
/*+==================分==界==线==================+*/

world.events.beforeChat.subscribe(m => {
    pos(m);
    command(m);
    return m;
})
world.events.blockBreak.subscribe(m2 => {
    blockBreak(m2);
    return m2;
})
/*
world.events.playerJoin.subscribe(m3 => {
    log("hello world");
    const now = getCurrentDate();
    setScoreForName("cache0", "time", now);
    return m3;
})
 */
world.events.beforePistonActivate.subscribe(m4 => {
    piston(m4);
    return m4;
})
world.events.beforeExplosion.subscribe(m5 => {
    explosion(m5);
    return m5;
})
/*
world.events.beforeItemUseOn.subscribe(m6 => {
    beforeItemUseOn(m6);
    return m6;
})
 */
/*
world.events.beforeItemUse.subscribe(m7 => {
    const now = getCurrentDate();
    setScoreForName("cache0", "time", now);
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
                log(`§fMeowHouseModule正在运行,请求来源:§3${m.sender.name}`);
                break;
            case "help":
                m.sender.runCommand(`tellraw @s {"rawtext":[{"text":"§r§fawa 还在编写中"}]}`);
                break;
            case "awa":
                m.sender.runCommand(`tellraw @s {"rawtext":[{"text":"§r§fawa"}]}`);
                if (m.sender.nameTag != "MiaoMiaoMax") return;
                let a = [ /*MinecraftItemTypes.debugStick,*/ MinecraftItemTypes.endPortal, MinecraftItemTypes.portal, MinecraftItemTypes.endGateway, MinecraftItemTypes.invisibleBedrock];
                for (let i = 0; i < a.length; i++) {
                    let item = new ItemStack(a[i], 1, 0);
                    world.getDimension(m.sender.dimension.id).spawnItem(item, m.sender.location);
                }
                break;
            default:
                m.sender.runCommand(`tellraw @s {"rawtext":[{"text":"§c未知的命令:${cmd[0]}。请检查命令是否存在，以及您对它是否拥有使用权限。\n输入 ..help 以查看所有命令"}]}`);
        }
    }
}

/*+==================分==界==线==================+*/

function blockBreak(m2) {
    addScoreForEntity("level0", m2.player);
    if (world.getDimension(m2.block.dimension.id).getBlock(new BlockLocation(m2.block.location.x, m2.block.location.y - 1, m2.block.location.z)).id == "minecraft:allow") {
        const query = new EntityQueryOptions();
        query.type = "meow:meow_mod";
        query.location = new Location(m2.block.location.x + 0.5, m2.block.location.y + 1.5, m2.block.location.z + 0.5);
        log(`${query.location.x},${query.location.y},${query.location.z}`);
        const querys = world.getDimension(m2.block.dimension.id).getEntities(query);
        for (const queryNoThis of querys) {
            if (queryNoThis.nameTag == "§d§f§k§v§5§r§l§3刷新点§r" && queryNoThis.location.isNear(query.location, 0.4)) {
                const nowTime = [getCurrentDate(), getCurrentTime()];
                if (queryNoThis.hasTag("bedrock")) {
                    if (m2.brokenBlockPermutation.type.id == "minecraft:bedrock") {
                        try { m2.player.runCommand("scoreboard players reset @s timingB") } catch (e) { };
                        try { queryNoThis.runCommand("scoreboard players reset @s timingB") } catch (e) { };
                        queryNoThis.runCommand(`say @${m2.player.nameTag},为什么不见了`);
                    }
                    queryNoThis.removeTag("bedrock");
                }
                // if(queryNoThis.hasTag("air"))return;
                // queryNoThis.addTag("air");
                // log(m2.player.name+" §3awa");
                addScoreForEntity("level1", m2.player);
                let cache0 = getScoreForEntity("cache0", m2.player, false, true);
                let cache1 = getScoreForEntity("cache1", m2.player, false, true, 1);
                let level3 = getScoreForEntity("level3", m2.player, false, true);
                let timing0 = getScoreForEntity("timing0", queryNoThis, false, true);
                let timing1 = getScoreForEntity("timing1", queryNoThis, false, true);
                let timing2 = getScoreForEntity("timing2", queryNoThis, false, true);
                let timing3 = getScoreForEntity("timing3", queryNoThis, false, true);
                switch ("ScoreAU") {
                    case cache0:
                    case cache1:
                    case level3:
                    case timing0:
                    case timing1:
                    case timing2:
                    case timing3:
                        log("严重错误:检测到核心不完整,请重新初始化核心");
                        // queryNoThis.removeTag("air");
                        return;
                }
                cache0++;
                addScoreForEntity("cache0", m2.player);
                if (cache0 >= cache1 && level3 < 100) {
                    level3++;
                    cache1 = Math.floor(cache1 + Math.sqrt(level3 * 2) + level3 * 9 + cache1 / (level3 * 2));
                    setScoreForEntity("cache0", m2.player);
                    setScoreForEntity("cache1", m2.player, cache1);
                    addScoreForEntity("level3", m2.player);
                    // if(level3==1)m2.player.runCommand(`function MeowHouseModule/Achievement/first_block`);
                }
                // log(`§2xp:§a${cache0}, §3升到下一级所需xp:§b${cache1}, §6玩家等级:§e${level3}`);
                if (level3 < 100) m2.player.runCommand(`titleraw @s actionbar {"rawtext":[{"text":"§2经验:§a${cache0}/§b${cache1}, §6等级:§e${level3}"}]}`);
                else m2.player.runCommand(`titleraw @s actionbar {"rawtext":[{"text":"§2经验:§a已满级, §6level:§e${level3}"}]}`);

                if ((nowTime[1] - timing0) >= 1) { timing0 = 0; setScoreForEntity("timing0", queryNoThis, nowTime[1]); };
                if (timing0 == 0) dfksj01(m2, nowTime, queryNoThis, level3, timing1, timing2, timing3);
                if (timing0 != 0) dfksj00(m2, nowTime, queryNoThis, level3);

                // dfksj00(m2, nowTime, queryNoThis, m2 level3);

                // queryNoThis.removeTag("air");
                break;
            }
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
    const random0 = getRndInteger(1, arrNonNegative(l[a]));
    const random1 = getRndInteger(0, blocks[l[a].findIndex((_) => _ == random0)][1]);
    log(blocks[l[a].findIndex((_) => _ == random0)][0]);
    let b = MinecraftBlockTypes.get(blocks[l[a].findIndex((_) => _ == random0)][0]).createDefaultBlockPermutation();
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
    let random0 = getRndInteger(1, [l1[i], l2[i], l3[i], l4[i], l5].sort((a, b) => { return b - a }).shift(0, 0));
    let random1;
    // log(random0);
    let l = (a) => {
        let b = l6();
        let r = getRndInteger(0, b.length - 1);
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
    while (random0 >= 1) random1 = l(1);
    random1 = 1;    //awa
    log(random1);
    switch (random1) {
        case 1:
            if ((nowTime[1] - timing1) >= 1200) { timing1 = 0; setScoreForEntity("timing1", queryNoThis); };
            if (timing1 == 0) dfksjE00(m2, nowTime, queryNoThis, level3); else dfksj00(m2, level3); break;
        case 2:
            if ((nowTime[1] - timing2) >= 600) { timing2 = 0; setScoreForEntity("timing2", queryNoThis); };
            if (timing2 == 0) dfksjC00(m2, nowTime, queryNoThis, level3); else dfksj00(m2, level3); break;
        case 3:
            if ((nowTime[1] - timing3) >= 600) { timing3 = 0; setScoreForEntity("timing3", queryNoThis); };
            if (timing3 == 0) dfksje00(m2, nowTime, queryNoThis, level3); else dfksj00(m2, level3); break;
        case 4: { dfksjB00(m2, nowTime, queryNoThis, level3); break; };
        case 5: { dfksj00(m2, level3); break; };
        default: { dfksj00(m2, level3); break; };
    }

    // const random0 = Math.floor((Math.random() * 500) + 1);
    // log(random0);
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
    // log(i);
    // if(random0 >= l1[i][0] && random0 <= l1[i][1] && timing1 == 0)dfksjE00(m2, nowTime, queryNoThis, level3);
    // if(random0 >= l2[i][0] && random0 <= l2[i][1] && timing2 == 0)dfksjC00(m2, nowTime, queryNoThis, level3);
    // if(random0 >= l3[i][0] && random0 <= l3[i][1] && timing3 == 0)dfksje00(m2, nowTime, queryNoThis, level3);
    // if(random0 >= l4[i][0] && random0 <= l4[i][1])dfksjB00(m2, nowTime, queryNoThis, level3);
    // if(random0 >= l5[i][0] && random0 <= l5[i][1])dfksj00(m2, level3);
    // if(random0 >= l1[i][0] && random0 <= l1[i][1] && timing1 != 0){dfksj00(m2, level3);log("miao");}
    // if(random0 >= l1[i][0] && random0 <= l1[i][1] && timing2 != 0){dfksj00(m2, level3);log("miao");}
    // if(random0 >= l1[i][0] && random0 <= l1[i][1] && timing3 != 0){dfksj00(m2, level3);log("miao");}
}


function dfksjE00(m2, nowTime, queryNoThis, level3) {/* 事件 */
    // setScoreForEntity("timing1", queryNoThis, nowTime[1])
    let threshold0 = getScoreForEntity("threshold0", queryNoThis, false, true);
    if (threshold0 === "ScoreAU") {
        log("严重错误:检测到核心不完整,正在尝试修复");
        try { queryNoThis.runCommand("scoreboard objectives add threshold0 dummy 事件阈值") } catch (e) { log(`尝试修复失败，请重新初始化，失败原因：${e}`); return; };
        threshold0 = getScoreForEntity("threshold0", queryNoThis, false, true);
        if (threshold0 != "ScoreAU") log("修复成功");
    }
    if (threshold0 == 0 || nowTime[0] != threshold0.toString().slice(0, 6)) { threshold0 = (nowTime[0] + "00"); setScoreForEntity("threshold0", queryNoThis, threshold0); };
    // if (Number(threshold0.toString().slice(6, 8)) < 10) addScoreForEntity("threshold0", queryNoThis);
    // else { dfksj00(m2, level3); return; };
    let i;
    if (level3 < 16) i = 0;
    else if (level3 < 20) i = 1;
    else i = 2;
    let l1 = /* 1 */[0, 1, 1];
    let l2 = /* 2 */[1, 1, 2];
    let l3 = /* 3 */[1, 2, 2];
    let l6 = () => { let la = [];[l1[i], l2[i], l3[i]].forEach((_, i) => { if (_ > 0) la.push(i + 1) }); return la }
    let random0 = getRndInteger(1, [l1[i], l2[i], l3[i]].sort((a, b) => { return b - a }).shift(0, 0));
    let random1
    while (random0 >= 1) {
        let arr = l6();
        let r = getRndInteger(0, arr.length - 1);
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
    random1 = 2;    //awa
    log(random1);
    let block;
    switch (random1) {
        case 1: { block = dfksjE10(m2, queryNoThis); break; };
        case 2: { block = dfksjE20(m2, queryNoThis); break; };
        // case 3: { block = dfksjE30(m2, queryNoThis); break; };
    }
    if (block) dfksj00(m2, level3);
}
function dfksjE01(m2, queryNoThis, i, events) {
    let i1 = () => { let la = []; i.forEach((_, i) => { if (_ > 0) la.push(i) }); return la }
    let random0 = getRndInteger(1, new Array(i).sort((a, b) => { return b - a }).shift(0, 0));
    let random1;
    while (random0 >= 1) {
        let arr = i1();
        let r = getRndInteger(0, arr.length - 1);
        arr.forEach((_) => { i[_]-- });
        random0--;
        random1 = arr[r];
    }
    random1 = 1;
    log(random1);
    return events[random1](m2, queryNoThis);
}
function dfksjE10(m2, queryNoThis) {
    addScoreForEntity("cache0", m2.player);
    let i = [1, 2];
    let events = [
        dfksjE_bedrock,/* 基岩 */
        dfksjE_justiceFromHeaven/* 天降正义 */
    ]
    return dfksjE01(m2, queryNoThis, i, events);
}
function dfksjE_bedrock(m2, queryNoThis) {
    if (tyrScoreForEntity("timingB", queryNoThis) === "ScoreAU") {
        log("严重错误:检测到核心不完整,正在尝试修复");
        try { queryNoThis.runCommand("scoreboard objectives add timingB dummy bedrock_cd") } catch (e) { log(`尝试修复失败，请重新初始化，失败原因：${e}`); return true; };
        log("修复成功");
    }
    setScoreForEntity("timingB", queryNoThis, 600);
    setScoreForEntity("timingB", m2.player, 600);
    const block = MinecraftBlockTypes.bedrock.createDefaultBlockPermutation();
    m2.block.setPermutation(block);
    queryNoThis.runCommand(`say @${m2.player.name},看这是什么`);
    queryNoThis.addTag("bedrock");
    return false;
}
function dfksjE_justiceFromHeaven(m2, queryNoThis) {
    queryNoThis.runCommand(`say @${m2.player.name},天降正义`);
    const explosionOptions = new ExplosionOptions();
    explosionOptions.breaksBlocks = false;
    const explodeNoBlocksLoc = m2.player.location;
    m2.dimension.createExplosion(explodeNoBlocksLoc, 5, explosionOptions);
    m2.dimension.spawnEntity("minecraft:lightning_bolt", m2.player.location);
    m2.dimension.spawnEntity("minecraft:lightning_bolt", m2.player.location);
    m2.dimension.spawnEntity("minecraft:lightning_bolt", m2.player.location);
    return true;
}

function dfksjE20(m2, queryNoThis) {
    addScoreForEntity("cache0", m2.player);
    let i = [1, 3];
    let events = [
        dfksjE_bigSurprise,/* 有惊有险 */
        dfksjE_zombieSiege/* 僵尸围岛 */
    ]
    return dfksjE01(m2, queryNoThis, i, events);
}
function dfksjE_bigSurprise(m2, queryNoThis) {
    queryNoThis.runCommand(`say @${m2.player.name},《大惊喜》`);
    const creeper = m2.dimension.spawnEntity("minecraft:creeper<minecraft:become_charged>", m2.player.location);
    creeper.triggerEvent("minecraft:start_exploding");
    return true;
}
function dfksjE_zombieSiege(m2, queryNoThis) {
    queryNoThis.runCommand(`say @${m2.player.name},僵尸围岛`);
    for (let i = 0; i < 10; i++) {
        const zombie = m2.dimension.spawnEntity("minecraft:zombie", m2.player.location);
        zombie.addEffect(MinecraftEffectTypes.fireResistance, 12000, 0, false);
    }
    // m2.dimension.spawnEntity("iron_golem", m2.player.location);
    // m2.dimension.spawnEntity("iron_golem", m2.player.location);
    // m2.dimension.spawnEntity("iron_golem", m2.player.location);
    return true;
}

function dfksjC00(m2, nowTime, queryNoThis, level3) {/* 箱子 */
    setScoreForEntity("timing2", queryNoThis, nowTime[1])
}


function dfksje00(m2, nowTime, queryNoThis, level3) {/* 生物 */
    // setScoreForEntity("timing3", queryNoThis, nowTime[1])
    let threshold3 = getScoreForEntity("threshold3", queryNoThis, false, true);
    if (threshold3 === "ScoreAU") {
        log("严重错误:检测到核心不完整,正在尝试修复");
        try { queryNoThis.runCommand("scoreboard objectives add threshold3 dummy 生物阈值") } catch (e) { log(`尝试修复失败，请重新初始化，失败原因：${e}`); return; };
        threshold3 = getScoreForEntity("threshold3", queryNoThis, false, true);
        if (threshold3 != "ScoreAU") log("修复成功");
    }
    if (threshold3 == 0 || nowTime[0] != threshold3.toString().slice(0, 6)) { threshold3 = (nowTime[0] + "00"); setScoreForEntity("threshold3", queryNoThis, threshold3); };
    // if (Number(threshold3.toString().slice(6, 8)) < 15) addScoreForEntity("threshold3", queryNoThis);
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
    let random0 = getRndInteger(1, [l1[i], l2[i], l3[i], l4[i]].sort((a, b) => { return b - a }).shift(0, 0));
    let random1;
    let l = (a) => {
        let b = l6();
        let r = getRndInteger(0, b.length - 1);
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
    while (random0 >= 1) random1 = l(1);
    // random1 = 1;    //awa
    log(random1);

    switch (random1) {
        case 1: { dfksje10(m2); break; };
        case 2: { dfksje20(m2); break; };
        case 3: { dfksje30(m2); break; };
        case 4: { dfksje40(m2); break; };
    }
    dfksj00(m2, level3);
}
function dfksje01(m2, entitys, random0Max, random0Min = 1, lifeTime) {/* 生物-随机模块 */
    let random0 = getRndInteger(random0Min, random0Max);
    // log(random0);
    let entity;
    let random1;
    while (random0 >= 1) {
        entity = [];
        random0--;
        entitys.forEach((_, i) => { if (_[1] >= 0) entity.push(i) });
        // log(entity.toString());
        random1 = getRndInteger(0, entity.length - 1);
        // log(entity[random1]);
        entitys[entity[random1]][1]--;
    }
    log(entitys[entity[random1]][0]);
    const spwn = m2.dimension.spawnEntity(entitys[entity[random1]][0], new BlockLocation(m2.block.x, m2.block.y + 1, m2.block.z));
    if (tyrScoreForEntity("lifeTime", spwn) === "ScoreAU") {
        log("严重错误:检测到核心不完整,正在尝试修复");
        try { m2.dimension.runCommand("scoreboard objectives add lifeTime dummy 生物寿命") } catch (e) { log(`尝试修复失败，请重新初始化，失败原因：${e}`); return; };
        log("修复成功");
    }
    setScoreForEntity("lifeTime", spwn, lifeTime);
}
function dfksje10(m2) {/* 稀有生物 */
    addScoreForEntity("cache0", m2.player);
    let entitys = [
        ["minecraft:mooshroom", 1]      /* 哞菇 */
    ];
    dfksje01(m2, entitys, 1, 1, 6000);
}
function dfksje20(m2) {/* 主世界 */
    let entitys = [
        ["minecraft:bat", 1],           /* 蝙蝠 */
        ["minecraft:cave_spider", 1],   /* 洞穴蜘蛛 */
        ["minecraft:chicken", 3],       /* 鸡 */
        ["minecraft:cow", 3],           /* 牛 */
        ["minecraft:creeper", 1],       /* 苦力怕 */
        ["minecraft:drowned", 2],       /* 溺尸 */
        ["minecraft:husk", 2],          /* 尸壳 */
        ["minecraft:iron_golem", 1],    /* 铁傀儡 */
        ["minecraft:phantom", 2],       /* 幻翼 */
        ["minecraft:pig", 3],           /* 猪 */
        ["minecraft:rabbit", 1],        /* 兔子 */
        ["minecraft:sheep", 3],         /* 绵羊 */
        ["minecraft:skeleton", 2],      /* 骷髅 */
        ["minecraft:slime", 1],         /* 史莱姆 */
        ["minecraft:spider", 2],        /* 蜘蛛 */
        ["minecraft:vex", 1],           /* 恼鬼 */
        ["minecraft:witch", 1],         /* 女巫 */
        ["minecraft:zombie", 2]         /* 僵尸 */
    ];
    dfksje01(m2, entitys, 3, 1, 1200);
}
function dfksje30(m2) {/* 下界 */
    let entitys = [
        ["minecraft:blaze", 1],         /* 烈焰人 */
        ["minecraft:hoglin", 2],        /* 疣猪兽 */
        ["minecraft:magma_cube", 1],    /* 岩浆怪 */
        ["minecraft:strider", 1],       /* 炽足兽 */
        ["minecraft:zoglin", 1],        /* 僵尸疣猪兽 */
        ["minecraft:zombie_pigman", 2]  /* 僵尸猪灵 */
    ];
    dfksje01(m2, entitys, 2, 1, 900);
}
function dfksje40(m2) {/* 末地 */
    let entitys = [
        ["minecraft:enderman", 2],      /* 末影人 */
        ["minecraft:endermite", 1]      /* 末影螨 */
    ];
    dfksje01(m2, entitys, 2, 1, 900);
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
    let random0 = getRndInteger(1, [l1[i], l2[i], l3[i], l4[i], l5[i]].sort((a, b) => { return b - a }).shift(0, 0));
    let random1;
    // log([l1[i], l2[i], l3[i], l4[i], l5[i]].sort((a, b) => { return b - a }).shift(0, 0));
    // log(random0);
    let l = (a) => {
        let b = l6();
        let r = getRndInteger(0, b.length - 1);
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
    while (random0 >= 1) random1 = l(1);
    // random1 = 1;    //awa
    log(random1);
    let threshold2 = getScoreForEntity("threshold2", queryNoThis, false, true);
    if (threshold2 === "ScoreAU") {
        log("严重错误:检测到核心不完整,正在尝试修复");
        try { queryNoThis.runCommand("scoreboard objectives add threshold2 dummy 贵重方块阈值") } catch (e) { log(`尝试修复失败，请重新初始化，失败原因：${e}`); return; };
        threshold2 = getScoreForEntity("threshold2", queryNoThis, false, true);
        if (threshold2 != "ScoreAU") log("修复成功");
    }
    // log(`${nowTime[0]}, ${threshold2.toString().slice(0, 6)}, ${Number(threshold2.toString().slice(6, 8))}`);
    // if(nowTime[0] != threshold2.toString().slice(0, 6))log(`aaaaaaaaaaaaaaaaaa`);
    switch (random1) {
        case 1:
            if (threshold2 == 0 || nowTime[0] != threshold2.toString().slice(0, 6)) { threshold2 = (nowTime[0] + "00"); setScoreForEntity("threshold2", queryNoThis, threshold2); };
            if (Number(threshold2.toString().slice(6, 8)) < 15) dfksjB10(m2, queryNoThis); /* log(`好，${threshold2}`); */
            else dfksj00(m2, level3);
            break;
        case 2: { dfksjB20(m2, queryNoThis); break; };
        case 3: { dfksjB30(m2, queryNoThis); break; };
        case 4: { dfksjB40(m2, queryNoThis); break; };
        case 5: { dfksjB50(m2, queryNoThis); break; };
        default: { dfksj00(m2, level3); break; };
    }
}
function dfksjB01(m2, blocks, random0Max, random0Min = 1) {/* 方块-随机模块 */
    let random0 = getRndInteger(random0Min, random0Max);
    // log(random0);
    let block;
    let random1;
    while (random0 >= 1) {
        block = [];
        random0--;
        blocks.forEach((_, i) => { if (_[1] >= 0) block.push(i) });
        // log(block.toString());
        random1 = getRndInteger(0, block.length - 1);
        // log(block[random1]);
        blocks[block[random1]][1]--;
    }
    log(blocks[block[random1]][0]);
    let b = MinecraftBlockTypes.get(blocks[block[random1]][0]).createDefaultBlockPermutation();
    m2.block.setPermutation(b);
}
function dfksjB10(m2, queryNoThis) {/* 贵重方块 */
    addScoreForEntity("threshold2", queryNoThis);
    addScoreForEntity("cache0", m2.player);
    let blocks = [
        ["minecraft:ancient_debris", 1],            /* 远古残骸 */
        ["minecraft:deepslate_diamond_ore", 1],     /* 深层钻石矿石 */
        ["minecraft:diamond_ore", 2],               /* 钻石矿石 */
        ["minecraft:deepslate_emerald_ore", 2],     /* 深层绿宝石矿石 */
        ["minecraft:emerald_ore", 3],               /* 绿宝石矿石 */
        ["minecraft:gilded_blackstone", 1]          /* 镶金黑石 */
    ];
    dfksjB01(m2, blocks, 3);
}
function dfksjB20(m2, queryNoThis) {/* 矿物 */
    let blocks = [
        // ["minecraft:diamond_ore", 1],
        // ["minecraft:emerald_ore", 1],
        ["minecraft:deepslate_gold_ore", 1],        /* 深层金矿石 */
        ["minecraft:gold_ore", 2],                  /* 金矿石 */
        ["minecraft:deepslate_redstone_ore", 1],    /* 深层红石矿石 */
        ["minecraft:redstone_ore", 2],              /* 红石矿石 */
        ["minecraft:deepslate_lapis_ore", 2],       /* 深层青金石矿石 */
        ["minecraft:lapis_ore", 4],                 /* 青金石矿石 */
        ["minecraft:deepslate_copper_ore", 1],      /* 深层铜矿石 */
        ["minecraft:copper_ore", 2],                /* 铜矿石 */
        ["minecraft:deepslate_iron_ore", 4],        /* 深层铁矿石 */
        ["minecraft:iron_ore", 10],                 /* 铁矿石 */
        // ["minecraft:iron_block", 1],
        ["minecraft:deepslate_coal_ore", 5],        /* 深层煤矿石 */
        ["minecraft:coal_ore", 12],                 /* 煤矿石 */
        ["minecraft:coal_block", 2]                 /* 煤炭块 */
    ];
    dfksjB01(m2, blocks, 12, 3);
}
function dfksjB30(m2, queryNoThis) {/* 主世界 */
    let blocks = [
        ["minecraft:amethyst_block", 1],            /* 紫水晶块 */
        ["minecraft:azalea_leaves", 2],             /* 杜鹃树叶 */
        ["minecraft:azalea_leaves_flowered", 1],    /* 盛开的杜鹃树叶 */
        ["minecraft:blue_glazed_terracotta", 1],    /* 蓝色带釉陶瓦 */
        ["minecraft:blue_ice", 2],                  /* 蓝冰 */
        ["minecraft:bone_block", 5],                /* 骨块 */
        ["minecraft:bookshelf", 4],                 /* 书架 */
        ["minecraft:brick_block", 1],               /* 红砖块 */
        ["minecraft:cake", 2],                      /* 蛋糕 */
        ["minecraft:chiseled_deepslate", 1],        /* 錾制深板岩 */
        ["minecraft:clay", 3],                      /* 黏土块 */
        ["minecraft:cobbled_deepslate", 1],         /* 深板岩圆石 */
        ["minecraft:crying_obsidian", 1],           /* 哭泣的黑曜石 */
        ["minecraft:deepslate", 2],                 /* 深板岩 */
        ["minecraft:deepslate_bricks", 1],          /* 深板岩砖 */
        ["minecraft:deepslate_tiles", 1],           /* 深板岩瓦 */
        ["minecraft:dirt", 6],                      /* 泥土 就你是泥土啊 */
        ["minecraft:dirt_with_roots", 1],           /* 缠根泥土 */
        ["minecraft:glass", 2],                     /* 玻璃 */
        ["minecraft:grass", 5],                     /* 草 */
        ["minecraft:gravel", 5],                    /* 沙砾 */
        ["minecraft:hay_block", 2],                 /* 干草块 */
        ["minecraft:honey_block", 1],               /* 蜂蜜块 */
        ["minecraft:honeycomb_block", 1],           /* 蜜脾块 */
        ["minecraft:infested_deepslate", 2],        /* 被虫蚀的深板岩 */
        ["minecraft:leaves", 3],                    /* 橡树树叶 */
        ["minecraft:mangrove_log", 1],              /* 红树原木 */
        ["minecraft:melon_block", 2],               /* 西瓜 */
        ["minecraft:monster_egg", 2],               /* 被虫蚀的石头 */
        ["minecraft:moss_block", 1],                /* 苔藓块 */
        ["minecraft:mossy_cobblestone", 4],         /* 苔石 */
        ["minecraft:mud", 1],                       /* 泥巴 */
        ["minecraft:mud_bricks", 1],                /* 泥砖 */
        ["minecraft:mycelium", 1],                  /* 菌丝 */
        // ["minecraft:obsidian", 3],                  /* 黑曜石 */
        ["minecraft:podzol", 1],                    /* 灰化土 */
        ["minecraft:prismarine", 1],                /* 海晶石 */
        ["minecraft:pumpkin", 2],                   /* 南瓜 */
        ["minecraft:sand", 5],                      /* 沙子 */
        ["minecraft:sandstone", 3],                 /* 砂岩 */
        ["minecraft:sea_lantern", 2],               /* 海晶灯 */
        ["minecraft:slime", 3],                     /* 黏液块 */
        ["minecraft:snow", 2],                      /* 雪块 */
        ["minecraft:tuff", 1],                      /* 凝灰岩 */
        ["minecraft:web", 1],                       /* 蜘蛛网 */
        ["minecraft:wool", 2],                      /* 羊毛 */

        ["minecraft:black_glazed_terracotta", 1],   /* 黑色带釉陶瓦 */
        ["minecraft:blue_glazed_terracotta", 1],    /* 蓝色带釉陶瓦 */
        ["minecraft:brown_glazed_terracotta", 1],   /* 棕色带釉陶瓦 */
        ["minecraft:cyan_glazed_terracotta", 1],    /* 青色带釉陶瓦 */
        ["minecraft:gray_glazed_terracotta", 1],    /* 灰色带釉陶瓦 */
        ["minecraft:green_glazed_terracotta", 1],   /* 绿色带釉陶瓦 */
        ["minecraft:hardened_clay", 2],             /* 陶瓦 */
        ["minecraft:light_blue_glazed_terracotta", 1],/* 淡蓝色带釉陶瓦 */
        ["minecraft:lime_glazed_terracotta", 1],    /* 黄绿色带釉陶瓦 */
        ["minecraft:magenta_glazed_terracotta", 1], /* 品红色带釉陶瓦 */
        ["minecraft:orange_glazed_terracotta", 1],  /* 橙色带釉陶瓦 */
        ["minecraft:pink_glazed_terracotta", 1],    /* 粉红色带釉陶瓦 */
        ["minecraft:purple_glazed_terracotta", 1],  /* 紫色带釉陶瓦 */
        ["minecraft:red_glazed_terracotta", 1],     /* 红色带釉陶瓦 */
        ["minecraft:silver_glazed_terracotta", 1],  /* 淡灰色带釉陶瓦 */
        ["minecraft:white_glazed_terracotta", 1],   /* 白色带釉陶瓦 */
        ["minecraft:yellow_glazed_terracotta", 1]   /* 黄色带釉陶瓦 */
        // ["minecraft: ", 1],
    ];
    dfksjB01(m2, blocks, 10, 4);
}
function dfksjB40(m2, queryNoThis) {/* 下界 */
    let blocks = [
        // ["minecraft:ancient_debris", 1],
        ["minecraft:basalt", 7],                    /* 玄武岩 */
        ["minecraft:blackstone", 8],                /* 黑石 */
        ["minecraft:brown_mushroom_block", 5],      /* 棕色蘑菇方块 */
        ["minecraft:crimson_nylium", 5],            /* 绯红菌岩 */
        ["minecraft:crimson_stem", 6],              /* 绯红菌柄 */
        ["minecraft:crying_obsidian", 1],           /* 哭泣的黑曜石 */
        ["minecraft:glowstone", 6],                 /* 荧石 */
        ["minecraft:magma", 5],                     /* 岩浆块 */
        ["minecraft:nether_brick", 7],              /* 下界砖 */
        ["minecraft:nether_gold_ore", 8],           /* 下界金矿石 */
        ["minecraft:nether_wart_block", 6],         /* 下界疣块 */
        ["minecraft:netherrack", 10],               /* 下界岩 */
        // ["minecraft:obsidian", 1],                  /* 黑曜石 */
        ["minecraft:quartz_block", 2],              /* 石英块 */
        ["minecraft:quartz_ore", 5],                /* 下界石英矿石 */
        ["minecraft:red_mushroom_block", 5],        /* 红色蘑菇方块 */
        ["minecraft:red_nether_brick", 2],          /* 红色下界砖块 */
        ["minecraft:shroomlight", 3],               /* 菌光体 */
        ["minecraft:soul_sand", 2],                 /* 灵魂沙 */
        ["minecraft:soul_soil", 3],                 /* 灵魂土 */
        ["minecraft:warped_nylium", 2],             /* 诡异菌岩 */
        ["minecraft:warped_stem", 5],               /* 诡异菌柄 */
        ["minecraft:warped_wart_block", 5]          /* 诡异疣块 */
    ];
    dfksjB01(m2, blocks, 8, 2);
}
function dfksjB50(m2, queryNoThis) {/* 末地 */
    let blocks = [
        // ["minecraft:ancient_debris", 1],
        ["minecraft:end_bricks", 1],                /* 末地石砖 */
        ["minecraft:end_stone", 3],                 /* 末地石 */
        ["minecraft:purpur_block", 2],              /* 紫珀块 */
        ["minecraft:obsidian", 1]                   /* 黑曜石 */
    ];
    dfksjB01(m2, blocks, 3);
}

/*+==================分==界==线==================+*/

function piston(m4) {
    const a = m4.piston.attachedBlocks;// 受活塞影响的方块(们)的location数组
    for (let i = 0; i < a.length; i++) {
        let block = m4.dimension.getBlock(a[i]).id;
        let str = `§3dimension:§r${m4.dimension.id} §2x:${a[i].x}, y:${a[i].y}, z:${a[i].z} §3block:§r${block}`;
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
                str += " §4是阻止对象";
                break;
        }
        log(str);
    }
}

/*+==================分==界==线==================+*/

function explosion(m5) {
    if (!m5.source) return;// 过滤没有实体的爆炸
    if (m5.source.hasTag("explosion")) return;// 过滤已有标签实体的爆炸，因为给代替的爆炸设置了source
    if (String(m5.source.id).match(/meow:/g)) return;// 过滤喵喵屋自己的东西
    m5.source.addTag("explosion");
    m5.cancel = true;
    const explosionOptions = new ExplosionOptions();
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
    log(str);
    // world.getDimension(m5.dimension.id).createExplosion(explodeNoBlocksLoc, 15, explosionOptions);
    m5.dimension.createExplosion(explodeNoBlocksLoc, radius, explosionOptions);
    m5.source.removeTag("explosion");
}

/*+==================分==界==线==================+*/
/*
function beforeItemUseOn(m6){
    try {
        const { item, source } = m6;
        const dimension = source.dimension.id;
        const block = world.getDimension(dimension).getBlock(m6.blockLocation);
        if(block.id.startsWith("minecraft:")){
            const blockPerm = block.permutation.getAllProperties();
            for(var i = 0; i < blockPerm.length; i++){
                let str = blockPerm[i].name + " = " + blockPerm[i].value;
                log(str);
            }
        }
        // log(block.id);
        // log(item.id);
        // log(dimension);
        // log(source.id);
    } catch(e){log(e)};
    return;

    // let b = MinecraftBlockTypes.get("minecraft:log").createDefaultBlockPermutation();
    // let c = b.getProperty("old_log_type")?.validValues;
    // let d = b.getProperty("old_log_type").value;
    // log(typeof(c));
    // log(d);

    // let b = MinecraftBlockTypes.get("minecraft:log").createDefaultBlockPermutation();
    // let c = b.getProperty("old_log_type");
    // let d = c.validValues;
    // let e = c.value;
    // log(typeof(d));
    // log(e);
}
 */
/*
function beforeItemUse(m7){
    const { item, source } = m7;
    log(item.id);
    log(source.id);

    //kill
    // m7.source.kill();
}
 */

// 萌新造的破轮子(