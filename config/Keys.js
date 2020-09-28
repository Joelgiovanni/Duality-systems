const secretTokenKey = process.env.SECRET || "QuickBrownFoxAndQickDevCollab1";
const URI =
  process.env.MONGODB_URI ||
  "mongodb://joelg4:dbpass1234@ds035167.mlab.com:35167/duality_444";

module.exports = {
  URI,
  secretTokenKey
};
