import { world, ExplosionOptions, BlockLocation, MinecraftBlockTypes, ItemStack, MinecraftItemTypes } from "mojang-minecraft";
function log(log){
    world.getDimension("overworld").runCommand(`say ` + log );
} 

world.events.beforeChat.subscribe(m => {
    //pos(m);
    command(m);
    return m;
})
world.events.blockBreak.subscribe(m2 => {
    blockBreak(m2);
})
world.events.playerJoin.subscribe(m3 => {
    m3.player.runCommand(`say awa`);
    return m3;
})
world.events.beforePistonActivate.subscribe(m4 => {
    piston(m4);
    return m4;
})
world.events.beforeExplosion.subscribe(m5 => {
    explosion(m5);
    return m5;
})
world.events.beforeItemUseOn.subscribe(m6 => {
    beforeItemUseOn(m6);
    return m6;
})
function pos(m){
    var x = parseInt(m.sender.location.x);
    var y = parseInt(m.sender.location.y);
    var z = parseInt(m.sender.location.z);
    var msg = "x:" + x + ", y:" + y + ", z:" + z;
    log(msg)
    m.message = String(m.message).replace(/<pos>/g,`${msg}`);
}
function command(m){
    if(String(m.message).startsWith("..")){
        var cmd =String(m.message).split(".")[2].split(" ").filter((str)=>{return str != ""});
        m.cancel=true;
        switch(cmd[0]){
            case "test":
                let r = Math.random();
                m.sender.runCommand(`tellraw @a {"rawtext":[{"text":"§r§fMeowHouseModule测试成功,请求来源:§3${m.sender.name}"}]}`);
                log(r);
                console.log("好");
                break;
            case "help":
                m.sender.runCommand(`tellraw @s {"rawtext":[{"text":"§r§fawa 还在编写中"}]}`);
                break;
            case "awa":
                m.sender.runCommand(`tellraw @s {"rawtext":[{"text":"§r§fawa"}]}`);
                break;
            default:
                m.sender.runCommand(`tellraw @s {"rawtext":[{"text":"§c未知的命令:${cmd[0]}。请检查命令是否存在，以及您对它是否拥有使用权限。\n输入 ..help 以查看所有命令"}]}`);
        }
    }
}
function blockBreak(m2){
    //try {
        m2.player.runCommand(`scoreboard players add @s level0 1`);
        m2.player.runCommand(`tag @s add dig_block_cache`);
        // 获取触发事件玩家的“op”计分板分数
        const s = world.scoreboard.getObjective("op").getScores().find((_) => _.participant.displayName == m2.player.name).score;
        log(s);
        // 呜，我是笨蛋，对计分板api的使用还是迷迷糊糊的
        
        // 自动“恢复”被敲掉的原方块
        if(s == 0){
            let a = m2.brokenBlockPermutation.type.id;
            log(a);
            let b = MinecraftBlockTypes.get(a).createDefaultBlockPermutation();
            let c = m2.brokenBlockPermutation.getAllProperties();
            for(var i = 0; i < c.length; i++){
                b.getProperty(c[i].name).value = m2.brokenBlockPermutation.getProperty(c[i].name).value;
                log(c[i].name);
            }
            m2.block.setPermutation(b);
        }
        
        //连锁采集
        if(s == 1){
            log(m2.player.selectedSlot);
            log(m2.player.getComponent("inventory").container.getItem(m2.player.selectedSlot).id);
            let a = m2.brokenBlockPermutation.type.id;
            log(a);
            let b;
            let c;
            switch(a){
                case "minecraft:log" :
                    b = [ 1, 1, "old_log_type" ];
                    c = { item: [ MinecraftItemTypes.log ], oak: [ 0, 0 ], spruce: [ 0, 1 ], birch: [ 0, 2 ], jungle: [ 0, 3 ] };
                    break;
                case "minecraft:log2" :
                    b = [ 1, 1, "new_log_type" ];
                    c = { item: [ MinecraftItemTypes.log2 ], acacia: [ 0, 0 ], dark_oak: [ 0, 1 ] };
                    break;
                    
                case "minecraft:stone" :
                    b = [ 1, 2, "stone_type" ];
                    c = { block: [ MinecraftItemTypes.stone ], item : [ MinecraftItemTypes.stone, MinecraftItemTypes.cobblestone ], stone : [ 1, 0 ], granite : [ 0, 1 ], granite_smooth : [ 0, 2 ], diorite : [ 0, 3 ], diorite_smooth : [ 0, 4 ], andesite : [ 0, 5 ], andesite_smooth : [ 0, 6 ] };
                    break;
                    
                case "minecraft:wheat" :
                    b = [ 2, 3, "growth", 7 ];
                    c = { };
                    break;
                    
                case "minecraft:leaves" :
                    b = [ 1, 4, "old_leaf_type" ];
                    c = { block: [ MinecraftItemTypes.leaves ], oak: [ 0, 0 ], spruce: [ 0, 1 ], birch: [ 0, 2 ], jungle: [ 0, 3 ] };
                    break;
                case "minecraft:leaves2" :
                    b = [ 1, 4, "new_leaf_type" ];
                    c = { block: [ MinecraftItemTypes.leaves2 ], acacia: [ 0, 0 ], dark_oak: [ 0, 1 ]};
                    break;
                default:
                    return;
            }
            
            let d = [ m2.block.location ];
            let f =c[m2.brokenBlockPermutation.getProperty(b[2]).value];
            let g = 0;
            let h = 80;
            for(var i = 0; i < d.length && g < h; i++){
                let e = [ new BlockLocation(d[i].x, d[i].y+1, d[i].z), new BlockLocation(d[i].x+1, d[i].y, d[i].z), new BlockLocation(d[i].x, d[i].y, d[i].z+1), new BlockLocation(d[i].x-1, d[i].y, d[i].z), new BlockLocation(d[i].x, d[i].y, d[i].z-1), new BlockLocation(d[i].x, d[i].y-1, d[i].z), new BlockLocation(d[i].x+1, d[i].y, d[i].z+1), new BlockLocation(d[i].x-1, d[i].y, d[i].z+1), new BlockLocation(d[i].x+1, d[i].y, d[i].z-1), new BlockLocation(d[i].x-1, d[i].y, d[i].z-1), new BlockLocation(d[i].x+1, d[i].y+1, d[i].z), new BlockLocation(d[i].x-1, d[i].y+1, d[i].z), new BlockLocation(d[i].x+1, d[i].y-1, d[i].z), new BlockLocation(d[i].x-1, d[i].y-1, d[i].z), new BlockLocation(d[i].x, d[i].y+1, d[i].z+1), new BlockLocation(d[i].x, d[i].y+1, d[i].z-1), new BlockLocation(d[i].x, d[i].y-1, d[i].z+1), new BlockLocation(d[i].x, d[i].y-1, d[i].z-1) ];
                for(var j = 0; j < e.length && g < h; j++){
                    if(world.getDimension(m2.block.dimension.id).getBlock(e[j]).id == a && d.findIndex( (_) => _.x === e[j].x && _.y === e[j].y && _.z === e[j].z) == -1){
                        switch(b[0]){
                            case 1 :
                                if(world.getDimension(m2.block.dimension.id).getBlock(e[j]).permutation.getProperty(b[2]).value == m2.brokenBlockPermutation.getProperty(b[2]).value){d.push(e[j]);world.getDimension(m2.block.dimension.id).runCommand(`setblock ` + e[j].x + ` ` + e[j].y + ` ` + e[j].z + ` air -1 replace`);g++;};
                                break;
                            case 2 :
                                if(world.getDimension(m2.block.dimension.id).getBlock(e[j]).permutation.getProperty(b[2]).value == b[3] && m2.brokenBlockPermutation.getProperty(b[2]).value == b[3]){d.push(e[j]);world.getDimension(m2.block.dimension.id).runCommand(`setblock ` + e[j].x + ` ` + e[j].y + ` ` + e[j].z + ` air -1 replace`);g++;};
                                break;
                        }
                        /*
                        let f = e[j].permutation.getProperty(b[1]).validValues;
                        log(f[0]);
                        for(var k = 0; k < f.length; k++){
                            log(f[k]);
                            let f = e[j].permutation.getProperty(b[1]).validValues.indexOf(e[j].permutation.getProperty(b[1]).value);
                        }
                        */
                    }
                }
            }
            /*
            while(g > 0 && d.length > 0){
                world.getDimension(m2.block.dimension.id).runCommand(`fill ` + d[0].x + ` ` + d[0].y + ` ` + d[0].z + ` ` + d[d.length-1].x + ` ` + d[d.length-1].y + ` ` + d[d.length-1].z + ` air -1 replace `+ a);
                d = d.filter( (_) => world.getDimension(m2.block.dimension.id).getBlock(_).id === a)
            }
            */
            if(g >= h)log("链锁数目已到达上限");
            if(g > 0)log("链锁方块:" + a + " 链锁数:" + g);
            switch(b[1]){
                case 1 :
                    let items;
                    while(g > 64){
                        items = new ItemStack(c.item[f[0]], 64, f[1]);
                        world.getDimension(m2.block.dimension.id).spawnItem(items, m2.block.location);
                        g = g-64;
                    }
                    items = new ItemStack(c.item[f[0]], g, f[1]);
                    world.getDimension(m2.block.dimension.id).spawnItem(items, m2.block.location);
                    break;
            }
        }
    //} catch(e) { log(e) };
}
function piston(m4){
    const a = m4.piston.attachedBlocks;// 受活塞影响的方块(们)的location数组
    for(var i = 0; i < a.length; i++){
        let block = world.getDimension(m4.dimension.id).getBlock(a[i]).id;
        let str = "§3dimension:§r" + m4.dimension.id + " §2x:" + a[i].x + ", y:" + a[i].y + ", z:" + a[i].z + " §3block:§r" + block;
        switch(block){
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
                str = str + " §4是阻止对象";
                break;
        }
        log(str);
    }
}
function explosion(m5){
    try {
        if(!m5.source)return;// 过滤GT制造没有实体的爆炸（但同时也是过滤了没有实体触发的爆炸，比如：非在主世界的床，非在地狱的重生锚）
        if(m5.source.hasTag("explosion"))return;// 过滤已有标签实体的爆炸，因为给代替的爆炸设置了source
        m5.source.addTag("explosion");
        m5.cancel = true;
        const explosionOptions = new ExplosionOptions();
        explosionOptions.breaksBlocks = false;
        explosionOptions.source = m5.source;// 防出现被自己炸的现象，例如：苦力怕被代替的爆炸炸死
        const explodeNoBlocksLoc = m5.source.location;
        let radius;
        switch(m5.source.id){
            case "minecraft:creeper":
                radius = 3;
                if(m5.source.getComponent("minecraft:is_charged"))radius = 6;
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
            default:
                radius = 5;
        }
        const str = "§3dimension:§r" + m5.dimension.id + " §2x:" + parseInt(m5.source.location.x) + ", y:" + parseInt(m5.source.location.y) + ", z:" + parseInt(m5.source.location.z) + " §3source:§r" + m5.source.id + " §3radius:§r" + radius;
        log(str);
        // world.getDimension(m5.dimension.id).createExplosion(explodeNoBlocksLoc, 15, explosionOptions);
        m5.dimension.createExplosion(explodeNoBlocksLoc, radius, explosionOptions);
        m5.source.removeTag("explosion");
    } catch(e) { log(e) };
}
function beforeItemUseOn(m6){
    const { item, source } = m6;
    const dimension = source.dimension.id;
    const block = world.getDimension(dimension).getBlock(m6.blockLocation);
    const blockPerm = block.permutation.getAllProperties();
    // log(block.id);
    // log(item.id);
    // log(dimension);
    // log(source.id);
    for(var i = 0; i < blockPerm.length; i++){
        let str = blockPerm[i].name + " = " + blockPerm[i].value;
        log(str);
    }
    try {
        if(block.id == "minecraft:respawn_anchor" && dimension != "minecraft:nether" && block.permutation.getProperty("respawn_anchor_charge").value > 0 && item.id != "minecraft:glowstone"){m6.cancel = true;log("§4已被拦截");return;};
        if(block.id == "minecraft:respawn_anchor" && dimension != "minecraft:nether" && block.permutation.getProperty("respawn_anchor_charge").value == 4){m6.cancel = true;log("§4已被拦截");return;};
        if(block.id == "minecraft:bed" && dimension != "minecraft:overworld"){m6.cancel = true;log("§4已被拦截");return;};
        if(item.id == "minecraft:fire" || item.id == "minecraft:soul_fire" || item.id == "minecraft:flint_and_steel" || item.id == "minecraft:fire_charge"){if(block.id == "minecraft:crying_obsidian" || block.id == "minecraft:obsidian" || world.getDimension(dimension).getBlock(new BlockLocation(block.location.x + 1, block.location.y, block.location.z + 1)).id == "minecraft:crying_obsidian" || world.getDimension(dimension).getBlock(new BlockLocation(block.location.x + 1, block.location.y, block.location.z + 1)).id == "minecraft:obsidian" || world.getDimension(dimension).getBlock(new BlockLocation(block.location.x - 1, block.location.y, block.location.z + 1)).id == "minecraft:crying_obsidian" || world.getDimension(dimension).getBlock(new BlockLocation(block.location.x - 1, block.location.y, block.location.z + 1)).id == "minecraft:obsidian" || world.getDimension(dimension).getBlock(new BlockLocation(block.location.x + 1, block.location.y, block.location.z - 1)).id == "minecraft:crying_obsidian" || world.getDimension(dimension).getBlock(new BlockLocation(block.location.x + 1, block.location.y, block.location.z - 1)).id == "minecraft:obsidian" || world.getDimension(dimension).getBlock(new BlockLocation(block.location.x - 1, block.location.y, block.location.z - 1)).id == "minecraft:crying_obsidian" || world.getDimension(dimension).getBlock(new BlockLocation(block.location.x - 1, block.location.y, block.location.z - 1)).id == "minecraft:obsidian"){m6.cancel = true;log("§4已被拦截");return;};};
        if(item.id == "minecraft:dispenser"){if(world.getDimension(dimension).getBlock(new BlockLocation(block.location.x + 1, block.location.y, block.location.z + 1)).id == "minecraft:crying_obsidian" || world.getDimension(dimension).getBlock(new BlockLocation(block.location.x + 1, block.location.y, block.location.z + 1)).id == "minecraft:obsidian" || world.getDimension(dimension).getBlock(new BlockLocation(block.location.x - 1, block.location.y, block.location.z + 1)).id == "minecraft:crying_obsidian" || world.getDimension(dimension).getBlock(new BlockLocation(block.location.x - 1, block.location.y, block.location.z + 1)).id == "minecraft:obsidian" || world.getDimension(dimension).getBlock(new BlockLocation(block.location.x + 1, block.location.y, block.location.z - 1)).id == "minecraft:crying_obsidian" || world.getDimension(dimension).getBlock(new BlockLocation(block.location.x + 1, block.location.y, block.location.z - 1)).id == "minecraft:obsidian" || world.getDimension(dimension).getBlock(new BlockLocation(block.location.x - 1, block.location.y, block.location.z - 1)).id == "minecraft:crying_obsidian" || world.getDimension(dimension).getBlock(new BlockLocation(block.location.x - 1, block.location.y, block.location.z - 1)).id == "minecraft:obsidian" || world.getDimension(dimension).getBlock(new BlockLocation(block.location.x + 1, block.location.y + 1, block.location.z)).id == "minecraft:crying_obsidian" || world.getDimension(dimension).getBlock(new BlockLocation(block.location.x + 1, block.location.y + 1, block.location.z)).id == "minecraft:obsidian" || world.getDimension(dimension).getBlock(new BlockLocation(block.location.x - 1, block.location.y + 1, block.location.z)).id == "minecraft:crying_obsidian" || world.getDimension(dimension).getBlock(new BlockLocation(block.location.x - 1, block.location.y + 1, block.location.z)).id == "minecraft:obsidian" || world.getDimension(dimension).getBlock(new BlockLocation(block.location.x + 1, block.location.y - 1, block.location.z)).id == "minecraft:crying_obsidian" || world.getDimension(dimension).getBlock(new BlockLocation(block.location.x + 1, block.location.y - 1, block.location.z)).id == "minecraft:obsidian" || world.getDimension(dimension).getBlock(new BlockLocation(block.location.x - 1, block.location.y -1, block.location.z)).id == "minecraft:crying_obsidian" || world.getDimension(dimension).getBlock(new BlockLocation(block.location.x - 1, block.location.y - 1, block.location.z)).id == "minecraft:obsidian" || world.getDimension(dimension).getBlock(new BlockLocation(block.location.x, block.location.y + 1, block.location.z + 1)).id == "minecraft:crying_obsidian" || world.getDimension(dimension).getBlock(new BlockLocation(block.location.x, block.location.y + 1, block.location.z + 1)).id == "minecraft:obsidian" || world.getDimension(dimension).getBlock(new BlockLocation(block.location.x, block.location.y + 1, block.location.z - 1)).id == "minecraft:crying_obsidian" || world.getDimension(dimension).getBlock(new BlockLocation(block.location.x, block.location.y + 1, block.location.z - 1)).id == "minecraft:obsidian" || world.getDimension(dimension).getBlock(new BlockLocation(block.location.x, block.location.y - 1, block.location.z + 1)).id == "minecraft:crying_obsidian" || world.getDimension(dimension).getBlock(new BlockLocation(block.location.x, block.location.y - 1, block.location.z + 1)).id == "minecraft:obsidian" || world.getDimension(dimension).getBlock(new BlockLocation(block.location.x, block.location.y - 1, block.location.z - 1)).id == "minecraft:crying_obsidian" || world.getDimension(dimension).getBlock(new BlockLocation(block.location.x, block.location.y - 1, block.location.z - 1)).id == "minecraft:obsidian"){m6.cancel = true;log("§4已被拦截");return;};};
    } catch(e) { log(e) };
}
//萌新造的破轮子（