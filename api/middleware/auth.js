const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    return res.status(401).json({ msg: "Token yok, yetkilendirme reddedildi" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ msg: "Token yok, yetkilendirme reddedildi" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user; // Kullanıcı bilgisini isteğe ekle
    next();
  } catch (err) {
    res.status(401).json({ msg: "Geçersiz token" });
  }
};
