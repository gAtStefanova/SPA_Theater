import { register } from "../api/users.js";
import { html } from "../lib.js";

const registerTemplate = (onSubmit) => html`
<section id="registerPage">
            <form @submit=${onSubmit} class="registerForm">
                <h2>Register</h2>
                <div class="on-dark">
                    <label for="email">Email:</label>
                    <input id="email" name="email" type="text" placeholder="steven@abv.bg" value="">
                </div>

                <div class="on-dark">
                    <label for="password">Password:</label>
                    <input id="password" name="password" type="password" placeholder="********" value="">
                </div>

                <div class="on-dark">
                    <label for="repeatPassword">Repeat Password:</label>
                    <input id="repeatPassword" name="repeatPassword" type="password" placeholder="********" value="">
                </div>

                <button class="btn" type="submit">Register</button>

                <p class="field">
                    <span>If you have profile click <a href="/login">here</a></span>
                </p>
            </form>
        </section>`;

export async function registerView(ctx) {
  ctx.render(registerTemplate(onSubmit));

  async function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const email = formData.get("email").trim();
    const password = formData.get("password").trim();
    const repass = formData.get("repeatPassword").trim();

    if (email == "" || password == "") {
      return alert("All field are required!");
    }

    if (password != repass) {
     return alert("Passowrds do not match!");
    }
    await register(email, password);
    ctx.updateNav();
    ctx.page.redirect("/");
  }
}