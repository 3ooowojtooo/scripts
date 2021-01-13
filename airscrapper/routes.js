const express = require("express")
const router = express.Router()
const Post = require("./model/Post")

router.get("/post", async (req, res) => {
    const posts = await Post.find()
    res.send(posts)
})

router.post("/post", async (req, res) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    })
    await post.save()
    res.send(post)
})

module.exports = router