function animation() {
    let container= document.getElementById("animation");
    let ball= document.getElementById("ball");
    let ball_styles= window.getComputedStyle(document.getElementById("ball"));
    let container_styles= window.getComputedStyle(document.getElementById("animation"));
    let left_pos = 10;
    let bottom_pos= 150;
    let right_move= 1;
    let up_move= -1;
    let timeout= 10;
    let max_height= 180;
    let max_left= 380;
    let animate_ball= function () {
      if (bottom_pos + up_move < 0 ||
        bottom_pos + up_move > max_height) {
        up_move = -up_move;
      }else{
        up_move=up_move-.1;
      }
  
      
      if (left_pos + right_move < 0 ||
        left_pos + right_move > max_width) {
        right_move = -right_move;
      }
      left_pos += right_move;
      bottom_pos += up_move;
      
      ball.style.bottom = bottom_pos + "px";
      ball.style.left = left_pos + "px";
      setTimeout(() => {
        animate_ball();
      }, timeout);
    };
    let init = function() {
      max_height = parseInt(container_styles.height) -
        parseInt(ball_styles.height);
      max_width = parseInt(container_styles.width) - parseInt(ball_styles.width);
      animate_ball();
    }
    init();
  } 
  animation();
  
  function game() {
    let score= 0;
    let currently_playing= false;
    let scored_this_round= false;
    let circle= document.getElementById("circle");
    let instruction= document.getElementById("instructions");
    let circles_so_far= 0;
    let outside= document.getElementById("game");
    let timeout= 1500;
    let init=function() {
      
        outside.
        addEventListener("click", start_game);
    };
    let start_game=function() {
      if (currently_playing == false) {
        outside.removeEventListener("click",start_game);
        score = 0;
        currently_playing = true;
        scored_this_round = false;
        circles_so_far = 0;
        timeout = 1500;
        let inst = instruction;
        inst.innerHTML = "Score= 0<br>Circles Done= 0";
        circle.hidden = true;
        circle.addEventListener("click", gain_point);
        setTimeout(() => { appear_and_wait() }, 500);
      }
    };
    let gain_point=function() {
      if (scored_this_round === false) {
        scored_this_round = true;
        score++;
        instruction.innerHTML = "Score= " + score + "<br>" + "Circles done= " + (circles_so_far + 1);
        circle.hidden = true;
      }
    };
  
    let appear_and_wait=function() {
      var left = Math.round(Math.random() * 380) + "px";
      console.log(left);
      circle.style.left = left;
      circle.style.bottom = Math.round(Math.random() * 180) + "px";
      scored_this_round = false;
      circle.hidden = false;
      timeout -= 100;
      setTimeout(() => { disappear_and_count() }, timeout);
    };
  
    let disappear_and_count=function() {
      circle.hidden = true;
      circles_so_far++;
      if (scored_this_round === false) {
        score--;
      }
      instruction.innerHTML = "Score= " + score + "<br>" + "Circles done= " + circles_so_far;
      if (circles_so_far >= 10) {
        end_game();
      } else {
        setTimeout(() => { appear_and_wait() }, timeout);
      }
    };
  
    let end_game=function() {
      instruction.innerHTML = "You scored " + score + " points.<p>This is a game. Click anywhere to start; then try to click the magically appearing circle. Miss and you lose a point. Click and you get a point. The circles will get faster! 10 circles total!";
      currently_playing = false;
      circle.removeEventListener("click", gain_point)
      setTimeout(()=>{outside.addEventListener("click",start_game)},1000);
    }
    init();
  }
  
  game();  