const music=document.querySelector('#audio');
const playBtn = document.querySelector('.play-btn');
const forwardBtn = document.querySelector('.forward-btn');
const backwardBtn = document.querySelector('.backward-btn');
const seekBar = document.querySelector('.seek-bar');
const currentTimeE1 = document.querySelector('.current-time');
const musicDurationE1 = document.querySelector('.song-duration');
const volumeControl = document.querySelector('#volume');
const songNameE1 = document.querySelector('.music-name');
const artistNameE1 = document.querySelector('.artist-name');
const disk = document.querySelector('.disk');
const playlistE1 = document.querySelector('#playlist');

let currentMusic = 0;

const songs=[
    {
        name:"Kehdena", 
        artist:"Abdul Hannan,Annural Khalid",
        path: "track1.mp3",
        cover:"download (2).jpeg"
    },
    {
        name:"Mahiye Jinna Sohna", 
        artist:"Darshan Raval",
        path: "track2.mp3",
        cover:"cover song 2.jpeg"  
    },
    {
        name:"Aasa Kooda", 
        artist:"Sai Abhyankkar",
        path: "track3.mp3",
        cover:"cover song 3.jpeg"
    }
];

const loadSongs = () => {
    songs.forEach((song, index) => {
        const li = document.createElement('li');
        li.textContent=song.name;
        li.addEventListener('click',()=>{
            setMusic(index);
            playMusic();
        });
        playlistE1.appendChild(li);
    });
};

const setMusic=(i)=>{
    seekBar.value=0;
    const song = songs[i];
    currentMusic = i;
    music.src = song.path;
    songNameE1.textContent = song.name;
    artistNameE1.textContent = song.artist;
    disk.style.backgroundImage = `url('${song.cover}')`;
    currentTimeE1.textContent = '00:00';
    setTimeout(() => {
        seekBar.max = music.duration;
        musicDurationE1.textContent = formatTime(music.duration);
    }, 300);
};

const formatTime = (time) => {
    let min = Math.floor(time /60);
    let sec = Math.floor(time % 60);
    if(min < 10) min = `0${min}`;
    if(sec < 10) sec = `0${sec}`;
    return `${min}:${sec}`;
};

playBtn.addEventListener('click',()=>{
    if(music.paused){
        playMusic();
    }
    else{
        pauseMusic();
    }
});

const playMusic = () => {
    music.play();
    playBtn.innerHTML = '<img src ="yoyoy.png" alt="Play Button">';
    disk.classList.add('play');
};

const pauseMusic = () => {
    music.pause();
    playBtn.innerHTML = '<img src ="playPPP.png" alt="Play Button">';
    disk.classList.remove('play');
};

forwardBtn.addEventListener('click',() =>{
    if(currentMusic >= songs.length - 1){
        currentMusic = 0;
    }
    else{
        currentMusic++;
    }
    setMusic(currentMusic);
    playMusic();
});
backwardBtn.addEventListener('click',() =>{
    if(currentMusic <= 0){
        currentMusic = songs.length - 1;
    }
    else{
        currentMusic--;
    }
    setMusic(currentMusic);
    playMusic();
});

seekBar.addEventListener('input',()=>{
    music.currentTime = seekBar.value;
    currentTimeE1.textContent=formatTime(music.currentTime);
});

volumeControl.addEventListener('input', () => {
    music.volume = volumeControl.value;
});

music.addEventListener('timeupdate',() =>{
    seekBar.value = music.currentTime;
    currentTimeE1.textContent = formatTime(music.currentTime);
    if(Math.floor(music.currentTime)===Math.floor(music.duration)) {
        forwardBtn.click();
    }
});

setMusic(0);
loadSongs();