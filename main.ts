controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    facingRight = false
    facingLeft = false
    facingUp = true
    facingDown = false
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    Pete.setImage(assets.image`PeteGodMode`)
    godMode = true
    for (let index = 0; index < 5; index++) {
        pause(1000)
    }
    Pete.setImage(assets.image`Pete`)
    godMode = false
    for (let index = 0; index < 10; index++) {
        pause(1000)
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (facingRight) {
        projectile = sprites.createProjectileFromSprite(assets.image`bullet`, Pete, 100, 0)
    }
    if (facingLeft) {
        projectile = sprites.createProjectileFromSprite(assets.image`bullet`, Pete, -100, 0)
    }
    if (facingUp) {
        projectile = sprites.createProjectileFromSprite(assets.image`bullet`, Pete, 0, -100)
    }
    if (facingDown) {
        projectile = sprites.createProjectileFromSprite(assets.image`bullet`, Pete, 0, 100)
    }
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    facingRight = false
    facingLeft = true
    facingUp = false
    facingDown = false
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    facingRight = true
    facingLeft = false
    facingUp = false
    facingDown = false
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    facingRight = false
    facingLeft = false
    facingUp = false
    facingDown = true
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    if (info.life() < 5) {
        info.changeLifeBy(1)
        otherSprite.destroy(effects.hearts, 50)
    }
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy(effects.coolRadial, 50)
    info.changeScoreBy(100)
    enemiesLeft += -1
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    if (godMode == false) {
        otherSprite.destroy(effects.coolRadial, 50)
        info.changeLifeBy(-1)
        enemiesLeft += -1
    }
})
let heart: Sprite = null
let myEnemy: Sprite = null
let wave = 0
let enemiesLeft = 0
let projectile: Sprite = null
let facingDown = false
let facingUp = false
let facingLeft = false
let facingRight = false
let godMode = false
let Pete: Sprite = null
tiles.setTilemap(tilemap`bg`)
Pete = sprites.create(assets.image`Pete`, SpriteKind.Player)
info.setLife(3)
info.setScore(0)
godMode = false
controller.moveSprite(Pete, 75, 75)
forever(function () {
    if (enemiesLeft == 0) {
        for (let index = 0; index < wave + 1; index++) {
            myEnemy = sprites.create(assets.image`ghost`, SpriteKind.Enemy)
            if (randint(0, 1) == 0) {
                myEnemy.setPosition(6, randint(5, 110))
            } else {
                myEnemy.setPosition(150, randint(5, 110))
            }
            myEnemy.follow(Pete, wave * 1.5 + 10)
            enemiesLeft += 1
        }
        if (wave > 4) {
            for (let index = 0; index < wave / 2; index++) {
                myEnemy = sprites.create(assets.image`redGhost2`, SpriteKind.Enemy)
                if (randint(0, 1) == 0) {
                    myEnemy.setPosition(6, randint(5, 110))
                } else {
                    myEnemy.setPosition(150, randint(5, 110))
                }
                myEnemy.follow(Pete, wave * 2.5 + 10)
                enemiesLeft += 1
            }
        }
        wave += 1
    }
})
game.onUpdateInterval(20000, function () {
    if (wave > 2) {
        heart = sprites.create(assets.image`heart`, SpriteKind.Food)
        heart.setPosition(randint(5, 140), randint(5, 110))
    }
})
