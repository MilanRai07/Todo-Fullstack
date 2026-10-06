export const up = async (db) => {
    const categories = db.collection("categories");
    const todos = db.collection("todos");

    const indexes = await categories.listIndexes().toArray();
    for (const index of indexes) {
        if (index.unique && Object.keys(index.key).length === 1 && index.key.title === 1) {
            await categories.dropIndex(index.name);
        }
    }

    for (const category of await categories.find().toArray()) {
        const userIds = await todos.distinct("userId", {
            category: category._id,
            userId: { $exists: true, $ne: null }
        });

        for (const userId of userIds) {
            let userCategory;
            if (category.userId?.equals?.(userId)) {
                userCategory = category._id;
            } else if (!category.userId) {
                const result = await categories.updateOne(
                    { _id: category._id, userId: { $exists: false } },
                    { $set: { userId } }
                );
                if (result.modifiedCount === 1) {
                    category.userId = userId;
                    userCategory = category._id;
                }
            }

            if (!userCategory) {
                const existing = await categories.findOne({
                    title: category.title,
                    userId
                });
                if (existing) {
                    userCategory = existing._id;
                } else {
                    const { _id, ...categoryFields } = category;
                    const result = await categories.insertOne({
                        ...categoryFields,
                        userId
                    });
                    userCategory = result.insertedId;
                }
            }

            await todos.updateMany(
                { category: category._id, userId },
                { $set: { category: userCategory } }
            );
        }
    }

    await categories.createIndex(
        { userId: 1, title: 1 },
        { unique: true, name: "userId_1_title_1" }
    );
};

export const down = async (db) => {
    const categories = db.collection("categories");
    const todos = db.collection("todos");

    await categories.dropIndex("userId_1_title_1");

    const categoriesByTitle = new Map();
    for (const category of await categories.find().toArray()) {
        const sameTitle = categoriesByTitle.get(category.title) ?? [];
        sameTitle.push(category);
        categoriesByTitle.set(category.title, sameTitle);
    }

    for (const sameTitle of categoriesByTitle.values()) {
        const [canonical, ...duplicates] = sameTitle;
        if (duplicates.length > 0) {
            await todos.updateMany(
                { category: { $in: sameTitle.map(({ _id }) => _id) } },
                { $set: { category: canonical._id } }
            );
            await categories.deleteMany({
                _id: { $in: duplicates.map(({ _id }) => _id) }
            });
        }
    }

    await categories.updateMany({}, { $unset: { userId: "" } });
    await categories.createIndex({ title: 1 }, { unique: true, name: "title_1" });
};
