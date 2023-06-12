/*
    本作品采用知识共享署名-非商业性-相同方式共享 4.0 国际许可协议进行许可。 要查看此许可证的副本，请访问
    https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh

    This work is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License. To view a copy of this license, visit
    http://creativecommons.org/licenses/by-nc-sa/4.0/
*/

/*+==================分==界==线==================+*/

const Settings = {
/* 
    这里是核心配置文件。

    请不要输入无关紧要的东西，
    也不要修改除选项参数之外的东西，
    这样会让配置文件失去作用，
    所有设置都将采用默认值，
    除非你知道你在输入什么。

    以下每一个选项都附有说明，
    请在阅读了对应的说明再进行修改。

    部分设置可在游戏里进行临时修改，以方便调试。

    每次载入核心都将读取并应用本配置文件内的设置。

    下面每一个选项都长这个样子：
    选项:[参数]
    [参数]就是你可以修改的内容。
*/

/*+==================分==界==线==================+*/

//运行日志

logs:1

/*
    默认值为“0”，
    可填入“0”和“1”，
    “0”代表“关”，
    “1”代表“开”。

    是否启用运行日志。

    此运行日志将直接输出到游戏里，
    可能会造成刷屏现象，非必要，请保持关闭状态。

    在游戏里核心管理员可以临时修改此设置，
    游戏里修改命令为“..log [参数]”
    [参数]如果为空，将查询此设置状态，
    同理，[参数]输入“0”代表“关”，“1”代表“开”。
*/
,


//核心管理员名单

admin_list:1

/*
    默认值为“1”，
    可填入“0”和“1”，
    “0”代表“关”，
    “1”代表“开”。

    是否启用核心管理员名单。
*/
,


//每秒活塞活动上限

thePistonMax:60

/*
    默认值为“60”，
    可填非负入整数，
    如果设置为“0”代表禁用活塞。
    请注意过小的值，可能会引起通报刷屏。
    

    是否启用核心管理员名单。
*/
,

//每秒实体爆炸活动上限

theExplosionMax:45

/*
    默认值为“45”，
    可填非负入整数，
    如果设置为“0”代表禁用实体爆炸。
    请注意过小的值，可能会引起通报刷屏。
    

    是否启用核心管理员名单。
*/
,

//每秒实体生成活动上限

theEntitysMax:100

/*
    默认值为“100”，
    可填非负入整数，
    如果设置为“0”代表禁用实体生成。
    请注意过小的值，可能会引起通报刷屏。
    

    是否启用核心管理员名单。
*/
,

/********以下选项为实验性功能********/


//tick序列

tick:0

/*
    默认值为“0”，
    可填入“0”和“1”，
    “0”代表“关”，
    “1”代表“开”。

    是否启用tick序列。
    目前序列任务有：
        tps检测 (可在计分板“meowTick”看见结果)

    注意：该功能会消耗一定的性能
*/
,

/*+==================分==界==线==================+*/

}
export { Settings };