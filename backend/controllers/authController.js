import authService from "../services/authService.js";

const register = async (req, res) => {
  let new_req_body = { ...req.body, image: req.file.path };
  // req.body.image = req.file.path
  let result = await authService.register(new_req_body);
  return res.json({ result: result });
};

const login = async (req, res) => {
  let result = await authService.login(req.body);
  return res.json({ result: result });
};

const getAllUsers = async (req, res) => {
  let result = await authService.getAllUsers();
  return res.json(result);
};

const deleteUser = async (req, res) => {
  let result = await authService.deleteUser(req.params.id);
  return res.json(result);
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.body._id;

    const { full_name, email, address } = req.body;

    const updateData = {
      full_name,
      email,
      address,
    };

    // if image uploaded
    if (req.file) {
      updateData.image = "uploads/" + req.file.filename;
    }
    if (req.body.password) {
      updateData.password = req.body.password;
    }

    const updatedUser = await authService.updateUserProfile(userId, updateData);

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const sendResetCode = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email required" });
  }

  let result = await authService.sendResetCodeService(email);

  res.json(result);
};

const verifyResetCode = (req, res) => {
  const { email, code } = req.body;

  const isValid = authService.verifyResetCodeService(email, code);

  if (!isValid) {
    return res.json({ status: false, msg: "code incorrecte" });
  }

  res.json({ status: true, msg: "Code verified" });
};

const resetPassword = async (req, res) => {
  const { email, code, newPassword } = req.body;

  const success = await authService.resetPasswordService(
    email,
    code,
    newPassword,
  );

  if (!success) {
    return res.json({ status: false, msg: "error" });
  }

  res.json({ status: true, msg: "Password reset successful" });
};

export default {
  register,
  login,
  getAllUsers,
  deleteUser,
  updateProfile,
  sendResetCode,
  verifyResetCode,
  resetPassword,
};
