controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    facingRight = false
    facingLeft = false
    facingUp = true
    facingDown = false
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
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy(effects.coolRadial, 50)
    info.changeScoreBy(100)
    enemiesLeft += -1
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy(effects.coolRadial, 50)
    info.changeLifeBy(-1)
    enemiesLeft += -1
})
let myEnemy: Sprite = null
let projectile: Sprite = null
let facingDown = false
let facingUp = false
let facingLeft = false
let facingRight = false
let Pete: Sprite = null
tiles.setTilemap(tilemap`bg`)
Pete = sprites.create(assets.image`Pete`, SpriteKind.Player)
info.setLife(3)
info.setScore(0)
let wave = 0
let enemiesLeft = 0
controller.moveSprite(Pete, 75, 75)
forever(function () {
    if (enemiesLeft == 0) {
        for (let index = 0; index < wave + 1; index++) {
            myEnemy = sprites.create(assets.image`myImage`, SpriteKind.Enemy)
            if (randint(0, 1) == 0) {
                myEnemy.setPosition(6, randint(5, 110))
            } else {
                myEnemy.setPosition(150, randint(5, 110))
            }
            myEnemy.follow(Pete, wave * 2 + 10)
            enemiesLeft += 1
        }
        wave += 1
    }
})
