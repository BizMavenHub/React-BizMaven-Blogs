"use strict";

import Sitemap from "react-router-sitemap-generator";
import router from "../App.jsx";

new Sitemap(router).build("http://my-site.ru").save("./sitemap.xml");
