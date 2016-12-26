  (function(window) {
      'use strict';

      window.addEventListener('load', function() {
          var videos = document.querySelectorAll('video.video-bg');
          for (var i = 0; i < videos.length; i++) {
              setVideoSource(videos[i]);
              addListeners(videos[i]);
              setPosterImage(videos[i]);
              window.addEventListener('resize', function(video) {
                  return function() {
                      setPosterImage(video);
                  }
              }(videos[i]));
          }
      });

      // Set source urls
      function setVideoSource(video) {
          var sources = video.getElementsByTagName('source');
          // Set the source urls
          for (var j = 0; j < sources.length; j++) {
              var source = sources[j];
              if (source.dataset.src != undefined) {
                  var newSource = document.createElement("source");
                  newSource.setAttribute("src", source.dataset.src);
                  video.appendChild(newSource);
              }
          }
      }
      // Add event listeners
      function addListeners(video) {
          if (video.readyState == 4) {
              video.play();
          } else {
              video.addEventListener('canplay', function() {
                  this.play();
                  this.classList.add('load-complete');
              });
          }
      }

      // Set poster image
      function setPosterImage(video) {
          var posters = [];
          var posterImages = video.getElementsByTagName('poster-source');
          var devicePixelRatio = window.devicePixelRatio ||
              Math.round(window.screen.availWidth / document.documentElement.clientWidth);

          for (var k = 0; k < posterImages.length; k++) {
              var poster = posterImages[k];
              var media = poster.getAttribute("media");
              if (!media || (window.matchMedia && window.matchMedia(media).matches)) {
                  posters.push(poster);
              }
          }

          // if poster defined
          if (posters.length > 0) {
              var sourcesets = posters[0].getAttribute('srcset').split(",");
              var url;
              var pixelRatio = 0;
              if (sourcesets.length > 0) {
                  for (var l = 0; l < sourcesets.length; l++) {
                      var sourceDef = sourcesets[l].trim().split(" ");
                      var targetDensity = (sourceDef[1] !== undefined) ? parseFloat(sourceDef[1].replace('x', '')) :
                          1;
                      if (Math.abs(window.devicePixelRatio - targetDensity) <= Math.abs(devicePixelRatio -
                              pixelRatio) ||
                          pixelRatio === 0) {
                          pixelRatio = targetDensity;
                          url = sourceDef[0].trim();
                      }
                  }
              }

          }
          video.setAttribute("poster", url);
      }
  }(window));