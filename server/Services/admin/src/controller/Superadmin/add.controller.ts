import { apiError, asyncHandler, apiResponse , UserModel } from "@packages";


const addSuperadmin = asyncHandler(async (req:any, res:any) => {
    const { email, password } = req.body;

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
        return apiError(res, 400, "User with this email already exists");
    }

    const superadmin = new UserModel({ email, password, role: "superadmin" });
    await superadmin.save();

    return apiResponse(res, 201, true, "Superadmin created successfully", { id: superadmin._id });
})

const addAdmin = asyncHandler(async (req:any, res:any) => {
    const { email, password } = req.body;

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
        return apiError(res, 400, "User with this email already exists");
    }

    const superadmin = new UserModel({ email, password, role: "admin" });
    await superadmin.save();

    return apiResponse(res, 201, true, "Admin created successfully", { id: superadmin._id });
})

const deleteAdmin = asyncHandler(async (req:any, res:any) => {
    const { id } = req.params;

    const admin = await UserModel.findById(id);

    if (!admin || admin.role !== "admin") {
        return apiError(res, 404, "Admin not found");
    }

    await UserModel.findByIdAndDelete(id);

    return apiResponse(res, 200, true, "Admin deleted successfully");
})

const deleteSuperadmin = asyncHandler(async (req:any, res:any) => {
    const { id } = req.params;

    const superadmin = await UserModel.findById(id);

    if (!superadmin || superadmin.role !== "superadmin") {
        return apiError(res, 404, "Superadmin not found");
    }

    await UserModel.findByIdAndDelete(id);

    return apiResponse(res, 200, true, "Superadmin deleted successfully");
})  

const deleteUser = asyncHandler(async (req:any, res:any) => {
    const { id } = req.body;
    
    const user = await UserModel.findById(id);

    if (!user) {
        return apiError(res, 404, "User not found");
    }

    await UserModel.findByIdAndDelete(id);

    return apiResponse(res, 200, true, "User deleted successfully");
})



export default { addSuperadmin, addAdmin, deleteAdmin, deleteSuperadmin, deleteUser, };   