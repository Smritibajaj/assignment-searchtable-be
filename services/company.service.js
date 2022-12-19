const { CompanyModel } = require("../models");
const CompanyService = {
  getCompanyById: async (query, toSelect, toPopulate) => {
    const company = await CompanyModel.readOneByKey(
      query,
      toSelect,
      toPopulate
    );
    return company;
  },
  getAllCompanieswithoutQuery: async () => {
    const companies = await CompanyModel.readAll();
    return companies;
  },
  getAllCompanies: async (query) => {
    const sortBy = query.sortBy ?? null;
    const page = query.page ?? 0;
    const limit = query.limit ?? 10;
    const companies = await CompanyModel.readByKey(query, sortBy, page, limit);
    return companies;
  },
  getAllUserSelectedCompanies: async (user) => {
    const $toSelect = ["title description"];
    console.log("coming here in service");
    const companies = await CompanyModel.readSelectedByKey({
      owner: user._id,
    });
    return companies;
  },
  createCompany: async (company) => {
    return CompanyModel.create(company);
  },
  updateCompany: async (query, condition) => {
    console.log(query, condition, "in service");
    const update = await CompanyModel.update(query, condition, { new: true });
    console.log(update);
    return update;
  },
  deleteCompany: async (query) => {
    console.log(query, "in service");
    const deleteCompany = await CompanyModel.delete(query);
    console.log(deleteCompany);
    return deleteCompany;
  },
};

module.exports = CompanyService;
