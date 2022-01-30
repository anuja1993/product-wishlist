const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        mongodb_username: "develop",
        mongodb_password: "develop",
        mongodb_clustername: "product-wishlist-cluste",
        mongodb_database: "product_db",
      },
    };
  }

  return {
    env: {
      mongodb_username: "demo",
      mongodb_password: "demo",
      mongodb_clustername: "product-wishlist-cluste",
      mongodb_database: "product_db",
    },
  };
};
