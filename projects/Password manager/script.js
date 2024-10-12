// Create the toast function
function showToast(message) {
  const toast = document.createElement("div");
  toast.classList.add("toast");
  toast.innerText = message;

  document.body.appendChild(toast);

  // Automatically remove toast after 3 seconds
  setTimeout(() => {
    toast.remove();
  }, 3000);
}

// Mask password with asterisks
function maskPassword(pass) {
  return "*".repeat(pass.length);
}

// Copy text to clipboard
function copyText(txt) {
  navigator.clipboard.writeText(txt).then(
    () => {
      showToast(`Copied`);
    },
    () => {
      showToast("Clipboard copying failed");
    }
  );
}

// Delete password from localStorage
const deletePassword = (website) => {
  let data = localStorage.getItem("passwords");
  let arr = JSON.parse(data);
  let arrUpdated = arr.filter((e) => e.website != website);
  localStorage.setItem("passwords", JSON.stringify(arrUpdated));
  showToast(`Successfully deleted password`);
  showPasswords();
};

// Display passwords in the table
const showPasswords = () => {
  let tb = document.querySelector("table");
  let data = localStorage.getItem("passwords");
  if (data == null || JSON.parse(data).length == 0) {
    tb.innerHTML = "<tr><td colspan='4'>No Data To Show</td></tr>";
  } else {
    tb.innerHTML = `<tr>
            <th>Website</th>
            <th>Username</th>
            <th>Password</th>
            <th>Delete</th>
        </tr>`;
    let arr = JSON.parse(data);
    let str = "";
    for (let element of arr) {
      str += `<tr>
                <td>${
                  element.website
                } <button type="button" class="material-icons cpy" onclick="copyText('${
        element.website
      }')">content_copy</button></td>
                <td>${
                  element.username
                } <button type="button" class="material-icons cpy" onclick="copyText('${
        element.username
      }')">content_copy</button></td>
                <td>${maskPassword(
                  element.password
                )} <button type="button" class="material-icons cpy" onclick="copyText('${
        element.password
      }')">content_copy</button></td>
                <td><button class="btnsm material-icons" onclick="deletePassword('${
                  element.website
                }')">delete</button></td>
            </tr>`;
    }
    tb.innerHTML += str;
  }
  website.value = "";
  username.value = "";
  password.value = "";
};

// Form submit event listener with toast message
document.querySelector(".btn").addEventListener("click", (e) => {
  e.preventDefault();

  // Get values from the inputs
  const websiteValue = website.value.trim();
  const usernameValue = username.value.trim();
  const passwordValue = password.value.trim();

  // Validation checks
  if (!websiteValue || !usernameValue || !passwordValue) {
    showToast("All fields are required!");
    return; // Exit if any field is empty
  }

  // Optional: Check if the website format is valid (simple regex for demonstration)
  const urlPattern = /^(https?:\/\/)?([a-z0-9]+\.)?[a-z0-9]+\.[a-z]{2,}$/;
  if (!urlPattern.test(websiteValue)) {
    showToast("Please enter a valid website URL!");
    return;
  }

  let passwords = localStorage.getItem("passwords");
  let json = passwords ? JSON.parse(passwords) : [];
  json.push({
    website: websiteValue,
    username: usernameValue,
    password: passwordValue,
  });
  localStorage.setItem("passwords", JSON.stringify(json));
  showToast("Password Saved Successfully");
  showPasswords();
});

window.onload = showPasswords;
