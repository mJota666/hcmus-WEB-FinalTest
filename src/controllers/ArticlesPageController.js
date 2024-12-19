import ArticlesModel from "../models/ArticlesModel.js";
import CategoriesModel from "../models/CategoriesModel.js";

export const ArticleCreateController = async(req, res) => {
  try {
    const categories = await CategoriesModel.find()
    res.render("layouts/ArticleCreateLayout" ,{
      body: "../pages/ArticleCreatePage",
      title: "Article Create",
      categories
    })    
  } catch(error) {
    console.log(error)
  }
}

export const ArticleDetailController = async(req, res) => {
  try {
    const articleObject = await ArticlesModel.find({_id: req.query.id})
    const article = articleObject[0]
    res.render("layouts/ArticleDetailLayout" ,{
        body: "../pages/ArticleDetailPage",
        title: "Article Detail",
        article
    })  
  } catch(error) {
    console.log(error)
  }
}

const ArticlesPageController = async (req, res) => {
  try {
    /* Take data from mongo */
    const articles = await ArticlesModel.find();

    /* Taking page in query */
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    /* Preparing Pagination Nodes */
    const numOfPages = Math.ceil(articles.length / limit);
    const pagNodes = [];
    for (let i = 0; i < numOfPages; i++) {
      const pagNode = {
        value: i + 1,
        isActive: i + 1 === page,
      };
      pagNodes.push(pagNode);
    }

    const prevPage = {
      page: page > 1 ? page - 1 : 1,
      limit,
    };
    const nextPage = {
      page: page < numOfPages ? page + 1 : page,
      limit,
    };

    /* Preparing Data */
    const articleList = articles.slice(startIndex, endIndex);
    const categories = await CategoriesModel.find();
    const categoriesList = {};

    // Create a mapping of category IDs to category names
    categories.forEach((category) => {
      categoriesList[category._id.toString()] = category.category_name;
    });

    // Add category names to each article
    const enrichedArticles = articleList.map((article) => {
      const plainArticle = article.toObject(); // Convert Mongoose document to plain object
      return {
        ...plainArticle,
        category_name: categoriesList[article.category_id.toString()],
      };
    });
    /* Render data */
    res.render("layouts/ArticlesPageLayout", {
      body: "../pages/ArticlesPage",
      title: "Articles",
      articleList: enrichedArticles,
      pagNodes,
      prevPage,
      nextPage,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

export default ArticlesPageController;
