const canvas = document.getElementById('canvas')
const score = document.getElementById('score')

const context = canvas.getContext('2d')

var birdImg = new Image()
var background = new Image()
var topTube = new Image()
var bottomTube = new Image()

birdImg.src ="./fakybird/bird.png"
background.src ="fakybird/nenchinh.png"
topTube.src ="fakybird/ongtren.png"
bottomTube.src ="fakybird/ongduoi.png"

const bird = {
    x: canvas.width/3 ,
    y: canvas.height/2 - birdImg.height
}

const betweenTubes = 140

let scoreCount = 0

let tubes = [
    {
        x: canvas.width,
        y: 0
    }
]

function up () {
    bird.y -= 10
    setTimeout(function () {
        bird.y -= 15
        setTimeout ( function () {
            bird.y -= 20
            setTimeout ( function () {
                bird.y -= 25
    
            },20)
        },20)
    }, 20)
}

function game () {
    context.drawImage(background, 0, 0)
    context.drawImage(birdImg, bird.x, bird.y) 
    bird.y += 2
 



    const randomY = (topTube.height / (Math.floor(Math.random()*3)+1)) - topTube.height

    
    for ( let i = 0; i < tubes.length; i++) {
        context.drawImage(topTube, tubes[i].x, tubes[i].y )
        context.drawImage(bottomTube, tubes[i].x, tubes[i].y + topTube.height + betweenTubes )
        tubes[i].x -= 5
        if (tubes[i].x == 300) {
            tubes.push({
                x: canvas.width,
                y: randomY
            })
        }
        if (tubes[i].x == -60) {
            tubes.shift()
        }

        

        if (bird.y + birdImg.height >= canvas.height || bird.y <= 0 || bird.x + birdImg.width - 5 >= tubes[i].x && bird.x <= tubes[i].x + topTube.width && (bird.y <= tubes[i].y + topTube.height || bird.y + birdImg.height >= tubes[i].y + topTube.height + betweenTubes)  ) return

        if (bird.x == tubes[i].x + topTube.width + 3) {
            scoreCount ++
        }
        console.log()
        
        
    }
  
    score.innerHTML = scoreCount
    

    requestAnimationFrame(game)
}
document.addEventListener("keydown", up)
game()