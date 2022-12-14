/*
    本作品采用知识共享署名-非商业性-相同方式共享 4.0 国际许可协议进行许可。 要查看此许可证的副本，请访问
    https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh

    This work is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License. To view a copy of this license, visit
    http://creativecommons.org/licenses/by-nc-sa/4.0/
*/

import * as mc from "@minecraft/server";
import * as meow from "./lib/index.js";

/*+==================分==界==线==================+*/

const world = mc.world,
    log = _ => { if (logs) meow.log(_) };
let logs = true, //log开关默认值
    tps = 0,
    lastTime,
    tickSchedule = [];

/*+==================分==界==线==================+*/

// world.events.worldInitialize.subscribe(meowEvent => {
//     let test = new mc.DynamicPropertiesDefinition();
//     test.defineNumber("testNum");
//     test.defineString("testVal", 10);
//     test.defineBoolean("testBool");
//     meowEvent.propertyRegistry.registerWorldDynamicProperties(test);

//     let m = new mc.DynamicPropertiesDefinition();
//     m.defineNumber("meowChainVal");
//     m.defineBoolean("meowChain");
//     meowEvent.propertyRegistry.registerWorldDynamicProperties(m);
//     world.setDynamicProperty("meowChainVal", 0);
//     world.setDynamicProperty("meowChain", true);
// });
world.events.tick.subscribe(meowEvent => {
    ticks(meowEvent);
    return meowEvent
})
world.events.beforeChat.subscribe(meowEvent => {
    pos(meowEvent);
    chatCommand(meowEvent);
    return meowEvent;
})
world.events.blockBreak.subscribe(meowEvent => {
    blockBreak(meowEvent);
    return meowEvent;
})
/*
world.events.playerJoin.subscribe(meowEvent => {
    log("hello world");
    const now = meow.getCurrentDate();
    meow.setScoreForName("cache0", "time", now);
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
    const now = meow.getCurrentDate();
    meow.setScoreForName("cache0", "time", now);
    beforeItemUse(meowEvent);
    return meowEvent;
})
 */

/*+==================分==界==线==================+*/

function ticks(meowEvent) {
    // log("awa");
    tps++;
    let now = meow.getCurrentTime();
    // while (tickSchedule.length > 0) {
    //     let i = tickSchedule[0];
    //     try {
    //         i.f(...i.p);
    //     } catch (error) {
    //         meow.log(error);
    //     } 
    //     tickSchedule.pop();
    // }
    if (lastTime != now) {
        lastTime = now;
        // let nowTime = meow.getNowTime();
        meow.setScoreForName("meowTick", "tps", tps);
        // meow.setScoreForName("meowTick", "年", nowTime[0]);
        // meow.setScoreForName("meowTick", "月", nowTime[1]);
        // meow.setScoreForName("meowTick", "日", nowTime[2]);
        // meow.setScoreForName("meowTick", "时", nowTime[3]);
        // meow.setScoreForName("meowTick", "分", nowTime[4]);
        // meow.setScoreForName("meowTick", "秒", nowTime[5]);
        tps = 0;
    }
}

/*+==================分==界==线==================+*/

function pos(meowEvent) {
    let x = Math.floor(meowEvent.sender.location.x),
        y = Math.floor(meowEvent.sender.location.y),
        z = Math.floor(meowEvent.sender.location.z),
        msg = " x:" + x + ", y:" + y + ", z:" + z + " ";
    meowEvent.message = ("" + meowEvent.message).replace(/<pos>/g, `${msg}`);
}
function chatCommand(meowEvent) {
    const message = ("" + meowEvent.message);
    if (message.startsWith("..")) {
        const player = meowEvent.sender;
        if (message.match(/^\.+$/)) return;
        let cmd = message.slice(2).split(" ").filter((str) => { return str != "" });
        log(cmd.length + " " + cmd.toString());
        const noCmd = () => player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§c未知的命令:${cmd[0]}。请检查命令是否存在，以及您对它是否拥有使用权限。\n输入 ..help 以查看所有命令"}]}`);
        meowEvent.cancel = true;
        switch (cmd[0]) {
            case "t":
            case "test":
            case "测试":
                meow.log(`§fMeowHouseModule正在运行,请求来源:§3${player.name}`);
                // mc.world.setDynamicProperty("testNum", 123);
                // mc.world.setDynamicProperty("testVal", "hhh");
                // mc.world.setDynamicProperty("testBool", true);
                // const testNum = mc.world.getDynamicProperty("testNum");
                // const testVal = mc.world.getDynamicProperty("testVal");
                // const testBool = mc.world.getDynamicProperty("testBool");
                // log(`testNum:${testNum} testVal:${testVal} testBool:${testBool}`);
                break;
            case "log":
                switch (cmd[1]) {
                    case "1":
                        logs = true;
                        return meow.log("运行日志已设置为开启");
                    case "0":
                        logs = false;
                        return meow.log("运行日志已设置为关闭");
                    default:
                        if (logs) return meow.log("运行日志：已开启");
                        else return meow.log("运行日志：未开启");
                }
            case "help":
            case "帮助":
                // player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§r§fawa 还在编写中"}]}`);
                player.runCommandAsync("function MeowHouseModule/help");
                break;
            case "创建刷新点":
                const block = player.dimension.getBlock(new mc.BlockLocation(Math.floor(player.location.x), Math.floor(player.location.y) - 1, Math.floor(player.location.z))),
                    mod = player.dimension.spawnEntity("meow:meow_mod", new mc.Location(Math.floor(player.location.x) + 0.5, Math.floor(player.location.y) + 1.5, Math.floor(player.location.z) + 0.5));
                block.setType(mc.MinecraftBlockTypes.get("meow:chaos_polymerizer"));
                mod.triggerEvent("meow:nameable_always_show");
                mod.nameTag = "§d§f§k§m§h§m§r§l§3刷新点§r";
                break;
            case "初始化":
                player.runCommandAsync("function MeowHouseModule/Initialization");
                break;
            default:
                return noCmd();
        }
    }
}

/*+==================分==界==线==================+*/

