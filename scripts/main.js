/*
    本作品采用知识共享署名-非商业性-相同方式共享 4.0 国际许可协议进行许可。 要查看此许可证的副本，请访问
    https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh

    This work is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License. To view a copy of this license, visit 
    http://creativecommons.org/licenses/by-nc-sa/4.0/
*/

import * as mc from "@minecraft/server";
import * as meow from "./lib/index.js";

/*+==================分==界==线==================+*/

const world = mc.world;
const logs = true;
const log = (_) => { if (logs) meow.methods.log(_) };

/*+==================分==界==线==================+*/

world.events.worldInitialize.subscribe(meowEvent => {
    // let test = new mc.DynamicPropertiesDefinition();
    // test.defineNumber("testNum");
    // test.defineString("testVal", 10);
    // test.defineBoolean("testBool");
    // meowEvent.propertyRegistry.registerWorldDynamicProperties(test);

    // let m = new mc.DynamicPropertiesDefinition();
    // m.defineNumber("meowChainVal");
    // m.defineBoolean("meowChain");
    // meowEvent.propertyRegistry.registerWorldDynamicProperties(m);
    // world.setDynamicProperty("meowChainVal", 0);
    // world.setDynamicProperty("meowChain", true);
});
// world.events.tick.subscribe(meowEvent => {
//     ticks(meowEvent);
//     return meowEvent
// })
world.events.beforeChat.subscribe(meowEvent => {
    pos(meowEvent);
    command(meowEvent);
    return meowEvent;
})
world.events.blockBreak.subscribe(meowEvent => {
    blockBreak(meowEvent);
    return meowEvent;
})
/*
world.events.playerJoin.subscribe(meowEvent => {
    log("hello world");
    const now = meow.methods.getCurrentDate();
    meow.methods.setScoreForName("cache0", "time", now);
    return meowEvent;
})
 */
world.events.beforePistonActivate.subscribe(meowEvent => {
    piston(meowEvent);
    return meowEvent;
})
world.events.beforeExplosion.subscribe(meowEvent => {
    explosion(meowEvent);
    return meowEvent;
})
world.events.beforeItemUseOn.subscribe(meowEvent => {
    beforeItemUseOn(meowEvent);
    return meowEvent;
})

/*
world.events.beforeItemUse.subscribe(meowEvent => {
    const now = meow.methods.getCurrentDate();
    meow.methods.setScoreForName("cache0", "time", now);
    beforeItemUse(meowEvent);
    return meowEvent;
})
 */

/*+==================分==界==线==================+*/

// function ticks(meowEvent) {
    
// }

/*+==================分==界==线==================+*/

function pos(meowEvent) {
    let x = parseInt(meowEvent.sender.location.x);
    let y = parseInt(meowEvent.sender.location.y);
    let z = parseInt(meowEvent.sender.location.z);
    let msg = " x:" + x + ", y:" + y + ", z:" + z + " ";
    meowEvent.message = String(meowEvent.message).replace(/<pos>/g, `${msg}`);
}
function command(meowEvent) {
    if (String(meowEvent.message).startsWith("..")) {
        let cmd = String(meowEvent.message).split(".")[2].split(" ").filter((str) => { return str != "" });
        meowEvent.cancel = true;
        switch (cmd[0]) {
            case "t":
            case "test":
                meow.methods.log(`§fMeowHouseModule正在运行,请求来源:§3${meowEvent.sender.name}`);
                
                // mc.world.setDynamicProperty("testNum", 123);
                // mc.world.setDynamicProperty("testVal", "hhh");
                // mc.world.setDynamicProperty("testBool", true);
                // const testNum = mc.world.getDynamicProperty("testNum");
                // const testVal = mc.world.getDynamicProperty("testVal");
                // const testBool = mc.world.getDynamicProperty("testBool");
                // log(`testNum:${testNum} testVal:${testVal} testBool:${testBool}`);
                break;
            case "help":
                meowEvent.sender.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§r§fawa 还在编写中"}]}`);
                break;
            case "awa":
                meowEvent.sender.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§r§fawa"}]}`);
                if (meowEvent.sender.nameTag != "MiaoMiaoMax") return;
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
                        meowEvent.sender.dimension.spawnItem(item, meowEvent.sender.location);
                    } catch(e) {log(e)};
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
                meowEvent.sender.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§c未知的命令:${cmd[0]}。请检查命令是否存在，以及您对它是否拥有使用权限。\n输入 ..help 以查看所有命令"}]}`);
        }
    }
}

/*+==================分==界==线==================+*/

