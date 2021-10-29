let mySprite: Sprite = null
tiles.setTilemap(tilemap`bg`)
let Pete = sprites.create(assets.image`Pete`, SpriteKind.Player)
controller.moveSprite(Pete, 100, 100)
game.onUpdateInterval(5000, function () {
    mySprite = sprites.create(assets.image`myImage`, SpriteKind.Player)
})
