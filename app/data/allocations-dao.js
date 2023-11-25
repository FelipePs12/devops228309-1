const UserDAO = require("./user-dao").UserDAO;

const AllocationsDAO = function(db) {
    "use strict";

    if (!(this instanceof AllocationsDAO)) {
        console.log("Warning: AllocationsDAO constructor called without 'new' operator");
        return new AllocationsDAO(db);
    }

    const allocationsCol = db.collection("allocations");
    const userDAO = new UserDAO(db);

    this.update = (userId, stocks, funds, bonds, callback) => {
        const parsedUserId = parseInt(userId);

        if (isNaN(parsedUserId)) {
            return callback("Invalid userId", null);
        }

        const allocations = {
            userId: parsedUserId,
            stocks: stocks,
            funds: funds,
            bonds: bonds
        };

        allocationsCol.update(
            { userId: parsedUserId },
            allocations,
            { upsert: true },
            (err) => {
                if (!err) {
                    console.log("Updated allocations");

                    userDAO.getUserById(userId, (err, user) => {
                        if (err) {
                            return callback(err, null);
                        }

                        allocations.userId = userId;
                        allocations.userName = user.userName;
                        allocations.firstName = user.firstName;
                        allocations.lastName = user.lastName;

                        callback(null, allocations);
                    });
                } else {
                    callback(err, null);
                }
            }
        );
    };

    this.getByUserIdAndThreshold = (userId, threshold, callback) => {
        const parsedUserId = parseInt(userId);

        if (isNaN(parsedUserId)) {
            return callback("Invalid userId", null);
        }

        const searchCriteria = () => {
            if (threshold) {
                const parsedThreshold = parseFloat(threshold);
                if (!isNaN(parsedThreshold) && parsedThreshold >= 0 && parsedThreshold <= 99) {
                    return {
                        userId: parsedUserId,
                        stocks: { $gt: parsedThreshold }
                    };
                }
            }
            return { userId: parsedUserId };
        };

        allocationsCol.find(searchCriteria()).toArray((err, allocations) => {
            if (err) {
                return callback(err, null);
            }
            if (!allocations.length) {
                return callback("ERROR: No allocations found for the user", null);
            }

            Promise.all(allocations.map(alloc =>
                new Promise((resolve, reject) => {
                    userDAO.getUserById(alloc.userId, (err, user) => {
                        if (err) {
                            reject(err);
                        } else {
                            alloc.userName = user.userName;
                            alloc.firstName = user.firstName;
                            alloc.lastName = user.lastName;
                            resolve(alloc);
                        }
                    });
                })
            ))
            .then(userAllocations => {
                callback(null, userAllocations);
            })
            .catch(err => {
                callback(err, null);
            });
        });
    };
};

module.exports.AllocationsDAO = AllocationsDAO;