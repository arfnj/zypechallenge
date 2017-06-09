const xhr = new XMLHttpRequest();
const defaultImg = "./testpattern-hd-1080.png"
let videos;

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
    videos = JSON.parse(response).response;
    let slideshow = [],captions = [];
    videos.forEach(video => /*{
      slideshow.push(`<img src="${video.thumbnails[4].url}">`);
      captions.push(`<div class="caption"><span></b>${video.title}</b></span></div>`)
    });
    $(".thumbs").append(slideshow.join(''));
    $(".captions").append(captions.join(''));*/
      slideshow.push(`<div class="parallax"><div class="layer thumbs"><img src="${video.thumbnails[4].url}"></div><div class="captions"><div class="caption"><span></b>${video.title}</b></span></div></div></div>`))
    $(".main").append(slideshow.join(''));
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
    console.log(document.getElementById('thumbstack'));
    // $(".caption").css("height",thumbsHeight/videos.length-40);
    $(".main").css("display","block");
  })
 .catch(error => console.log('ERROR: ', error));


