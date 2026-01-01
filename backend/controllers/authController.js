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

export default { register, login };
