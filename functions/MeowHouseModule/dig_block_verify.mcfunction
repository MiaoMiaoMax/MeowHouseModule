tag @s add dig_block_verify
execute @s ^ ^ ^2 tag @e[y=~2,type=meow:meow_mod,tag=Client,tag=!dig_block_verify,r=3] add dig_block_verify
execute @s ^ ^ ^4 tag @e[y=~2,type=meow:meow_mod,tag=Client,tag=!dig_block_verify,r=4] add dig_block_verify
execute @s ^ ^ ^5 tag @e[y=~2,type=meow:meow_mod,tag=Client,tag=!dig_block_verify,r=5] add dig_block_verify
execute @s ^ ^ ^7 tag @e[y=~2,type=meow:meow_mod,tag=Client,tag=!dig_block_verify,r=4] add dig_block_verify
execute @e[y=~1,type=meow:meow_mod,tag=Client,tag=dig_block_verify,r=8] ~ ~ ~ execute @a[tag=dig_block_verify,r=8] ~ ~ ~ scoreboard players add @s level2 1
tag @e[tag=dig_block_verify] remove dig_block_verify

##本作品采用知识共享署名-非商业性-相同方式共享 4.0 国际许可协议进行许可。 要查看此许可证的副本，请访问
##https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh

##This work is licensed under the Creative Commons 署名-非商业性使用-相同方式共享 4.0 国际 License. To view a copy of this license, visit
##http://creativecommons.org/licenses/by-nc-sa/4.0/.