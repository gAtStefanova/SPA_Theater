import { getShowByUser } from "../api/shows.js";
import { html } from "../lib.js";
import { getUserData } from "../util.js";

const profileTemplate = (shows,userData) => html`
<section id="profilePage">
            <div class="userInfo">
                <div class="avatar">
                    <img src="./images/profilePic.png">
                </div>
                <h2>${userData.email}</h2>
            </div>
            <div class="board">
                <!--If there are event-->
                ${shows.length==0 ? html`<div class="no-events">
                    <p>This user has no events yet!</p>
                </div>`: shows.map(showCard)}

                <!--If there are no event-->
                
            </div>
        </section>`;


const showCard=(show)=>html `
<div class="eventBoard">
                    <div class="event-info">
                        <img src=${show.imageUrl}>
                        <h2>${show.title}</h2>
                        <h6>${show.date}</h6>
                        <a href="/show/${show._id}" class="details-button">Details</a>
                    </div>
                </div>`
export async function profileView(ctx) {
    const userData=getUserData();

    const shows=await getShowByUser(userData.id)
  ctx.render(profileTemplate(shows,userData));
}
