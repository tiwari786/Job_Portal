import Company from "../models/companyModel.js";

export const companyRegister = async (req, res) => {
    try {
        const { companyName } = req.body;

        if (!companyName) {
            return res.status(400).json({
                message: "Company name required",
                success: false,
            });
        }

        // 🔍 Check if company already exists globally
        const existingCompany = await Company.findOne({ companyName:companyName });
        if (existingCompany) {
            return res.status(400).json({
                message: "This company name is already registered by another user",
                success: false,
            });
        }

        // ✅ Allow this user to create a new company with a new name
        const company = await Company.create({
            companyName:companyName,
            userId: req.id,
        });

        return res.status(201).json({
            message: "Company registered successfully",
            company,
            success: true,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error in company register",
            success: false,
        });
    }
};



export const getCompany = async (req, res) => {
    try {
        const userId = req.id; //logged in user id
        const companies = await Company.find({ userId });

        if (!companies) {
            return res.status(404).json({
                message: "Comapanies not found",
                success: false
            })
        }

        return res.status(200).json({
            message: "Find Companies",
            companies,
            success: true
        })

    } catch (error) {
        return res.status(500).json({
            message: "Error in get company",
            success: false
        })
    }
}

export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId)
        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false
            })
        }

        return res.status(200).json({
            company,
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: "Not found by id",
            success: false
        })
    }
}


export const updateCompany = async (req, res) => {
    try {

        const { companyName, description, website, location } = req.body;
        const file = req.file;

        //clodinary aayega

        const updateData = { companyName, description, website, location };
        const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false
            })
        }

        return res.status(200).json({
            message: "Company information updated",
            success: true
        })

    } catch (error) {
        return res.status(500).json({
            message: "Error in updating company",
            success: false
        })
    }
}