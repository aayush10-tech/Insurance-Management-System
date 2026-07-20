export const getProfile = (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Profile fetched successfully",
    user: req.user,
  });
};