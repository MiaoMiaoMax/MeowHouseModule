/*
    本作品采用知识共享署名-非商业性-相同方式共享 4.0 国际许可协议进行许可。 要查看此许可证的副本，请访问
    https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh

    This work is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License. To view a copy of this license, visit 
    http://creativecommons.org/licenses/by-nc-sa/4.0/
*/

/*+==================分==界==线==================+*/

const chests1 = () => [
    [1, 
        {
            物品: "minecraft:apple",
            名字: "这是一个苹果",
            介绍: ["是的没错", "这确实是一个苹果"]
        },
        {
            物品: "minecraft:apple",
            名字: "这是一个桃子",
            介绍: ["是的没错", "你在想桃子", "快去睡觉吧", "这是一个苹果"]
        },
        {
            物品: "minecraft:iron_pickaxe",
            附魔: [
                [
                    { 名字: "效率", 等级: "1" },
                    { 名字: "效率", 等级: "2" }
                ]

                // { 名字: "随机", 等级: "随机" },
                // { 名字: "随机", 等级: "随机" },
                // { 名字: "随机", 等级: "随机" }

                // { 名字: "效率", 等级: "1" },
                // { 名字: "效率", 等级: "2" }
            ]
        }
    ]
]

const chests2 = () => [
    
]

const chests3 = () => [
    
]

/*+==================分==界==线==================+*/

export {
    chests1,
    chests2,
    chests3
}