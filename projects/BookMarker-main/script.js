const modal = document.getElementById("modal");
const modalShow = document.getElementById("show-modal");
const modalClose = document.getElementById("close-modal");
const bookmarkForm = document.getElementById("bookmark-form");
const websiteNameEl = document.getElementById("website-name");
const websiteUrlEl = document.getElementById("website-url");
const websiteFolderEl = document.getElementById("folder");
const bookmarksContainer1 = document.getElementById("bookmarks-container1");
const bookmarksContainer2 = document.getElementById("bookmarks-container2");
const bookmarksContainer3 = document.getElementById("bookmarks-container3");
const bookmarksContainer4 = document.getElementById("bookmarks-container4");
const bookmarksContainer5 = document.getElementById("bookmarks-container5");
const bookmarksContainer6 = document.getElementById("bookmarks-container6");
const bookmarksContainer7 = document.getElementById("bookmarks-container7");

let socialBookmarks = {};
let blogBookmarks = {};
let toolBookmarks = {};
let devBookmarks = {};
let courseBookmarks = {};
let codeBookmarks = {};
let liveBookmarks = {};

// Show Modal, Focus on Input
function showModal() {
  modal.classList.add("show-modal");
  websiteNameEl.focus();
}

// Modal Event Listeners
modalShow.addEventListener("click", showModal);
modalClose.addEventListener("click", () =>
  modal.classList.remove("show-modal")
);
window.addEventListener("click", (e) =>
  e.target === modal ? modal.classList.remove("show-modal") : false
);

// Validate Form
function validate(nameValue, urlValue) {
  const expression =
    /(https)?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/g;
  const regex = new RegExp(expression);
  if (!nameValue || !urlValue) {
    alert("Please submit values for both fields.");
    return false;
  }
  if (!urlValue.match(regex)) {
    alert("Please provide a valid web address.");
    return false;
  }
  // Valid
  return true;
}

// Build Bookmarks
function buildBookmarks(bookmarksContainer, bookmarks) {
  // Remove all bookmark elements
  const containerAttr = bookmarksContainer.getAttribute("name");

  if (containerAttr === "bookmarks-container1") {
    bookmarksContainer.textContent = "Social";
  }
  if (containerAttr === "bookmarks-container2") {
    bookmarksContainer.textContent = "Blog";
  }
  if (containerAttr === "bookmarks-container3") {
    bookmarksContainer.textContent = "Dev";
  }
  if (containerAttr === "bookmarks-container4") {
    bookmarksContainer.textContent = "Tool";
  }
  if (containerAttr === "bookmarks-container5") {
    bookmarksContainer.textContent = "Course";
  }

  if (containerAttr === "bookmarks-container6") {
    bookmarksContainer.textContent = "Github Code";
  }
  if (containerAttr === "bookmarks-container7") {
    bookmarksContainer.textContent = "Github Live";
  }
  const itemParent = document.createElement("div");
  itemParent.classList.add("itemParent");
  itemParent.textContent = "";
  // Build items

  Object.keys(bookmarks).forEach((id) => {
    const { name, url } = bookmarks[id];

    // Item
    const item = document.createElement("div");

    item.classList.add("item");

    // Close Icon
    const closeIcon = document.createElement("i");
    closeIcon.classList.add("fas", "fa-times");
    closeIcon.setAttribute("title", "Delete Bookmark");
    const containerAttribute = bookmarksContainer.getAttribute("name");
    const bookmarks1 = JSON.stringify(bookmarks);

    closeIcon.setAttribute(
      "onclick",
      `deleteBookmark('${containerAttribute}','${bookmarks1}','${id}')`
    );
    // Favicon / Link Container
    const linkInfo = document.createElement("div");
    linkInfo.classList.add("name");
    // Favicon
    const favicon = document.createElement("img");
    favicon.setAttribute(
      "src",
      `https://s2.googleusercontent.com/s2/favicons?domain=${url}`
    );
    favicon.setAttribute("alt", "Favicon");
    // Link
    const link = document.createElement("a");
    link.setAttribute("href", `${url}`);
    link.setAttribute("target", "_blank");
    link.textContent = name;
    // Append to bookmarks container
    linkInfo.append(favicon, link);
    item.append(closeIcon, linkInfo);

    itemParent.append(item);
  });

  bookmarksContainer.append(itemParent);
}

