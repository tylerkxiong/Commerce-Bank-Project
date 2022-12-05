export interface Roles{
    subscriber?: boolean;
    admin?: boolean;
}


export class User {
    first_name : string;
    last_name : string;
    email : string;
    password? : string;
    roles ?: Roles
    

    // constructor(authData){
    //     this.first_name = authData.first_name;
    //     this.last_name = authData.last_name;
    //     this.uid = authData.uid;
    //     this.email = authData.email;
    //     this.password = authData.password;
    //     this.roles = { 'subscriber' : true};
    // }

}
