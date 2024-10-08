# Text-to-Speech Reader Using Mozilla Voice API

## Project Overview

The Text-to-Speech Reader is a web-based application that leverages Mozilla's Voice API to provide text-to-speech functionality. This project aims to make web content more accessible by enabling users to convert text into speech using a variety of voice options, controls, and interactive features.

Users can select, type, or paste text and convert it to speech. The application offers interactive speech cards, allowing users to click on cards to read their content aloud. It also supports various voices and speech controls like play, pause, stop, volume adjustment, and speed control. <br>
**Live demo**: [Text-to-Speech Reader](https://mozilla-text-to-speech.netlify.app/)

### project images
![speech-to-text](./img/speech-to-text.png)
## Features

- **Text-to-Speech Conversion**: Users can type or paste text in an input field and have it read aloud.
- **Speech Controls**: Start, pause, and stop speech at any time with control buttons.
- **Voice Options**: Choose from different voice options available via the Mozilla Voice API.
- **Interactive Speech Cards**: Click on specific cards to have their content read aloud.
- **Automatic Input-to-Speech Conversion**: Converts typed input into speech when the user presses "Enter".

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:
2. Navigate to the project directory:
    ```bash
    cd projects/mozilla-text-to-speech
    ```
3. Open `index.html` in your browser to view and use the application.

## Usage

1. Select a voice from the dropdown menu.
2. Type or paste the text you want to read in the provided text area.
3. Click the "Read text" button to hear the text being read aloud.
4. Use the play, pause, and stop buttons to control speech playback.
5. Adjust the volume and speed of speech using the sliders.
6. Click on interactive speech cards to have their content read aloud.

## Project Structure

```plaintext
text-to-speech-reader/
│
├── index.html        # Main HTML file with UI structure
├── style.css         # CSS file for styling the application
├── script.js         # JavaScript file for handling speech synthesis and interactions
├── img/              # Directory containing image assets for interactive cards
│   ├── drink.jpg
│   ├── food.jpg
│   ├── tired.jpg
│   └── ...
└── README.md         # Project documentation
```

## Contributing

If you'd like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch (e.g., `feature/text-to-speech`).
3. Make your changes.
4. Open a Pull Request, and describe the changes you have made in detail.

Before submitting your PR, please ensure that:

- The application is functional and free of bugs.
- Your code is well-documented and structured.
- The `README.md` file is updated with new information if applicable.