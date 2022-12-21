const synth = window.speechSynthesis;
const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelector = document.querySelector("#voice-select");
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');
const body = document.querySelector('body');

let voices = [];

const getVoices = () => {
  voices = synth.getVoices();

  // Loop through voices and create an option for each one
  voices.forEach(voice => {
    // Create option element
    const option = document.createElement('option');
    // Fill option with voice and language
    option.textContent = voice.name + '(' + voice.lang + ')';

    // Set needed option attributes
    option.setAttribute('data-lang', voice.lang);
    option.setAttribute('data-name', voice.name);
    voiceSelector.appendChild(option);
  });
};
getVoices();

if (synth.onvoiceschanged !== undefined) {
  synth.onvoiceschanged = getVoices;
}

// Speak
const speak = () => {
    // Check if speaking
    if (synth.speaking) {
      console.error('Already speaking...');
      return;
    }
    if (textInput.value !== '') {
  
      // Get speak text
      const speakText = new SpeechSynthesisUtterance(textInput.value);
  
      // Speak error
      speakText.onerror = e => {
        console.error('Something went wrong');
      };
  
      // Selected voice
      const selectedVoice = voiceSelector.selectedOptions[0].getAttribute(
        "data-name"
      );
  
      // Loop through voices
      voices.forEach(voice => {
        if (voice.name === selectedVoice) {
          speakText.voice = voice;
        }
      });
  
      // Set pitch and rate
      speakText.rate = rate.value;
      speakText.pitch = pitch.value;

      // Speak
      synth.speak(speakText);
    }
  };

  // EVENT LISTENERS

// Text form submit
textForm.addEventListener('submit', e => {
    e.preventDefault();
    speak();
    textInput.blur();
  });
  
  // Rate value change
  rate.addEventListener('change', e => (rateValue.textContent = rate.value));
  
  // Pitch value change
  pitch.addEventListener('change', e => (pitchValue.textContent = pitch.value));
  
  // Voice select change
  voiceSelector.addEventListener("change", (e) => speak());

  // Extra stuff I added:

  document.querySelector('#pause-button').addEventListener("click", e => synth.pause());

  document.querySelector('#resume-button').addEventListener("click", e => synth.resume());

  document.querySelector('#reset-button').addEventListener("click", e => synth.cancel());