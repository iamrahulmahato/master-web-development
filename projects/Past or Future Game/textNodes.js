export const textNodes = [
  {
    id: 1,
    title: "Chapter 1: The Haunting Invitation",
    text: "The moon's low glow lit up the creepy note in your hands. It's got your name on it, but no return address. The ink moves like it's got a mind of its own. Chills run down your spine, but instead of tossing it, you're drawn to the forgotten mansion on the edge of town.",
    img: "./assets/the-ordinary-world.jpg",
    options: [
      {
        text: "Venture forth into the unusual and start the adventure.",
        nextText: 2,
      },
    ],
  },
  {
    id: 2,
    title: "Chapter 2: Rusty Gates and Ghostly Welcomes",
    text: "The mansion is a giant shadow in the night. The gate, making an unsettling creak, opens as you walk up. The air thickens, and an owl hoots like it knows something. But that weird invitation pulls you in, saying, 'Keep going!'.",
    img: "./assets/the-portal.jpg",
    options: [
      {
        text: "Press forward, guided by the mysterious invitation.",
        nextText: 3,
      },
      {
        text: "Turn away and leave the ominous mansion behind.",
        nextText: 1,
      },
    ],
  },
  {
    id: 3,
    title: "Chapter 3: Echoes of Grandeur",
    text: "Inside, the entrance hall's whispering secrets of a fancy past now lost in darkness. Walls seem to talk as you go deeper. It's so damn cold, and you can't shake the feeling of eyes watching me. Your heart's racing, torn between running and figuring out what the invitation's teasing.",
    img: "./assets/start-btn.jpg",
    options: [
      {
        text: "Venture further into the mansion, determined to uncover its secrets.",
        nextText: 4,
      },
      {
        text: "Retreat from the eerie mansion and head back home.",
        nextText: 1,
      },
    ],
  },
  {
    id: 4,
    title: "Chapter 4: Ghostly Ballroom Grooves",
    text: "Following a flickering light, You end up in a ballroom that time forgot. Tattered tapestries and eerie elegance surround you as a distant ghostly melody fills the emptiness. Breath caught, feeling eyes on you, it's like you stumbled into a spectral dance party.",
    img: "./assets/AI.jpg",
    options: [
      {
        text: "Step into the dance of the spirits and explore the ghostly ballroom further.",
        nextText: 5,
      },
      {
        text: "Leave the ballroom, avoiding whatever supernatural gathering might be happening.",
        nextText: 1,
      },
    ],
  },

  {
    id: 5,
    title: "Chapter 5: The Cold Whispering Wind",
    text: "Moving deeper, a gust blows out the hallway candles. In the dark, a voice whispers, begging for release. Shadows dance like they've got a life of their own. The air gets heavy, and every step feels like you're sinking into the unknown. The invitation's still echoing, telling you to uncover the mysteries within.",
    img: "./assets/skills.jpg",
    options: [
      {
        text: "Press on, determined to unravel the secrets despite the ominous whispers.",
        nextText: 6,
      },
      {
        text: "Turn back and leave the mansion to escape the unsettling whispers.",
        nextText: 1,
      },
    ],
  },
  {
    id: 6,
    title: "Chapter 6: The Divided Paths",
    text: "While exploring the mansion's depths, You stumble upon a hidden door. As you open it, a cold breeze escapes, revealing two diverging passages: one marked 'Past' and the other 'Present.' The decision is now yours, each promising untold mysteries.",
    img: "./assets/divided.jpeg",
    options: [
      {
        text: "Venture into the passage leading to the past.",
        nextText: 20,
      },
      {
        text: "Step into the passage leading to the future.",
        nextText: 50,
      },
    ],
  },
  {
    id: 20,
    title: "Chapter 6A: The Whispering Shadows of the Past",
    text: "As you traverse through the 'Past' portal, you find yourself in a dimly lit study. The air is thick with an unsettling stillness. A collection of old books lines the shelves, and a flickering candle barely illuminates the room.",
    img: "./assets/book.jpeg",
    options: [
      {
        text: "Investigate the books for clues.",
        nextText: 21,
      },
      {
        text: "Leave the past undisturbed and return to the present.",
        nextText: 6,
      },
    ],
  },
  {
    id: 21,
    title: "Chapter 6B: The Enigmatic Heirlooms",
    text: "Among the books, you discover a hidden door leading to a gallery adorned with sinister paintings. The eyes of the portraits seem to follow your every move. Whispers hint at a malevolent force residing within the mansion.",
    img: "./assets/eyes.jpeg",
    options: [
      {
        text: "Study the paintings for hidden messages.",
        nextText: 22,
      },
      {
        text: "Ignore the paintings",
        nextText: 40,
      },
    ],
  },
  {
    id: 22,
    title: "Chapter 6C: The Haunting Melody",
    text: "Following the corridor, you stumble upon a grand piano emitting a haunting melody on its own. The notes resonate through the mansion, stirring dormant spirits. A chilling voice beckons you towards the source.",
    img: "./assets/piano.jpeg",
    options: [
      {
        text: " Approach the piano and attempt to play along.",
        nextText: 23,
      },
    ],
  },

  {
    id: 23,
    title: "Chapter 6D: The Cryptic Symbols",
    text: "The melody leads you to a room covered in cryptic symbols. A pentagram glows ominously in the center. A ghostly figure appears, speaking in an otherworldly language, and presents a choice.",
    img: "./assets/symbols.jpeg",
    options: [
      {
        text: "Attempt to communicate with the ghost using the symbols.",
        nextText: 24,
      },
      {
        text: "Defy the ghost and disrupt the symbols.",
        nextText: 23,
      },
    ],
  },
  {
    id: 24,
    title: "Chapter 6E: The Unveiling of Secrets",
    text: "Communicating with the ghost unravels a dark secret. The mansion is a nexus of lost souls, trapped by a curse. The only way to escape is to sacrifice another, or to willingly become part of the spectral collective.",
    img: "./assets/mansion.jpeg",
    options: [
      {
        text: "Choose to sacrifice another to escape the curse.",
        nextText: 25,
      },
      {
        text: "Offer yourself to become part of the spectral collective.",
        nextText: 25,
      },
    ],
  },
  {
    id: 25,
    title: "Ending: The Curse",
    text: "Regardless of your choice, the mansion unveils its true nature. The curse is unbreakable, reducing you to a mere pawn in its malevolent game. The walls converge, and you awaken in the study, the portal mocking your futile escape. The true horror lies in the mansion's cyclical nature, ensnaring all who enter in an unending loop of terror.",
    img: "./assets/past_end.jpeg",
    options: [
      {
        text: "Restart the adventure.",
        nextText: 1,
      },
    ],
  },
];
