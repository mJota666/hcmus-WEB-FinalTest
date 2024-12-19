import mongoose from "mongoose";
import ArticlesModel from "../models/ArticlesModel.js";
import CategoriesModel from "../models/CategoriesModel.js";

// Generate categories
const generateCategories = () => [
  { category_name: "Technology" },
  { category_name: "Health" },
];

// Generate articles
const generateArticles = (categories) => {
  const sampleContent = `
    <p>This is an example of rich content formatted as HTML.</p>
    <p>It includes <strong>bold text</strong>, <em>italic text</em>, and even images:</p>
    <img src="https://example.com/sample-image.jpg" alt="Sample Image" />
  `;
  return [
    {
      title: "Exploring AI Innovations",
      author: "John Doe",
      abstract: "A comprehensive overview of the latest trends in Artificial Intelligence.",
      content: sampleContent,
      is_premium: false,
      category_id: categories[0]._id,
    },
    {
      title: "The Importance of Mental Health",
      author: "Jane Smith",
      abstract: "An in-depth look at the importance of mental health in our lives.",
      content: sampleContent,
      is_premium: true,
      category_id: categories[1]._id,
    },
  ];
};

// Seed data function
const seedData = async () => {
  try {
    console.log("Checking existing data...");

    // Check if data already exists
    const [categoryCount, articleCount] = await Promise.all([
      CategoriesModel.countDocuments().exec(),
      ArticlesModel.countDocuments().exec(),
    ]);

    if (categoryCount > 0 && articleCount > 0) {
      console.log("Data already exists. Skipping seeding.");
      return;
    }

    // Generate data
    console.log("Generating categories...");
    const categories = generateCategories();
    const createdCategories = await CategoriesModel.insertMany(categories);

    console.log("Generating articles...");
    const articles = generateArticles(createdCategories);
    await ArticlesModel.insertMany(articles);

    console.log("Seeding completed successfully!");
  } catch (error) {
    console.error("Error during seeding:", error);
    throw error;
  }
};

const init = async () => {
  try {
    const db = mongoose.connection;

    db.on("error", (err) => {
      console.error("MongoDB connection error:", err);
    });

    db.once("open", async () => {
      console.log("Connected to MongoDB. Starting seeding...");
      await seedData();
      process.exit(0);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

// Uncomment the line below to run the seeding script directly
// init();
export default init;
