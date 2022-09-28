
  import { deleteShow, getLikesByShowId, getMyLikeByShowId, getShowById, likeShow } from "../api/shows.js";
import { html } from "../lib.js";
  import { getUserData } from "../util.js";
  
  const detailsTemplate = (
    show,
    isOwner,
    onDelete,
    likes,
    showLikeBtn,onLike
  ) => html`
  <section id="detailsPage">
            <div id="detailsBox">
                <div class="detailsInfo">
                    <h1>Title: ${show.title}</h1>
                    <div>
                        <img src=${show.imageUrl} />
                    </div>
                </div>

                <div class="details">
                    <h3>Theater Description</h3>
                    <p>${show.description}</p>
                    <h4>Date: ${show.date}</h4>
                    <h4>Author: ${show.author}</h4>
                    <div class="buttons">
                        ${isOwner ? html`<a class="btn-delete" href="javascript:void(0)" @click=${onDelete}>Delete</a>
                        <a class="btn-edit" href="/edit/${show._id}">Edit</a>`:""}
                        ${showLikeBtn ? html `<a class="btn-like" href="javascript:void(0)" @click=${onLike} >Like</a>`:""}
                    </div>
                    <p class="likes">Likes: ${likes}</p>
                </div>
            </div>
        </section>`;
  
  export async function detailsView(ctx) {
    const userData = getUserData();
    
    const [show, likes, hasLike] = await Promise.all([
      getShowById(ctx.params.id),
      getLikesByShowId(ctx.params.id),
      userData ? getMyLikeByShowId(ctx.params.id, userData.id) : 0,
    ]);
  
    const isOwner = userData?.id == show._ownerId;
  
    const showLikeBtn = userData != null && isOwner == false && hasLike == false;
  
    ctx.render(detailsTemplate(show, isOwner, onDelete, likes, showLikeBtn,onLike));
  
    async function onDelete() {
          const choice = confirm("Are you sure you want to delete this show?");
  
      if (choice) {
        await deleteShow(ctx.params.id);
        ctx.page.redirect("/profile");
      }
    }
    async function onLike(){
    ctx.page.redirect("/show/"+ctx.params.id)
  await likeShow(ctx.params.id);
  
  
    }
  }
  