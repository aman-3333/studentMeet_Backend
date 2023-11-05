import express from "express";
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");
import { successResponse, errorResponse } from "../services/apiResponse";
import PostController from "../controllers/postController";

router.post("/create", async (req, res) => {
  try {
    const body = req.body;
    const controller = new PostController();
    const response = await controller.createPost(body);
    res
      .status(200)
      .json(successResponse("create Post", response, res.statusCode));

      
  } catch (error) {
    console.log(error,"error")
    res.status(500).json(errorResponse("error in create Post", res.statusCode));
  }
});
router.post("/edit",  async (req, res) => {
  try {
    req.body.user = res.locals.user;
    const body = req.body;
    const controller = new PostController();
    const response = await controller.editPost(body);
    res
      .status(200)
      .json(successResponse("edit Post", response, res.statusCode));
  } catch (error) {
    res.status(500).json(errorResponse("error in edit Post", res.statusCode));
  }
});

router.get("/list", checkAuth, async (req, res) => {
  try {
    let user = res.locals.user;

    const controller = new PostController();
    const response = await controller.getPostList(user);
    res
      .status(200)
      .json(successResponse("Post list", response, res.statusCode));
  } catch (error) {
    res.status(500).json(errorResponse("error in Post list", res.statusCode));
  }
});


router.get("/list/school",  async (req, res) => {
  try {
    let schoolId = req.query.schoolId;
    const controller = new PostController();
    const response = await controller.getPostListSchool(schoolId);
    res
      .status(200)
      .json(successResponse("Post list", response, res.statusCode));
  } catch (error) {
    res.status(500).json(errorResponse("error in Post list", res.statusCode));
  }
});


router.get("/list/academy",  async (req, res) => {
  try {
    let academyId = req.query.academyId;
    const controller = new PostController();
    const response = await controller.getPostListAcademy(academyId);
    res
      .status(200)
      .json(successResponse("Academy Post list", response, res.statusCode));
  } catch (error) {
    res.status(500).json(errorResponse("error in Academy Post list", res.statusCode));
  }
});

router.get("/list/sponsor",  async (req, res) => {
  try {
    let sponsorId = req.query.sponsorId;
    const controller = new PostController();
    const response = await controller.getPostListSponsor(sponsorId);
    res
      .status(200)
      .json(successResponse("sponsor Post list", response, res.statusCode));
  } catch (error) {
    res.status(500).json(errorResponse("error in sponsor Post list", res.statusCode));
  }
});


router.get("/getlist/byuser/id",checkAuth, async (req, res) => {
  try {
    const controller = new PostController();
    const userId = req.query.userId;
    const currentUser = res.locals.user;
    const response = await controller.getPostListBYUserId(userId,currentUser);
    res
      .status(200)
      .json(successResponse("getPostListBYUserId", response, res.statusCode));
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json(errorResponse("error in getPostListBYUserId", res.statusCode));
  }

  
});

router.get("/infobyid",  async (req, res) => {
  try {
    const postId = req.query.postId;
    const controller = new PostController();
    const response = await controller.getPostInfoById(postId);
    res.status(200).json(successResponse("get Post", response, res.statusCode));
  } catch (error) {
    res.status(500).json(errorResponse("error in get Post", res.statusCode));
  }
});
router.post("/activity", async (req, res) => {
  try {
    const userId = req.body.userId;
    const PostId = req.body.PostId;
    const status = req.body.status;
    const postComment = req.body.postComment;
    const postCommentId = req.body.postCommentId;

    req.body.user = res.locals.user;
    const body = req.body;

    const controller = new PostController();
    const response = await controller.PostActivity(
      userId,
      PostId,
      status,
      postComment,
      postCommentId,
      body
    );
    res
      .status(200)
      .json(successResponse("postActivity", response, res.statusCode));
  } catch (error) {
    res
      .status(500)
      .json(errorResponse("error in postActivity", res.statusCode));
  }
});

