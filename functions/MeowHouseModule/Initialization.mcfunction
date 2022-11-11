scoreboard objectives add timing0 dummy
scoreboard objectives add timing1 dummy 事件cd
scoreboard objectives add timing2 dummy 箱子cd
scoreboard objectives add timing3 dummy 生物cd
# scoreboard objectives add timing4 dummy
# scoreboard objectives add timing5 dummy
scoreboard objectives add timingB dummy bedrock_cd

scoreboard objectives add level0 dummy 玩家破坏方块数
scoreboard objectives add level1 dummy 玩家单方块积分
scoreboard objectives add level2 dummy 刷新点刷新数
scoreboard objectives add level3 dummy 玩家单方块等级

scoreboard objectives add threshold0 dummy 事件阈值
scoreboard objectives add threshold1 dummy 宝箱阈值
scoreboard objectives add threshold2 dummy 贵重方块阈值
scoreboard objectives add threshold3 dummy 生物阈值
scoreboard objectives add threshold4 dummy 积分阈值
scoreboard objectives add threshold5 dummy 经验阈值

scoreboard objectives add cache0 dummy 等级计算数据1
scoreboard objectives add cache1 dummy 等级计算数据2
scoreboard objectives add cache2 dummy 等级计算数据3
scoreboard objectives add cache3 dummy 等级计算数据4

scoreboard objectives add lifeTime dummy 生物寿命
# scoreboard objectives add itemTime dummy 掉落物寿命
scoreboard objectives add meowTps dummy tps
scoreboard objectives add dotiledrops dummy

scoreboard players set @e[type=meow:meow_mod,tag=Client] timing0 0
scoreboard players set @e[type=meow:meow_mod,tag=Client] timing1 0
scoreboard players set @e[type=meow:meow_mod,tag=Client] timing2 0
scoreboard players set @e[type=meow:meow_mod,tag=Client] timing3 0
scoreboard players set @e[type=meow:meow_mod,tag=Client] timing4 0
scoreboard players set @e[type=meow:meow_mod,tag=Client] timing5 0

gamerule commandblockoutput false

tellraw @a {"rawtext":[{"text":"§l§3核心储存模块已搭建完毕\n并已把commandblockoutput参数改为false\n\n这是来自CNQuanYeCha的MeowHouseModule(喵喵屋模块)v1的提示"}]}
playsound random.anvil_use @a ~ ~ ~

# 本作品采用知识共享署名-非商业性-相同方式共享 4.0 国际许可协议进行许可。 要查看此许可证的副本，请访问
# https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh

# This work is licensed under the Creative Commons 署名-非商业性使用-相同方式共享 4.0 国际 License. To view a copy of this license, visit
# http://creativecommons.org/licenses/by-nc-sa/4.0/.