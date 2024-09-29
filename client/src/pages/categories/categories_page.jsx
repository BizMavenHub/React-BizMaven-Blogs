import React from "react";
import { Categories_Container } from "../../containers";

import { Helmet } from "react-helmet";

const categories_page = () => {
  return (
    <>
      <Helmet>
        <title>Categories</title>
      </Helmet>
      <Categories_Container />
    </>
  );
};

export default categories_page;
