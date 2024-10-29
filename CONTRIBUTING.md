<h1 align="center">Contributors Guide⚡ </h1>
<h3 align="center">Welcome to our open-source project! 😍<br> We appreciate your interest in contributing.😊 <br>This guide will help you get started with the project and make your first contribution.</h3>

  # Project Structure 📂

```bash
master-web-development/
├── .github/                  # GitHub-related files
│   ├── ISSUE_TEMPLATE/       # Issue templates
│   └── workflows/            # CI/CD workflows
├── .vscode/                  # VS Code settings
│   └── settings.json         # Editor settings
├── ATS-SCORE-RECOGNIZER/    # ATS Score Recognizer project
│   ├── algorithm_visualizer/ # Algorithm Visualizer project
│   │   ├── heapsortvisualizer.py # Heapsort visualizer script
│   │   └── timecomplexity1.py   # Time complexity script
├── Habit Tracker App/         # Habit Tracker application
│   ├── index.html            # Main HTML file
│   ├── script.js             # JavaScript file
│   └── styles.css            # CSS file
├── Ping-Pong-Game/           # Ping Pong Game project
│   ├── index.html            # Main HTML file
│   ├── script.js             # JavaScript file
│   └── styles.css            # CSS file
├── Signature Verification/    # Signature verification project
│   ├── results/              # Results directory
│   ├── templates/            # Template files
│   └── uploads/              # Uploads directory
├── Readme.md                 # Main README file
├── app.py                    # Main application script
├── methods.html              # Methods HTML file
├── Sorting Visualizer/       # Sorting visualizer project
│   ├── index.html            # Main HTML file
│   ├── script.js             # JavaScript file
│   └── style.css             # CSS file
├── Web-Based Image Resizing Tool/ # Image Resizing Tool project
│   ├── templates/            # Template files
│   ├── uploads/              # Uploads directory
│   ├── Readme.md             # Main README file
│   └── app.py                # Main application script
├── Workout App/              # Workout application
│   ├── assets/               # Asset files
│   ├── Signup.html           # Signup page
│   ├── index.html            # Main HTML file
│   ├── login.html            # Login page
│   ├── profile.html          # Profile page
│   ├── script.js             # JavaScript file
│   └── style.css             # CSS file
├── assets/                   # Common assets for projects
│   ├── image/                # Image files
│   │   ├── 110831_moon_icon.svg # Moon icon
│   │   ├── 15.png            # Image 15
│   │   ├── 2048.png          # 2048 game image
│   │   └── ...               # Other image files
├── challenges/               # Challenge-related files
│   ├── challengehtml.html     # Challenge HTML file
│   └── ...                   # Other challenge files
├── css/                      # CSS files
├── img/                      # Image files
├── js/                       # JavaScript files
│   ├── app.js                # Main application script
├── project_showcase/         # Project showcase files
│   ├── contributor.css        # Contributor styles
│   ├── contributor.html       # Contributor page
│   ├── contributor.js         # Contributor script
│   └── index.html            # Main showcase page
├── projects/                 # List of projects
│   ├── Emoji Mood Journal/    # Emoji Mood Journal project
│   ├── 15_puzzle/            # 15 Puzzle project
│   ├── ...                   # Other project directories
├── images/                   # General images
│   ├── index.html            # Main image page
│   ├── style.css             # Styles for images
│   └── ...                   # Other image files
├── CODE_OF_CONDUCT.md        # Code of conduct
├── CONTRIBUTING.md           # Contribution guidelines
├── LICENSE                   # License file
└── README.md                 # Main README file


```


# :zap: First Pull Request ✨

1. **Star this repository**
    Click on the top right corner marked as **Stars** at last.

2. **Fork this repository**
    Click on the top right corner marked as **Fork** at second last.                  

3. **Clone the forked repository**                   

```bash
git clone https://github.com/<your-github-username>/master-web-development.git
```
  
4. **Navigate to the project directory**

```bash
cd master-web-development
```

5. **Create a new branch**

```bash
git checkout -b <your_branch_name>
```

6. **To make changes**

```bash
git add .
```

7. **Now to commit**

```bash
git commit -m "add comment according to your changes or addition of features inside this"
```

8. **Push your local commits to the remote repository**

```bash
git push -u origin <your_branch_name>
```

9. **Create a Pull Request**

