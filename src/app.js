import { logout } from "./api/users.js";
import { page, render } from "./lib.js";
import { getUserData } from "./util.js";
import { createView } from "./views/create.js";
import { detailsView } from "./views/details.js";
import { editView } from "./views/edit.js";
import { homeView } from "./views/home.js";
import { loginView } from "./views/login.js";
import { profileView } from "./views/profile.js";
import { registerView } from "./views/register.js";


const main = document.querySelector("main");

document.getElementById('logoutBtn').addEventListener('click',onLogout)

page(decorateContext);
page("/",homeView );
page("/show/:id",detailsView);
page("/edit/:id",editView );
page("/login",loginView);
page("/register", registerView);
page("/profile", profileView);
page("/create", createView);

updateNav()
page.start();

function decorateContext(ctx, next) {
  ctx.render = renderMain;
ctx.updateNav=updateNav;
ctx.user = getUserData();
next();
}
function renderMain(templateResult) {
  render(templateResult, main);
}

function updateNav() {
  const userData = getUserData();
  if (userData) {
    Array.from(document.getElementsByClassName("user")).map(e=>e.style.display = "inline");
   Array.from(document.getElementsByClassName("guest")).map(e=>e.style.display = "none")
  } else {
    Array.from(document.getElementsByClassName("user")).map(e=>e.style.display = "none");
    Array.from(document.getElementsByClassName("guest")).map(e=>e.style.display = "inline")
  }
}

function onLogout(){
logout();
updateNav();
page.redirect('/')
}