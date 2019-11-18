exports.handleDisallowedMethod = (req, res, next) => {
  res.status(405).json({ msg: "Method not allowed" });
};
