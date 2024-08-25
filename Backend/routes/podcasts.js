const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/multer");
const Category = require("../models/category.js");
const Podcast = require("../models/podcasts.js");
const User = require("../models/user.js");
const router = require("express").Router();

// add-podcast
router.post("/add-podcast", authMiddleware, upload, async (req, res) => {
  try {
    const { title, description, category } = req.body;
    let frontImage = req.files["frontImage"][0].path;
    let audioFile = req.files["audioFile"][0].path;

    if (!title || !description || !category || !frontImage || !audioFile) {
      return res.status(400).json({ message: "All Fields are Required" });
    }

    const { user } = req;
    const cat = await Category.findOne({ categoryName: category });
    if (!cat) {
      return res.status(404).json({ message: "Category Not Found" });
    }

    const userId = user._id;
    const catId = cat._id;

    const newPodcast = new Podcast({
      title,
      description,
      audioFile,
      frontImage,
      category: catId,
      user: userId,
    });

    await newPodcast.save();

    await Category.findByIdAndUpdate(catId, {
      $push: { podcasts: newPodcast._id },
    });

    await User.findByIdAndUpdate(userId, {
      $push: { podcasts: newPodcast._id },
    });

    return res.status(200).json({ message: "Podcast Added Successfully" });
  } catch (error) {
    return res.status(500).json({ error: error, message: "Failed To Add Podcast" });
  }
});

// get all podacst
router.get("/get-podcasts", async (req, res) => {
  try {
    const podcasts = await Podcast.find()
      .populate("category")
      .sort({ createdAt: -1 });
    return res.status(200).json({ data: podcasts });
  } catch (error) {
    return res.status(500).json({ error });
  }
});

// get user podacst
router.get("/get-user-podcasts", authMiddleware,async (req, res) => {
  try {
    const { user } = req;
    const userId = user._id;
    const data = await User.findById(userId)
      .populate({
        path: "podcasts",
        populate: { path: "category" },
      })
      .select("-password");
    if (data && data.podcasts) {
      data.podcasts.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    }
    return res.status(200).json({ data: data.podcasts });
  } catch (error) {
    return res.status(500).json({ error });
  }
});
// get podacst by id
router.get("/get-podcast/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const podcasts = await Podcast.findById(id).populate("category");
    return res.status(200).json({ data: podcasts });
  } catch (error) {
    return res.status(500).json({ error });
  }
});



router.get("/category/:cat", async (req, res) => {
  try {
    const { cat } = req.params;
    console.log(`Category: ${cat}`); // Check what category is being searched

    // Use a case-insensitive regex to match the category name
    const categories = await Category.find({ categoryName: { $regex: new RegExp(cat, 'i') } }).populate({
      path: "podcasts",
      populate: { path: "category" },
    });
    
    console.log(categories); // Check what is being returned from the database
    
    if (!categories.length) {
      return res.status(404).json({ message: "Category not found" });
    }

    let podcasts = [];
    categories.forEach((category) => {
      podcasts = [...podcasts, ...category.podcasts];
    });

    console.log(podcasts); // Check the podcasts before sending response

    return res.status(200).json({ data: podcasts });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(500).json({ error });
  }
});



module.exports = router