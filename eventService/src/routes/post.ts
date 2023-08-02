import express from "express";
const router = express.Router();
import {successResponse, errorResponse} from "../services/apiResponse";
import PostController from "../controllers/postController";

router.post("/create", async (req, res) => {
    try {
        const body = req.body;
      
        
        const controller = new PostController();
        const response = await controller.createPost(body);
        console.log("response",response);
        res.status(200).json(successResponse("create Post", response, res.statusCode));
    } catch (error) {
        
        res.status(500).json(errorResponse("error in create Post", res.statusCode));
    }
});
router.post("/edit", async (req, res) => {
    try {
        
        const body = req.body;
        const controller = new PostController();
        const response = await controller.editPost(body);
        res.status(200).json(successResponse("edit Post", response, res.statusCode));
    } catch (error) {
      
        res.status(500).json(errorResponse("error in edit Post", res.statusCode));
    }
});

router.get("/list", async (req, res) => {
    try {
      
        const controller = new PostController();
        const response= await controller.getPostList();
        res.status(200).json(successResponse("Post list", response, res.statusCode));
    } catch (error) {
       
        res.status(500).json(errorResponse("error in Post list", res.statusCode));
    }
});


router.get("/getlist/byuserid", async (req, res) => {
    try {
        const controller = new PostController();
        const userId = req.query.userId;
        const response= await controller.getPostListBYUserId(userId);
        res.status(200).json(successResponse("getPostListBYUserId", response, res.statusCode));
    } catch (error) {
       
        res.status(500).json(errorResponse("error in getPostListBYUserId", res.statusCode));
    }
});

router.get("/infobyid", async (req, res) => {
    try {
        const PostId = req.query.id;
        const controller = new PostController();
        const response = await controller.getPostInfoById(PostId);
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
         const PostComment = req.body.PostComment;
         const PostCommentId = req.body.PostCommentId;
         const body = req.body;

        const controller = new PostController();
        const response = await controller.PostActivity(userId, PostId, status, PostComment, PostCommentId, body);
        res.status(200).json(successResponse("postActivity", response, res.statusCode));
    } catch (error) {
      
        res.status(500).json(errorResponse("error in postActivity", res.statusCode));
    }
});
router.get("/read/activity", async (req, res) => {
    try {
        
        const PostId = req.query.PostId; 
        const status = req.query.status;
        
        const controller = new PostController();
        const response = await controller.readPostActivity( PostId, status);
        res.status(200).json(successResponse("postActivity", response, res.statusCode));
    } catch (error) {
      
        res.status(500).json(errorResponse("error in postActivity", res.statusCode));
    }
});

router.post("/delete", async (req, res) => {
    try {
        const postId = req.body.postId;
        const controller = new PostController();
        const response = await controller.deletePost(postId);
        res.status(200).json(successResponse("delete Post", response, res.statusCode));

    } catch (error) {
       
        res.status(500).json(errorResponse("error in delete Post", res.statusCode));
    }
})

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



export default router;