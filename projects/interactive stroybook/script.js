// Story data structure
const story = {
    start: {
      text: "You wake up in a mysterious forest. What do you want to do?",
      choices: [
        {
          text: "Explore the forest",
          next: "exploreForest"
        },
        {
          text: "Look for a way out",
          next: "findWayOut"
        }
      ]
    },
    exploreForest: {
      text: "You venture deeper into the forest and find a river. Do you want to:",
      choices: [
        {
          text: "Swim across the river",
          next: "swimRiver"
        },
        {
          text: "Follow the river",
          next: "followRiver"
        }
      ]
    },
    findWayOut: {
      text: "You decide to look for a way out and stumble upon an old cabin. Do you want to:",
      choices: [
        {
          text: "Enter the cabin",
          next: "enterCabin"
        },
        {
          text: "Keep walking",
          next: "keepWalking"
        }
      ]
    },
    swimRiver: {
      text: "You swim across the river but get caught in a current. You manage to survive, but you're lost.",
      choices: [
        {
          text: "Search for help",
          next: "searchForHelp"
        },
        {
          text: "Build a shelter",
          next: "buildShelter"
        }
      ]
    },
    followRiver: {
      text: "Following the river leads you to a small village. The villagers welcome you.",
      choices: []
    },
    enterCabin: {
      text: "Inside the cabin, you find a treasure chest filled with gold! You are rich!",
      choices: []
    },
    keepWalking: {
      text: "You walk for hours and find your way back to the forest's edge. You made it out safely!",
      choices: []
    },
    searchForHelp: {
      text: "You shout for help, and a stranger comes to your aid. They guide you out of the forest.",
      choices: []
    },
    buildShelter: {
      text: "You build a shelter and decide to wait for help. It rains, but you stay safe inside.",
      choices: []
    }
  };
  
  // Function to display the story and choices
  function displayStory(node) {
    const storyDiv = document.getElementById("story");
    const choicesDiv = document.getElementById("choices");
  
    // Clear previous story and choices
    storyDiv.innerHTML = "";
    choicesDiv.innerHTML = "";
  
    // Display story text
    storyDiv.innerHTML = `<p>${story[node].text}</p>`;
  
    // Display choices
    story[node].choices.forEach(choice => {
      const button = document.createElement("button");
      button.className = "choice-button";
      button.textContent = choice.text;
      button.onclick = () => displayStory(choice.next);
      choicesDiv.appendChild(button);
    });
  
    // If there are no choices, display a message
    if (story[node].choices.length === 0) {
      const message = document.createElement("p");
      message.textContent = "The end. Thanks for reading!";
      choicesDiv.appendChild(message);
    }
  }
  
  // Start the story
  displayStory("start");
  