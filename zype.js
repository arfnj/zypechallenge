const xhr = new XMLHttpRequest();
const defaultImg = "./unicorn.jpeg"
let videos, slideshow;

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
    let slideshow = $.map(videos,function(video){
      return (`<div class="container"><div class="layer thumb"><img src="${video.thumbnails[4].url}"></div><div class="layer caption"><span></b>${video.title}</b></span></div></div>`);
    });
    $(".slides").html(slideshow.join(''));
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
    $(".slides").css("display","block");
  })
 .catch(error => console.log('ERROR: ', error));


