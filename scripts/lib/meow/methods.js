/*
    本作品采用知识共享署名-非商业性-相同方式共享 4.0 国际许可协议进行许可。 要查看此许可证的副本，请访问
    https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh

    This work is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License. To view a copy of this license, visit 
    http://creativecommons.org/licenses/by-nc-sa/4.0/
*/

import { world } from "mojang-minecraft";

/*+==================分==界==线==================+*/

//log
const log = (a) => {
    world.say(`[§3MeowHouseModule§r] ${String(a)}`);
    //world.getDimension("overworld").runCommand(`say ${a}`); //1.19.0旧写法
}

//ScoreForName
const tyrScoreForName = (a, b, getLog = false) => {
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
const getScoreForName = (a, b, getLog = false, rectify = false, c = 0) => {
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
const setScoreForName = (a, b, score = 0, getLog = false) => {
    if (tyrScoreForName(a, b, getLog) == "ScoreAU") return;
    world.getDimension("overworld").runCommand(`scoreboard players set ${b} ${a} ${score}`);
    if (getLog) log(`setScore:将目标对象(${b})在目标记分板(${a})中的分数设为(${score})`);
}
const addScoreForName = (a, b, c = 1, getLog = false, isReturn = false) => {
    if (tyrScoreForName(a, b, getLog) == "ScoreAU") return log(`addScore:错误,目标记分板(${a})不存在`);
    const score = getScoreForName(a, b, false, true);
    world.getDimension("overworld").runCommand(`scoreboard players add ${b} ${a} ${c}`);
    if (getLog) log(`addScore:目标对象(${b})在目标记分板(${a})中的分数现为(${score}+${c}=${score + c})`);
    if (isReturn) return score;
}

//ScoreForEntity
const tyrScoreForEntity = (a, b, getLog = false) => {
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
const getScoreForEntity = (a, b, getLog = false, rectify = false, c = 0) => {
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
const setScoreForEntity = (a, b, score = 0, getLog = false) => {
    if (tyrScoreForEntity(a, b, getLog) == "ScoreAU") return;
    b.runCommand(`scoreboard players set @s ${a} ${score}`);
    if (getLog) log(`setScore:将目标对象(${b, id})在目标记分板(${a})中的分数设为(${score})`);
}
const addScoreForEntity = (a, b, c = 1, getLog = false, isReturn = false) => {
    if (tyrScoreForEntity(a, b, getLog) == "ScoreAU") return log(`addScore:错误,目标记分板(${a})不存在`);
    const score = getScoreForEntity(a, b, false, true);
    b.runCommand(`scoreboard players add @s ${a} ${c}`);
    if (getLog) log(`addScore:目标对象(${b.id})在目标记分板(${a})中的分数现为(${score}+${c}=${score + c})`);
    if (isReturn) return score;
}

//getTime
const getNowTime = () => {
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
const getCurrentDate = () => {
    let now = getNowTime();
    let time = now[0] + now[1] + now[2];
    return time;
}
const getCurrentTime = () => {
    let now = getNowTime();
    let time = now[1] + now[2] + now[3] + now[4] + now[5];
    return time;
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
    getRndInteger,
    arrSum,
    arrNonNegative
}

// 萌新造的破轮子(