function blockBreak(meowEvent) {
    // const meowChain = mc.world.getDynamicProperty("meowChain");
    // if (meowChain == true) {
    //     mc.world.setDynamicProperty("meowChain", false);
    //     mc.world.events.tick.subscribe(() => {
    //         meowChains(meowEvent);
    //     })
    // }
    meow.methods.addScoreForEntity("level0", meowEvent.player);
    if (meowEvent.dimension.getBlock(new mc.BlockLocation(meowEvent.block.x, meowEvent.block.y - 1, meowEvent.block.z)).typeId == "meow:chaos_recloser") {
        const entityIntensify = {
            type:"meow:meow_mod",
            name:"§d§f§k§v§5§r§l§3刷新点§r",
            location:new mc.Location(meowEvent.block.x + 0.5, meowEvent.block.y + 1.5, meowEvent.block.z + 0.5),
            closest:1,
            maxDistance:0.3
        }
        // 上面是 GT 1.0.0-beta 新写法，下面是 GT 0.1.0 旧写法
       /*  const entityIntensify = new EntityQueryOptions();
        entityIntensify.type = "meow:meow_mod";
        entityIntensify.name = "§d§f§k§v§5§r§l§3刷新点§r";
        entityIntensify.location = new Location(meowEvent.block.x + 0.5, meowEvent.block.y + 1.5, meowEvent.block.z + 0.5);
        entityIntensify.closest = 1;
        entityIntensify.maxDistance = 0.3; */
        const query = meowEvent.dimension.getEntities(entityIntensify);
        for (const queryNoThis of query) {
            log("id: "+meowEvent.brokenBlockPermutation.type.id);
            log("tag: "+queryNoThis.getTags().toString());
            const nowTime = [meow.methods.getCurrentDate(), meow.methods.getCurrentTime()];
            const playerIntensify = {
                type:"minecraft:player",
                name:meowEvent.player.name,
                gameMode:"creative",
                location:meowEvent.player.location,
                closest:1,
                maxDistance:0.1
            }
            const playerQuery = meowEvent.dimension.getEntities(playerIntensify);
            const playerGMC = Array.from(playerQuery).length;
            log("playerGMC: "+playerGMC);
            if (queryNoThis.hasTag("bedrock")) {
                if (meowEvent.brokenBlockPermutation.type.id == "minecraft:bedrock") {
                    if (!playerGMC) {
                        queryNoThis.runCommand("gamerule dotiledrops false");
                        meow.methods.setScoreForEntity("dotiledrops", queryNoThis);
                    }
                    try {
                        meowEvent.player.runCommandAsync("scoreboard players reset @s timingB");
                        queryNoThis.runCommandAsync("scoreboard players reset @s timingB");
                    } catch (e) { };
                    queryNoThis.runCommandAsync(`say @${meowEvent.player.nameTag},为什么不见了`);
                }
                queryNoThis.removeTag("bedrock");
            }
            if (queryNoThis.hasTag("barrel")) {
                if (meowEvent.brokenBlockPermutation.type.id == "minecraft:barrel" && !playerGMC) {
                    queryNoThis.runCommand("gamerule dotiledrops false");
                    meow.methods.setScoreForEntity("dotiledrops", queryNoThis);
                }
                queryNoThis.removeTag("barrel");
            }
            // if(queryNoThis.hasTag("air"))return;
            // queryNoThis.addTag("air");
            // log(meowEvent.player.name+" §3awa");
            meow.methods.addScoreForEntity("level1", meowEvent.player);
            let cache0 = meow.methods.getScoreForEntity("cache0", meowEvent.player, false, true);
            let cache1 = meow.methods.getScoreForEntity("cache1", meowEvent.player, false, true, 1);
            let level3 = meow.methods.getScoreForEntity("level3", meowEvent.player, false, true);
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
                    log("严重错误:检测到核心不完整,请重新初始化核心");
                    // queryNoThis.removeTag("air");
                    return;
            }
            cache0++;
            meow.methods.addScoreForEntity("cache0", meowEvent.player);
            if (cache0 >= cache1 && level3 < 100) {
                level3++;
                cache1 = Math.floor(cache1 + Math.sqrt(level3 * 2) + level3 * 9 + cache1 / (level3 * 2));
                meow.methods.setScoreForEntity("cache0", meowEvent.player);
                meow.methods.setScoreForEntity("cache1", meowEvent.player, cache1);
                meow.methods.addScoreForEntity("level3", meowEvent.player);
                // if(level3==1)meowEvent.player.runCommandAsync(`function MeowHouseModule/Achievement/first_block`);
            }
            if (level3 < 100) meowEvent.player.runCommandAsync(`titleraw @s actionbar {"rawtext":[{"text":"§2xp:§a${cache0}/§b${cache1}, §6level:§e${level3}"}]}`);
            else meowEvent.player.runCommandAsync(`titleraw @s actionbar {"rawtext":[{"text":"§2xp:§a已满级, §6level:§e${level3}"}]}`);
            if ((nowTime[1] - timing0) >= 1) { timing0 = 0; meow.methods.setScoreForEntity("timing0", queryNoThis, nowTime[1]); };
            if (timing0 == 0) return dfksj01(meowEvent, nowTime, queryNoThis, level3, timing1, timing2, timing3);
            // if (timing0 != 0) return dfksj00(meowEvent, nowTime, queryNoThis, level3);
            else return dfksj00(meowEvent, nowTime, queryNoThis, level3);
            // queryNoThis.removeTag("air");
        }
    }
}

