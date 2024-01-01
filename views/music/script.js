console.log("Welcome to Melofy")
let audioElement=new Audio("YeTuneKyaKiya.mp3");
let index=0;
// let audioElement=new Audio("YeTuneKyaKiya.mp3");
let masterPlay=document.getElementById("masterPlay");
let progBar=document.getElementById("progBar");
var gif=document.getElementById("gif");
let songItem=Array.from(document.getElementsByClassName("songItem"));
let songInfo=document.getElementsByClassName("songInfo");
let songs=[
    {songName:"Ye tune kya kiya",filepath:"YeTuneKyaKiya.mp3",coverPath:"ytkk.jpg"},
    {songName:"Kar Har Maidaan Fateh",filepath:"khmf.mp3",coverPath:"khmflogo.jpeg"},
    {songName:"Lofi",filepath:"lofis.mp3",coverPath:"lofi.jpeg"},
    {songName:"Lakshya",filepath:"lak.mp3",coverPath:"lakshya.jpg"},
    {songName:"See you again",filepath:"sya.mp3",coverPath:"syalogo.jpeg"},
    {songName:"Khadke Glassy",filepath:"glassy.mp3",coverPath:"glassylogo.jpeg"},
    {songName:"Mila Yun",filepath:"MilaYun.mp3",coverPath:"morninglogo.jpeg"}
]

masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime == 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
        const currentSongPlayIcon = document.getElementById(index.toString());
        currentSongPlayIcon.classList.remove('fa-play-circle');
        currentSongPlayIcon.classList.add('fa-pause-circle');
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
        const currentSongPlayIcon = document.getElementById(index.toString());
        currentSongPlayIcon.classList.remove('fa-pause-circle');
        currentSongPlayIcon.classList.add('fa-play-circle');
    }
});

audioElement.addEventListener('timeupdate',()=>{
    console.log("TimeUpdate");
    //toUpdateSeekbar
    let progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
    console.log(progress);
    progBar.value=progress;
})
// setTimeout(function() {
//     audioElement.play();
// }, 5000);
progBar.addEventListener('input',()=>{
    audioElement.currentTime=progBar.value*audioElement.duration/100;
})
songItem.forEach((element, i) => {
    console.log(element,i);
    element.getElementsByTagName("img")[0].src=songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText=songs[i].songName;
});
const makeplay=()=>{
    Array.from(document.getElementsByClassName("songitemPlay")).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}


Array.from(document.getElementsByClassName("songitemPlay")).forEach((element, i) => {
    element.addEventListener('click', () => {
        if (index === i) {
            if (audioElement.paused) {
                // If the clicked song is the same and it is paused, resume playing
                audioElement.play();
                element.classList.remove('fa-play-circle');
                element.classList.add('fa-pause-circle');
                masterPlay.classList.remove('fa-play-circle');
                masterPlay.classList.add('fa-pause-circle');
                gif.style.opacity = 1;
            } else {
                // If the clicked song is the same and it is playing, pause it
                audioElement.pause();
                element.classList.remove('fa-pause-circle');
                element.classList.add('fa-play-circle');
                masterPlay.classList.remove('fa-pause-circle');
                masterPlay.classList.add('fa-play-circle');
                gif.style.opacity = 0;
            }
        } else {
            // If a different song is clicked, play the new song
            makeplay();
            element.classList.remove("fa-play-circle");
            element.classList.add("fa-pause-circle");
            audioElement.src = songs[i].filepath;
            audioElement.play();
            audioElement.currentTime = 0;
            songInfo[0].innerText = songs[i].songName;
            gif.style.opacity = 1;
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
            index = i;
        }
    });
});


document.getElementById("previous").addEventListener('click',()=>{
    if(index>0) index--;
        makeplay();
        document.getElementsByClassName("songitemPlay")[index].classList.remove('fa-play-circle');
        document.getElementsByClassName("songitemPlay")[index].classList.add('fa-pause-circle');

        audioElement.src=songs[index].filepath;
         audioElement.play();
         audioElement.currentTime=0;
         songInfo[0].innerText=songs[index].songName;
         gif.style.opacity=1;
         masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
})
document.getElementById("next").addEventListener('click',()=>{
        makeplay();
        index=(index+1)%7;
        document.getElementsByClassName("songitemPlay")[index].classList.remove('fa-play-circle');
        document.getElementsByClassName("songitemPlay")[index].classList.add('fa-pause-circle');
        audioElement.src=songs[index].filepath;
         audioElement.play();
         audioElement.currentTime=0;
         songInfo[0].innerText=songs[index].songName;
         gif.style.opacity=1;
         masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
})
// Your existing JavaScript code here...

// Wrap your existing code in a function to handle resizing
const handleResize = () => {
    // Check if the screen width is less than a certain threshold (e.g., 768 pixels)
    if (window.innerWidth < 768) {
        // Adjust your layout or apply mobile-specific styles here
    } else {
        // Revert to the default styles for larger screens
    }
};

// Attach the handleResize function to the window resize event
window.addEventListener("resize", handleResize);

// Initial call to handleResize to set the initial layout based on the screen size
handleResize();