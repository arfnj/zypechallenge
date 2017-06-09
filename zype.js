//Create new XMLHttpRequest instance for retrieving data from Zype API
const xhr = new XMLHttpRequest();
//Path to default image when thumbnail not provided - not utilized in this version
const defaultImg = "./testpattern-hd-1080.png"
//Capture window width and use it to determine div height, based on 1.78 width to height ratio of thumbnail images
const captionHeight = window.innerWidth*0.5625;

//Create asynchronous function that will retrieve info from Zype API
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

//Create function to handle parallax effect
const parallaxer = () => {
    let pos = $(window).scrollTop()*.1;
    $(".caption").each(function() {
        $(this).css('backgroundPosition', '50% ' + (pos*-1)+ 'px');
    });
};

//Invoke function that retrieves data from Zype API
getVids()
//When asynchronous function returns, parse the data, map each video to an HTML div, then append all divs to the DOM
  .then(response => {
    let videos = JSON.parse(response).response;
    let slideshow = $.map(videos,function(video){
      return (`<div class="caption" style="background-image: url(${video.thumbnails[1].url}); height: ${captionHeight}px;"><span></b>${video.title}</b></span></div>`);
    });
    $(".slides").append(slideshow.join(''));
  }, error => console.log('ERROR: ', error))
 .catch(error => console.log('ERROR: ', error));

//Create onresize listener that adjusts div height automatically when window resizes
document.getElementsByTagName("BODY")[0].onresize = () => {
  $(".caption").css("height",window.innerWidth*0.5625);
 };

//Bind window scrolling to parallaxer function, creating parallax effect
$(window).bind('scroll', parallaxer);
