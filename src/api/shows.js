import { del, get, post, put } from "./api.js";


export async function getAllShows() {
    return get("/data/theaters?sortBy=_createdOn%20desc&distinct=title");
  }
  export async function createShow(show) {
    return post("/data/theaters", show);
  }
  export async function getShowById(id) {
    return get("/data/theaters/" + id);
  }
  export async function updateShow(id,show){
    return put('/data/theaters/'+id,show)
}
export async function getShowByUser(userId){
    return get(`/data/theaters?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`)
}

export async function deleteShow(id){
    return del('/data/theaters/'+id)
}
export async function likeShow(theaterId){
    return post('/data/likes',{
        theaterId
    })
}
export async function getLikesByShowId(theaterId){
    return get(`/data/likes?where=theaterId%3D%22${theaterId}%22&distinct=_ownerId&count`)
}

export async function getMyLikeByShowId(theaterId,userId){
    return get(`/data/likes?where=theaterId%3D%22${theaterId}%22%20and%20_ownerId%3D%22${userId}%22&count`)
}
/*











export async function searchBooks(query){
return get('/data/books?where='+ encodeURIComponent(`title LIKE "${query}"`))
}
window.getMyLikeByBookId=getMyLikeByBookId
*/