function blockBreak(meowEvent) {
    const player = meowEvent.player;
    meow.addScoreForEntity("level0", player);
    if (meowEvent.dimension.getBlock(new mc.BlockLocation(meowEvent.block.x, meowEvent.block.y - 1, meowEvent.block.z)).typeId == "meow:chaos_polymerizer") {
        const entityIntensify = {
            type: "meow:meow_mod",
            name: "§d§f§k§m§h§m§r§l§3刷新点§r",
            location: new mc.Location(meowEvent.block.x + 0.5, meowEvent.block.y + 1.5, meowEvent.block.z + 0.5),
            closest: 1,
            maxDistance: 0.3
        },
            // 上面是 GT 1.0.0-beta 新写法，下面是 GT 0.1.0 旧写法
            /* const entityIntensify = new EntityQueryOptions();
            entityIntensify.type = "meow:meow_mod";
            entityIntensify.name = "§d§f§k§v§5§r§l§3刷新点§r";
            entityIntensify.location = new Location(meowEvent.block.x + 0.5, meowEvent.block.y + 1.5, meowEvent.block.z + 0.5);
            entityIntensify.closest = 1;
            entityIntensify.maxDistance = 0.3; */
            query = meowEvent.dimension.getEntities(entityIntensify);
        for (const queryNoThis of query) {
            meow.achievements.block(1, player, queryNoThis);
            // tickSchedule.push({f: meow.achievements.block, p: [1, player, queryNoThis]});
            const nowTime = [meow.getCurrentDate(), meow.getCurrentTime()],
                playerIntensify = {
                    type: "minecraft:player",
                    name: player.name,
                    gameMode: "creative",
                    location: player.location,
                    closest: 1,
                    maxDistance: 0.1
                },
                playerQuery = meowEvent.dimension.getEntities(playerIntensify),
                playerGMC = Array.from(playerQuery).length,
                playerIdLN = Number(("" + player.id).slice(-1));
            log("block: " + meowEvent.brokenBlockPermutation.type.id);
            log("tag: " + ("" + queryNoThis.getTags()) ?? null);
            log("playerId: " + player.id);
            log("queryNoThisId: " + queryNoThis.id);
            log("playerGMC: " + playerGMC);
            if (queryNoThis.hasTag("bedrock")) {
                if (meowEvent.brokenBlockPermutation.type.id == "minecraft:bedrock") {
                    queryNoThis.runCommandAsync(`say @${player.name},为什么不见了`);
                }
                queryNoThis.removeTag("bedrock");
            }
            if (queryNoThis.hasTag("chest")) {
                queryNoThis.runCommandAsync(`say @${player.name},好家伙，物理解锁宝箱`);
                queryNoThis.runCommandAsync("particle minecraft:water_evaporation_bucket_emitter ~-0.5~-0.4~-0.5");
                queryNoThis.runCommandAsync("particle minecraft:lava_particle ~~-0.3~");
                queryNoThis.runCommandAsync("particle minecraft:lava_particle ~~-0.3~");
                queryNoThis.runCommandAsync("particle minecraft:lava_particle ~~-0.3~");
                queryNoThis.runCommandAsync("playsound mob.zombie.wood @a ~~-0.4~");
                const entityIntensify = {
                    type: "meow:meow_mod_chest",
                    name: "正在解锁宝箱",
                    location: new mc.Location(meowEvent.block.x + 0.5, meowEvent.block.y, meowEvent.block.z + 0.5),
                    closest: 1,
                    maxDistance: 0.3
                },
                    meowChestQuery = meowEvent.dimension.getEntities(entityIntensify);
                for (const meowChest of meowChestQuery) {
                    meowChest.nameTag = "";
                    const inventoryComponent = meowChest.getComponent("minecraft:inventory"),
                        inventoryContainer = inventoryComponent.container;
                    for (let i = 27; i--;) {
                        const items = inventoryContainer.getItem(i);
                        if (items != undefined) {
                            const itme = meowEvent.dimension.spawnItem(items, new mc.Location(meowEvent.block.x + 0.5, meowEvent.block.y + 1, meowEvent.block.z + 0.5));
                            itme.setVelocity({ x: (Math.random() - meow.getRndInteger(0, 1)) / 10, y: 0.5, z: (Math.random() - meow.getRndInteger(0, 1)) / 10 });
                        }
                    }
                    meowChest.triggerEvent("meow:kill");
                    break;
                }
                queryNoThis.removeTag("chest");
            }
            // if(queryNoThis.hasTag("air"))return;
            // queryNoThis.addTag("air");
            meow.addScoreForEntity("level1", player);
            meow.addScoreForEntity("level2", queryNoThis);
            let cache0 = meow.getScoreForEntity("cache0", player),
                cache1 = meow.getScoreForEntity("cache1", player, true, 1),
                cache2 = meow.getScoreForEntity("cache2", player, true, playerIdLN),
                cache3 = meow.getScoreForEntity("cache3", player, true, -playerIdLN),
                level3 = meow.getScoreForEntity("level3", player),
                threshold4 = meow.getScoreForEntity("threshold4", player, true),
                threshold5 = meow.getScoreForEntity("threshold5", player, true),
                timing0 = meow.getScoreForEntity("timing0", queryNoThis, true),
                timing1 = meow.getScoreForEntity("timing1", queryNoThis, true),
                timing2 = meow.getScoreForEntity("timing2", queryNoThis, true),
                timing3 = meow.getScoreForEntity("timing3", queryNoThis, true);
            switch ("ScoreAU") {
                case cache0:
                case cache1:
                case cache2:
                case cache3:
                case level3:
                case timing0:
                case timing1:
                case timing2:
                case timing3:
                case threshold4:
                case threshold5:
                    // queryNoThis.removeTag("air");
                    return meow.log("严重错误:检测到核心不完整,请重新初始化核心");
            }
            switch ("ScoreBU") {
                case cache0:
                case level3:
                    cache0 = 0;
                    level3 = 0;
                break;
            }
            const level3Max = 200;  //等级上限，最高500
            // if (level3 * 2 + 7505 != cache3 + cache1) {
            //     if (cache3 == 7504) {
            //         cache1 = 1;
            //         meow.setScoreForEntity("cache1", player, 1);
            //     } else {
            //         if (level3 + 31 != cache2) {
            //             queryNoThis.runCommandAsync(`say 检测到@${player.name}的等级可能存在问题,正在尝试修复`);
            //             player.runCommandAsync(`titleraw @s title {"rawtext":[{"text":"§6检测到等级可能存在问题"}]}`);
            //         }
            //         cache1 = cache3 + level3 * 2 + 76;
            //         meow.setScoreForEntity("cache1", player, cache1);
            //     }
            // }
            if (playerIdLN - level3 != cache2) {
                queryNoThis.runCommandAsync(`say 检测到@${player.name}的等级可能存在问题,正在尝试修复`);
                player.runCommandAsync(`titleraw @s title {"rawtext":[{"text":"§6检测到等级可能存在问题"}]}`);
                // log(`level3: ${level3} cache2: ${cache2 - 31}`);
                if (cache1 == 1) {
                    level3 = 0;
                    cache2 = playerIdLN;
                    meow.setScoreForEntity("level3", player);
                    meow.setScoreForEntity("cache2", player, cache2);
                    player.runCommandAsync(`titleraw @s title {"rawtext":[{"text":"§6已修复"}]}`);
                    player.runCommandAsync(`titleraw @s subtitle {"rawtext":[{"text":"§6可能存在问题的等级"}]}`);
                    queryNoThis.runCommandAsync(`say 已修复`);
                } else {
                    let i = [level3, (-cache2 - playerIdLN)].sort((a, b) => { return b - a })[0],
                        a = 1;
                    for (let j = 1; i--; j++) {
                        a = Math.floor(a + Math.sqrt(j * 2) + j * 9 + a / (j * 2));
                        if (a == cache1) {
                            level3 = j;
                            cache2 = playerIdLN - j;
                            meow.setScoreForEntity("level3", player, level3);
                            meow.setScoreForEntity("cache2", player, cache2);
                            player.runCommandAsync(`titleraw @s title {"rawtext":[{"text":"§6已修复"}]}`);
                            player.runCommandAsync(`titleraw @s subtitle {"rawtext":[{"text":"§6可能存在问题的等级"}]}`);
                            queryNoThis.runCommandAsync(`say 已修复`);
                            break;
                        } else if (j == level3Max && a < cache1) {
                            level3 = j;
                            cache1 = a;
                            cache2 = playerIdLN - j;
                            cache3 = cache1 - playerIdLN * j;
                            meow.setScoreForEntity("level3", player, level3);
                            meow.setScoreForEntity("cache1", player, cache1);
                            meow.setScoreForEntity("cache2", player, cache2);
                            meow.setScoreForEntity("cache3", player, cache3);
                            player.runCommandAsync(`titleraw @s title {"rawtext":[{"text":"§6已修复"}]}`);
                            player.runCommandAsync(`titleraw @s subtitle {"rawtext":[{"text":"§6可能存在问题的等级"}]}`);
                            queryNoThis.runCommandAsync(`say 已修复`);
                            break;
                        }
                    }
                }
            }
            if (threshold5 == 0 || nowTime[0] != ("" + threshold5).slice(0, 6)) {
                threshold5 = (nowTime[0] + "00");
                meow.setScoreForEntity("threshold5", player, threshold5);
            }
            if (Number(("" + threshold5).slice(6)) < 2000) {
                // meow.setScoreForEntity("threshold5", player, ++threshold5);/* 经验阈值 */
                cache0++;
                // cache0 += 100000;   //awa
            }
            if (level3 < level3Max) {
                if (cache0 >= cache1) {
                    level3++;
                    cache0 = 0;
                    cache1 = Math.floor(cache1 + Math.sqrt(level3 * 2) + level3 * 9 + cache1 / (level3 * 2));
                    cache3 = cache1 - playerIdLN * level3;
                    meow.setScoreForEntity("cache0", player);
                    meow.setScoreForEntity("cache1", player, cache1);
                    meow.setScoreForEntity("cache2", player, --cache2);
                    meow.setScoreForEntity("cache3", player, cache3);
                    meow.setScoreForEntity("level3", player, level3);
                    // if(level3==1)player.runCommandAsync(`function MeowHouseModule/Achievement/first_block`);
                }
                else meow.setScoreForEntity("cache0", player, cache0);
                player.runCommandAsync(`titleraw @s actionbar {"rawtext":[{"text":"§2xp:§a${cache0}/§b${cache1}, §6level:§e${level3}"}]}`);
            }
            else player.runCommandAsync(`titleraw @s actionbar {"rawtext":[{"text":"§2xp:§a${cache0}/§b已满级, §6level:§e${level3}"}]}`);
            if ((nowTime[1] - timing0) >= 1) { timing0 = 0; meow.setScoreForEntity("timing0", queryNoThis, nowTime[1]); };
            if (timing0 == 0) return dfksj01(meowEvent, nowTime, queryNoThis, cache0, level3, timing1, timing2, timing3);
            else return dfksj00(meowEvent, nowTime, queryNoThis, level3);
            // queryNoThis.removeTag("air");
        }
    }
    // else return meowChains(player, meowEvent.brokenBlockPermutation, meowEvent.dimension, meowEvent.block.location);
    return;
}

