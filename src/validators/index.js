createTaskValidator = (body) => {
    const { name, description, tag } = body;

    if(!name) throw new Error("Name is required");
    if(!description) throw new Error("Description is required");
    if(!tag) throw new Error("Tag is required");

    return body;
}

// Todo
userLoginValidator() = (body) => {
    return body;
}

module.exports = {
    createTaskValidator,
    userLoginValidator
}