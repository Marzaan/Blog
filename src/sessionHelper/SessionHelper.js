class SessionHelper {
    static setUsername(name){
        return sessionStorage.setItem("name",name);
    }
    static getUsername(){
        return sessionStorage.getItem("name");
    }
    static removeUsername(){
        return sessionStorage.removeItem("name");
    }
}
export default SessionHelper;