const router = require("express").Router({
  caseSensitive: true,
  strict: true,
});
const { addNewCompany, checkIsValidBody, sanitizeBody } = require("../validators/company.validator");
const { checkError } = require("../helper/validation");
const { CompanyController } = require("../controllers/index");

router.route("/create").post(addNewCompany, checkError, CompanyController.createCompany);

router.route("/allcompanies").get(CompanyController.getAllCompanies);
router.route("/usercompanies").get(CompanyController.getAllUserSelectedCompanies);

router.route("/company/:id").get(CompanyController.getCompany);

router.route("/update/:id").put(
  checkIsValidBody,
  sanitizeBody,
  (req, res, next) => {
    const _id = req.params.id;
    console.log('_id',_id);
    const { body } = req;
    req.body = {
      query: {
        _id: _id,
      },
      condition: {
        $set: body,
      },
    };
    next();
  },
  CompanyController.updateCompany
);
router.route("/delete/:id").delete(CompanyController.deleteCompany);

module.exports = router;
