/*
    本作品采用知识共享署名-非商业性-相同方式共享 4.0 国际许可协议进行许可。 要查看此许可证的副本，请访问
    https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh

    This work is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License. To view a copy of this license, visit 
    http://creativecommons.org/licenses/by-nc-sa/4.0/
*/

import { Enchantment, EnchantmentTypes } from "@minecraft/server";
import { getRndInteger, log } from "../meow/methods.js"

/*+==================分==界==线==================+*/

const enchantmentLists = {
    水下速掘: { id: "aqua_affinity", max: 1 },
    节肢杀手: { id: "bane_of_arthropods", max: 5 },
    绑定诅咒: { id: "binding", max: 1 },
    爆炸保护: { id: "blast_protection", max: 4 },
    引雷: { id: "channeling", max: 1 },
    深海探索者: { id: "depth_strider", max: 3 },
    效率: { id: "efficiency", max: 5 },
    摔落保护: { id: "feather_falling", max: 4 },
    火焰附加: { id: "fire_aspect", max: 2 },
    火焰保护: { id: "fire_protection", max: 4 },
    火矢: { id: "flame", max: 1 },
    时运: { id: "fortune", max: 3 },
    冰霜行者: { id: "frost_walker", max: 2 },
    穿刺: { id: "impaling", max: 5 },
    无限: { id: "infinity", max: 1 },
    击退: { id: "knockback", max: 2 },
    抢夺: { id: "looting", max: 3 },
    忠诚: { id: "loyalty", max: 3 },
    海之眷顾: { id: "luck_of_the_sea", max: 3 },
    饵钓: { id: "lure", max: 3 },
    经验修补: { id: "mending", max: 1 },
    多重射击: { id: "multishot", max: 1 },
    穿透: { id: "piercing", max: 4 },
    力量: { id: "power", max: 5 },
    弹射物保护: { id: "projectile_protection", max: 4 },
    保护: { id: "protection", max: 4 },
    冲击: { id: "punch", max: 2 },
    快速装填: { id: "quick_charge", max: 3 },
    水下呼吸: { id: "respiration", max: 3 },
    激流: { id: "riptide", max: 3 },
    锋利: { id: "sharpness", max: 5 },
    精准采集: { id: "silk_touch", max: 1 },
    亡灵杀手: { id: "smite", max: 5 },
    灵魂疾行: { id: "soul_speed", max: 3 },
    迅捷潜行: { id: "swift_sneak", max: 3 },
    荆棘: { id: "thorns", max: 3 },
    耐久: { id: "unbreaking", max: 3 },
    消失诅咒: { id: "vanishing", max: 1 }
}
const tryEnchantment = (name, level) => {
    if (name) {
        if (!Object.hasOwnProperty.call(enchantmentLists, name)) {
            log(`检测到系统正在使用不存在的附魔，请检查拼写：${name}`);
            return false;
        }
        if (typeof(level) == "string") {
            if (level == "随机" || level == "random") level = getRndInteger(1, enchantmentLists[name].max);
            else if (Number(level) >= 1) {
                if (level <= enchantmentLists[name].max) level = Number(level);
                else {
                    log(`检测到系统正在使用附魔(${name})的等级(${level})大于该附魔允许的最大等级(${enchantmentLists[name].max})，已自动纠正为最大等级`);
                    level = enchantmentLists[name].max;
                }
            }
        } else if (typeof(level) == "number" && level >= 1) {
            if (level <= enchantmentLists[name].max);
            else {
                log(`检测到系统正在使用附魔(${name})的等级(${level})大于该附魔允许的最大等级(${enchantmentLists[name].max})，已自动纠正为最大等级`);
                level = enchantmentLists[name].max;
            }
        } else {
            if (level) log(`检测到系统正在使用附魔(${name})的等级(${level})不是有效输入，已自动纠正为1`);
            level = 1;
        }
        return new Enchantment(EnchantmentTypes.get(enchantmentLists[name].id), level);
    } else {
        log("检测到系统正在试图附魔空气");
        return false;
    }
}
const randomEnchantment = (enchantmentList, level) => {
    let list = [];
    for (const key in enchantmentLists) {
        if (Object.hasOwnProperty.call(enchantmentLists, key)) {
            const element = enchantmentLists[key];
            if (element.id == "mending") continue;/* 随机中排除经验修补 */
            if (enchantmentList.canAddEnchantment(new Enchantment(EnchantmentTypes.get(element.id))) && enchantmentList.hasEnchantment(EnchantmentTypes.get(element.id)) == 0) list.push(element);
        }
    }
    const random = getRndInteger(0, list.length - 1);
    if (typeof(level) == "string") {
        if (level == "随机" || level == "random") level = getRndInteger(1, list[random].max);
        else if (Number(level) >= 1) {
            if (level <= list[random].max) level = Number(level);
            else level = list[random].max;
        }
    } else if (typeof(level) == "number" && level >= 1) {
        if (level <= list[random].max);
        else level = list[random].max;
    } else level = 1;
    return new Enchantment(EnchantmentTypes.get(list[random].id), level);
}

/*+==================分==界==线==================+*/

export {
    tryEnchantment,
    randomEnchantment
}