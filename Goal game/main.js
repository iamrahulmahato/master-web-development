let offset = 20,
    gf = game_field.getBoundingClientRect(),
    b = ball.getBoundingClientRect(),
    ooo = gf.x - offset,
    gfcx = gf.x + (gf.width*.5) - ooo,
    goalie = ['https://contentservice.mc.reyrey.net/image_v1.0.0/?id=4d2c276a-53d1-5d61-973a-43e438e4d242&638600308304985475','https://contentservice.mc.reyrey.net/image_v1.0.0/?id=50c68e89-78aa-5583-b9fb-a6b7088a2795&638600308421269575','https://contentservice.mc.reyrey.net/image_v1.0.0/?id=c82054e5-0c08-5936-8b3a-da9c3803a430&638600308520821680','https://contentservice.mc.reyrey.net/image_v1.0.0/?id=72578b00-ecdb-5e3d-824e-cdd981720b04&638600308646914584','https://contentservice.mc.reyrey.net/image_v1.0.0/?id=9effa62d-7e3d-5638-9ea2-a02ab3508dfc&638600308768788828']

svg.setAttribute('viewBox','0 0 ' + gf.width + ' ' + gf.height)

function grabClick(e) {
  let x = e.clientX,
      y = e.clientY,
      el = document.elementFromPoint(x,y),
      el_num = el.getAttribute('box'),
      g = Math.floor(Math.random()*5),
      o = game_field.getBoundingClientRect(),
      hit = true  

  // console.log(g,el,hit)
  if(hit){
    if(el.getAttribute('box') == 0) {
      g = 'https://contentservice.mc.reyrey.net/image_v1.0.0/?id=4d2c276a-53d1-5d61-973a-43e438e4d242&638600308304985475'
    }
    if(el.getAttribute('box') == 1) {
      g = 'https://contentservice.mc.reyrey.net/image_v1.0.0/?id=50c68e89-78aa-5583-b9fb-a6b7088a2795&638600308421269575'
    }
    if(el.getAttribute('box') == 2) {
      g = 'https://contentservice.mc.reyrey.net/image_v1.0.0/?id=c82054e5-0c08-5936-8b3a-da9c3803a430&638600308520821680'
    }
    if(el.getAttribute('box') == 3) {
      g = 'https://contentservice.mc.reyrey.net/image_v1.0.0/?id=72578b00-ecdb-5e3d-824e-cdd981720b04&638600308646914584'
    }
    if(el.getAttribute('box') == 4) {
      g = 'https://contentservice.mc.reyrey.net/image_v1.0.0/?id=9effa62d-7e3d-5638-9ea2-a02ab3508dfc&638600308768788828'
    }
    if(el.id == 'goal') {
      g = 'https://contentservice.mc.reyrey.net/image_v1.0.0/?id=f4278541-20df-568f-baea-e387ee22937c&638600307412335028'
    }
  } else {
    g = goalie[g]
  }

  ball.className = 'kicked'
  let kick = setInterval(function(){
    let c = circle.getBoundingClientRect(),
        cx = c.x,
        cy = c.y
    ball.style.left = cx - ooo - offset + 'px'
    ball.style.top = (cy - offset) + 'px'
    setTimeout(function(){
      clearInterval(kick)

      let c = circle.getBoundingClientRect(),
          cx = c.x,
          cy = c.y

      let score = document.elementFromPoint(cx, cy)
      // console.log(score,el_num)
      if(score.getAttribute('box') != el_num){
        ball.className = 'goal'
        success.className = 'show_result'
      } else {
        ball.className = 'fall'
        failure.className = 'show_result'
      }
    }, 1000)
  },1000/30)

  setTimeout(function(){
    goal.style.background = 'url('+g+')'
    goal.style.animation = 'none'
  }, 200)  

  setTimeout(function(){
    goal.style.background = ''
    ball.style.left = ''
    ball.style.top = ''
    ball.style.setProperty('--ani', '')
    ball.className = ''
    success.className = ''
    failure.className = ''
    goal.style.animation = 'shake .25s linear infinite'
  }, 4000)
}

goal.addEventListener('click', grabClick)

goal.addEventListener('mousemove', function(e){
  let x = e.clientX - ooo - offset,
      y = e.clientY

  path.setAttribute('d', 'M '+(b.x - ooo)+' '+(b.y+ offset)+' C '+gfcx+' 250, '+gfcx+' 150, ' + x + ' ' + y)
  bally.setAttribute('path', 'M '+(b.x - ooo)+' '+(b.y+ offset)+' C '+gfcx+' 250, '+gfcx+' 150, ' + x + ' ' + y)
})
