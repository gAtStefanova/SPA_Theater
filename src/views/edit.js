import { getShowById, updateShow } from "../api/shows.js";
import { html } from "../lib.js";

const editTemplate = (show,onSubmit) => html`
<section id="editPage">
            <form @submit=${onSubmit} class="theater-form">
                <h1>Edit Theater</h1>
                <div>
                    <label for="title">Title:</label>
                    <input id="title" name="title" type="text" placeholder="Theater name" .value=${show.title}>
                </div>
                <div>
                    <label for="date">Date:</label>
                    <input id="date" name="date" type="text" placeholder="Month Day, Year" .value=${show.date}>
                </div>
                <div>
                    <label for="author">Author:</label>
                    <input id="author" name="author" type="text" placeholder="Author"
                    .value=${show.author}>
                </div>
                <div>
                    <label for="description">Theater Description:</label>
                    <textarea id="description" name="description"
                        placeholder="Description" .value=${show.description}></textarea>
                </div>
                <div>
                    <label for="imageUrl">Image url:</label>
                    <input id="imageUrl" name="imageUrl" type="text" placeholder="Image Url"
                    .value=${show.imageUrl}>
                </div>
                <button class="btn" type="submit">Submit</button>
            </form>
        </section>`;

export async function editView(ctx) {
    const show =await getShowById(ctx.params.id)

  ctx.render(editTemplate(show,onSubmit));

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
await updateShow(ctx.params.id,show)
    
    event.target.reset();
    ctx.page.redirect("/show/"+ctx.params.id);
  }
}
