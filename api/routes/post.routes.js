"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const post_controller_1 = require("../controllers/post.controller");
const auth_controller_1 = require("../controllers/auth.controller");
const router = express_1.default.Router();
router.get("/", auth_controller_1.verifyJWT, post_controller_1.getPosts);
router.post("/", auth_controller_1.verifyJWT, post_controller_1.createPost);
router.get("/:id", auth_controller_1.verifyJWT, post_controller_1.getPost);
router.put("/:id", auth_controller_1.verifyJWT, post_controller_1.updatePost);
router.delete("/:id", auth_controller_1.verifyJWT, post_controller_1.deletePost);
exports.default = router;
