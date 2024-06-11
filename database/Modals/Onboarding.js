export function createUser(data) {
    return new Promise((resolve, reject) => {
        const user = new User(data);
        user
            .save()
            .then((result) => {
                resolve(result);
            })
            .catch((err) => {
                reject(err);
            });
    });
}