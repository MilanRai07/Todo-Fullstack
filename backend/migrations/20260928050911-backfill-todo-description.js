
export const up = async (db, client) => {
    const todos = db.collection("todos")
    await todos.updateMany(
        { description: { $exists: false } },
        {
            $set: {
                description: ""
            }
        }
    )
};


export const down = async (db, client) => {

};
