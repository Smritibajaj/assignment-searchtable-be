const { query } = require("express");
const httpStatus = require("http-status-codes");
const { CompanyService } = require("../services/index");

const CompanyController = {
    createCompany: async (req, res) => {
        try {
            const { user, body } = req;
            const company = await CompanyService.createCompany({...body, owner: user._id});
            return res.status(httpStatus.OK).json({
                status: httpStatus.OK,
                response: company,
              });
        } catch(error) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                status: httpStatus.INTERNAL_SERVER_ERROR,
                response: httpStatus.getStatusText(httpStatus.INTERNAL_SERVER_ERROR)
            })
        }
    },
    getCompany: async(req, res) => {
        console.log('this is working');
        try {
            console.log('its coming here', req.user)
            const { user } = req;
            const query = {_id: req.params.id, owner: user._id}
            const companies = await CompanyService.getCompanyById(query);
            return res.status(httpStatus.OK).json({
                status: httpStatus.OK,
                response: companies
            })
        } catch(error) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                status: httpStatus.INTERNAL_SERVER_ERROR,
                response: httpStatus.getStatusText(httpStatus.INTERNAL_SERVER_ERROR)
            })
        }
    }, 
    getAllUserSelectedCompanies: async(req, res) => {
        console.log('this is working');
        try {
            console.log('its coming here', req.user)
            const { user } = req;
            const companies = await CompanyService.getAllUserSelectedCompanies(user);
            return res.status(httpStatus.OK).json({
                status: httpStatus.OK,
                response: companies
            })
        } catch(error) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                status: httpStatus.INTERNAL_SERVER_ERROR,
                response: httpStatus.getStatusText(httpStatus.INTERNAL_SERVER_ERROR)
            })
        }
    }, 
    getAllCompanies: async(req, res) => {
        console.log('this is working');
        try {
            console.log('its coming here', req.query);
            const total = await CompanyService.getAllCompanieswithoutQuery();
            const companies = await CompanyService.getAllCompanies(req.query);
            return res.status(httpStatus.OK).json({
                status: httpStatus.OK,
                response: companies,
                meta: {page: req.query.page ?? 0, limit: req.query.limit ?? 10, total: total.length}
            })
        } catch(error) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                status: httpStatus.INTERNAL_SERVER_ERROR,
                response: httpStatus.getStatusText(httpStatus.INTERNAL_SERVER_ERROR)
            })
        }
    }, 
    updateCompany: async(req,res) => {
        try {
            const { body: { query, condition } } = req;
            console.log(query, condition);
            const response = await CompanyService.updateCompany(query, condition);
            console.log(response, 'hahhah');
            return res.status(httpStatus.OK).json({
                status: httpStatus.OK,
                response: response
            })
        } catch(error) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                status: httpStatus.INTERNAL_SERVER_ERROR,
                response: httpStatus.getStatusText(httpStatus.INTERNAL_SERVER_ERROR)
            })
        } 
    },
    deleteCompany: async(req,res) => {
        try {
            const _id = req.params.id;
            const { user  } = req;
            const response = await CompanyService.deleteCompany({_id, owner: user._id});
            console.log(response, 'hahhah');
            return res.status(httpStatus.OK).json({
                status: httpStatus.OK,
                response: response
            })
        } catch(error) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                status: httpStatus.INTERNAL_SERVER_ERROR,
                response: httpStatus.getStatusText(httpStatus.INTERNAL_SERVER_ERROR)
            })
        } 
    }
};
module.exports = CompanyController;