function meowChains(player, block, dimension, location, chainsValues = 0) {
    log(chainsValues);
    log(player.selectedSlot);
    log(player.getComponent("inventory").container.getItem(player.selectedSlot)?.typeId ?? null);
    const blockId = block.type.id;
    log(`${location.x} ${location.y} ${location.z}`);
    log(blockId);
    let bs;
    switch (blockId) {
        case "实例":
            bs = ["连锁方式", "生成方式", { property: "属性名" | null, items: ["物品英文名" | true] }];
            break;
        case "minecraft:log":
            bs = [1, 1, { property: "old_log_type", items: [true] }];
            break;
        case "minecraft:log2":
            bs = [1, 1, { property: "new_log_type", items: [true] }];
            break;

        // case "minecraft:stone" :
        //     bs = [ 1, 2, "stone_type" ];
        //     c = { block: [ mc.MinecraftItemTypes.stone ], item : [ mc.MinecraftItemTypes.stone, mc.MinecraftItemTypes.cobblestone ], stone : [ 1, 0 ], granite : [ 0, 1 ], granite_smooth : [ 0, 2 ], diorite : [ 0, 3 ], diorite_smooth : [ 0, 4 ], andesite : [ 0, 5 ], andesite_smooth : [ 0, 6 ] };
        //     break;

        // case "minecraft:wheat" :
        //     bs = [ 2, 3, "growth", 7 ];
        //     break;

        // case "minecraft:leaves" :
        //     bs = [ 1, 4, "old_leaf_type" ];
        //     c = { block: [ mc.MinecraftItemTypes.leaves ], oak: [ 0, 0 ], spruce: [ 0, 1 ], birch: [ 0, 2 ], jungle: [ 0, 3 ] };
        //     break;
        // case "minecraft:leaves2" :
        //     bs = [ 1, 4, "new_leaf_type" ];
        //     c = { block: [ mc.MinecraftItemTypes.leaves2 ], acacia: [ 0, 0 ], dark_oak: [ 0, 1 ]};
        //     break;
        default:
            return;
    }
    let locations = [location];
    const blockProperty = block.getProperty(bs[2].property);
    // const blockValue = blockProperty.validValues.findIndex(_ => { _ = blockProperty.value });
    let chainsValue = 0;
    const chainsMax = 128;// 1tick链锁上限 1500
    const air = mc.MinecraftBlockTypes.air.createDefaultBlockPermutation();
    for (let i = 0; i < locations.length && chainsValue < chainsMax; i++) {
        let theLocations = [
            new mc.BlockLocation(locations[i].x, locations[i].y + 1, locations[i].z),
            new mc.BlockLocation(locations[i].x + 1, locations[i].y, locations[i].z),
            new mc.BlockLocation(locations[i].x, locations[i].y, locations[i].z + 1),
            new mc.BlockLocation(locations[i].x - 1, locations[i].y, locations[i].z),
            new mc.BlockLocation(locations[i].x, locations[i].y, locations[i].z - 1),
            new mc.BlockLocation(locations[i].x, locations[i].y - 1, locations[i].z),
            new mc.BlockLocation(locations[i].x + 1, locations[i].y, locations[i].z + 1),
            new mc.BlockLocation(locations[i].x - 1, locations[i].y, locations[i].z + 1),
            new mc.BlockLocation(locations[i].x + 1, locations[i].y, locations[i].z - 1),
            new mc.BlockLocation(locations[i].x - 1, locations[i].y, locations[i].z - 1),
            new mc.BlockLocation(locations[i].x + 1, locations[i].y + 1, locations[i].z),
            new mc.BlockLocation(locations[i].x - 1, locations[i].y + 1, locations[i].z),
            new mc.BlockLocation(locations[i].x + 1, locations[i].y - 1, locations[i].z),
            new mc.BlockLocation(locations[i].x - 1, locations[i].y - 1, locations[i].z),
            new mc.BlockLocation(locations[i].x, locations[i].y + 1, locations[i].z + 1),
            new mc.BlockLocation(locations[i].x, locations[i].y + 1, locations[i].z - 1),
            new mc.BlockLocation(locations[i].x, locations[i].y - 1, locations[i].z + 1),
            new mc.BlockLocation(locations[i].x, locations[i].y - 1, locations[i].z - 1)
        ]
        for (let j = 0; j < theLocations.length && chainsValue < chainsMax; j++) {
            const theBlock = dimension.getBlock(theLocations[j]);
            if (theBlock.typeId == blockId && theBlock.permutation.getProperty(bs[2].property).value == blockProperty.value && !~locations.findIndex(_ => _.x === theLocations[j].x && _.y === theLocations[j].y && _.z === theLocations[j].z)) {
                switch (bs[0]) {
                    case 1:
                        locations.push(theLocations[j]);
                        theBlock.setPermutation(air);
                        chainsValue++;
                        break;
                    case 2:
                        // if(theBlock.permutation.getProperty(b[2]).value == b[3] && meowEvent.brokenBlockPermutation.getProperty(b[2]).value == b[3]){d.push(theLocations[j]);meowEvent.dimension.runCommandAsync(`setblock ` + theLocations[j].x + ` ` + theLocations[j].y + ` ` + theLocations[j].z + ` air -1 replace`);g++;};
                        break;
                }
            }
        }
    }
    if (chainsValues < 10 && chainsValue == chainsMax && locations.length > 1) return mc.System.run(meowChains(player, block, dimension, locations.pop(), ++chainsValues), 10);
    return;
    // if (g >= h) log("链锁数目已到达上限");
    // if (g > 0) log("链锁方块:" + a + " 链锁数:" + g);
    // switch (b[1]) {
    //     case 0:
    //         let items;
    //         while (g > 64) {
    //             items = new mc.ItemStack(c.item[f[0]], 64, f[1]);
    //             meowEvent.dimension.spawnItem(items, meowEvent.block.location);
    //             g = g - 64;
    //         }
    //         items = new mc.ItemStack(c.item[f[0]], g, f[1]);
    //         meowEvent.dimension.spawnItem(items, meowEvent.block.location);
    //         break;
    // }
    // log("awa")
    //上面为连锁采集测试模块
}

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
    ],
        l = [[1, 2, -1, 3, -1], [1, 2, 3, 4, -1], [1, 2, 3, 4, 5]],
        random0 = meow.getRndInteger(1, meow.arrNonNegative(l[a])),
        b = blocks[l[a].findIndex(_ => _ == random0)],
        random1 = meow.getRndInteger(0, b[1]);
    log("dfksj00: "+b[0]);
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
    let l1 = /* 事件 */[0, 0, 0, 5, 5, 5, 5, 5],
        l2 = /* 箱子 */[0, 50, 40, 45, 50, 75, 95, 195],
        l3 = /* 生物 */[0, 0, 20, 25, 25, 35, 40, 50],
        l4 = /* 方块 */[100, 150, 190, 210, 220, 225, 230, 230],
        l5 = /* 凑数 */500 - l1[i] - l2[i] - l3[i] - l4[i],
        random0 = meow.getRndInteger(1, [l1[i], l2[i], l3[i], l4[i], l5].sort((a, b) => { return b - a })[0]),
        random1,
        l = (v) => {
            let arr = [];
            [l1[i], l2[i], l3[i], l4[i], l5].forEach((_, i) => { if (_ > 0) arr.push(i + 1) });
            let r = meow.getRndInteger(0, arr.length - 1);
            arr.forEach(_ => {
                switch (_) {
                    case 5: { l5 -= v; break; };
                    case 4: { l4[i] -= v; break; };
                    case 3: { l3[i] -= v; break; };
                    case 2: { l2[i] -= v; break; };
                    case 1: { l1[i] -= v; break; };
                }
            })
            random0 -= v;
            return arr[r];
        }
    while (random0 >= 50) random1 = l(50);
    while (random0 >= 10) random1 = l(10);
    while (random0 >= 5) random1 = l(5);
    while (random0 > 0) random1 = l(1);
    random1 = 3;    //awa
    log("dfksj01: "+random1);
    switch (random1) {
        case 5: return dfksj00(meowEvent, level3);
        case 4: return dfksjB00(meowEvent, nowTime, queryNoThis, level3);
        case 3:
            if ((nowTime[1] - timing3) >= 600) { timing3 = 0; meow.setScoreForEntity("timing3", queryNoThis); };/* 6分钟cd */
            if (timing3 == 0) return dfksje00(meowEvent, nowTime, queryNoThis, level3); else return dfksj00(meowEvent, level3);
        case 2:
            if ((nowTime[1] - timing2) >= 600) { timing2 = 0; meow.setScoreForEntity("timing2", queryNoThis); };/* 6分钟cd */
            if (timing2 == 0) return dfksjC00(meowEvent, nowTime, queryNoThis, level3); else return dfksj00(meowEvent, level3);
        case 1:
            if ((nowTime[1] - timing1) >= 100) { timing1 = 0; meow.setScoreForEntity("timing1", queryNoThis); };/* 1分钟cd */
            if (timing1 == 0) return dfksjE00(meowEvent, nowTime, queryNoThis, level3); else return dfksj00(meowEvent, level3);
        default:
            meow.log("主随机模块遇到未知错误，当前为临时随机模块代理");
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
    // meow.setScoreForEntity("timing1", queryNoThis, nowTime[1]);/* 事件cd */
    meow.addScoreForEntity("cache0", meowEvent.player);
    let threshold0 = meow.getScoreForEntity("threshold0", queryNoThis, true);
    if (threshold0 === "ScoreAU") {
        meow.log("严重错误:检测到核心不完整，正在尝试修复");
        try { queryNoThis.runCommandAsync("scoreboard objectives add threshold0 dummy 事件阈值") } catch (e) { return meow.log(`尝试修复失败，请重新初始化，失败原因：${e}`); };
        threshold0 = meow.getScoreForEntity("threshold0", queryNoThis, true);
        if (threshold0 != "ScoreAU") meow.log("修复成功");
    }
    if (threshold0 == 0 || nowTime[0] != ("" + threshold0).slice(0, 6)) { threshold0 = (nowTime[0] + "00"); meow.setScoreForEntity("threshold0", queryNoThis, threshold0); };
    // if (Number(("" + threshold0).slice(6)) < 10) meow.setScoreForEntity("threshold0", queryNoThis, ++threshold0);/* 事件阈值 */
    // else { dfksj00(meowEvent, level3); return; };
    let i;
    if (level3 < 16) i = 0;
    else if (level3 < 20) i = 1;
    else i = 2;
    let l1 = /* 1 */[0, 1, 1],
        l2 = /* 2 */[1, 1, 2],
        l3 = /* 3 */[1, 2, 2],
        random0 = meow.getRndInteger(1, [l1[i], l2[i], l3[i]].sort((a, b) => { return b - a })[0]),
        random1;
    while (random0 > 0) {
        let arr = [];
        [l1[i], l2[i], l3[i]].forEach((_, i) => { if (_ > 0) arr.push(i + 1) });
        let r = meow.getRndInteger(0, arr.length - 1);
        arr.forEach(_ => {
            switch (_) {
                case 1: { l1[i]--; break; };
                case 2: { l2[i]--; break; };
                case 3: { l3[i]--; break; };
            }
        })
        random0--;
        random1 = arr[r];
    }
    //random1 = 2;    //awa
    log("dfksjE00: "+random1);
    let block;
    switch (random1) {
        case 1:
            block = dfksjE01(meowEvent, queryNoThis, meow.theEvents.events1());
            break;
        case 2:
            block = dfksjE01(meowEvent, queryNoThis, meow.theEvents.events2());
            break;
        // case 3: { block = dfksjE30(meowEvent, queryNoThis); break; };
        case 3: { block = true; break; };
        default:
            meow.log("事件随机模块遇到未知错误，当前为临时随机模块代理");
            return dfksj00(meowEvent, level3);
    }
    if (block) return dfksj00(meowEvent, level3);
}
function dfksjE01(meowEvent, queryNoThis, events) {/* 事件-随机模块 */
    let arr = [];
    events.forEach(_ => arr.push(_[1]));
    let random0 = meow.getRndInteger(1, arr.sort((a, b) => { return b - a })[0]);
    arr = [[], []];
    events.forEach(_ => arr[0].push(_[1]));
    let random1;
    while (random0 > 0) {
        arr[1] = [];
        arr[0].forEach((_, i) => { if (_ > 0) arr[1].push(i) });
        let r = meow.getRndInteger(0, arr[1].length - 1);
        arr[1].forEach(_ => { arr[0][_]-- });
        random0--;
        random1 = arr[1][r];
    }
    //random1 = 1;    // awa
    log("dfksjE01: "+random1);
    return events[random1][0](meowEvent, queryNoThis);
}

