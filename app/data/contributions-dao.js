const UserDAO = require("./user-dao").UserDAO;

function ContributionsDAO(db) {
    "use strict";

    if (!(this instanceof ContributionsDAO)) {
        console.log("Warning: ContributionsDAO constructor called without 'new' operator");
        return new ContributionsDAO(db);
    }

    const contributionsDB = db.collection("contributions");
    const userDAO = new UserDAO(db);

    this.update = (userId, preTax, afterTax, roth, callback) => {
        const parsedUserId = parseInt(userId);

        if (isNaN(parsedUserId) || userId.includes(' ')) {
            return callback("Invalid userId", null);
        }

        const contributions = {
            userId: parsedUserId,
            preTax: preTax,
            afterTax: afterTax,
            roth: roth
        };

        contributionsDB.update(
            { userId: parsedUserId },
            contributions,
            { upsert: true },
            (err) => {
                if (err) {
                    return callback(err, null);
                }

                console.log("Updated contributions");

                userDAO.getUserById(parsedUserId, (err, user) => {
                    if (err) {
                        return callback(err, null);
                    }

                    contributions.userName = user.userName;
                    contributions.firstName = user.firstName;
                    contributions.lastName = user.lastName;

                    return callback(null, contributions);
                });
            }
        );
    };

    this.getByUserId = (userId, callback) => {
        const parsedUserId = parseInt(userId);

        if (isNaN(parsedUserId) || userId.includes(' ')) {
            return callback("Invalid userId", null);
        }

        contributionsDB.findOne(
            { userId: parsedUserId },
            (err, contributions) => {
                if (err) {
                    return callback(err, null);
                }

                // Set default contributions if not set
                contributions = contributions || {
                    preTax: 2,
                    afterTax: 2,
                    roth: 2
                };

                userDAO.getUserById(parsedUserId, (err, user) => {
                    if (err) {
                        return callback(err, null);
                    }

                    contributions.userName = user.userName;
                    contributions.firstName = user.firstName;
                    contributions.lastName = user.lastName;

                    return callback(null, contributions);
                });
            }
        );
    };

    this.listFiles = () => {
        return "Operação não permitida.";
    };
}

module.exports = { ContributionsDAO };