// Fetch bookmarks
function fetchBookmarks() {
  // Get bookmarks from localStorage if available
  if (localStorage.getItem("socialBookmarks")) {
    socialBookmarks = JSON.parse(localStorage.getItem("socialBookmarks"));
    buildBookmarks(bookmarksContainer1, socialBookmarks);
  }
  if (localStorage.getItem("blogBookmarks")) {
    blogBookmarks = JSON.parse(localStorage.getItem("blogBookmarks"));
    buildBookmarks(bookmarksContainer2, blogBookmarks);
  }
  if (localStorage.getItem("devBookmarks")) {
    devBookmarks = JSON.parse(localStorage.getItem("devBookmarks"));
    buildBookmarks(bookmarksContainer3, devBookmarks);
  }

  if (localStorage.getItem("toolBookmarks")) {
    toolBookmarks = JSON.parse(localStorage.getItem("toolBookmarks"));
    buildBookmarks(bookmarksContainer4, toolBookmarks);
  }

  if (localStorage.getItem("courseBookmarks")) {
    courseBookmarks = JSON.parse(localStorage.getItem("courseBookmarks"));
    buildBookmarks(bookmarksContainer5, courseBookmarks);
  }
  if (localStorage.getItem("codeBookmarks")) {
    codeBookmarks = JSON.parse(localStorage.getItem("codeBookmarks"));
    buildBookmarks(bookmarksContainer6, codeBookmarks);
  }
  if (localStorage.getItem("liveBookmarks")) {
    liveBookmarks = JSON.parse(localStorage.getItem("liveBookmarks"));
    buildBookmarks(bookmarksContainer7, liveBookmarks);
  } else {
    // Create bookmarks object in localStorage
    const id = `https://deshdeepakkushwaha.netlify.app/`;
    socialBookmarks[id] = {
      name: "Desh Deepak Kushwaha",
      url: "https://deshdeepakkushwaha.netlify.app/",
    };

    localStorage.setItem("socialBookmarks", JSON.stringify(socialBookmarks));
    buildBookmarks(bookmarksContainer1, socialBookmarks);
  }
}

// Delete Bookmark
function deleteBookmark(bookmarksContainer, bookmarks1, id) {
  // Loop through the bookmarks array

  let bookmarks = JSON.parse(bookmarks1);

  if (bookmarks[id]) {
    delete bookmarks[id];
  }
  // Update bookmarks array in localStorage, re-populate DOM

  if (bookmarksContainer === "bookmarks-container1") {
    // Set bookmarks in localStorage, fetch, reset input fields
    localStorage.setItem("socialBookmarks", JSON.stringify(bookmarks));
  }
  if (bookmarksContainer === "bookmarks-container2") {
    localStorage.setItem("blogBookmarks", JSON.stringify(bookmarks));
  }
  if (bookmarksContainer === "bookmarks-container3") {
    localStorage.setItem("devBookmarks", JSON.stringify(bookmarks));
  }
  if (bookmarksContainer === "bookmarks-container4") {
    localStorage.setItem("toolBookmarks", JSON.stringify(bookmarks));
  }
  if (bookmarksContainer === "bookmarks-container5") {
    localStorage.setItem("courseBookmarks", JSON.stringify(bookmarks));
  }
  if (bookmarksContainer === "bookmarks-container6") {
    localStorage.setItem("codeBookmarks", JSON.stringify(bookmarks));
  }
  if (bookmarksContainer === "bookmarks-container7") {
    localStorage.setItem("liveBookmarks", JSON.stringify(bookmarks));
  }
  fetchBookmarks();
}

function storeBookmark(e) {
  e.preventDefault();

  const nameValue = websiteNameEl.value;
  let urlValue = websiteUrlEl.value;
  let containerValue = websiteFolderEl.value;

  if (!urlValue.startsWith("http://") && !urlValue.startsWith("https://")) {
    urlValue = `https://${urlValue}`;
  }
  // Validate
  if (!validate(nameValue, urlValue)) {
    return false;
  }
  // Set bookmark object, add to array
  const bookmark = {
    name: nameValue,
    url: urlValue,
  };
  if (containerValue === "social") {
    socialBookmarks[urlValue] = bookmark;
    // Set bookmarks in localStorage, fetch, reset input fields
    localStorage.setItem("socialBookmarks", JSON.stringify(socialBookmarks));
  }
  if (containerValue === "blog") {
    blogBookmarks[urlValue] = bookmark;
    localStorage.setItem("blogBookmarks", JSON.stringify(blogBookmarks));
  }
  if (containerValue === "dev") {
    devBookmarks[urlValue] = bookmark;
    localStorage.setItem("devBookmarks", JSON.stringify(devBookmarks));
  }
  if (containerValue === "tool") {
    toolBookmarks[urlValue] = bookmark;
    localStorage.setItem("toolBookmarks", JSON.stringify(toolBookmarks));
  }
  if (containerValue === "course") {
    courseBookmarks[urlValue] = bookmark;
    localStorage.setItem("courseBookmarks", JSON.stringify(courseBookmarks));
  }
  if (containerValue === "githubCode") {
    codeBookmarks[urlValue] = bookmark;
    localStorage.setItem("codeBookmarks", JSON.stringify(codeBookmarks));
  }
  if (containerValue === "githubLive") {
    liveBookmarks[urlValue] = bookmark;
    localStorage.setItem("liveBookmarks", JSON.stringify(liveBookmarks));
  }
  console.log(codeBookmarks);
  fetchBookmarks();
  bookmarkForm.reset();
  websiteNameEl.focus();
}

// Event Listener
bookmarkForm.addEventListener("submit", storeBookmark);

// On Load, Fetch Bookmarks
fetchBookmarks();
