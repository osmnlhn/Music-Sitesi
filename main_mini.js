let slideIndex=1;async function generatesliderHTML(){let e=`
    {{slideritems}}
    <a class="prev" onclick="plusSlides(-1)">❮</a>
    <a class="next" onclick="plusSlides(1)">❯</a>
  `;e=e.replace("{{slideritems}}",await generateslideritems());document.getElementsByClassName("slideshow-container")[0].innerHTML=e,showSlides(slideIndex)}async function generateslideritems(){let e=await fetch("http://127.0.0.1:5500/data.json").then(e=>e.json()),t="";for(let s=0;s<e.length;s++){let l=e[s];t+=` 
  <div class="mySlides fade">
      <div class="numbertext">${s+1} / ${e.length}</div>
      <img src="${l.img}" style="width:100%"
        alt="resim" />
      <div class="text">${l.text}</div>
    </div>
  
  `}return t}let dom_element=document.querySelector("#mainCont > div");function plusSlides(e){showSlides(slideIndex+=e)}function showSlides(e){let t,s=document.getElementsByClassName("mySlides");for(e>s.length&&(slideIndex=1),e<1&&(slideIndex=s.length),t=0;t<s.length;t++)s[t].style.display="none";s[slideIndex-1].style.display="block"}async function getDataForTopSongs(){return await fetch("http://127.0.0.1:5500/top-songs.json").then(e=>e.json())}async function generateTopSongsHtml(){let e=await getDataForTopSongs(),t="";for(let s=0;s<e.length;s++){let l=e[s];t+=`<div class="playList${s%2==0?"Light":"Dark"}">
      <p class="play"></p>
      <p class="track">${l.track}</p>
      <p class="artist">${l.artist}</p>
    </div>`}return t}async function placeTopSongsHtml(){let e=await generateTopSongsHtml();document.getElementById("playListTopSongsBottom").insertAdjacentHTML("beforebegin",e)}dom_element.addEventListener("click",()=>{clearInterval(interval_time_handler_number)}),generatesliderHTML(),placeTopSongsHtml();