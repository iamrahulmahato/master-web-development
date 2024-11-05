$(document).ready(function() {
    $(document).on("click", ".start button, .end button", function() {
      App.start_game();
    });
    $(document).on("click", ".dot.active", function() {
      App.add_point();
    });
  });
  
  App = {
    current_active: "",
    dot_selector: ".wall .dot",
    points: 0,
    time: 30,
    time_interval: "",
     
    init_game: function() {
      this.points = 0;
      this.time = 30;
    },
     
    start_game: function() {
      this.init_game();
      $(".start, .end").fadeOut("fast");
      this.set_dot();
      $(".info .time").html("00:" + this.time);
      $(".info .points").html(this.points);
      this.time_interval = setInterval("App.update_time()", 1000);
    },
     
    update_time: function() {
      this.time -= 1;
      if (this.time > 0) {
        if (String(this.time).length == 1) {
          this.time = "0" + this.time;
        }
        $(".info .time").html("00:" + this.time);
      } else {
        $(".info .time").html("00:00");
        clearInterval(this.time_interval);
        $(".end .score").html("Game over!<br />You scored " + this.points + " points!").parent().fadeIn("fast");
      }
    },
     
    add_point: function() {
      this.set_dot();
      this.points += 1;
      $(".info .points").html(this.points);
    },
    
    set_dot: function() {
      $(this.dot_selector).removeClass("active");
      var active = Math.floor((Math.random() * ($(this.dot_selector).length - 1))+1);
      $(this.dot_selector + ":eq("+active+")").addClass("active");
    }
  };