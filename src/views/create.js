import { createShow } from "../api/shows.js";
import { html } from "../lib.js";

const createTemplate = (onSubmit) => html`
<section id="createPage">
            <form @submit=${onSubmit} class="create-form">
                <h1>Create Theater</h1>
                <div>
                    <label for="title">Title:</label>
                    <input id="title" name="title" type="text" placeholder="Theater name" value="">
                </div>
                <div>
                    <label for="date">Date:</label>
                    <input id="date" name="date" type="text" placeholder="Month Day, Year">
                </div>
                <div>
                    <label for="author">Author:</label>
                    <input id="author" name="author" type="text" placeholder="Author">
                </div>
                <div>
                    <label for="description">Description:</label>
                    <textarea id="description" name="description" placeholder="Description"></textarea>
                </div>
                <div>
                    <label for="imageUrl">Image url:</label>
                    <input id="imageUrl" name="imageUrl" type="text" placeholder="Image Url" value="">
                </div>
                <button class="btn" type="submit">Submit</button>
            </form>
        </section>`;

export async function createView(ctx) {
  
  ctx.render(createTemplate(onSubmit));

  async function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const show = {
      title:formData.get('title'),
      date:formData.get('date'),
      author:formData.get('author'),
      description:formData.get('description'),
      imageUrl:formData.get('imageUrl'),
    }
    
    if (show.title == "" || show.date == "" || show.author == "" ||show.imageUrl == "" ||show.description == "") {
      return alert("All field are required!");
    }
await createShow(show)
    event.target.reset();
    ctx.page.redirect("/");
  }
}
