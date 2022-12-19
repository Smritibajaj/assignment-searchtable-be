const mongoose = require("mongoose");
const Companies = mongoose.model("company");

exports.create = async (companies) => {
  console.log(companies);
  const newCompany = await Companies.create(companies);
  return newCompany;
};
exports.readAll = async () => {
  const companies = await Companies.find().lean();
  console.log(companies);
  return companies;
};
exports.readByKey = async (query, sortBy, page, limit) => {
  console.log("coming", query, page, sortBy, limit);
  const companies = await Companies.find(query)
    .skip(page * limit)
    .limit(limit)
    .sort(sortBy ?? "_id")
    .lean();
  return companies;
};

exports.readOneByKey = async (query, select = [], populate = []) => {
  const companies = await Companies.findOne(query)
    .populate(populate)
    .select(select)
    .lean();
  return companies;
};

exports.readSelectedByKey = async (query, select = [], populate = []) => {
  const companies = await Companies.find(query)
    .populate(populate)
    .select(select)
    .lean();
  console.log("in model");
  return companies;
};

exports.update = async (query, condition, options = { new: false }) => {
  console.log(query, "in model");
  const updatedCompany = await Companies.findOneAndUpdate(
    query,
    condition,
    options
  ).lean();
  console.log(updatedCompany, "in model");
  return updatedCompany;
};

exports.delete = async (query) => {
  console.log(query, "in model");
  const deleteCompany = await Companies.findOneAndDelete(query);
  console.log(deleteCompany, "in model");
  return deleteCompany;
};
