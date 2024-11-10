

# Text-to-Speech Converter

A simple web-based Text-to-Speech (TTS) converter that allows users to input text and listen to it as speech. This project utilizes the Web Speech API, making it accessible on modern browsers without requiring any additional installations or plugins.

## Features

- **Text to Speech**: Converts the text entered by the user into speech.
- **Voice Selection**: Choose from a list of available voices on the user's device.
- **Real-Time Playback**: Instantly hear the text spoken aloud upon pressing the "Listen" button.

## Demo

https://niraj1608.github.io/text-to-speech/

## How It Works

This project leverages the browser's built-in [Speech Synthesis API](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis) to convert text to speech:

1. **Voice Loading**: On load, available voices are fetched from the Speech Synthesis API and populated into a dropdown menu.
2. **Voice Selection**: Users can choose different voices from the dropdown menu, which updates the selected voice for speech synthesis.
3. **Speech Generation**: When the "Listen" button is clicked, the text entered in the textarea is spoken aloud using the selected voice.

## Project Structure

- **HTML**: Provides the basic structure of the TTS interface.
- **CSS**: Styles the page to enhance the user experience.
- **JavaScript**: Implements the TTS functionality using the Web Speech API.

