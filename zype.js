const xhr = new XMLHttpRequest();
// const defaultImg = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/SMPTE_RP_219_color_bars.svg/1200px-SMPTE_RP_219_color_bars.svg.png";

const defaultImg = "./unicorn.jpeg"

let videos, slideshow;

const displayDefaultImg = (element) => element.src = "http://4.bp.blogspot.com/_soXI82GSn1A/TODxRXu8kUI/AAAAAAAADFM/JMsnljgBYxE/s1600/lookAroundYouScaryPicture.jpg";

// const processRequest = (e) => {
//   if (xhr.readyState === 4 && xhr.status === 200) {
//     videos = JSON.parse(xhr.responseText).response;
//     let slideshow = $.map(videos,function(video){
//       return (`<div class="container"><div><img src="${video.thumbnails[4].url}" onerror="this.onerror=null;this.src="${defaultImg}"></div><div class="caption"><span></b>${video.title}</b></span></div></div>`);
//     });
//     console.log(slideshow);
//     $(".slides").html(slideshow.join(''));
//   }
// }

// xhr.open('GET', "https://api.zype.com/videos/?api_key=H7CF2IHbEc6QIrMVwb2zfd9VI14HHGAfYax1eHEUsJ4voYuqWF2oWvByUOhERva_", true);
// xhr.send();
// xhr.addEventListener("readystatechange", processRequest, false);

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

// const checkImg = (url) => {
//   return new Promise((resolve,reject) => {
//     xhr.open('GET', url);
//     xhr.onload = function() {
//       if (xhr.status === 200) {
//         resolve(url);
//       } else if (xhr.status === 404) {
//         resolve(defaultImg);
//       } else {
//         reject(Error(xhr.statusText));
//       }
//     };
//     xhr.onerror = () => reject(Error("Can't check img"));
//     xhr.send();
//   });
// }

getVids()
  .then(response => {
    videos = JSON.parse(response).response;
    let slideshow = $.map(videos,function(video){
      return (`<div class="container"><div><img src="${video.thumbnails[4].url}"></div><div class="caption"><span></b>${video.title}</b></span></div></div>`);
    });
    console.log(slideshow);
    $(".slides").html(slideshow.join(''));
    // thumbPromises = videos.map(video => checkImg(video.thumbnails[4].url));
  }, error => console.log('ERROR: ', error))
  .then(data => {
    $("div.slides").find("img").each(function() {
      if ($(this)[0].naturalWidth === 120 && $(this)[0].naturalHeight === 90) {
        $(this).attr("src", defaultImg);
      }
    })
  })
  .then(data => $(".slides").css("display","block"))
  // .then(data => Promise.all(thumbPromises))
  // .then(urls => {
  //   slideshow = urls.map((url,i) => {
  //     return (`<div class="container"><div><img src="${url}" onerror="this.onerror=null;this.src="${defaultImg}"></div><div class="caption"><span></b>${videos[i].title}</b></span></div></div>`);
  //   });
  //   $(".slides").html(slideshow.join(''));
  // })
  .catch(error => console.log('ERROR: ', error));


