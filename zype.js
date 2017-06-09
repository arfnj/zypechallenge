const xhr = new XMLHttpRequest();
const defaultImg = "./testpattern-hd-1080.png"

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

getVids()
  .then(response => {
    let videos = JSON.parse(response).response;
    let captionHeight = window.innerWidth*0.5625-40;
    let slideshow = [],captions = [];
    videos.forEach(video => {
      slideshow.push(`<img src="${video.thumbnails[1].url}">`);
      captions.push(`<div class="caption" style="height: ${captionHeight}px;"><span></b>${video.title}</b></span></div>`)
    });
    $(".thumbs").append(slideshow.join(''));
    $(".captions").append(captions.join(''));
  }, error => console.log('ERROR: ', error))
  .then(data => {
    console.log('EXAMINING');
    let i = 0;
    $("div.thumbs").find("img").each(function() {
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
    $(".parallax").css("display","block");
  })
 .catch(error => console.log('ERROR: ', error));

 document.getElementsByTagName("BODY")[0].onresize = () => {
  $(".caption").css("height",window.innerWidth*0.5625-40);
 };