// function meowChains(meowEvent) {
//     log(meowEvent.player.selectedSlot);
//     log(meowEvent.player.getComponent("inventory").container.getItem(meowEvent.player.selectedSlot)?.id ?? null);
//     const blockId = meowEvent.brokenBlockPermutation.type.id;
//     log(blockId);
//     let bs;
//     switch(blockId){
//         case "实例" :
//             bs = ["连锁方式", "生成方式", { property: "属性名" | null, items: ["物品英文名" | true] }];
//             break;
//         case "minecraft:log" :
//             bs = [1, 1, { property: "old_log_type", items: [true] }];
//             break;
//         case "minecraft:log2" :
//             bs = [1, 1, { property: "new_log_type", items: [true] }];
//             break;
            
//         case "minecraft:stone" :
//             bs = [ 1, 2, "stone_type" ];
//             c = { block: [ mc.MinecraftItemTypes.stone ], item : [ mc.MinecraftItemTypes.stone, mc.MinecraftItemTypes.cobblestone ], stone : [ 1, 0 ], granite : [ 0, 1 ], granite_smooth : [ 0, 2 ], diorite : [ 0, 3 ], diorite_smooth : [ 0, 4 ], andesite : [ 0, 5 ], andesite_smooth : [ 0, 6 ] };
//             break;
            
//         case "minecraft:wheat" :
//             bs = [ 2, 3, "growth", 7 ];
//             break;
            
//         case "minecraft:leaves" :
//             bs = [ 1, 4, "old_leaf_type" ];
//             c = { block: [ mc.MinecraftItemTypes.leaves ], oak: [ 0, 0 ], spruce: [ 0, 1 ], birch: [ 0, 2 ], jungle: [ 0, 3 ] };
//             break;
//         case "minecraft:leaves2" :
//             bs = [ 1, 4, "new_leaf_type" ];
//             c = { block: [ mc.MinecraftItemTypes.leaves2 ], acacia: [ 0, 0 ], dark_oak: [ 0, 1 ]};
//             break;
//         default:
//             return;
//     }
//     let locations = [[meowEvent.block.x, meowEvent.block.y, meowEvent.block.z]];
//     // let locations = [meowEvent.block.location];
//     const blockProperty = meowEvent.brokenBlockPermutation.getProperty(bs[2].property);
//     const blockValue = blockProperty.validValues.findIndex((_) => {_ = blockProperty.value});
//     let chainsValue = 0;
//     const chainsMax = 100;// 1tick链锁上限 1500
//     for(let i = 0; i < locations.length && chainsValue < chainsMax; i++){
//         let theLocations = [
//             [locations[i][0], locations[i][1] + 1, locations[i][2]],
//             [locations[i][0] + 1, locations[i][1], locations[i][2]],
//             [locations[i][0], locations[i][1], locations[i][2] + 1],
//             [locations[i][0] - 1, locations[i][1], locations[i][2]],
//             [locations[i][0], locations[i][1], locations[i][2] - 1],
//             [locations[i][0], locations[i][1] - 1, locations[i][2]],
//             [locations[i][0] + 1, locations[i][1], locations[i][2] + 1],
//             [locations[i][0] - 1, locations[i][1], locations[i][2] + 1],
//             [locations[i][0] + 1, locations[i][1], locations[i][2] - 1],
//             [locations[i][0] - 1, locations[i][1], locations[i][2] - 1],
//             [locations[i][0] + 1, locations[i][1] + 1, locations[i][2]],
//             [locations[i][0] - 1, locations[i][1] + 1, locations[i][2]],
//             [locations[i][0] + 1, locations[i][1] - 1, locations[i][2]],
//             [locations[i][0] - 1, locations[i][1] - 1, locations[i][2]],
//             [locations[i][0], locations[i][1] + 1, locations[i][2] + 1],
//             [locations[i][0], locations[i][1] + 1, locations[i][2] - 1],
//             [locations[i][0], locations[i][1] - 1, locations[i][2] + 1],
//             [locations[i][0], locations[i][1] - 1, locations[i][2] - 1]
//         ]
//         for(let j = 0; j < theLocations.length && chainsValue < chainsMax; j++){
//             let testforblock = false;
//             try { testforblock = meowEvent.dimension.runCommandAsync(`testforblock ${theLocations[j][0]} ${theLocations[j][1]} ${theLocations[j][2]} ${blockId} ${blockValue}`).matches } catch (e) { };
//             if(testforblock && locations.findIndex( (_) => _[0] === theLocations[j][0] && _[1] === theLocations[j][1] && _[2] === theLocations[j][2]) == -1){
//                 // log("awa");
//                 // return;
//                 switch(bs[0]){
//                     case 1 :
//                         locations.push(theLocations[j]);
//                         meowEvent.dimension.runCommandAsync(`setblock ${theLocations[j][0]} ${theLocations[j][1]} ${theLocations[j][2]} air -1 replace`);
//                         chainsValue++;
//                         break;
//                     case 2 :
//                         if(meowEvent.dimension.getBlock(e[j]).permutation.getProperty(b[2]).value == b[3] && meowEvent.brokenBlockPermutation.getProperty(b[2]).value == b[3]){d.push(e[j]);meowEvent.dimension.runCommandAsync(`setblock ` + e[j].x + ` ` + e[j].y + ` ` + e[j].z + ` air -1 replace`);g++;};
//                         break;
//                 }
//             }
//         }

