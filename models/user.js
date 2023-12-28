class User {
    constructor(userID, email,name,createdAt, updatedAt){
        this.userID=userID
        this.name=name
        this.email=email
        this.createdAt=createdAt
        this.updatedAt=updatedAt
    }
}

module.exports=User