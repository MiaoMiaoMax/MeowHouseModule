scoreboard players remove @e[scores={lifeTime=1..}] lifeTime 1
execute @e[scores={lifeTime=200}] ~ ~1 ~ particle minecraft:campfire_smoke_particle
execute @e[scores={lifeTime=180}] ~ ~1 ~ particle minecraft:campfire_smoke_particle
execute @e[scores={lifeTime=160}] ~ ~1 ~ particle minecraft:campfire_smoke_particle
execute @e[scores={lifeTime=140}] ~ ~1 ~ particle minecraft:campfire_smoke_particle
execute @e[scores={lifeTime=120}] ~ ~1 ~ particle minecraft:campfire_smoke_particle
execute @e[scores={lifeTime=100}] ~ ~1 ~ particle minecraft:campfire_smoke_particle
execute @e[scores={lifeTime=80}] ~ ~1 ~ particle minecraft:campfire_smoke_particle
execute @e[scores={lifeTime=60}] ~ ~1 ~ particle minecraft:lava_particle
execute @e[scores={lifeTime=40}] ~ ~1 ~ particle minecraft:lava_particle
execute @e[scores={lifeTime=20}] ~ ~1 ~ particle minecraft:lava_particle
kill @e[scores={lifeTime=0}]

scoreboard players remove @e[scores={timingB=1..}] timingB 1
execute @e[type=meow:meow_mod,name=§d§f§k§v§5§r§l§3刷新点§r,scores={timingB=300}] ~ ~ ~ say @a[scores={timingB=300}],是不是很硬awa
execute @e[type=meow:meow_mod,name=§d§f§k§v§5§r§l§3刷新点§r,scores={timingB=30}] ~ ~ ~ say @a[scores={timingB=30}],好啦,不逗你了
execute @e[type=meow:meow_mod,name=§d§f§k§v§5§r§l§3刷新点§r,scores={timingB=0}] ~ ~ ~ say @a[scores={timingB=0}],awa,惊中之喜
execute @e[type=meow:meow_mod,name=§d§f§k§v§5§r§l§3刷新点§r,scores={timingB=0}] ~ ~ ~ setblock ~ ~-1 ~ minecraft:deepslate_diamond_ore
execute @e[type=meow:meow_mod,name=§d§f§k§v§5§r§l§3刷新点§r,scores={timingB=0}] ~ ~ ~ particle minecraft:totem_manual
execute @e[type=meow:meow_mod,name=§d§f§k§v§5§r§l§3刷新点§r,scores={timingB=0}] ~ ~ ~ particle minecraft:totem_manual
execute @e[type=meow:meow_mod,name=§d§f§k§v§5§r§l§3刷新点§r,scores={timingB=0}] ~ ~ ~ particle minecraft:totem_particle
execute @e[type=meow:meow_mod,name=§d§f§k§v§5§r§l§3刷新点§r,scores={timingB=0}] ~ ~ ~ particle minecraft:totem_particle
scoreboard players reset @e[scores={timingB=0}] timingB

##本作品采用知识共享署名-非商业性-相同方式共享 4.0 国际许可协议进行许可。 要查看此许可证的副本，请访问
##https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh

##This work is licensed under the Creative Commons 署名-非商业性使用-相同方式共享 4.0 国际 License. To view a copy of this license, visit
##http://creativecommons.org/licenses/by-nc-sa/4.0/..