//     //     let theLocations = [
//     //         new mc.BlockLocation(locations[i].x, locations[i].y + 1, locations[i].z),
//     //         new mc.BlockLocation(locations[i].x + 1, locations[i].y, locations[i].z),
//     //         new mc.BlockLocation(locations[i].x, locations[i].y, locations[i].z + 1),
//     //         new mc.BlockLocation(locations[i].x - 1, locations[i].y, locations[i].z),
//     //         new mc.BlockLocation(locations[i].x, locations[i].y, locations[i].z - 1),
//     //         new mc.BlockLocation(locations[i].x, locations[i].y - 1, locations[i].z),
//     //         new mc.BlockLocation(locations[i].x + 1, locations[i].y, locations[i].z + 1),
//     //         new mc.BlockLocation(locations[i].x - 1, locations[i].y, locations[i].z + 1),
//     //         new mc.BlockLocation(locations[i].x + 1, locations[i].y, locations[i].z - 1),
//     //         new mc.BlockLocation(locations[i].x - 1, locations[i].y, locations[i].z - 1),
//     //         new mc.BlockLocation(locations[i].x + 1, locations[i].y + 1, locations[i].z),
//     //         new mc.BlockLocation(locations[i].x - 1, locations[i].y + 1, locations[i].z),
//     //         new mc.BlockLocation(locations[i].x + 1, locations[i].y - 1, locations[i].z),
//     //         new mc.BlockLocation(locations[i].x - 1, locations[i].y - 1, locations[i].z),
//     //         new mc.BlockLocation(locations[i].x, locations[i].y + 1, locations[i].z + 1),
//     //         new mc.BlockLocation(locations[i].x, locations[i].y + 1, locations[i].z - 1),
//     //         new mc.BlockLocation(locations[i].x, locations[i].y - 1, locations[i].z + 1),
//     //         new mc.BlockLocation(locations[i].x, locations[i].y - 1, locations[i].z - 1)
//     //     ]
//     //     for(let j = 0; j < theLocations.length && chainsValue < chainsMax; j++){
//     //         const theBlock = meowEvent.dimension.getBlock(theLocations[j]);
//     //         if(theBlock.id == blockId && permutation.getProperty(bs[2].property).value == blockProperty.value && locations.findIndex( (_) => _.x === theLocations[j].x && _.y === theLocations[j].y && _.z === theLocations[j].z) == -1){
//     //             switch(bs[0]){
//     //                 case 1 :
//     //                     locations.push(theLocations[j]);
//     //                     meowEvent.dimension.runCommandAsync(`setblock  ${theLocations[j].x} ${theLocations[j].y} ${theLocations[j].z} air -1 replace`);
//     //                     chainsValue++;
//     //                     break;
//     //                 case 2 :
//     //                     if(meowEvent.dimension.getBlock(theLocations[j]).permutation.getProperty(b[2]).value == b[3] && meowEvent.brokenBlockPermutation.getProperty(b[2]).value == b[3]){d.push(theLocations[j]);meowEvent.dimension.runCommandAsync(`setblock ` + theLocations[j].x + ` ` + theLocations[j].y + ` ` + theLocations[j].z + ` air -1 replace`);g++;};
//     //                     break;
//     //             }
//     //         }
//     //     }

//     }

//     /*
//     while(g > 0 && d.length > 0){
//         log("喵");
//         meowEvent.dimension.runCommandAsync(`fill ` + d[0].x + ` ` + d[0].y + ` ` + d[0].z + ` ` + d[d.length-1].x + ` ` + d[d.length-1].y + ` ` + d[d.length-1].z + ` air -1 replace `+ a);
//         d = d.filter( (_) => meowEvent.dimension.getBlock(_).typeId === a)
//     }
//     */
//     return;
//     if(g >= h)log("链锁数目已到达上限");
//     if(g > 0)log("链锁方块:" + a + " 链锁数:" + g);
//     switch(b[1]){
//         case 0 :
//             let items;
//             while(g > 64){
//                 items = new mc.ItemStack(c.item[f[0]], 64, f[1]);
//                 meowEvent.dimension.spawnItem(items, meowEvent.block.location);
//                 g = g - 64;
//             }
//             items = new mc.ItemStack(c.item[f[0]], g, f[1]);
//             meowEvent.dimension.spawnItem(items, meowEvent.block.location);
//             break;
//     }
//     log("awa")
//     //上面为连锁采集测试模块
// }

