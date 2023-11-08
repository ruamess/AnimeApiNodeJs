const { Comment, User, Anime } = require('../models/models')
const Router = require('express')
const router = new Router()


// router.post('/create', async (req, res) => {
//   try {
//     const { animeId, userId, text } = req.body
//     const validateUser = User.findOne({ where: { id: userId } })
//     const validateAnime = Anime.findOne({ where: { _id: animeId } })
//     if (!validateUser) {
//       return res.status(400).json("Пользователя с таким id не существует")
//     }
//     else if (!validateAnime) {
//       return res.status(400).json("Анмие с таким id не существует")
//     }
//     else if (validateUser) {
//       validateUser.comments += 1
//     }

//     await Comment.create({ animeId, userId, text })
//     return res.status(200).json("Комментарий создан")
//   } catch (e) {
//     console.log(e)
//     return res.status(400).json("Error")
//   }
// })


router.post('/create', async (req, res) => {
  try {
    const { animeId, userId, text } = req.body

    const user = await User.findOne({ where: { id: userId } })
    const anime = await Anime.findOne({ where: { _id: animeId } })
    if (text.length > 150) {
      return res.status(400).json({ error: "Длина комментария не может быть больше 150 символов!" })
    }
    if (!user) {
      return res.status(400).json({ error: "Пользователя с таким id не существует" })
    }
    if (!anime) {
      return res.status(400).json({ error: "Аниме с таким id не существует" })
    }

    user.comments = (user.comments || 0) + 1
    await user.save()

    await Comment.create({ animeId, userId, text })

    return res.status(200).json({ message: "Комментарий создан" })
  } catch (e) {
    console.log(e)
    return res.status(400).json({ error: 'Ошибка' })
  }
})


router.post('/get', async (req, res) => {
  try {
    const { animeId } = req.body
    const comments = await Comment.findAll({ where: { animeId } })
    if (!comments) {
      return res.status(400).json({ error: "У этого аниме нету комментариев" })
    }
    return res.status(200).json(comments)
  } catch (e) {
    console.log(e)
    return res.status(400).json({ error: 'Ошибка' })
  }
})





module.exports = router