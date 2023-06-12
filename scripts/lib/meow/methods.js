/*
    本作品采用知识共享署名-非商业性-相同方式共享 4.0 国际许可协议进行许可。 要查看此许可证的副本，请访问
    https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh

    This work is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License. To view a copy of this license, visit
    http://creativecommons.org/licenses/by-nc-sa/4.0/
*/

import { world, system } from "@minecraft/server";
const overworld = world.getDimension("overworld");

/*+==================分==界==线==================+*/

//messages
const log = _ => {
    world.sendMessage(`[§3MeowHouseModule§r] ${"" + _}`);
    // overworld.runCommandAsync(`say ${String(_)}`);
},
    // messagesForPlayer = (rawMessage, player) => {
    //     player.sendMessage(rawMessage);
    // },
    runCommand = (object, command, isReturn = false, returnError = false) => {
        try {
            const commandResult = object.runCommand(command);
            if (isReturn) return commandResult;
        } catch (e) {
            log(`runCommand错误: command:${command} error:${e}`);
            return returnError ? { object: object, command: command, error: e } : "Error";
        }
    },

    //ScoreForName  Score: min=-2,147,483,648 max=2,147,483,647
    tyrScoreForName = (objective, name, getLog = false) => {
        const theObjective = world.scoreboard.getObjective(objective);
        if (!theObjective) {
            if (getLog) log(`tyrScore:错误，目标记分板(${objective})不存在`);
            return "ScoreAU";
        }
        if (!theObjective.getScores().find(_ => _.participant.displayName == name)) {
            if (getLog) log(`tyrScore:错误，目标对象(${name})在目标记分板(${objective})中未定义分数`);
            return "ScoreBU";
        }
        return "true";
    },
    getScoreForName = (objective, name, rectify = false, c = 0, getLog = false) => {
        const tyrScore = tyrScoreForName(objective, name, getLog);
        if (tyrScore === "ScoreAU") return "ScoreAU";
        if (tyrScore === "ScoreBU") {
            if (!rectify) return "ScoreBU";
            setScoreForName(objective, name, c);
            if (getLog) log(`自动纠正:已为目标对象(${name})在目标记分板(${objective})中定义分数(${c})`);
            return c;
        }
        const score = world.scoreboard.getObjective(objective).getScores().find(_ => _.participant.displayName == name).score;
        if (getLog) log(`getScore:目标对象(${name})在目标记分板(${objective})中的分数为(${score})`);
        return score;
    },
    setScoreForName = (objective, name, score = 0, getLog = false) => {
        if (tyrScoreForName(objective, name, getLog) === "ScoreAU") return;
        overworld.runCommandAsync(`scoreboard players set ${name} ${objective} ${score}`);
        if (getLog) log(`setScore:将目标对象(${name})在目标记分板(${objective})中的分数设为(${score})`);
    },
    addScoreForName = (objective, name, c = 1, getLog = false, isReturn = false) => {
        let score = getScoreForName(objective, name);
        if (score === "ScoreAU") {
            if (getLog) return log(`addScore:错误,目标记分板(${objective})不存在`);
            return;
        }
        if (score === "ScoreBU") score = 0;
        overworld.runCommandAsync(`scoreboard players add ${name} ${objective} ${c}`);
        if (getLog) log(`addScore:目标对象(${name})在目标记分板(${objective})中的分数现为(${score}+${c}=${score + c})`);
        if (isReturn) return score;
    },

    //ScoreForEntity
    tyrScoreForEntity = (objective, entity, getLog = false) => {
        const theObjective = world.scoreboard.getObjective(objective),
            theEntity = theObjective.getScores().find(_ => _.participant.id == entity.scoreboardIdentity?.id);
        if (!theObjective) {
            if (getLog) log(`tyrScore:错误，目标记分板(${objective})不存在`);
            return "ScoreAU";
        }
        // if (!world.scoreboard.getObjective(objective).getScores().find(_ => _.participant.id == entity.scoreboard?.id)) {
        if (!theEntity) {
            if (getLog) log(`tyrScore:错误，目标对象(${entity.id})在目标记分板(${objective})中未定义分数`);
            return "ScoreBU";
        }
        return theEntity;
    },
    getScoreForEntity = (objective, entity, rectify = false, c = 0, getLog = false) => {
        const tyrScore = tyrScoreForEntity(objective, entity, getLog);
        if (tyrScore === "ScoreAU") return "ScoreAU";
        if (tyrScore === "ScoreBU") {
            if (!rectify) return "ScoreBU";
            setScoreForEntity(objective, entity, c);
            if (getLog) log(`自动纠正:已为目标对象(${entity.id})在目标记分板(${objective})中定义分数(${c})`);
            return c;
        }
        const score = tyrScore.score;
        if (getLog) log(`getScore:目标对象(${entity.id})在目标记分板(${objective})中的分数为(${score})`);
        return score;
    },
    setScoreForEntity = (objective, entity, score = 0, getLog = false) => {
        const tyrScore = tyrScoreForEntity(objective, entity, getLog);
        if (tyrScore === "ScoreAU") {
            if (getLog) return log(`setScore:错误,目标记分板(${objective})不存在`);
            return;
        }
        entity.runCommandAsync(`scoreboard players set @s ${objective} ${score}`);
        // tyrScore.participant.setScore(world.scoreboard.getObjective(objective), score);
        if (getLog) log(`setScore:将目标对象(${entity, id})在目标记分板(${objective})中的分数设为(${score})`);
    },
    addScoreForEntity = (objective, entity, addScore = 1, isReturn = false, getLog = false) => {
        let oldScore = getScoreForEntity(objective, entity);
        if (oldScore === "ScoreAU") {
            if (getLog) return log(`addScore:错误,目标记分板(${objective})不存在`);
            return;
        }
        if (oldScore === "ScoreBU") oldScore = 0;
        // entity.runCommandAsync(`scoreboard players add @s ${objective} ${addScore}`);
        setScoreForEntity(objective, entity, ~~oldScore + addScore);
        if (getLog) log(`addScore:目标对象(${entity.id})在目标记分板(${objective})中的分数现为(${oldScore}+${addScore}=${oldScore + addScore})`);
        if (isReturn) return oldScore;
    },

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
    getNowTime = () => {
        const now = new Date;
        return [
            ("" + now.getFullYear()).slice(2),
            ("0" + (now.getMonth() + 1)).slice(-2),
            ("0" + now.getDate()).slice(-2),
            ("0" + now.getHours()).slice(-2),
            ("0" + now.getMinutes()).slice(-2),
            ("0" + now.getSeconds()).slice(-2),
            ("00" + now.getMilliseconds()).slice(-3)
        ]
    },
    getCurrentDate = () => {
        const now = new Date;
        return ("" + now.getFullYear()).slice(2) + ("0" + (now.getMonth() + 1)).slice(-2) + ("0" + now.getDate()).slice(-2);
    },
    getCurrentTime = () => {
        const now = new Date;
        return ("0" + now.getDate()).slice(-2) + ("0" + now.getHours()).slice(-2) + ("0" + now.getMinutes()).slice(-2) + ("0" + now.getSeconds()).slice(-2);
    },
    getCurrentTimes = () => {
        const now = new Date;
        return ("0" + now.getHours()).slice(-2) + ("0" + now.getMinutes()).slice(-2) + ("0" + now.getSeconds()).slice(-2) + ("00" + now.getMilliseconds()).slice(-3);
    },

    //关于数值的相关操作
    getRndInteger = (min, max) => {
        if (min == max) return min;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    arrSum = (arr) => {
        let sum = 0;
        arr.forEach((_) => { sum += _ });
        return sum;
    },
    arrNonNegative = (arr) => {
        let a = 0;
        arr.forEach((_) => { if (_ >= 0) a++ });
        return a;
    }

class Score {
    _data = {
        objectiveId: String,    //目标计分板id
        objective: Object,      //目标计分板对象
        object: Object,         //获取目标对象||获取目标对象名称(玩家)||获取目标对象id(虚拟对象)
        scoreInfo: Object,      //获取目标对象的目标计分板数据
        score: Number,          //记录的分数
        fakePlayer: Boolean,    //是否为虚拟对象
        getLog: Boolean         //是否打印log
    }
    constructor(objectiveId, object, fakePlayer = false, getLog = false) {
        this._data.objectiveId = objectiveId;
        this._data.object = typeof (object) == "string" ? !fakePlayer ? (world.getPlayers({ name: object }))[0] ? (world.getPlayers({ name: object }))[0] : undefined : object : object;
        this._data.fakePlayer = fakePlayer;
        this._data.getLog = getLog;
        this.reload();
    }
    try() {
        if (!this._data.objective) return log(`tyrScore: §c错误,目标记分板(${this._data.objectiveId})不存在`);
        if (!this._data.object) return log(`tyrScore: §c错误,目标对象不存在,请检查对象是否存在于世界`);
        if (this._data.scoreInfo === "OSU") return log(`tyrScore: §c错误,目标对象(${!this._data.fakePlayer ? this._data.object.id : "虚拟对象:" + this._data.object})在目标记分板(${this._data.objectiveId})中未定义分数`);
        return log(`tyrScore: §3成功,目标对象(${!this._data.fakePlayer ? this._data.object.id : "虚拟对象:" + this._data.object})存在于目标记分板(${this._data.objectiveId}),分数为${this._data.score}`);
    }
    reload() {
        this._data.objective = world.scoreboard.getObjective(this._data.objectiveId);
        this._data.scoreInfo = this._data.object && this._data.objective ? this._data.fakePlayer && typeof (this._data.object) == "string" ? this._data.objective.getScores().find(_ => _.participant.displayName == this._data.object) ?? "OSU" : this._data.objective.getScores().find(_ => _.participant.id == this._data.object.scoreboardIdentity?.id) ?? "OSU" : undefined;
        this._data.score = !this._data.object || !this._data.objective ? undefined : this._data.scoreInfo !== "OSU" ? this._data.scoreInfo.score : "OSU";
        return this;
    }
    get(rectify_OSU = false, theRectifyScore = 0) {
        if (this._data.score !== "OSU") return this._data.score;
        else if (rectify_OSU) {
            this._set(theRectifyScore);
            return theRectifyScore;
        } else return {
            error: "OSU",
            rectify: (_ = { data: this._data, theRectifyScore: theRectifyScore }) => { 
                // for (const key in _) {
                //     if (Object.hasOwnProperty.call(_, key)) {
                //         log(key+": "+_[key]);
                //         if (typeof(_[key]) == "object") {
                //             for (const keys in _[key]) {
                //                 if (Object.hasOwnProperty.call(_[key], keys)) {
                //                     log(_[key]+": "+keys+" "+_[key][keys]);
                //                 }
                //             }
                //         }
                //     }
                // }
                const error = runCommand((!_.data.fakePlayer ? _.data.object : overworld), `scoreboard players set ${!_.data.fakePlayer ? "@s" : _.data.object} ${_.data.objectiveId} ${_.theRectifyScore}`, false, true);
                if (_.data.getLog && error) log(`getScore: §c错误,未能在目标记分板(${_.data.objectiveId})中初始化目标对象(虚拟对象:${_.data.object})分数(${_.theRectifyScore}) 错误信息:${error}`)
            }
        }
    }
    _set(_setScore) {
        if (this._data.scoreInfo !== "OSU") this._data.scoreInfo.participant.setScore(this._data.objective, _setScore);
        else {                                                                                                                                                                                                                                            
            const error = runCommand((!this._data.fakePlayer ? this._data.object : overworld), `scoreboard players set ${!this._data.fakePlayer ? "@s" : this._data.object} ${this._data.objectiveId} ${_setScore}`, false, true);
            if (error) log(`_setScore: §c错误,未能在目标记分板(${this._data.objectiveId})中设置目标对象(${!this._data.fakePlayer ? this._data.object.id : "虚拟对象:" + this._data.object})分数为${_setScore} 错误信息:${error}`)
        }
        this._data.score = _setScore;
        // this.reload();
        // system.run(((_ = this) => _.reload()));
    }
    _addObjectiveForSet(_) {
        // for (const key in _) {
        //     if (Object.hasOwnProperty.call(_, key)) {
        //         log(key+": "+_[key]);
        //         if (typeof(_[key]) == "object") {
        //             for (const keys in _[key]) {
        //                 if (Object.hasOwnProperty.call(_[key], keys)) {
        //                     log(_[key]+": "+keys+" "+_[key][keys]);
        //                 }
        //             }
        //         }
        //     }
        // }
        const objective = this.objective.add(_.data.objectiveId);
        if (!_.data.fakePlayer) objective.setScore(_.data.object, _.setScore);
        else {
            const error = runCommand(overworld, `scoreboard players set ${_.data.object} ${_.data.objectiveId} ${_.setScore}`, false, true);
            if (error) log(`_addObjectiveForSet: §c错误,未能在目标记分板(${_.data.objectiveId})中设置目标对象(虚拟对象:${_.data.object})分数为${_.setScore} 错误信息:${error}`)
        }
    }
    set(setScore = 0, rectify_OU = false) {
        if (!this._data.objective) {
            if (this._data.getLog) return log(`setScore: §c错误,目标记分板(${this._data.objectiveId})不存在`);
            if (rectify_OU) this._addObjectiveForSet({ data: this._data, setScore: setScore });
            return {
                error: "OU",
                rectify: (_ = { data: this._data, setScore: setScore }) => this._addObjectiveForSet(_)
            }
        }
        this._set(setScore);
    }
    add(addScore = 1, rectify_OU = false) {
        if (!this._data.objective) {
            if (this._data.getLog) return log(`addScore: §c错误,目标记分板(${this._data.objectiveId})不存在`);
            if (rectify_OU) this._addObjectiveForSet({ data: this._data, setScore: addScore });
            return {
                error: "OU",
                rectify: (_ = { data: this._data, setScore: addScore }) => this._addObjectiveForSet(_)
            }
        }
        this._set(this.get(true) + addScore);
    }
    del() {
        if (!this._data.fakePlayer) {
            if (this._data.scoreInfo.participant.removeFromObjective(this._data.objective) && this._data.getLog) log(`delScore: §3成功,已在计分板(${this._data.objectiveId})移除目标对象(${this._data.object.id})的记录`);
            else if (this._data.getLog) log(`delScore: §c错误,未能在计分板(${this._data.objectiveId})移除目标对象(${this._data.object.id})的记录`);
        } else {
            const error = runCommand(overworld, `scoreboard players reset ${this._data.object} ${this._data.objectiveId}`, false, true);
            if (error) log(`delScore: §c错误,未能在计分板(${this._data.objectiveId})移除目标对象(虚拟对象${this._data.object})的记录 错误消息:${error}`);
        }
        this._data.scoreInfo = "OSU";
        this._data.score = undefined;
    }
    objective = {
        // _data: this._data,
        add(objectiveId, displayName = objectiveId) {
            return world.scoreboard.addObjective(objectiveId, displayName);
        },
        reload() {

        },
        del(objectiveId) {
            return world.scoreboard.removeObjective(objectiveId);
        }
    }
}
const score = (objectiveId, object, fakePlayer, getLog) => new Score(objectiveId, object, fakePlayer, getLog);

/*+==================分==界==线==================+*/

export {
    log,
    runCommand,
    tyrScoreForName,
    getScoreForName,
    setScoreForName,
    addScoreForName,
    tyrScoreForEntity,
    getScoreForEntity,
    setScoreForEntity,
    addScoreForEntity,
    Score,
    score,
    getNowTime,
    getCurrentDate,
    getCurrentTime,
    getCurrentTimes,
    getRndInteger,
    arrSum,
    arrNonNegative
}

// 萌新造的破轮子(