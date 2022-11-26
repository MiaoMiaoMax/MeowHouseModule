/*
    本作品采用知识共享署名-非商业性-相同方式共享 4.0 国际许可协议进行许可。 要查看此许可证的副本，请访问
    https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh

    This work is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License. To view a copy of this license, visit 
    http://creativecommons.org/licenses/by-nc-sa/4.0/
*/

import { world } from "@minecraft/server";

/*+==================分==界==线==================+*/

//log
const log = _ => {
    world.say(`[§3MeowHouseModule§r] ${""+_}`);                             //GT 1.0.0-beta 新写法
    // world.getDimension("overworld").runCommandAsync(`say ${String(_)}`); //GT 0.1.0 旧写法
}

//Score: min=-2,147,483,648 max=2,147,483,647
//ScoreForName
const tyrScoreForName = (objective, name, getLog = false) => {
    if (!world.scoreboard.getObjectives().find(_ => _.id == objective)) {
        if (getLog) log(`tyrScore:错误，目标记分板(${objective})不存在`);
        return "ScoreAU";
    }
    if (!world.scoreboard.getObjective(objective).getScores().find(_ => _.participant.displayName == name)) {
        if (getLog) log(`tyrScore:错误，目标对象(${name})在目标记分板(${objective})中未定义分数`);
        return "ScoreBU";
    }
    return "true";
}
const getScoreForName = (objective, name, getLog = false, rectify = false, c = 0) => {
    const tyrScore = tyrScoreForName(objective, name, getLog);
    if (tyrScore == "ScoreAU") return "ScoreAU";
    if (tyrScore == "ScoreBU") {
        if (!rectify) return "ScoreBU";
        setScoreForName(objective, name, c);
        if (getLog) log(`自动纠正:已为目标对象(${name})在目标记分板(${objective})中定义分数(${c})`);
        return c;
    }
    const score = world.scoreboard.getObjective(objective).getScores().find(_ => _.participant.displayName == name).score;
    if (getLog) log(`getScore:目标对象(${name})在目标记分板(${objective})中的分数为(${score})`);
    return score;
}
const setScoreForName = (objective, name, score = 0, getLog = false) => {
    if (tyrScoreForName(objective, name, getLog) == "ScoreAU") return;
    world.getDimension("overworld").runCommandAsync(`scoreboard players set ${name} ${objective} ${score}`);
    if (getLog) log(`setScore:将目标对象(${name})在目标记分板(${objective})中的分数设为(${score})`);
}
const addScoreForName = (objective, name, c = 1, getLog = false, isReturn = false) => {
    if (tyrScoreForName(objective, name, getLog) == "ScoreAU") {
        if (getLog) return log(`addScore:错误,目标记分板(${objective})不存在`);
        return;
    }
    const score = getScoreForName(objective, name, false, true);
    world.getDimension("overworld").runCommandAsync(`scoreboard players add ${name} ${objective} ${c}`);
    if (getLog) log(`addScore:目标对象(${name})在目标记分板(${objective})中的分数现为(${score}+${c}=${score + c})`);
    if (isReturn) return score;
}

//ScoreForEntity
const tyrScoreForEntity = (objective, entity, getLog = false) => {
    if (!world.scoreboard.getObjectives().find(_ => _?.id == objective)) {
        if (getLog) log(`tyrScore:错误，目标记分板(${objective})不存在`);
        return "ScoreAU";
    }
    if (!world.scoreboard.getObjective(objective).getScores().find(_ => _.participant.id == entity.scoreboard?.id)) {
        if (getLog) log(`tyrScore:错误，目标对象(${entity.id})在目标记分板(${objective})中未定义分数`);
        return "ScoreBU";
    }
    return "true";
}
const getScoreForEntity = (objective, entity, getLog = false, rectify = false, c = 0) => {
    const tyrScore = tyrScoreForEntity(objective, entity, getLog);
    if (tyrScore == "ScoreAU") return "ScoreAU";
    if (tyrScore == "ScoreBU") {
        if (!rectify) return "ScoreBU";
        setScoreForEntity(objective, entity, c);
        if (getLog) log(`自动纠正:已为目标对象(${entity.id})在目标记分板(${objective})中定义分数(${c})`);
        return c;
    }
    const score = world.scoreboard.getObjective(objective).getScores().find(_ => _.participant.id == entity.scoreboard.id).score;
    if (getLog) log(score);
    return score;
}
const setScoreForEntity = (objective, entity, score = 0, getLog = false) => {
    if (tyrScoreForEntity(objective, entity, getLog) == "ScoreAU") return;
    entity.runCommandAsync(`scoreboard players set @s ${objective} ${score}`);
    if (getLog) log(`setScore:将目标对象(${entity, id})在目标记分板(${objective})中的分数设为(${score})`);
}
const addScoreForEntity = (objective, entity, c = 1, getLog = false, isReturn = false) => {
    if (tyrScoreForEntity(objective, entity, getLog) == "ScoreAU") {
        if (getLog) return log(`addScore:错误,目标记分板(${objective})不存在`);
        return;
    }
    const score = getScoreForEntity(objective, entity, false, true);
    entity.runCommandAsync(`scoreboard players add @s ${objective} ${c}`);
    if (getLog) log(`addScore:目标对象(${entity.id})在目标记分板(${objective})中的分数现为(${score}+${c}=${score + c})`);
    if (isReturn) return score;
}