function dfksj00(meowEvent, level3) {
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
    const b = blocks[l[a].findIndex((_) => _ == random0)];
    const random1 = meow.methods.getRndInteger(0, b[1]);
    log(b[0]);
    let c = mc.MinecraftBlockTypes.get(b[0]).createDefaultBlockPermutation();
    if (random1 != 0) {
        const d = c.getProperty(b[2]);
        c.getProperty(b[2]).value = d.validValues[random1];
    }
    meowEvent.block.setPermutation(c);
}

function dfksj01(meowEvent, nowTime, queryNoThis, level3, timing1, timing2, timing3) {
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
    // let l6 = () => { let la = [];[l1[i], l2[i], l3[i], l4[i], l5].forEach((_, i) => { if (_ > 0) la.push(i + 1) }); return la };
    let random0 = meow.methods.getRndInteger(1, [l1[i], l2[i], l3[i], l4[i], l5].sort((a, b) => { return b - a }).shift(0, 0));
    let random1;
    // log(random0);
    let l = (a) => {
        let b = [];
        [l1[i], l2[i], l3[i], l4[i], l5].forEach((_, i) => { if (_ > 0) b.push(i + 1) })
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
    //random1 = 2;    //awa
    log(random1);
    switch (random1) {
        case 1:
            if ((nowTime[1] - timing1) >= 1200) { timing1 = 0; meow.methods.setScoreForEntity("timing1", queryNoThis); };
            if (timing1 == 0) return dfksjE00(meowEvent, nowTime, queryNoThis, level3); else return dfksj00(meowEvent, level3);
        case 2:
            if ((nowTime[1] - timing2) >= 600) { timing2 = 0; meow.methods.setScoreForEntity("timing2", queryNoThis); };
            if (timing2 == 0) return dfksjC00(meowEvent, nowTime, queryNoThis, level3); else return dfksj00(meowEvent, level3);
        case 3:
            if ((nowTime[1] - timing3) >= 600) { timing3 = 0; meow.methods.setScoreForEntity("timing3", queryNoThis); };
            if (timing3 == 0) return dfksje00(meowEvent, nowTime, queryNoThis, level3); else return dfksj00(meowEvent, level3);
        case 4: return dfksjB00(meowEvent, nowTime, queryNoThis, level3);
        case 5: return dfksj00(meowEvent, level3);
        default:
            log("遇到未知错误");
            return dfksj00(meowEvent, level3);
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
    // if(random0 >= l1[i][0] && random0 <= l1[i][1] && timing1 == 0)dfksjE00(meowEvent, nowTime, queryNoThis, level3);
    // if(random0 >= l2[i][0] && random0 <= l2[i][1] && timing2 == 0)dfksjC00(meowEvent, nowTime, queryNoThis, level3);
    // if(random0 >= l3[i][0] && random0 <= l3[i][1] && timing3 == 0)dfksje00(meowEvent, nowTime, queryNoThis, level3);
    // if(random0 >= l4[i][0] && random0 <= l4[i][1])dfksjB00(meowEvent, nowTime, queryNoThis, level3);
    // if(random0 >= l5[i][0] && random0 <= l5[i][1])dfksj00(meowEvent, level3);
    // if(random0 >= l1[i][0] && random0 <= l1[i][1] && timing1 != 0){dfksj00(meowEvent, level3);log("miao");}
    // if(random0 >= l1[i][0] && random0 <= l1[i][1] && timing2 != 0){dfksj00(meowEvent, level3);log("miao");}
    // if(random0 >= l1[i][0] && random0 <= l1[i][1] && timing3 != 0){dfksj00(meowEvent, level3);log("miao");}
}

function dfksjE00(meowEvent, nowTime, queryNoThis, level3) {/* 事件 */
    // meow.methods.setScoreForEntity("timing1", queryNoThis, nowTime[1]);
    meow.methods.addScoreForEntity("cache0", meowEvent.player);
    let threshold0 = meow.methods.getScoreForEntity("threshold0", queryNoThis, false, true);
    if (threshold0 === "ScoreAU") {
        log("严重错误:检测到核心不完整,正在尝试修复");
        try { queryNoThis.runCommandAsync("scoreboard objectives add threshold0 dummy 事件阈值") } catch (e) { log(`尝试修复失败，请重新初始化，失败原因：${e}`); return; };
        threshold0 = meow.methods.getScoreForEntity("threshold0", queryNoThis, false, true);
        if (threshold0 != "ScoreAU") log("修复成功");
    }
    if (threshold0 == 0 || nowTime[0] != threshold0.toString().slice(0, 6)) { threshold0 = (nowTime[0] + "00"); meow.methods.setScoreForEntity("threshold0", queryNoThis, threshold0); };
    // if (Number(threshold0.toString().slice(6, 8)) < 10) meow.methods.addScoreForEntity("threshold0", queryNoThis);
    // else { dfksj00(meowEvent, level3); return; };
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
    //random1 = 1;    //awa
    log(random1);
    let block;
    switch (random1) {
        case 1: { block = dfksjE10(meowEvent, queryNoThis); break; };
        case 2: { block = dfksjE20(meowEvent, queryNoThis); break; };
        // case 3: { block = dfksjE30(meowEvent, queryNoThis); break; };
        case 3: { block = true; break; };
    }
    if (block) dfksj00(meowEvent, level3);
}
function dfksjE01(meowEvent, queryNoThis, events) {/* 事件-随机模块 */
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
    //random1 = 1;    // awa
    log(random1);
    return meow.theEvents.events(events[random1][0](meowEvent, queryNoThis));
}
function dfksjE10(meowEvent, queryNoThis) {
    meow.methods.addScoreForEntity("cache0", meowEvent.player);
    return dfksjE01(meowEvent, queryNoThis, meow.theEvents.events1());
}

function dfksjE20(meowEvent, queryNoThis) {
    meow.methods.addScoreForEntity("cache0", meowEvent.player);
    return dfksjE01(meowEvent, queryNoThis, meow.theEvents.events2());
}

function dfksjC00(meowEvent, nowTime, queryNoThis, level3) {/* 宝箱 */
    // meow.methods.setScoreForEntity("timing2", queryNoThis, nowTime[1]);
    meow.methods.addScoreForEntity("cache0", meowEvent.player);
    queryNoThis.addTag("barrel");
    let threshold1 = meow.methods.getScoreForEntity("threshold1", queryNoThis, false, true);
    if (threshold1 === "ScoreAU") {
        log("严重错误:检测到核心不完整,正在尝试修复");
        try { queryNoThis.runCommandAsync("scoreboard objectives add threshold1 dummy 事件阈值") } catch (e) { log(`尝试修复失败，请重新初始化，失败原因：${e}`); return; };
        threshold1 = meow.methods.getScoreForEntity("threshold1", queryNoThis, false, true);
        if (threshold1 != "ScoreAU") log("修复成功");
    }
    if (threshold1 == 0 || nowTime[0] != threshold1.toString().slice(0, 6)) { threshold1 = (nowTime[0] + "00"); meow.methods.setScoreForEntity("threshold1", queryNoThis, threshold1); };
    // if (Number(threshold1.toString().slice(6, 8)) < 10) meow.methods.addScoreForEntity("threshold1", queryNoThis);
    // else { dfksj00(meowEvent, level3); return; };
    const barrel = mc.MinecraftBlockTypes.barrel.createDefaultBlockPermutation();
    barrel.getProperty("facing_direction").value = 1;
    meowEvent.block.setPermutation(barrel);
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
    log(random1);
    switch (random1) {
        case 1: return dfksjC10(meowEvent);
        // case 2: return dfksjC20(meowEvent);
        // case 3: return dfksjC30(meowEvent);
    }
}
function dfksjC01(meowEvent, loots, random0Max, random0Min = 1) {/* 宝箱-随机模块 */
    let random0 = meow.methods.getRndInteger(random0Min, random0Max);
    let loot;
    let random1;
    while (random0 > 0) {
        loot = [];
        random0--;
        loots.forEach((_, i) => { if (_[0] >= 0) loot.push(i) });
        // log(loot.toString());
        random1 = meow.methods.getRndInteger(0, loot.length - 1);
        // log(loot[random1]);
        loots[loot[random1]][0]--;
    }
    log(loot[random1]);
    // const block = meowEvent.dimension.getBlock(meowEvent.block.location);
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
            meowEvent.dimension.runCommandAsync(`replaceitem block ${meowEvent.block.x} ${meowEvent.block.y} ${meowEvent.block.z} slot.container ${slots[random2]} ${loots[loot[random1]][i][0]} ${meow.methods.getRndInteger(minQ, loots[loot[random1]][i][2])} ${loots[loot[random1]][i][3]}`)
            slots.splice(random2, 1);
        }
    }
}
function dfksjC10(meowEvent) {
    dfksjC01(meowEvent, meow.theChests.chests1(), 1);
}

