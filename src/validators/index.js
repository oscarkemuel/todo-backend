createTaskValidator = (body) => {
    const { name, description, tag } = body;
    if(!name) throw new Error("Name is required");
    if(!description) throw new Error("Description is required");
    if(!tag) throw new Error("Tag is required");
    return body;
}


userCreationValidator = (body) => {
   const { name, email, password } = body;
   if(!email) throw new Error("Email is required");
   if(!password) throw new Error("Password is required");
   if(!name) throw new Error("Name is required");
   return body;
}


userLoginValidator = (body) => {
    const { email, password } = body;
    if(!email) throw new Error("Email is required");
    if(!password) throw new Error("Password is required");
    return body;
 }

module.exports = {
    createTaskValidator,
    userLoginValidator,
    userCreationValidator 
}