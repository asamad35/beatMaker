class Drumkit {
  constructor() {
    this.pads = document.querySelectorAll(".pad");
    this.playBtn = document.querySelector(".play");
    this.clearAll = document.querySelector(".clear-all");
    this.showSavedPatterns = document.querySelector(".fa-save");
    this.currentKick = "allSounds/kick-classic.wav";
    this.currentSnare = "allSounds/snare-acoustic01.wav";
    this.currentHihat = "allSounds/hihat-acoustic01.wav";
    this.muteBtns = document.querySelectorAll(".mute");
    this.selects = document.querySelectorAll("select");
    this.kickSound = document.querySelector(".kick-sound");
    this.snareSound = document.querySelector(".snare-sound");
    this.hihatSound = document.querySelector(".hihat-sound");
    this.saveButton = document.querySelector(".save");
    this.tempoSlider = document.querySelector(".tempo-slider");
    this.volSliders = document.querySelectorAll(".vol-slider");
    this.kickVolBar = document.querySelector(".kick-vol-bar");
    this.snareVolBar = document.querySelector(".snare-vol-bar");
    this.hihatVolBar = document.querySelector(".hihat-vol-bar");
    this.patternDiv = document.querySelector(".pattern");
    this.index = 0;
    this.bpm = 200;
    this.isPlaying = null;
  }
  clearAllPads() {
    this.pads.forEach((pad) => {
      pad.classList.remove("active");
    });
  }
  activePad() {
    this.classList.toggle("active");
  }
  repeat() {
    let step = this.index % 8;
    this.index++;
    const activeBars = document.querySelectorAll(`.b${step}`);
    //Looping over active pads
    activeBars.forEach((bars) => {
      bars.style.animation = `playTrack 0.5s ease-in-out alternate 2`;
      // check active bars
      if (bars.classList.contains("active")) {
        // check sound
        if (bars.classList.contains("kick-pad")) {
          this.kickSound.play();
          this.kickSound.currentTime = 0;
        }
        if (bars.classList.contains("snare-pad")) {
          this.snareSound.play();
          this.snareSound.currentTime = 0;
        }
        if (bars.classList.contains("hihat-pad")) {
          this.hihatSound.play();
          this.hihatSound.currentTime = 0;
        }
      }
    });
  }
  start() {
    let interval = (60 / this.bpm) * 1000;
    // check if it's playing
    if (!this.isPlaying) {
      this.isPlaying = setInterval(() => {
        this.repeat();
      }, interval);
    } else {
      //clear interval
      clearInterval(this.isPlaying); // clearInterval() takes argument of the id which is returned by setInteval().
      this.isPlaying = null;
    }
  }
  changeVol(e) {
    const volBar = e.target;
    if (volBar.classList.contains("kick-vol-bar")) {
      this.kickSound.volume = volBar.value / 100;
      volBar.nextElementSibling.innerText = `${volBar.value}%`;
      if (volBar.value == 0) {
        this.muteBtns[0].classList.add("active");
        this.muteBtns[0].firstElementChild.classList.remove("fa-volume-up");
        this.muteBtns[0].firstElementChild.classList.add("fa-volume-mute");
      } else {
        this.muteBtns[0].classList.remove("active");
        this.muteBtns[0].firstElementChild.classList.remove("fa-volume-mute");
        this.muteBtns[0].firstElementChild.classList.add("fa-volume-up");
      }
    }
    if (volBar.classList.contains("snare-vol-bar")) {
      this.snareSound.volume = volBar.value / 100;
      volBar.nextElementSibling.innerText = `${volBar.value}%`;

      if (volBar.value == 0) {
        this.muteBtns[1].classList.add("active");
        this.muteBtns[1].firstElementChild.classList.remove("fa-volume-up");
        this.muteBtns[1].firstElementChild.classList.add("fa-volume-mute");
      } else {
        this.muteBtns[1].classList.remove("active");
        this.muteBtns[1].firstElementChild.classList.remove("fa-volume-mute");
        this.muteBtns[1].firstElementChild.classList.add("fa-volume-up");
      }
    }
    if (volBar.classList.contains("hihat-vol-bar")) {
      this.hihatSound.volume = volBar.value / 100;
      volBar.nextElementSibling.innerText = `${volBar.value}%`;

      if (volBar.value == 0) {
        this.muteBtns[2].classList.add("active");
        this.muteBtns[2].firstElementChild.classList.remove("fa-volume-up");
        this.muteBtns[2].firstElementChild.classList.add("fa-volume-mute");
      } else {
        this.muteBtns[2].classList.remove("active");
        this.muteBtns[2].firstElementChild.classList.remove("fa-volume-mute");
        this.muteBtns[2].firstElementChild.classList.add("fa-volume-up");
      }
    }
  }
  changeTempo(e) {
    const tempoText = document.querySelector(".tempo");
    console.log(e.target.value);
    this.bpm = e.target.value;
    tempoText.innerText = e.target.value;
  }
  updateTempo() {
    clearInterval(this.isPlaying);
    this.isPlaying = null;
    if (this.playBtn.classList.contains("active")) {
      this.start();
    }
  }
  update() {
    this.playBtn.classList.toggle("active");
    if (!this.isPlaying) {
      this.playBtn.innerText = "Play";
    } else this.playBtn.innerText = "Stop";
  }
  changeSound(e) {
    const selectionName = e.target.name;
    const selectionValue = e.target.value;
    // Switching sounds
    switch (selectionName) {
      case "kick-select":
        this.kickSound.src = selectionValue;
        break;
      case "snare-select":
        this.snareSound.src = selectionValue;
        break;
      case "hihat-select":
        this.hihatSound.src = selectionValue;
        break;
    }
  }
  muteSound(e) {
    const muteBtn = e.target;
    const muteIndex = e.target.getAttribute("data-track");
    muteBtn.classList.toggle("active");
    muteBtn.firstElementChild.classList.toggle("fa-volume-up");
    muteBtn.firstElementChild.classList.toggle("fa-volume-mute");
    if (!muteBtn.classList.contains("active")) {
      switch (muteIndex) {
        case "0":
          this.kickSound.volume = 1;
          break;
        case "1":
          this.snareSound.volume = 1;
          break;
        case "2":
          this.hihatSound.volume = 1;
          break;
      }
    } else {
      switch (muteIndex) {
        case "0":
          this.kickSound.volume = 0;
          break;
        case "1":
          this.snareSound.volume = 0;
          break;
        case "2":
          this.hihatSound.volume = 0;
          break;
      }
    }
  }
  // saving pattern
  savePattern() {
    const kickPads = document.querySelectorAll(".kick-pad");
    const snarePads = document.querySelectorAll(".snare-pad");
    const hihatPads = document.querySelectorAll(".hihat-pad");
    const kickPattern = [];
    const snarePattern = [];
    const hihatPattern = [];
    // looping through kick-pads
    kickPads.forEach((kickPad) => {
      if (kickPad.classList.contains("active")) {
        kickPattern.push(kickPad);
      }
    });
    this.kickBlocks();
    // looping through snare-pads
    snarePads.forEach((snarePad) => {
      if (snarePad.classList.contains("active")) {
        snarePattern.push(snarePad);
      }
    });
    this.snareBlocks();

    // looping through hihat-pads
    hihatPads.forEach((hihatPad) => {
      if (hihatPad.classList.contains("active")) {
        hihatPattern.push(hihatPad);
      }
    });
    this.hihatBlocks();
    // Fading background
    this.fadeBg();
  }

  fadeBg() {
    const saveDiv = document.querySelector(".save-div");
    saveDiv.style.opacity = 1;
    saveDiv.style.pointerEvents = "all";
    //unfade Bg
    saveDiv.addEventListener("click", function (e) {
      if (
        e.target.classList.contains("save-div") ||
        e.target.classList.contains("use-btn")
      ) {
        saveDiv.style.opacity = 0;
        saveDiv.style.pointerEvents = "none";
      }
    });
  }
  savedPatterns() {
    const saveDiv = document.querySelector(".save-div");
    saveDiv.style.opacity = 1;
    saveDiv.style.pointerEvents = "all";
    saveDiv.addEventListener("click", function (e) {
      if (e.target.classList.contains("save-div")) {
        saveDiv.style.opacity = 0;
        saveDiv.style.pointerEvents = "none";
      }
    });
  }

  kickBlocks() {
    const newKick = document.querySelector(".pattern");
    const kickPatternContainer = document.createElement("div");
    kickPatternContainer.classList.add("kick-pattern-container");
    // kick heading
    const kickHeading = document.createElement("span");
    kickHeading.innerText = "Kick";
    kickHeading.classList.add("kickHeading");
    kickPatternContainer.appendChild(kickHeading);
    // making 8 kick blocks
    for (let index = 0; index < 8; index++) {
      const kickBlock = document.createElement("div");
      kickBlock.classList.add(`kick-block`);
      kickBlock.classList.add(`kick-small`);
      kickBlock.classList.add(`b${index}`);
      // appending kickBlock into kickPatternContainer
      kickPatternContainer.appendChild(kickBlock);
    }
    // appending kickPatternContainer into newKick
    newKick.appendChild(kickPatternContainer);
    // changing colour of active child
    const patternKickBlocks = document.querySelectorAll(".kick-block");
    //looping through every mainKickBlock
    const kickPattern = document.querySelectorAll(".kick-pad");
    let mainIndex = 0;
    kickPattern.forEach((mainKickBlock) => {
      // now holding 1 mainKickBlock and comparing with every patternKickBlock
      patternKickBlocks.forEach((patternKickBlock) => {
        // check if mainBlock contains active class
        if (mainKickBlock.classList.contains("active")) {
          // checking if both mainBlock and pattern block conatins same index
          if (
            mainKickBlock.classList.contains(`b${mainIndex}`) &&
            patternKickBlock.classList.contains(`b${mainIndex}`)
          ) {
            // if yes change patternBlock colour
            patternKickBlock.classList.add("active");
            patternKickBlock.style.background = "rgb(20 141 165)";
          }
        }
      });
      mainIndex++;
    });
    patternKickBlocks.forEach((patternKickBlock) => {
      patternKickBlock.classList.remove("kick-block");
    });
  }
  snareBlocks() {
    const newSnare = document.querySelector(".pattern");
    const snarePatternContainer = document.createElement("div");
    snarePatternContainer.classList.add("snare-pattern-container");
    // snare heading
    const snareHeading = document.createElement("span");
    snareHeading.innerText = "Snare";
    snareHeading.classList.add("snareHeading");
    snarePatternContainer.appendChild(snareHeading);
    // making 8 snare blocks
    for (let index = 0; index < 8; index++) {
      const snareBlock = document.createElement("div");
      snareBlock.classList.add(`snare-block`);
      snareBlock.classList.add(`snare-small`);
      snareBlock.classList.add(`b${index}`);
      // appending snareBlock into snarePatternContainer
      snarePatternContainer.appendChild(snareBlock);
    }
    // appending snarePatternContainer into snareKick
    newSnare.appendChild(snarePatternContainer);
    // changing colour of active child
    const patternSnareBlocks = document.querySelectorAll(".snare-block");
    //looping through every mainKickBlock
    const snarePattern = document.querySelectorAll(".snare-pad");
    let mainIndex = 0;
    snarePattern.forEach((mainSnareBlock) => {
      // now holding 1 mainKickBlock and comparing with every patternKickBlock
      patternSnareBlocks.forEach((patternSnareBlock) => {
        // check if mainBlock contains active class
        if (mainSnareBlock.classList.contains("active")) {
          // checking if both mainBlock and pattern block conatins same index
          if (
            mainSnareBlock.classList.contains(`b${mainIndex}`) &&
            patternSnareBlock.classList.contains(`b${mainIndex}`)
          ) {
            // if yes change patternBlock colour
            patternSnareBlock.classList.add("active");
            patternSnareBlock.style.background = "rgb(163, 43, 187)";
          }
        }
      });
      mainIndex++;
    });
    patternSnareBlocks.forEach((patternSnareBlock) => {
      patternSnareBlock.classList.remove("snare-block");
    });
    // Use button
    const useBtn = document.createElement("button");
    useBtn.classList.add("use-btn");
    useBtn.innerText = "USE";
    snarePatternContainer.appendChild(useBtn);
    // use-btn
    useBtn.addEventListener("click", function (e) {
      drumkit.use(e);
    });

    // Delete Button
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.innerText = "DEL";
    snarePatternContainer.appendChild(deleteBtn);
    // delete-btn
    deleteBtn.addEventListener("click", function (e) {
      drumkit.delete(e);
    });
  }
  delete(e) {
    const deleteBtn = e.target;
    //adding animation
    deleteBtn.parentElement.nextElementSibling.style.animation =
      "del-anim  1s ease";
    deleteBtn.parentElement.previousElementSibling.style.animation =
      "del-anim  1s ease";
    deleteBtn.parentElement.style.animation = "del-anim  1.01s ease";

    // trying to animate

    deleteBtn.parentElement.nextElementSibling.addEventListener(
      "animationend",
      function () {
        deleteBtn.parentElement.nextElementSibling.remove();
      }
    );
    deleteBtn.parentElement.previousElementSibling.addEventListener(
      "animationend",
      function () {
        deleteBtn.parentElement.previousElementSibling.remove();
      }
    );
    deleteBtn.parentElement.addEventListener("animationend", function () {
      deleteBtn.parentElement.remove();
    });
    //deleteBtn.parentElement.nextElementSibling.remove();
    // deleteBtn.parentElement.previousElementSibling.remove();
    // deleteBtn.parentElement.remove();
  }
  use(e) {
    // getting button element
    const useBtn = e.target;
    /////////////////////////////snare///////////////////////////
    //getting snare container children as an array
    const snareContainerChildren = useBtn.parentElement.childNodes;
    const snareBlocks = [];
    // getting only snareBlocks from snare container children array
    const snarePads = document.querySelectorAll(".snare-pad");
    snarePads.forEach((snarePad) => {
      snarePad.classList.remove("active");
    });
    snareContainerChildren.forEach((snareContainerChild) => {
      if (snareContainerChild.classList.contains("snare-small"))
        // pushing in snareBlocks
        snareBlocks.push(snareContainerChild);
    });
    let snareIndex = 0;
    snareBlocks.forEach((snareBlock) => {
      snarePads.forEach((snarePad) => {
        if (snareBlock.classList.contains("active")) {
          if (
            snareBlock.classList.contains(`b${snareIndex}`) &&
            snarePad.classList.contains(`b${snareIndex}`)
          ) {
            snarePad.classList.add("active");
          }
        }
      });
      snareIndex++;
    });
    /////////////////////////////kick///////////////////////////
    const kickContainerChildren =
      useBtn.parentElement.previousElementSibling.childNodes;
    const kickBlocks = [];
    // getting only kickBlocks from kick container children array
    const kickPads = document.querySelectorAll(".kick-pad");
    kickPads.forEach((kickPad) => {
      kickPad.classList.remove("active");
    });
    kickContainerChildren.forEach((kickContainerChild) => {
      if (kickContainerChild.classList.contains("kick-small"))
        // pushing in kickBlocks
        kickBlocks.push(kickContainerChild);
    });
    let kickIndex = 0;
    kickBlocks.forEach((kickBlock) => {
      kickPads.forEach((kickPad) => {
        if (kickBlock.classList.contains("active")) {
          if (
            kickBlock.classList.contains(`b${kickIndex}`) &&
            kickPad.classList.contains(`b${kickIndex}`)
          ) {
            kickPad.classList.add("active");
          }
        }
      });
      kickIndex++;
    });
    /////////////////////////////hihat///////////////////////////
    const hihatContainerChildren =
      useBtn.parentElement.nextElementSibling.childNodes;
    const hihatBlocks = [];
    // getting only hihatBlocks from hihat container children array
    const hihatPads = document.querySelectorAll(".hihat-pad");
    hihatPads.forEach((hihatPad) => {
      hihatPad.classList.remove("active");
    });
    hihatContainerChildren.forEach((hihatContainerChild) => {
      if (hihatContainerChild.classList.contains("hihat-small"))
        // pushing in hihatBlocks
        hihatBlocks.push(hihatContainerChild);
    });
    let hihatIndex = 0;
    hihatBlocks.forEach((hihatBlock) => {
      hihatPads.forEach((hihatPad) => {
        if (hihatBlock.classList.contains("active")) {
          if (
            hihatBlock.classList.contains(`b${hihatIndex}`) &&
            hihatPad.classList.contains(`b${hihatIndex}`)
          ) {
            hihatPad.classList.add("active");
          }
        }
      });
      hihatIndex++;
    });
  }

  hihatBlocks() {
    const newHihat = document.querySelector(".pattern");
    const hihatPatternContainer = document.createElement("div");
    hihatPatternContainer.classList.add("hihat-pattern-container");
    // snare heading
    const hihatHeading = document.createElement("span");
    hihatHeading.innerText = "Hihat";
    hihatHeading.classList.add("hihatHeading");
    hihatPatternContainer.appendChild(hihatHeading);
    // making 8 snare blocks
    for (let index = 0; index < 8; index++) {
      const hihatBlock = document.createElement("div");
      hihatBlock.classList.add(`hihat-block`);
      hihatBlock.classList.add(`hihat-small`);
      hihatBlock.classList.add(`b${index}`);
      // appending snareBlock into snarePatternContainer
      hihatPatternContainer.appendChild(hihatBlock);
    }
    // appending snarePatternContainer into snareKick
    newHihat.appendChild(hihatPatternContainer);

    // changing colour of active child
    const patternHihatBlocks = document.querySelectorAll(".hihat-block");
    //looping through every mainKickBlock
    const hihatPattern = document.querySelectorAll(".hihat-pad");
    let mainIndex = 0;
    hihatPattern.forEach((mainHihatBlock) => {
      // now holding 1 mainKickBlock and comparing with every patternKickBlock
      patternHihatBlocks.forEach((patternHihatBlock) => {
        // check if mainBlock contains active class
        if (mainHihatBlock.classList.contains("active")) {
          // checking if both mainBlock and pattern block conatins same index
          if (
            mainHihatBlock.classList.contains(`b${mainIndex}`) &&
            patternHihatBlock.classList.contains(`b${mainIndex}`)
          ) {
            // if yes change patternBlock colour
            patternHihatBlock.classList.add("active");
            patternHihatBlock.style.background = "rgb(232 141 22)";
          }
        }
      });
      mainIndex++;
    });
    patternHihatBlocks.forEach((patternHihatBlock) => {
      patternHihatBlock.classList.remove("hihat-block");
    });
  }
}

