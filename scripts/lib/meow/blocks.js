/*
    本作品采用知识共享署名-非商业性-相同方式共享 4.0 国际许可协议进行许可。 要查看此许可证的副本，请访问
    https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh

    This work is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License. To view a copy of this license, visit 
    http://creativecommons.org/licenses/by-nc-sa/4.0/
*/

/*+==================分==界==线==================+*/

/* ======贵重方块====== */
const blocks1 = () => [
    /* ["方块"，随机权重] */
    ["minecraft:ancient_debris", 1],            /* 远古残骸 */
    ["minecraft:deepslate_diamond_ore", 1],     /* 深层钻石矿石 */
    ["minecraft:diamond_ore", 2],               /* 钻石矿石 */
    ["minecraft:deepslate_emerald_ore", 2],     /* 深层绿宝石矿石 */
    ["minecraft:emerald_ore", 3],               /* 绿宝石矿石 */
    ["minecraft:gilded_blackstone", 1]          /* 镶金黑石 */
]

/* =======矿=物======= */
const blocks2 = () => [
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
]

/* =======主世界======= */
const blocks3 = () => [
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
]

/* =======下=界======= */
const blocks4 = () => [
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
]

/* =======末=地======= */
const blocks5 = () => [
    // ["minecraft:ancient_debris", 1],
    ["minecraft:end_bricks", 1],                /* 末地石砖 */
    ["minecraft:end_stone", 3],                 /* 末地石 */
    ["minecraft:purpur_block", 2],              /* 紫珀块 */
    ["minecraft:obsidian", 1]                   /* 黑曜石 */
]

/*+==================分==界==线==================+*/

export {
    blocks1,
    blocks2,
    blocks3,
    blocks4,
    blocks5
}