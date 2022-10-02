/*
    本作品采用知识共享署名-非商业性-相同方式共享 4.0 国际许可协议进行许可。 要查看此许可证的副本，请访问
    https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh

    This work is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License. To view a copy of this license, visit 
    http://creativecommons.org/licenses/by-nc-sa/4.0/
*/

/*+==================分==界==线==================+*/

/* ======稀有生物====== */
const entitys1 = () => [
    /* ["生物"，随机权重] */
    ["minecraft:mooshroom", 1]      /* 哞菇 */
]

/* =======主世界======= */
const entitys2 = () => [
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
]

/* =======下=界======= */
const entitys3 = () => [
    ["minecraft:blaze", 1],         /* 烈焰人 */
    ["minecraft:hoglin", 2],        /* 疣猪兽 */
    ["minecraft:magma_cube", 1],    /* 岩浆怪 */
    ["minecraft:strider", 1],       /* 炽足兽 */
    ["minecraft:zoglin", 1],        /* 僵尸疣猪兽 */
    ["minecraft:zombie_pigman", 2]  /* 僵尸猪灵 */
]

/* =======末=地======= */
const entitys4 = () => [
    ["minecraft:enderman", 5],      /* 末影人 */
    ["minecraft:endermite", 1]      /* 末影螨 */
]

/*+==================分==界==线==================+*/

export {
    entitys1,
    entitys2,
    entitys3,
    entitys4
}