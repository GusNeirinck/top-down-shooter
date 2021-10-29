controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(assets.image`bullet`, Pete, 50, 50)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy(effects.coolRadial, 50)
})
let myEnemy: Sprite = null
let projectile: Sprite = null
let Pete: Sprite = null
tiles.setTilemap(tilemap`bg`)
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