function dfksjC00(meowEvent, nowTime, queryNoThis, level3) {/* 宝箱 */
    // meow.setScoreForEntity("timing2", queryNoThis, nowTime[1]);/* 箱子cd */
    meow.addScoreForEntity("cache0", meowEvent.player);
    queryNoThis.addTag("chest");
    let threshold1 = meow.getScoreForEntity("threshold1", queryNoThis, true);
    if (threshold1 === "ScoreAU") {
        meow.log("严重错误:检测到核心不完整，正在尝试修复");
        try { queryNoThis.runCommandAsync("scoreboard objectives add threshold1 dummy 宝箱阈值") } catch (e) { return meow.log(`尝试修复失败，请重新初始化，失败原因：${e}`); };
        threshold1 = meow.getScoreForEntity("threshold1", queryNoThis, true);
        if (threshold1 != "ScoreAU") meow.log("修复成功");
    }
    if (threshold1 == 0 || nowTime[0] != ("" + threshold1).slice(0, 6)) { threshold1 = (nowTime[0] + "00"); meow.setScoreForEntity("threshold1", queryNoThis, threshold1); };
    // if (Number(("" + threshold1).slice(6)) < 10) meow.setScoreForEntity("threshold1", queryNoThis, ++threshold1);/* 宝箱阈值 */
    // else { dfksj00(meowEvent, level3); return; };
    let i;
    if (level3 < 16) i = 0;
    else if (level3 < 20) i = 1;
    else i = 2;
    let l1 = /* 1 */[0, 1, 1],
        l2 = /* 2 */[1, 1, 2],
        l3 = /* 3 */[1, 2, 2],
        random0 = meow.getRndInteger(1, [l1[i], l2[i], l3[i]].sort((a, b) => { return b - a })[0]),
        random1;
    while (random0 > 0) {
        let arr = [];
        [l1[i], l2[i], l3[i]].forEach((_, i) => { if (_ > 0) arr.push(i + 1) });
        let r = meow.getRndInteger(0, arr.length - 1);
        arr.forEach(_ => {
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
    log("dfksjC00: "+random1);
    switch (random1) {
        case 1: return dfksjC01(meowEvent, queryNoThis, level3, meow.theChests.chests1());
        // case 2: return dfksjC20(meowEvent);
        // case 3: return dfksjC30(meowEvent);
        default:
            meow.log("宝箱随机模块遇到未知错误，当前为临时随机模块代理");
            return dfksj00(meowEvent, level3);
    }
}
function dfksjC01(meowEvent, queryNoThis, level3, loots) {/* 宝箱-随机模块 */
    meowEvent.block.setType(mc.MinecraftBlockTypes.get("meow:meow_chest"));
    const meowModChest = meowEvent.dimension.spawnEntity("meow:meow_mod_chest", meowEvent.block.location),
        inventoryComponent = meowModChest.getComponent("minecraft:inventory"),
        inventoryContainer = inventoryComponent.container;
    meowModChest.nameTag = "正在解锁宝箱";
    meowModChest.addTag("chest");
    // meowModChest.triggerEvent("meow:can_hit");
    meowModChest.triggerEvent("meow:nameable_always_show");
    let random0 = meow.getRndInteger(1, loots.length),
        loot,
        random1;
    while (random0 > 0) {
        loot = [];
        random0--;
        loots.forEach((_, i) => { if (_[0] >= 0) loot.push(i) });
        random1 = meow.getRndInteger(0, loot.length - 1);
        loots[loot[random1]][0]--;
    }
    log("dfksjC01: "+loot[random1]);
    let items = loots[loot[random1]];
    for (let i = 1; i < items.length; i++) {
        let item,
            id = items[i].id || items[i].物品,
            name = items[i].name || items[i].名字,
            amount = items[i].amount || items[i].数量 || 1,
            data = items[i].data || items[i].特殊值 || 0,
            lore = items[i].lore || items[i].介绍,
            enchantments = items[i].enchantments || items[i].附魔;
        try { item = new mc.ItemStack(mc.Items.get(id)); } catch (e) {
            meow.log(`宝箱随机模块抛出了一个错误，因为即将生成的物品不存在在，请检查拼写：${id}。将临时使用临时随机模块`);
            queryNoThis.removeTag("chest");
            meowModChest.nameTag = "";
            meowModChest.triggerEvent("meow:kill");
            return dfksj00(meowEvent, level3);
        }
        // const itemC = item.getComponents();
        // for (const j in itemC) {
        //     log(j.id);
        // }
        if (typeof (amount) == "number") item.amount = amount;
        else item.amount = meow.getRndInteger(amount[0], amount[1]) || 1;
        item.data = data;
        if (name) item.nameTag = name;
        if (lore) item.setLore(lore);
        const enchantmentComponent = item.getComponent("minecraft:enchantments"),
            enchantmentList = enchantmentComponent.enchantments;
        if (enchantmentList.slot != 0) {
            for (let j = 0; enchantments && j < enchantments.length; j++) {
                let enchantment;
                if (enchantments[j] instanceof Array) {
                    let list = [];
                    for (let k = 0; k < enchantments[j].length; k++) {
                        const element = enchantments[j][k],
                            name = element.name || element.名字,
                            level = element.level || element.等级;
                        if (name == "随机" || name == "random") meow.log("宝箱随机模块抛出了一个错误，因为即将生成的物品所用附魔的随机列表中包含“随机”附魔，请不要随机套随机。");
                        if (enchantment = meow.minecraft.tryEnchantment(name, level)) list.push(enchantment);
                    }
                    const random = meow.getRndInteger(0, list.length - 1);
                    enchantmentList.addEnchantment(list[random]);
                    enchantmentComponent.enchantments = enchantmentList;
                } else {
                    const name = enchantments[j].name || enchantments[j].名字,
                        level = enchantments[j].level || enchantments[j].等级;
                    if (name == "随机" || name == "random") {
                        enchantment = meow.minecraft.randomEnchantment(enchantmentList, level);
                        enchantmentList.addEnchantment(enchantment);
                        enchantmentComponent.enchantments = enchantmentList;
                    } else if (enchantment = meow.minecraft.tryEnchantment(name, level)) {
                        enchantmentList.addEnchantment(enchantment);
                        enchantmentComponent.enchantments = enchantmentList;
                    } else meow.log(`宝箱随机模块抛出了一个错误，因为即将生成的物品所用附魔不存在在，请检查拼写：${name}。`);
                }
            }
        }
        inventoryContainer.addItem(item);
    }
    // inventoryContainer.setItem(meow.getRndInteger(0, 25), new mc.ItemStack(mc.MinecraftItemTypes.apple, meow.getRndInteger(1, 32), 0));
    meow.setScoreForEntity("lifeTime", meowModChest, 1020);
    const entityIntensify = {
        type: "meow:meow_mod_chest",
        name: "正在解锁宝箱",
        tags: "chest"
    },
        meowChestQuery = meowEvent.dimension.getEntities(entityIntensify);
    if (Array.from(meowChestQuery).length == 1) return world.events.tick.subscribe(dfksjC02);
}
function dfksjC02() {
    const dimension = world.getDimension("overworld"),
        entityIntensify = {
            type: "meow:meow_mod_chest",
            name: "正在解锁宝箱",
            tags: "chest"
        },
        meowChestQuery = dimension.getEntities(entityIntensify);
    if (Array.from(meowChestQuery).length == 0) return world.events.tick.unsubscribe(dfksjC02);
    for (const meowChest of meowChestQuery) {
        let lifeTime = meow.getScoreForEntity("lifeTime", meowChest);
        // if (lifeTime === "ScoreAU") {
        //     meow.log("严重错误:检测到核心不完整，正在尝试修复");
        //     try { meowChest.runCommandAsync("scoreboard objectives add lifeTime dummy 生物寿命") } catch (e) { return meow.log(`尝试修复失败，请重新初始化，失败原因：${e}`); };
        //     lifeTime = meow.getScoreForEntity("lifeTime", meowChest, true, 1020);
        //     if (lifeTime != "ScoreAU") meow.log("修复成功");
        // }
        if (lifeTime !== 1000) continue;
        const entityIntensify = {
            type: "meow:meow_mod",
            name: "§d§f§k§m§h§m§r§l§3刷新点§r",
            location: new mc.Location(meowChest.location.x, meowChest.location.y + 1.5, meowChest.location.z),
            tags: "chest",
            closest: 1,
            maxDistance: 0.3
        },
            query = dimension.getEntities(entityIntensify);
        for (const queryNoThis of query) { queryNoThis.removeTag("chest"); }
        meowChest.removeTag("chest");
        meowChest.nameTag = "";
        const inventoryComponent = meowChest.getComponent("minecraft:inventory"),
            inventoryContainer = inventoryComponent.container;
        for (let i = 27; i--;) {
            const items = inventoryContainer.getItem(i);
            if (items != undefined) {
                const itme = meowChest.dimension.spawnItem(items, new mc.Location(meowChest.location.x, meowChest.location.y + 0.9, meowChest.location.z));
                itme.setVelocity({ x: (Math.random() - meow.getRndInteger(0, 1)) / 10, y: 0.5, z: (Math.random() - meow.getRndInteger(0, 1)) / 10 });
            }
        }
        meowChest.triggerEvent("meow:kill");
    }
}

function dfksje00(meowEvent, nowTime, queryNoThis, level3) {/* 生物 */
    // meow.setScoreForEntity("timing3", queryNoThis, nowTime[1]);/* 生物cd */
    let threshold3 = meow.getScoreForEntity("threshold3", queryNoThis, true);
    if (threshold3 === "ScoreAU") {
        meow.log("严重错误:检测到核心不完整，正在尝试修复");
        try { queryNoThis.runCommandAsync("scoreboard objectives add threshold3 dummy 生物阈值") } catch (e) { return meow.log(`尝试修复失败，请重新初始化，失败原因：${e}`); };
        threshold3 = meow.getScoreForEntity("threshold3", queryNoThis, true);
        if (threshold3 != "ScoreAU") meow.log("修复成功");
    }
    if (threshold3 == 0 || nowTime[0] != ("" + threshold3).slice(0, 6)) { threshold3 = (nowTime[0] + "00"); meow.setScoreForEntity("threshold3", queryNoThis, threshold3); };
    // if (Number(("" + threshold3).slice(6)) < 15) meow.setScoreForEntity("threshold3", queryNoThis, ++threshold3);/* 生物阈值 */
    // else { dfksj00(meowEvent, level3); return; };
    let i;
    if (level3 < 12) i = 0;
    else if (level3 < 16) i = 1;
    else if (level3 < 20) i = 2;
    else if (level3 < 30) i = 3;
    else i = 4;
    let l1 = /* 稀有生物 */[0, 0, 0, 0, 1],
        l2 = /* 主世界 */[5, 10, 30, 35, 40],
        l3 = /* 下界 */[0, 0, 2, 3, 5],
        l4 = /* 末地 */[0, 0, 1, 2, 3],
        random0 = meow.getRndInteger(1, [l1[i], l2[i], l3[i], l4[i]].sort((a, b) => { return b - a })[0]),
        random1,
        l = (v) => {
            let arr = [];
            [l1[i], l2[i], l3[i], l4[i]].forEach((_, i) => { if (_ > 0) arr.push(i + 1) });
            let r = meow.getRndInteger(0, arr.length - 1);
            arr.forEach(_ => {
                switch (_) {
                    case 1: { l1[i] -= v; break; };
                    case 2: { l2[i] -= v; break; };
                    case 3: { l3[i] -= v; break; };
                    case 4: { l4[i] -= v; break; };
                }
            })
            random0 -= v;
            return arr[r];
        }
    while (random0 >= 10) random1 = l(10);
    while (random0 >= 5) random1 = l(5);
    while (random0 > 0) random1 = l(1);
    //random1 = 4;    //awa
    log("dfksje00: "+random1);
    dfksj00(meowEvent, level3);
    switch (random1) {
        case 1:
            meow.addScoreForEntity("cache0", meowEvent.player);
            return dfksje01(meowEvent, meow.theEntitys.entitys1(), 1, 1, 6000);/* 稀有生物 */
        case 2: return dfksje01(meowEvent, meow.theEntitys.entitys2(), 3, 1, 1200);/* 主世界 */
        case 3: return dfksje01(meowEvent, meow.theEntitys.entitys3(), 2, 1, 900);/* 下界 */
        case 4: return dfksje01(meowEvent, meow.theEntitys.entitys4(), 5, 1, 900);/* 末地 */
        default:
            meow.log("生物随机模块遇到未知错误，当前为临时随机模块代理");
            return dfksj00(meowEvent, level3);
    }
}
function dfksje01(meowEvent, entitys, random0Max, random0Min, lifeTime) {/* 生物-随机模块 */
    let random0 = meow.getRndInteger(random0Min, random0Max),
        entity,
        random1;
    while (random0 > 0) {
        entity = [];
        random0--;
        entitys.forEach((_, i) => { if (_[1] >= 0) entity.push(i) });
        random1 = meow.getRndInteger(0, entity.length - 1);
        entitys[entity[random1]][1]--;
    }
    log("dfksje01: "+entitys[entity[random1]][0]);
    const spwn = meowEvent.dimension.spawnEntity(entitys[entity[random1]][0], new mc.BlockLocation(meowEvent.block.x, meowEvent.block.y + 1, meowEvent.block.z));
    if (meow.tyrScoreForEntity("lifeTime", spwn) === "ScoreAU") {
        meow.log("严重错误:检测到核心不完整，正在尝试修复");
        try { meowEvent.dimension.runCommandAsync("scoreboard objectives add lifeTime dummy 生物寿命") } catch (e) { return meow.log(`尝试修复失败，请重新初始化，失败原因：${e}`); };
        meow.log("修复成功");
    }
    return meow.setScoreForEntity("lifeTime", spwn, lifeTime);
}

function dfksjB00(meowEvent, nowTime, queryNoThis, level3) {/* 方块 */
    let i;
    if (level3 < 5) i = 0;
    else if (level3 < 7) i = 1;
    else if (level3 < 10) i = 2;
    else if (level3 < 15) i = 3;
    else i = 4;
    let l1 = /* 贵重方块 */[0, 0, 1, 2, 2],
        l2 = /* 矿物 */[10, 90, 70, 55, 35],
        l3 = /* 主世界 */[5, 10, 30, 35, 40],
        l4 = /* 下界 */[0, 0, 5, 10, 12],
        l5 = /* 末地 */[0, 0, 2, 5, 10],
        random0 = meow.getRndInteger(1, [l1[i], l2[i], l3[i], l4[i], l5[i]].sort((a, b) => { return b - a })[0]),
        random1,
        l = (v) => {
            let arr = [];
            [l1[i], l2[i], l3[i], l4[i], l5[i]].forEach((_, i) => { if (_ > 0) arr.push(i + 1) });
            let r = meow.getRndInteger(0, arr.length - 1);
            arr.forEach(_ => {
                switch (_) {
                    case 5: { l5[i] -= v; break; };
                    case 4: { l4[i] -= v; break; };
                    case 3: { l3[i] -= v; break; };
                    case 2: { l2[i] -= v; break; };
                    case 1: { l1[i] -= v; break; };
                }
            })
            random0 -= v;
            return arr[r];
        }
    while (random0 >= 10) random1 = l(10);
    while (random0 >= 5) random1 = l(5);
    while (random0 > 0) random1 = l(1);
    //random1 = 1;    //awa
    log("dfksjB00: "+random1);
    let threshold2 = meow.getScoreForEntity("threshold2", queryNoThis, true);
    if (threshold2 === "ScoreAU") {
        meow.log("严重错误:检测到核心不完整，正在尝试修复");
        try { queryNoThis.runCommandAsync("scoreboard objectives add threshold2 dummy 贵重方块阈值") } catch (e) { return meow.log(`尝试修复失败，请重新初始化，失败原因：${e}`); };
        threshold2 = meow.getScoreForEntity("threshold2", queryNoThis, true);
        if (threshold2 != "ScoreAU") meow.log("修复成功");
    }
    switch (random1) {
        case 3: return dfksjB01(meowEvent, meow.theBlocks.blocks3(), 10, 4);/* 主世界 */
        case 2: return dfksjB01(meowEvent, meow.theBlocks.blocks2(), 12, 3);/* 矿物 */
        case 4: return dfksjB01(meowEvent, meow.theBlocks.blocks4(), 8, 2);/* 下界 */
        case 5: return dfksjB01(meowEvent, meow.theBlocks.blocks5(), 3);/* 末地 */
        case 1:
            if (threshold2 == 0 || nowTime[0] != ("" + threshold2).slice(0, 6)) { threshold2 = (nowTime[0] + "00"); meow.setScoreForEntity("threshold2", queryNoThis, threshold2); };
            if (Number(("" + threshold2).slice(6)) < 15) {
                // meow.setScoreForEntity("threshold2", queryNoThis, ++threshold2);/* 贵重方块阈值 */
                meow.addScoreForEntity("cache0", meowEvent.player);
                return dfksjB01(meowEvent, meow.theBlocks.blocks1(), 3);/* 贵重方块 */
            } else return dfksj00(meowEvent, level3);
        default:
            meow.log("方块随机模块遇到未知错误，当前为临时随机模块代理");
            return dfksj00(meowEvent, level3);
    }
}
function dfksjB01(meowEvent, blocks, random0Max, random0Min = 1) {/* 方块-随机模块 */
    let random0 = meow.getRndInteger(random0Min, random0Max),
        block,
        random1;
    while (random0 > 0) {
        block = [];
        random0--;
        blocks.forEach((_, i) => { if (_[1] >= 0) block.push(i) });
        random1 = meow.getRndInteger(0, block.length - 1);
        blocks[block[random1]][1]--;
    }
    log("dfksjB01: "+blocks[block[random1]][0]);
    const b = mc.MinecraftBlockTypes.get(blocks[block[random1]][0]).createDefaultBlockPermutation();
    meowEvent.block.setPermutation(b);
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
            case "meow:meow_chest":
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
    if (("" + meowEvent.source.typeId).startsWith("meow:")) return;// 过滤(喵喵屋)自己的东西
    meowEvent.source.addTag("explosion");
    meowEvent.cancel = true;
    const explosionOptions = {
        breaksBlocks: false,
        source: meowEvent.source // 防出现被自己炸的现象，例如：苦力怕被代替的爆炸炸死
    }
    // 上面是 GT 1.0.0-beta 新写法，下面是 GT 0.1.0 旧写法
    /* const explosionOptions = new mc.ExplosionOptions();
    explosionOptions.breaksBlocks = false;
    explosionOptions.source = meowEvent.source; */
    const explodeNoBlocksLoc = new mc.Location(meowEvent.source.location.x, meowEvent.source.location.y, meowEvent.source.location.z);
    let radius;
    switch (meowEvent.source.typeId) {
        case "minecraft:creeper":
            radius = 3;
            if (meowEvent.source.getComponent("minecraft:is_charged")) radius = 6;
            break;
        case "minecraft:tnt":
            radius = 4;
            break;
        case "minecraft:ender_crystal":
            radius = 6;
            break;
        case "minecraft:tnt_minecart":
            radius = 3;
            break;
        case "minecraft:fireball":
        case "minecraft:wither_skull_dangerous":
        case "minecraft:wither_skull":
            radius = 1;
            break;
        case "minecraft:wither":
            radius = 7;
            break;
        default:
            radius = 5;
    }
    const str = "§3dimension:§r" + meowEvent.dimension.id + " §2x:" + explodeNoBlocksLoc.x + ", y:" + explodeNoBlocksLoc.y + ", z:" + explodeNoBlocksLoc.z + " §3source:§r" + meowEvent.source.id + " §3radius:§r" + radius;
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
            for (let i = 0; i < blockPerm.length; i++) {
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