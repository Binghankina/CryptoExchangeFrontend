<template>
  <div class="preview">
    <div class="fixed">
      <!-- <h3>[NAME] - Your Great Choice</h3> -->
      <div class="banner">
        <div class="slide_viewer">
          <div class="slide_group">
            <div class="slide" v-for="(data, i) in $config.banner" :key="i">
              <!-- <a v-for="(dataV, index) in data" :key="index" target="_blank" :href="dataV.link">
                <img :src="dataV.img" />
              </a> -->
              <img src="@/assets/img/invite-logo.png" alt="">
            </div>
          </div>
        </div>
        <!-- <div class="slide_buttons" /> -->
      </div>
    </div>
    <!-- <canvas /> -->
    <!-- <div class="news" /> -->
  </div>
</template>

<script>
// import canvas from "@/assets/js/canvas.js";

export default {
  mounted() {
    // canvas();
    $(".banner").each(function() {
      var $this = $(this);
      var $group = $this.find(".slide_group");
      var $slides = $this.find(".slide");
      var bulletArray = [];
      var currentIndex = 0;
      var timeout;

      function move(newIndex) {
        var animateLeft, slideLeft;

        advance();

        if ($group.is(":animated") || currentIndex === newIndex) {
          return;
        }

        bulletArray[currentIndex].removeClass("active");
        bulletArray[newIndex].addClass("active");

        if (newIndex > currentIndex) {
          slideLeft = "100%";
          animateLeft = "-100%";
        } else {
          slideLeft = "-100%";
          animateLeft = "100%";
        }

        $slides.eq(newIndex).css({
          display: "flex",
          left: slideLeft
        });
        $group.animate(
          {
            left: animateLeft
          },
          function() {
            $slides.eq(currentIndex).css({
              display: "none"
            });
            $slides.eq(newIndex).css({
              left: 0
            });
            $group.css({
              left: 0
            });
            currentIndex = newIndex;
          }
        );
      }

      function advance() {
        clearTimeout(timeout);
        timeout = setTimeout(function() {
          if (currentIndex < $slides.length - 1) {
            move(currentIndex + 1);
          } else {
            move(0);
          }
        }, 10000);
      }

      $.each($slides, function(index) {
        var $button = $('<span class="slide_btn"></span>');

        if (index === currentIndex) {
          $button.addClass("active");
        }
        $button
          .on("click", function() {
            move(index);
          })
          .appendTo(".slide_buttons");
        bulletArray.push($button);
      });

      advance();
    });
  }
};
</script>
