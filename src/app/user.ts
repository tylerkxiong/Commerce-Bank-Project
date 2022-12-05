export interface Roles{
    subscriber?: boolean;
    admin?: boolean;
}


export class User{
    
    email:string;
    password:string;
    roles:Roles
    uid:string;
    constructor(authData){
        this.uid = authData.uid;
        this.email = authData.email;
        this.password = authData.password;
        this.roles = { 'subscriber' : true};
    }
}