//MeowOp
/* const tyrMeowOpObjective = () => {
    if (world.scoreboard.getObjectives().find((_) => _.id == "MeowOp")) return;
    log(`MeowOp:错误，存储介质不存在，正在尝试修复`);
    try { world.getDimension("overworld").runCommandAsync("scoreboard objectives add MeowOp dummy") } catch (e) { return log(`尝试修复失败，请重新初始化，失败原因：${e}`); };
    return log("修复成功");
}
const getMeowOpForPlayerEntity = (PlayerEntity, getLog) => {
    tyrMeowOpObjective();
}
const addMeowOpForPlayerEntity = (PlayerEntity, getLog) => {
    tyrMeowOpObjective();
}
const removeMeowOpForPlayerEntity = (PlayerEntity, getLog) => {
    tyrMeowOpObjective();
} */

//getTime
const getNowTime = () => {
    const now = new Date;
    const timeY = ("" + now.getFullYear()).slice(2);//年
    let timeM = "";                                 //月
    let timeD = "";                                 //日
    let timeH = "";                                 //时
    let timem = "";                                 //分
    let timeS = "";                                 //秒
    let times = "";                                 //毫秒
    if ((now.getMonth() + 1) < 10) timeM = "0" + now.getMonth() + 1;
    else timeM += now.getMonth() + 1;
    if (now.getDate() < 10) timeD = "0" + now.getDate();
    else timeD += now.getDate();
    if (now.getHours() < 10) timeH = "0" + now.getHours();
    else timeH += now.getHours();
    if (now.getMinutes() < 10) timem = "0" + now.getMinutes();
    else timem += now.getMinutes();
    if (now.getSeconds() < 10) timeS = "0" + now.getSeconds();
    else timeS += now.getSeconds();
    if (now.getMilliseconds() < 100) times = "0" +now.getMilliseconds();
    else times += now.getMilliseconds();
    return [timeY, timeM, timeD, timeH, timem, timeS, times];
}
const getCurrentDate = () => {
    let now = getNowTime();
    return now[0] + now[1] + now[2];
}
const getCurrentTime = () => {
    let now = getNowTime();
    return now[2] + now[3] + now[4] + now[5];
}
const getCurrentTimes = () => {
    let now = getNowTime();
    return now[3] + now[4] + now[5] + now[6];
}

//关于数值的相关操作
const getRndInteger = (min, max) => {
    if (min == max) return min;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
const arrSum = (arr) => {
    let sum = 0;
    arr.forEach((_) => { sum += _ });
    return sum;
}
const arrNonNegative = (arr) => {
    let a = 0;
    arr.forEach((_) => { if (_ >= 0) a++ });
    return a;
}

/*+==================分==界==线==================+*/

export {
    log,
    tyrScoreForName,
    getScoreForName,
    setScoreForName,
    addScoreForName,
    tyrScoreForEntity,
    getScoreForEntity,
    setScoreForEntity,
    addScoreForEntity,
    getNowTime,
    getCurrentDate,
    getCurrentTime,
    getCurrentTimes,
    getRndInteger,
    arrSum,
    arrNonNegative
}

// 萌新造的破轮子(