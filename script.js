const nav2 = document.querySelector(".nav-2");
const mobmenu = document.querySelector(".mob_menu");
const openmenu = document.querySelector(".menu-btn");
const closemenu = document.querySelector(".close-btn");

const navOpen = () => {
  nav2.classList.add("show");
  mobmenu.classList.add("active");
  document.body.style =
    "visibility : visible; height : 100vh; width : 100%; overflow : hidden";
};

const navClose = () => {
  nav2.classList.remove("show");
  mobmenu.classList.remove("active");
  document.body.style =
    "visibility : visible; height :  initial; width : 100%; overflow-x : hidden";
};

openmenu.addEventListener("click", navOpen);
closemenu.addEventListener("click", navClose);

// form submiting
var form = document.getElementById("my-form");

async function handleSubmit(event) {
  event.preventDefault();
  var status = document.getElementById("status");
  var data = new FormData(event.target);
  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        status.classList.add("status");
        status.innerHTML = "Thanks! I'll contact you later";
        form.reset();
      } else {
        response.json().then((data) => {
          if (Object.hasOwn(data, "errors")) {
            status.innerHTML = data["errors"]
              .map((error) => error["message"])
              .join(", ");
          } else {
            status.classList.add("error");
            status.innerHTML = "Oops! There was a problem submitting your form";
          }
        });
      }
    })
    .catch((error) => {
      status.innerHTML = "Oops! There was a problem submitting your form";
    });
}
form.addEventListener("submit", handleSubmit);