function dfksje00(meowEvent, nowTime, queryNoThis, level3) {/* 生物 */
    // meow.methods.setScoreForEntity("timing3", queryNoThis, nowTime[1]);
    let threshold3 = meow.methods.getScoreForEntity("threshold3", queryNoThis, false, true);
    if (threshold3 === "ScoreAU") {
        log("严重错误:检测到核心不完整,正在尝试修复");
        try { queryNoThis.runCommandAsync("scoreboard objectives add threshold3 dummy 生物阈值") } catch (e) { log(`尝试修复失败，请重新初始化，失败原因：${e}`); return; };
        threshold3 = meow.methods.getScoreForEntity("threshold3", queryNoThis, false, true);
        if (threshold3 != "ScoreAU") log("修复成功");
    }
    if (threshold3 == 0 || nowTime[0] != threshold3.toString().slice(0, 6)) { threshold3 = (nowTime[0] + "00"); meow.methods.setScoreForEntity("threshold3", queryNoThis, threshold3); };
    // if (Number(threshold3.toString().slice(6, 8)) < 15) meow.methods.addScoreForEntity("threshold3", queryNoThis);
    // else { dfksj00(meowEvent, level3); return; };
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
    log(random1);

    dfksj00(meowEvent, level3);
    switch (random1) {
        case 1: return dfksje10(meowEvent);
        case 2: return dfksje20(meowEvent);
        case 3: return dfksje30(meowEvent);
        case 4: return dfksje40(meowEvent);
    }
}
function dfksje01(meowEvent, entitys, random0Max, random0Min, lifeTime) {/* 生物-随机模块 */
    let random0 = meow.methods.getRndInteger(random0Min, random0Max);
    // log(random0);
    let entity;
    let random1;
    while (random0 > 0) {
        entity = [];
        random0--;
        entitys.forEach((_, i) => { if (_[1] >= 0) entity.push(i) });
        // log(entity.toString());
        random1 = meow.methods.getRndInteger(0, entity.length - 1);
        // log(entity[random1]);
        entitys[entity[random1]][1]--;
    }
    log(entitys[entity[random1]][0]);
    const spwn = meowEvent.dimension.spawnEntity(entitys[entity[random1]][0], new mc.BlockLocation(meowEvent.block.x, meowEvent.block.y + 1, meowEvent.block.z));
    if (meow.methods.tyrScoreForEntity("lifeTime", spwn) === "ScoreAU") {
        log("严重错误:检测到核心不完整,正在尝试修复");
        try { meowEvent.dimension.runCommandAsync("scoreboard objectives add lifeTime dummy 生物寿命") } catch (e) { log(`尝试修复失败，请重新初始化，失败原因：${e}`); return; };
        log("修复成功");
    }
    meow.methods.setScoreForEntity("lifeTime", spwn, lifeTime);
}
function dfksje10(meowEvent) {/* 稀有生物 */
    meow.methods.addScoreForEntity("cache0", meowEvent.player);
    return dfksje01(meowEvent, meow.theEntitys.entitys1(), 1, 1, 6000);
}
function dfksje20(meowEvent) {/* 主世界 */
    return dfksje01(meowEvent, meow.theEntitys.entitys2(), 3, 1, 1200);
}
function dfksje30(meowEvent) {/* 下界 */
    return dfksje01(meowEvent, meow.theEntitys.entitys3(), 2, 1, 900);
}
function dfksje40(meowEvent) {/* 末地 */
    return dfksje01(meowEvent, meow.theEntitys.entitys4(), 5, 1, 900);
}

