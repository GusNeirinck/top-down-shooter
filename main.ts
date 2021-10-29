controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(assets.image`bullet`, Pete, 50, 50)
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    facingLeft = false
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    facingRight = true
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy(effects.coolRadial, 50)
    score += 1
})
let myEnemy: Sprite = null
let facingRight = false
let facingLeft = false
let projectile: Sprite = null
let Pete: Sprite = null
tiles.setTilemap(tilemap`bg`)
let score = 0
Pete = sprites.create(assets.image`Pete`, SpriteKind.Player)
controller.moveSprite(Pete, 100, 100)
game.onUpdateInterval(100, function () {
    myEnemy = sprites.create(assets.image`myImage`, SpriteKind.Enemy)
    if (randint(0, 1) == 0) {
        myEnemy.setPosition(6, randint(5, 110))
    } else {
        myEnemy.setPosition(150, randint(5, 110))
    }
    myEnemy.follow(Pete, 10)
})
