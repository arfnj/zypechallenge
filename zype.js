const xhr = new XMLHttpRequest();
const defaultImg = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/SMPTE_RP_219_color_bars.svg/1200px-SMPTE_RP_219_color_bars.svg.png"

let videos, hasThumbnail;

const displayDefaultImg = (element) => element.src = "http://4.bp.blogspot.com/_soXI82GSn1A/TODxRXu8kUI/AAAAAAAADFM/JMsnljgBYxE/s1600/lookAroundYouScaryPicture.jpg";

// const imageStatus = (e) => {
//   if (xhr.readyState === 4 && xhr.status === 404) {
//     hasThumbnail = false;
//   } else {
//     hasThumbnail = true;
//   }
// }

// const imageChecker = (url) => {
//   xhr.open('GET',url,true);
//   xhr.send();
//   xhr.addEventListener("readystatechange", imageStatus, false);
// }

const processRequest = (e) => {
  if (xhr.readyState === 4 && xhr.status === 200) {
    videos = JSON.parse(xhr.responseText).response;
    let slideshow = $.map(videos,function(video){
      return (`<div class="container"><div><img src="${video.thumbnails[4].url}" onerror="this.onerror=null;this.src="${defaultImg}"></div><div class="caption"><span></b>${video.title}</b></span></div></div>`);
    });
    console.log(slideshow);
    $(".slides").html(slideshow.join(''));
  }
}

xhr.open('GET', "https://api.zype.com/videos/?api_key=H7CF2IHbEc6QIrMVwb2zfd9VI14HHGAfYax1eHEUsJ4voYuqWF2oWvByUOhERva_", true);
xhr.send();
xhr.addEventListener("readystatechange", processRequest, false);