function dfksjB00(meowEvent, nowTime, queryNoThis, level3) {/* 方块 */
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
    // log([l1[i], l2[i], l3[i], l4[i], l5[i]].sort((a, b) => { return b - a }).shift(0, 0));
    // log(random0);
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
    log(random1);
    let threshold2 = meow.methods.getScoreForEntity("threshold2", queryNoThis, false, true);
    if (threshold2 === "ScoreAU") {
        log("严重错误:检测到核心不完整,正在尝试修复");
        try { queryNoThis.runCommandAsync("scoreboard objectives add threshold2 dummy 贵重方块阈值") } catch (e) { log(`尝试修复失败，请重新初始化，失败原因：${e}`); return; };
        threshold2 = meow.methods.getScoreForEntity("threshold2", queryNoThis, false, true);
        if (threshold2 != "ScoreAU") log("修复成功");
    }
    // log(`${nowTime[0]}, ${threshold2.toString().slice(0, 6)}, ${Number(threshold2.toString().slice(6, 8))}`);
    // if(nowTime[0] != threshold2.toString().slice(0, 6))log(`aaaaaaaaaaaaaaaaaa`);
    switch (random1) {
        case 1:
            if (threshold2 == 0 || nowTime[0] != threshold2.toString().slice(0, 6)) { threshold2 = (nowTime[0] + "00"); meow.methods.setScoreForEntity("threshold2", queryNoThis, threshold2); };
            if (Number(threshold2.toString().slice(6, 8)) < 15) return dfksjB10(meowEvent, queryNoThis); /* log(`好，${threshold2}`); */
            else return dfksj00(meowEvent, level3);
        case 2: return dfksjB20(meowEvent);
        case 3: return dfksjB30(meowEvent);
        case 4: return dfksjB40(meowEvent);
        case 5: return dfksjB50(meowEvent);
        default:
            log("遇到未知错误");
            return dfksj00(meowEvent, level3);
    }
}
function dfksjB01(meowEvent, blocks, random0Max, random0Min = 1) {/* 方块-随机模块 */
    let random0 = meow.methods.getRndInteger(random0Min, random0Max);
    // log(random0);
    let block;
    let random1;
    while (random0 > 0) {
        block = [];
        random0--;
        blocks.forEach((_, i) => { if (_[1] >= 0) block.push(i) });
        // log(block.toString());
        random1 = meow.methods.getRndInteger(0, block.length - 1);
        // log(block[random1]);
        blocks[block[random1]][1]--;
    }
    log(blocks[block[random1]][0]);
    const b = mc.MinecraftBlockTypes.get(blocks[block[random1]][0]).createDefaultBlockPermutation();
    meowEvent.block.setPermutation(b);
}
function dfksjB10(meowEvent, queryNoThis) {/* 贵重方块 */
    meow.methods.addScoreForEntity("threshold2", queryNoThis);
    meow.methods.addScoreForEntity("cache0", meowEvent.player);
    return dfksjB01(meowEvent, meow.theBlocks.blocks1(), 3);
}
function dfksjB20(meowEvent) {/* 矿物 */
    return dfksjB01(meowEvent, meow.theBlocks.blocks2(), 12, 3);
}
function dfksjB30(meowEvent) {/* 主世界 */
    return dfksjB01(meowEvent, meow.theBlocks.blocks3(), 10, 4);
}
function dfksjB40(meowEvent) {/* 下界 */
    return dfksjB01(meowEvent, meow.theBlocks.blocks4(), 8, 2);
}
function dfksjB50(meowEvent) {/* 末地 */
    return dfksjB01(meowEvent, meow.theBlocks.blocks5(), 3);
}

