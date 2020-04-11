module.exports = {
  CORE: {
    NODE_ENV: process.env.NODE_ENV || "development",
    PORT: process.env.PORT || 8001,
    SECRET_EXPIRES: process.env.SECRET_EXPIRES || "1h",
    SECRET: process.env.SECRET || "namehandsome130498",
    DB_URI: process.env.DB_URI || "mongodb://root:rootPassword@db:27017/COMP1640?authSource=admin",
    ACCESS_KEY_ID_S3: process.env.ACCESS_KEY_ID_S3 || "",
    SECRET_ACCESS_KEY_S3: process.env.SECRET_ACCESS_KEY_S3 || ""
  }
};
