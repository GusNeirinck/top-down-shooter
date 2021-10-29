controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    facingRight = false
    facingLeft = false
    facingUp = true
    facingDown = false
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (facingRight) {
        projectile = sprites.createProjectileFromSprite(assets.image`bullet`, Pete, 50, 0)
    }
    if (facingLeft) {
        projectile = sprites.createProjectileFromSprite(assets.image`bullet`, Pete, -50, 0)
    }
    if (facingUp) {
        projectile = sprites.createProjectileFromSprite(assets.image`bullet`, Pete, 0, -50)
    }
    if (facingDown) {
        projectile = sprites.createProjectileFromSprite(assets.image`bullet`, Pete, 0, 50)
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
    score += 1
})
let myEnemy: Sprite = null
let projectile: Sprite = null
let facingDown = false
let facingUp = false
let facingLeft = false
let facingRight = false
let Pete: Sprite = null
tiles.setTilemap(tilemap`bg`)
let score = 0
Pete = sprites.create(assets.image`Pete`, SpriteKind.Player)
controller.moveSprite(Pete, 100, 100)
game.onUpdateInterval(2000, function () {
    myEnemy = sprites.create(assets.image`myImage`, SpriteKind.Enemy)
    if (randint(0, 1) == 0) {
        myEnemy.setPosition(6, randint(5, 110))
    } else {
        myEnemy.setPosition(150, randint(5, 110))
    }
    myEnemy.follow(Pete, 10)
})
