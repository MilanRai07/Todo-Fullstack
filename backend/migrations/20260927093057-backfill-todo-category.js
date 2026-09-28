
//to add category (ROLL UP)
export const up = async (db, client) => {
    const categories = db.collection("categories");
    const todos = db.collection("todos");

    let defaultCategories = await categories.findOne({ title: "Uncategorized" });
    if (!defaultCategories) {
        const result = await categories.insertOne({ title: "Uncategorized" });
        defaultCategories = { _id: result.insertedId };
    }
    await todos.updateMany(
        { category: { $exists: false } },
        { $set: { category: defaultCategories._id } }
    )
};

//to ROll BACK
export const down = async (db, client) => {
    const categories = db.collection("categories");
    const todos = db.collection("todos");

    let uncategorized = await categories.findOne({ title: "Uncategorized" });
    if (uncategorized) {
        await todos.updateMany(
            { category: uncategorized._id },
            { $unset: { category: "" } }
        )
    }
};