router.post("/read/activity", async (req, res) => {
  try {
    const postId = req.body.postId;
    const status = req.body.status;
    const userId = req.body.userId;
    const controller = new PostController();
    const response = await controller.readPostActivity(postId, status,userId);
    res
      .status(200)
      .json(successResponse("read postActivity", response, res.statusCode));
  } catch (error) {
    res
      .status(500)
      .json(errorResponse("error in read postActivity", res.statusCode));
  }
});
// router.get("/read/activity", checkAuth, async (req, res) => {
//     try {

//         const PostId = req.query.PostId;
//         const status = req.query.status;

//         const controller = new PostController();
//         const response = await controller.readPostActivity( PostId, status);
//         res.status(200).json(successResponse("postActivity", response, res.statusCode));
//     } catch (error) {

//         res.status(500).json(errorResponse("error in postActivity", res.statusCode));
//     }
// });


router.post("/share", async (req, res) => {
  try {
    const body=req.body;
   
    const controller = new PostController();
    const response:any = await controller.sharePost(body);
    res
      .status(200)
      .json(successResponse("share post", response, res.statusCode));
  } catch (error) {
    res
      .status(500)
      .json(errorResponse("error in share postActivity", res.statusCode));
  }
});




router.post("/delete", async (req, res) => {
  try {
    const postId = req.body._id;
    const controller = new PostController();
    const response = await controller.deletePost(postId);
    res
      .status(200)
      .json(successResponse("delete Post", response, res.statusCode));
  } catch (error) {
    res.status(500).json(errorResponse("error in delete Post", res.statusCode));
  }
});

router.get("/search", async (req, res) => {
  try {
    const search = req.query.search;
    const controller = new PostController();
    const response = await controller.searchPost(search);
    res.status(200).json(successResponse("search", response, res.statusCode));
  } catch (error) {
    res.status(500).json(errorResponse("error in search", res.statusCode));
  }
});

// router.get("/suggestion/friend", checkAuth, async (req, res) => {
//     try {

//         const controller = new PostController();
//         const response = await controller.suggestionFriend(search);
//         res.status(200).json(successResponse("suggestion  friend", response, res.statusCode));
//     } catch (error) {

//         res.status(500).json(errorResponse("error in suggestion friend", res.statusCode));
//     }
// });

// router.get("/suggestion/brand", checkAuth, async (req, res) => {
//     try {

//         const controller = new PostController();
//         const response = await controller.suggestionBrand(search);
//         res.status(200).json(successResponse("suggestion  brand", response, res.statusCode));
//     } catch (error) {

//         res.status(500).json(errorResponse("error in suggestion  brand", res.statusCode));
//     }
// });

// router.get("/suggestion/academy", checkAuth, async (req, res) => {
//     try {

//         const controller = new PostController();
//         const response = await controller.suggestionAcademy(search);
//         res.status(200).json(successResponse("suggestion academy", response, res.statusCode));
//     } catch (error) {

//         res.status(500).json(errorResponse("error in suggestion academy", res.statusCode));
//     }
// });

// router.get("/suggestion/tournament", checkAuth, async (req, res) => {
//     try {

//         const controller = new PostController();
//         const response = await controller.suggestionTournament(search);
//         res.status(200).json(successResponse("suggestion tournament", response, res.statusCode));
//     } catch (error) {

//         res.status(500).json(errorResponse("error in suggestion tournament", res.statusCode));
//     }
// });

// router.get("/suggestion/coach", checkAuth, async (req, res) => {
//     try {

//         const controller = new PostController();
//         const response = await controller.suggestionCoach(search);
//         res.status(200).json(successResponse("suggestion coach", response, res.statusCode));
//     } catch (error) {

//         res.status(500).json(errorResponse("error in suggestion coach", res.statusCode));
//     }
// });

// router.get("/suggestion/schools", checkAuth, async (req, res) => {
//     try {

//         const controller = new PostController();
//         const response = await controller.suggestionSchools(search);
//         res.status(200).json(successResponse("suggestion schools", response, res.statusCode));
//     } catch (error) {

//         res.status(500).json(errorResponse("error in suggestion schools", res.statusCode));
//     }
// });

export default router;