const drumkit = new Drumkit();

// Event listeners
drumkit.playBtn.addEventListener("click", function () {
  //arow function "this" is returning window object
  // simple function "this" is returning play button
  drumkit.start();
  drumkit.update();
});
//adding listeners to all the pads
drumkit.pads.forEach((pad) => {
  //arow function "this" is returning window object
  // simple function "this" is returning pad but value of "this" is not getting passed
  // "this" value pass karane ke liye i used call()
  pad.addEventListener("click", function () {
    drumkit.activePad.call(this);
  });
  pad.addEventListener("animationend", function () {
    this.style.animation = "";
  });
});
//adding event listeners to all SELECT elements
drumkit.selects.forEach((select) => {
  select.addEventListener("click", function (e) {
    drumkit.changeSound(e);
  });
});
// mute sounds
drumkit.muteBtns.forEach((muteBtn) => {
  muteBtn.addEventListener("click", function (e) {
    drumkit.muteSound(e);
  });
});
// adjust and update tempo
drumkit.tempoSlider.addEventListener("input", function (e) {
  drumkit.changeTempo(e);
});
drumkit.tempoSlider.addEventListener("input", function () {
  drumkit.updateTempo();
});
// adjust volume
drumkit.volSliders.forEach((volSlider) => {
  volSlider.addEventListener("input", function (e) {
    drumkit.changeVol(e);
  });
});
//save-button
drumkit.saveButton.addEventListener("click", function () {
  drumkit.savePattern();

  drumkit.patternDiv.style.display = "block";
});
//clear-all
drumkit.clearAll.addEventListener("click", function () {
  drumkit.clearAllPads();
});
drumkit.showSavedPatterns.addEventListener("click", function () {
  drumkit.savedPatterns();
  drumkit.patternDiv.style.display = "block";
});
