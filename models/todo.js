class Todo{
    constructor(todoId, userId, title, description, completed, createdAt, updatedAt) {
        this.todoId = todoId;
        this.userId = userId;
        this.title = title;
        this.description = description;
        this.completed = completed;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}

module.exports=Todo