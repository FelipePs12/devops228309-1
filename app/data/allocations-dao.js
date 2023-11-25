const UserDAO = require("./user-dao").UserDAO;
const fs = require('fs');

function ContributionsDAO(db) {
    "use strict";

    if (!(this instanceof ContributionsDAO)) {
        throw new Error("ContributionsDAO constructor called without 'new' operator");
    }

    const contributionsDB = db.collection("contributions");
    const userDAO = new UserDAO(db);

    const validateUserId = (userId) => {
        const parsedUserId = parseInt(userId, 10);

        if (isNaN(parsedUserId) || userId.includes(' ')) {
            throw new Error("Invalid userId");
        }

        return parsedUserId;
    };

    const update = (userId, preTax, afterTax, roth, callback) => {
        const parsedUserId = validateUserId(userId);

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

    const getByUserId = (userId, callback) => {
        const parsedUserId = validateUserId(userId);

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

    const listFilesSafely = (directoryPath) => {
        // Verificar se o directoryPath é seguro, por exemplo, utilizando uma lista branca (whitelist)
        const allowedDirectories = ['/path/to/allowed_directory'];

        if (!allowedDirectories.includes(directoryPath)) {
            throw new Error("Operação não permitida.");
        }

        try {
            // Listar os arquivos do diretório de forma segura
            const files = fs.readdirSync(directoryPath);
            return files.toString();
        } catch (error) {
            console.error("Erro ao listar os arquivos:", error);
            throw new Error("Erro ao listar os arquivos.");
        }
    };

    return {
        update,
        getByUserId,
        listFilesSafely
    };
}

module.exports = { ContributionsDAO };