10. **Congratulations! 🎉 you've made your contribution**

<br>

# :zap: Alternatively contribute using GitHub Desktop 🖥️

1. **Open GitHub Desktop:**
   Launch GitHub Desktop and log in to your GitHub account if you haven't already.

2. **Clone the Repository:**
   - If you haven't cloned the repository yet, you can do so by clicking on the "File" menu and selecting "Clone Repository."
   - Choose the repository from the list of repositories on GitHub and clone it to your local machine.

3. **Switch to the Correct Branch:**
   - Ensure you are on the branch that you want to submit a pull request for.
   - If you need to switch branches, you can do so by clicking on the "Current Branch" dropdown menu and selecting the desired branch.

4. **Make Changes:**
   Make your changes to the code or files in the repository using your preferred code editor.

5. **Commit Changes:**
   - In GitHub Desktop, you'll see a list of the files you've changed. Check the box next to each file you want to include in the commit.
   - Enter a summary and description for your changes in the "Summary" and "Description" fields, respectively. Click the "Commit to <branch-name>" button to commit your changes to the local branch.

6. **Push Changes to GitHub:**
   After committing your changes, click the "Push origin" button in the top right corner of GitHub Desktop to push your changes to your forked repository on GitHub.

7. **Create a Pull Request:**
   - Go to the GitHub website and navigate to your fork of the repository.
   - You should see a button to "Compare & pull request" between your fork and the original repository. Click on it.

8. **Review and Submit:**
   - On the pull request page, review your changes and add any additional information, such as a title and description, that you want to include with your pull request.
   - Once you're satisfied, click the "Create pull request" button to submit your pull request.

9. **Wait for Review:**
    Your pull request will now be available for review by the project maintainers. They may provide feedback or ask for changes before merging your pull request into the main branch of the repository.

<br>


# :zap: Good Coding Practices 🧑‍💻

1. **Follow the Project's Code Style**

   - Maintain consistency with the existing code style (indentation, spacing, comments).
   - Use meaningful and descriptive names for variables, functions, and classes.
   - Keep functions short and focused on a single task.
   - Avoid hardcoding values; instead, use constants or configuration files when possible.

2. **Write Clear and Concise Comments**

   - Use comments to explain why you did something, not just what you did.
   - Avoid unnecessary comments that state the obvious.
   - Document complex logic and functions with brief explanations to help others understand your thought -process.

3. **Keep Code DRY (Don't Repeat Yourself)**

   - Avoid duplicating code. Reuse functions, methods, and components whenever possible.
   - If you find yourself copying and pasting code, consider creating a new function or component.

4. **Write Tests**

   - Write unit tests for your functions and components.
   - Ensure your tests cover both expected outcomes and edge cases.
   - Run tests locally before making a pull request to make sure your changes don’t introduce new bugs.

5. **Code Reviews and Feedback**

   - Be open to receiving constructive feedback from other contributors.
   - Conduct code reviews for others and provide meaningful suggestions to improve the code.
   - Always refactor your code based on feedback to meet the project's standards.

<br>

# :zap: Pull Request Process 🚀

When submitting a pull request, please adhere to the following:

1. **Self-review your code** before submission. 
2. Include a detailed description of the functionality you’ve added or modified.
3. Comment your code, especially in complex sections, to aid understanding.
4. Add relevant screenshots to assist in the review process.
5. Submit your PR using the provided template and hang tight; we'll review it as soon as possible! 🚀

<br>          

# :zap: Issue Report Process 📌            

To report an issue, follow these steps:                   				 
1. Navigate to the project's issues section :- [Issues](https://github.com/iamrahulmahato/master-web-development/issues)
2. Provide a clear and concise description of the issue.
3. **Avoid spamming** to claim an issue. Patience is key! 
4. Wait until someone looks into your report.
5. Begin working on the issue only after you have been assigned to it. 🚀

<br>

## :zap: Note from Admin ❗

- We welcome contributions from everyone. However, please avoid spamming the repository with irrelevant issues & pull requests. We reserve the right to mark PRs as invalid if they are not relevant.

<div align="center">
  <img src="https://media.giphy.com/media/LnQjpWaON8nhr21vNW/giphy.gif" width="60"> <em><b>I love connecting with different people</b> so if you want to say <b>hi, I'll be happy to meet you more!</b> :)</em>
</div>
