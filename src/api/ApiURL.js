class ApiURL {
    static baseURL = "http://127.0.0.1:8000/api/";

    static register = this.baseURL + "register";
    static login = this.baseURL + "login";
    static logout = this.baseURL + "logout";

    static posts = this.baseURL + "posts";
    static users = this.baseURL + "users";
    static addPost = this.baseURL + "addPost";

    static search(search){
        return this.baseURL + "search/" + search;
    }
    static profile(username){
        return this.baseURL + "profile/" + username;
    }
    static addComment(pid,name){
        return this.baseURL + "addComment/" + pid + "/" + name;
    }
    static comments(pid){
        return this.baseURL + "comments/" + pid;
    }
    static postInfo(pid){
        return this.baseURL + "postInfo/" + pid;
    }
    static userPosts(name){
        return this.baseURL + "userPosts/" + name;
    }
    static updatePost(pid){
        return this.baseURL + "updatePost/" + pid;
    }
    static deletePost(pid){
        return this.baseURL + "deletePost/" + pid;
    }
}
export default ApiURL;