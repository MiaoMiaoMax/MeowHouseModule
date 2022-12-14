effect @e[type=meow:meow_mod,name=§d§f§k§v§5§r§l§3刷新点§r] clear

# time add 5

scoreboard players set @e[type=item,tag=!life] itemTime 1200
scoreboard players remove @e[scores={itemTime=1..}] itemTime 1
tag @e[type=item,tag=!life,scores={itemTime=0..}] add life
execute as @e[scores={itemTime=200}] at @s run particle meow:number10 ~ ~0.5 ~
execute as @e[scores={itemTime=180}] at @s run particle meow:number9 ~ ~0.5 ~
execute as @e[scores={itemTime=160}] at @s run particle meow:number8 ~ ~0.5 ~
execute as @e[scores={itemTime=140}] at @s run particle meow:number7 ~ ~0.5 ~
execute as @e[scores={itemTime=120}] at @s run particle meow:number6 ~ ~0.5 ~
execute as @e[scores={itemTime=100}] at @s run particle meow:number5 ~ ~0.5 ~
execute as @e[scores={itemTime=80}] at @s run particle meow:number4 ~ ~0.5 ~
execute as @e[scores={itemTime=60}] at @s run particle meow:number3 ~ ~0.5 ~
execute as @e[scores={itemTime=40}] at @s run particle meow:number2 ~ ~0.5 ~
execute as @e[scores={itemTime=20}] at @s run particle meow:number1 ~ ~0.5 ~
execute as @e[scores={itemTime=0}] at @s run particle meow:chaotic_fissure ~ ~0.5 ~
execute as @e[scores={itemTime=0}] at @s run playsound event.chaotic_fissure @a ~~~
kill @e[type=item,scores={itemTime=0}]

scoreboard players remove @e[scores={lifeTime=1..}] lifeTime 1
execute as @e[family=!meow,scores={lifeTime=200}] at @s run particle meow:number10 ~ ~2 ~
execute as @e[family=!meow,scores={lifeTime=200}] at @s run particle meow:number10 ~ ~2 ~
execute as @e[family=!meow,scores={lifeTime=180}] at @s run particle meow:number9 ~ ~2 ~
execute as @e[family=!meow,scores={lifeTime=180}] at @s run particle meow:number9 ~ ~2 ~
execute as @e[family=!meow,scores={lifeTime=160}] at @s run particle meow:number8 ~ ~2 ~
execute as @e[family=!meow,scores={lifeTime=160}] at @s run particle meow:number8 ~ ~2 ~
execute as @e[family=!meow,scores={lifeTime=140}] at @s run particle meow:number7 ~ ~2 ~
execute as @e[family=!meow,scores={lifeTime=140}] at @s run particle meow:number7 ~ ~2 ~
execute as @e[family=!meow,scores={lifeTime=120}] at @s run particle meow:number6 ~ ~2 ~
execute as @e[family=!meow,scores={lifeTime=120}] at @s run particle meow:number6 ~ ~2 ~
execute as @e[family=!meow,scores={lifeTime=100}] at @s run particle meow:number5 ~ ~2 ~
execute as @e[family=!meow,scores={lifeTime=100}] at @s run particle meow:number5 ~ ~2 ~
execute as @e[family=!meow,scores={lifeTime=80}] at @s run particle meow:number4 ~ ~2 ~
execute as @e[family=!meow,scores={lifeTime=80}] at @s run particle meow:number4 ~ ~2 ~
execute as @e[family=!meow,scores={lifeTime=60}] at @s run particle meow:number3 ~ ~2 ~
execute as @e[family=!meow,scores={lifeTime=60}] at @s run particle meow:number3 ~ ~2 ~
execute as @e[family=!meow,scores={lifeTime=40}] at @s run particle meow:number2 ~ ~2 ~
execute as @e[family=!meow,scores={lifeTime=40}] at @s run particle meow:number2 ~ ~2 ~
execute as @e[family=!meow,scores={lifeTime=20}] at @s run particle meow:number1 ~ ~2 ~
execute as @e[family=!meow,scores={lifeTime=20}] at @s run particle meow:number1 ~ ~2 ~
execute as @e[family=!meow,scores={lifeTime=0}] at @s run particle meow:chaotic_fissure ~ ~1 ~
execute as @e[family=!meow,scores={lifeTime=0}] at @s run playsound event.chaotic_fissure @a ~~~
kill @e[family=!meow,scores={lifeTime=0}]

scoreboard players remove @e[scores={timingB=1..}] timingB 1
execute as @e[type=meow:meow_mod,name=§d§f§k§v§5§r§l§3刷新点§r,scores={timingB=300}] at @s run say @a[scores={timingB=300}],是不是很硬awa
execute as @e[type=meow:meow_mod,name=§d§f§k§v§5§r§l§3刷新点§r,scores={timingB=30}] at @s run say @a[scores={timingB=30}],好啦,不逗你了
execute as @e[type=meow:meow_mod,name=§d§f§k§v§5§r§l§3刷新点§r,scores={timingB=0}] at @s run say @a[scores={timingB=0}],awa,惊中之喜
execute as @e[type=meow:meow_mod,name=§d§f§k§v§5§r§l§3刷新点§r,scores={timingB=0}] at @s run setblock ~ ~-1 ~ minecraft:deepslate_diamond_ore
execute as @e[type=meow:meow_mod,name=§d§f§k§v§5§r§l§3刷新点§r,scores={timingB=0}] at @s run particle minecraft:totem_manual
execute as @e[type=meow:meow_mod,name=§d§f§k§v§5§r§l§3刷新点§r,scores={timingB=0}] at @s run particle minecraft:totem_manual
execute as @e[type=meow:meow_mod,name=§d§f§k§v§5§r§l§3刷新点§r,scores={timingB=0}] at @s run particle minecraft:totem_particle
execute as @e[type=meow:meow_mod,name=§d§f§k§v§5§r§l§3刷新点§r,scores={timingB=0}] at @s run particle minecraft:totem_particle
scoreboard players reset @e[scores={timingB=0}] timingB

execute as @e[type=meow:meow_mod,name=§d§f§k§v§5§r§l§3刷新点§r,scores={dotiledrops=0}] at @s run gamerule dotiledrops true
scoreboard players reset @e[scores={dotiledrops=0}] dotiledrops

# 本作品采用知识共享署名-非商业性-相同方式共享 4.0 国际许可协议进行许可。 要查看此许可证的副本，请访问
# https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh

# This work is licensed under the Creative Commons 署名-非商业性使用-相同方式共享 4.0 国际 License. To view a copy of this license, visit
# http://creativecommons.org/licenses/by-nc-sa/4.0/.