/*+==================分==界==线==================+*/

function piston(meowEvent) {
    const a = meowEvent.piston.attachedBlocks;// 受活塞影响的方块的location数组
    for (let i = 0; i < a.length; i++) {
        const block = meowEvent.dimension.getBlock(a[i]).typeId;
        // let str = `§3dimension:§r${meowEvent.dimension.id} §2x:${a[i].x}, y:${a[i].y}, z:${a[i].z} §3block:§r${block}`;
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
                meowEvent.cancel = true;
                // str += " §4是阻止对象";
                // break;
                return;
        }
        // log(str);
    }
}

/*+==================分==界==线==================+*/

function explosion(meowEvent) {
    if (!meowEvent.source) return;// 过滤没有实体的爆炸
    if (meowEvent.source.hasTag("explosion")) return;// 过滤已有标签实体的爆炸，因为给代替的爆炸设置了source
    if (String(meowEvent.source.id).startsWith("meow:")) return;// 过滤喵喵屋自己的东西
    meowEvent.source.addTag("explosion");
    meowEvent.cancel = true;
    const explosionOptions = new mc.ExplosionOptions();
    explosionOptions.breaksBlocks = false;
    explosionOptions.source = meowEvent.source;// 防出现被自己炸的现象，例如：苦力怕被代替的爆炸炸死
    const explodeNoBlocksLoc = meowEvent.source.location;
    let radius;
    switch (meowEvent.source.id) {
        case "minecraft:creeper":
            radius = 3;
            if (meowEvent.source.getComponent("minecraft:is_charged")) radius = 6;
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
    const str = "§3dimension:§r" + meowEvent.dimension.id + " §2x:" + parseInt(meowEvent.source.location.x) + ", y:" + parseInt(meowEvent.source.location.y) + ", z:" + parseInt(meowEvent.source.location.z) + " §3source:§r" + meowEvent.source.id + " §3radius:§r" + radius;
    log(str);
    // world.getDimension(meowEvent.dimension.id).createExplosion(explodeNoBlocksLoc, 15, explosionOptions);
    meowEvent.dimension.createExplosion(explodeNoBlocksLoc, radius, explosionOptions);
    meowEvent.source.removeTag("explosion");
}

/*+==================分==界==线==================+*/

function beforeItemUseOn(meowEvent) {
    try {
        const { item, source } = meowEvent;
        const dimension = source.dimension;
        const block = dimension.getBlock(meowEvent.blockLocation);
        if (block.typeId.startsWith("minecraft:")) {
            const blockPerm = block.permutation.getAllProperties();
            for (var i = 0; i < blockPerm.length; i++) {
                let str = blockPerm[i].name + " = " + blockPerm[i].value;
                log(str);
            }
        }
        // log(block.typeId);
        // log(item.id);
        // log(dimension);
        // log(source.id);
    } catch (e) { log(e) };
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

/*
function beforeItemUse(meowEvent){
    const { item, source } = meowEvent;
    log(item.id);
    log(source.id);

    //kill
    // meowEvent.source.kill();
}
 */

// 萌新造的破轮子(