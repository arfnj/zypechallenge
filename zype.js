const xhr = new XMLHttpRequest();
const defaultImg = "./testpattern-hd-1080.png"
const captionHeight = window.innerWidth*0.5625;

const getVids = () => {
  return new Promise((resolve, reject) => {
    xhr.open('GET', "https://api.zype.com/videos/?api_key=H7CF2IHbEc6QIrMVwb2zfd9VI14HHGAfYax1eHEUsJ4voYuqWF2oWvByUOhERva_");
    xhr.onload = function() {
      if (xhr.status === 200) {
        resolve(xhr.response);
      } else {
        reject(Error(xhr.statusText));
      }
    };
    xhr.onerror = () => reject(Error("Can't get vids"));
    xhr.send();
  });
}

const parallaxer = () => {
    let pos = $(window).scrollTop()*.1;
    $(".caption").each(function() {
        let $element = $(this);
        $(this).css('backgroundPosition', '50% ' + (pos*-1)+ 'px');
    });
};

getVids()
  .then(response => {
    let videos = JSON.parse(response).response;
    let slideshow = $.map(videos,function(video){
      return (`<div class="caption" style="background-image: url(${video.thumbnails[1].url}); height: ${captionHeight}px;"><span></b>${video.title}</b></span></div>`);
    });
    $(".slides").append(slideshow.join(''));
  }, error => console.log('ERROR: ', error))
  .then(data => {
    console.log('EXAMINING');
    let i = 0;
    $("div.slides").find("img").each(function() {
      i++;
      console.log(i);
      if ($(this)[0].naturalWidth === 120 && $(this)[0].naturalHeight === 90) {
        console.log('FIXING');
        $(this).attr("src", defaultImg);
      }
    })
  })
  .then(data => {
    console.log('DISPLAYING');
    $(".slides").toggle();
  })
 .catch(error => console.log('ERROR: ', error));

document.getElementsByTagName("BODY")[0].onresize = () => {
  $(".caption").css("height",window.innerWidth*0.5625);
 };

$(window).bind('scroll', parallaxer);
