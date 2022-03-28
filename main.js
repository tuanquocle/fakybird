const canvas = document.getElementById('canvas')
const canvasCover = document.getElementById('canvasCover')
const score = document.getElementById('score')
const wrapper = document.getElementById('wrapper')


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
    x: 302 ,
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


function ending () {
    setTimeout( () =>   {
        canvasCover.append(darkscreen)
        darkscreen.appendChild(restart)
        document.addEventListener('keydown', () => {
            window.location.reload()
        })

    },500)
    
}

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
    bird.y += 2
    context.drawImage(birdImg, bird.x, bird.y)
 
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

        

        if (bird.y + birdImg.height >= canvas.height || bird.y <= 0 || bird.x + birdImg.width - 5 >= tubes[i].x && bird.x <= tubes[i].x + topTube.width && (bird.y <= tubes[i].y + topTube.height || bird.y + birdImg.height >= tubes[i].y + topTube.height + betweenTubes)  ) {
            ending()
            return
        } 

        if (bird.x == tubes[i].x + topTube.width ) {
            scoreCount ++
        }
        
    }
  
    score.innerHTML = `Score: ${scoreCount}`
    

    requestAnimationFrame(game)
}

const darkscreen = document.createElement('div')
darkscreen.classList.add('dark')
const restart = document.createElement('button')
restart.classList.add('restartBtn')
restart.innerHTML = 'RESTART'
restart.addEventListener('click', function () {
    window.location.reload()
})

document.addEventListener("keydown", up)
wrapper.addEventListener('click', up)
game()