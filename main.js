//TopLeft Slider
let slideIndex = 1;
// showSlides(slideIndex);

async function generatesliderHTML() {
  let html= `
    {{slideritems}}
    <a class="prev" onclick="plusSlides(-1)">❮</a>
    <a class="next" onclick="plusSlides(1)">❯</a>
  `;
  html=html.replace("{{slideritems}}",await generateslideritems())

  let slidercontainer=document.getElementsByClassName("slideshow-container")[0];
  slidercontainer.innerHTML=html;
  showSlides(slideIndex);
}

async function generateslideritems(){
let result= await fetch(`http://127.0.0.1:5500/data.json`).then((x)=>x.json());
let html=``;
for (let i = 0; i < result.length; i++) {
  const element = result[i];
  html+=
  ` 
  <div class="mySlides fade">
      <div class="numbertext">${i+1} / ${result.length}</div>
      <img src="${element.img}" style="width:100%"
        alt="resim" />
      <div class="text">${element.text}</div>
    </div>
  
  `
}
return html;
}

// let interval_time_handler_number = setInterval(() => {
//   plusSlides(1);
// }, 3000);

let dom_element = document.querySelector('#mainCont > div');

dom_element.addEventListener('click',()=>{
  clearInterval(interval_time_handler_number);
});

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  
  slides[slideIndex-1].style.display = "block";  
  
}

generatesliderHTML();

//topsongs
async function getDataForTopSongs(){
  let result = await fetch(`http://127.0.0.1:5500/top-songs.json`).then((x)=>x.json());
  return result;
}

async function generateTopSongsHtml(){
  let data = await getDataForTopSongs();

  let topSongsHtml = ``;
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    let row_theme = i % 2 === 0 ? "Light" : "Dark";
    let temp = `<div class="playList${row_theme}">
      <p class="play"></p>
      <p class="track">${item.track}</p>
      <p class="artist">${item.artist}</p>
    </div>`;
    topSongsHtml +=temp;
  }
  return topSongsHtml;
}

async function placeTopSongsHtml(){
    let html = await generateTopSongsHtml();
    document.getElementById('playListTopSongsBottom').insertAdjacentHTML('beforebegin',html);
    //document.getElementsByClassName('playListLight')[0].insertAdjacentHTML('beforebegin',html);
}

placeTopSongsHtml();