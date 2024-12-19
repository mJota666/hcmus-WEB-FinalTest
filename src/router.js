import ArticlesPageController from "./controllers/ArticlesPageController.js";
import {ArticleDetailController, ArticleCreateController} from "./controllers/ArticlesPageController.js";
import ArticlesModel from "./models/ArticlesModel.js";

const router = (app) => {
  app.use('/articles/detail', ArticleDetailController)
  app.post('/articles/create', async (req, res) => {
    try {
      const articleObject = new ArticlesModel(req.body)
      console.log(articleObject)
      articleObject.save();
      res.redirect('/articles')

    } catch(error) {
      console.log(error)
    }
  })
  app.use('/articles/create', ArticleCreateController)
  app.use('/articles', ArticlesPageController)
};
export default router;
