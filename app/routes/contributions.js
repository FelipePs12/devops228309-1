const ContributionsDAO = require("../data/contributions-dao").ContributionsDAO;
const { environmentalScripts } = require("../../config/config");

function ContributionsHandler(db) {
    "use strict";

    const contributionsDAO = new ContributionsDAO(db);

    this.displayContributions = (req, res, next) => {
        const { userId } = req.session;

        contributionsDAO.getByUserId(userId, (error, contrib) => {
            if (error) return next(error);

            contrib.userId = userId; // Definir para itens do menu de navegação
            return res.render("contributions", {
                ...contrib,
                environmentalScripts
            });
        });
    };

    this.handleContributionsUpdate = (req, res, next) => {
        const {
            preTax: rawPreTax,
            afterTax: rawAfterTax,
            roth: rawRoth
        } = req.body;

        // Evitar o uso de eval() e realizar a conversão de string para número de forma segura
        const preTax = parseInt(rawPreTax, 10);
        const afterTax = parseInt(rawAfterTax, 10);
        const roth = parseInt(rawRoth, 10);

        // Validar se os valores são números válidos
        const validations = [isNaN(preTax), isNaN(afterTax), isNaN(roth), preTax < 0, afterTax < 0, roth < 0];
        const isInvalid = validations.some(validation => validation);

        if (isInvalid || preTax + afterTax + roth > 30) {
            return res.render("contributions", {
                updateError: "Invalid contribution percentages",
                userId: req.session.userId,
                environmentalScripts
            });
        }

        contributionsDAO.update(req.session.userId, preTax, afterTax, roth, (err, contributions) => {
            if (err) return next(err);

            contributions.updateSuccess = true;
            return res.render("contributions", {
                ...contributions,
                environmentalScripts
            });
        });
    };
}

module.exports = ContributionsHandler;