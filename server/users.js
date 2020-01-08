class Users { 
    constructor() {
        this.users = []
    }

    add(user){
        this.users.push(user)
    }

    get(id){
        return this.users.find(user => user.id === id)
    }

    remove(id){
        const user = this.get(id)

        if(user){
            this.users = this.users.filter(user => user.id !== id)
        }

        return user
    }

    getAllUsersInRoom(room){
        const usersInRoom = this.users.filter(user => user.room === room); 
        console.log('getAllUsersInRoom: ' + JSON.stringify(usersInRoom, null, 4));
        return usersInRoom
    }
}

module.exports = function() {
    return new Users()
}