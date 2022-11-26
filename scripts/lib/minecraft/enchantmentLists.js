/*
    本作品采用知识共享署名-非商业性-相同方式共享 4.0 国际许可协议进行许可。 要查看此许可证的副本，请访问
    https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh

    This work is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License. To view a copy of this license, visit 
    http://creativecommons.org/licenses/by-nc-sa/4.0/
*/

import { Enchantment, MinecraftEnchantmentTypes } from "@minecraft/server";
import { getRndInteger, log } from "../meow/methods.js"

/*+==================分==界==线==================+*/

const enchantmentLists = {
    水下速掘: { id: "aquaAffinity", max: 1, return: MinecraftEnchantmentTypes.aquaAffinity },
    节肢杀手: { id: "baneOfArthropods", max: 5, return: MinecraftEnchantmentTypes.baneOfArthropods },
    绑定诅咒: { id: "binding", max: 1, return: MinecraftEnchantmentTypes.binding },
    爆炸保护: { id: "blastProtection", max: 4, return: MinecraftEnchantmentTypes.blastProtection },
    引雷: { id: "channeling", max: 1, return: MinecraftEnchantmentTypes.channeling },
    深海探索者: { id: "depthStrider", max: 3, return: MinecraftEnchantmentTypes.depthStrider },
    效率: { id: "efficiency", max: 5, return: MinecraftEnchantmentTypes.efficiency },
    摔落保护: { id: "featherFalling", max: 4, return: MinecraftEnchantmentTypes.featherFalling },
    火焰附加: { id: "fireAspect", max: 2, return: MinecraftEnchantmentTypes.fireAspect },
    火焰保护: { id: "fireProtection", max: 4, return: MinecraftEnchantmentTypes.fireProtection },
    火矢: { id: "flame", max: 1, return: MinecraftEnchantmentTypes.flame },
    时运: { id: "fortune", max: 3, return: MinecraftEnchantmentTypes.fortune },
    冰霜行者: { id: "frostWalker", max: 2, return: MinecraftEnchantmentTypes.frostWalker },
    穿刺: { id: "impaling", max: 5, return: MinecraftEnchantmentTypes.impaling },
    无限: { id: "infinity", max: 1, return: MinecraftEnchantmentTypes.infinity },
    击退: { id: "knockback", max: 2, return: MinecraftEnchantmentTypes.knockback },
    抢夺: { id: "looting", max: 3, return: MinecraftEnchantmentTypes.looting },
    忠诚: { id: "loyalty", max: 3, return: MinecraftEnchantmentTypes.loyalty },
    海之眷顾: { id: "luckOfTheSea", max: 3, return: MinecraftEnchantmentTypes.luckOfTheSea },
    饵钓: { id: "lure", max: 3, return: MinecraftEnchantmentTypes.lure },
    经验修补: { id: "mending", max: 1, return: MinecraftEnchantmentTypes.mending },
    多重射击: { id: "multishot", max: 1, return: MinecraftEnchantmentTypes.multishot },
    穿透: { id: "piercing", max: 4, return: MinecraftEnchantmentTypes.piercing },
    力量: { id: "power", max: 5, return: MinecraftEnchantmentTypes.power },
    弹射物保护: { id: "projectileProtection", max: 4, return: MinecraftEnchantmentTypes.projectileProtection },
    保护: { id: "protection", max: 4, return: MinecraftEnchantmentTypes.protection },
    冲击: { id: "punch", max: 2, return: MinecraftEnchantmentTypes.punch },
    快速装填: { id: "quickCharge", max: 3, return: MinecraftEnchantmentTypes.quickCharge },
    水下呼吸: { id: "respiration", max: 3, return: MinecraftEnchantmentTypes.respiration },
    激流: { id: "riptide", max: 3, return: MinecraftEnchantmentTypes.riptide },
    锋利: { id: "sharpness", max: 5, return: MinecraftEnchantmentTypes.sharpness },
    精准采集: { id: "silkTouch", max: 1, return: MinecraftEnchantmentTypes.silkTouch },
    亡灵杀手: { id: "smite", max: 5, return: MinecraftEnchantmentTypes.smite },
    灵魂疾行: { id: "soulSpeed", max: 3, return: MinecraftEnchantmentTypes.soulSpeed },
    迅捷潜行: { id: "swiftSneak", max: 3, return: MinecraftEnchantmentTypes.swiftSneak },
    荆棘: { id: "thorns", max: 3, return: MinecraftEnchantmentTypes.thorns },
    耐久: { id: "unbreaking", max: 3, return: MinecraftEnchantmentTypes.unbreaking },
    消失诅咒: { id: "vanishing", max: 1, return: MinecraftEnchantmentTypes.vanishing }
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
        return new Enchantment(enchantmentLists[name].return, level);
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
            if (enchantmentList.canAddEnchantment(new Enchantment(element.return)) && enchantmentList.hasEnchantment(element.return) == 0) list.push(element);
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
    return new Enchantment(list[random].return, level);
}

/*+==================分==界==线==================+*/

export {
    tryEnchantment,
    randomEnchantment
}