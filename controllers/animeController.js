const { Anime } = require('../models/models')
const sequelize = require('sequelize')
const Router = require('express')
const router = new Router()

router.post('/addAnime', async (req, res) => {
  try {
    const animeData = req.body
    for (const anime of animeData) {
      await Anime.create(anime)
    }
    return res.status(201).json({ message: 'Данные успешно сохранены в базе данных.' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Произошла ошибка при сохранении данных в базе данных.' })
  }
})

router.post('/getAnimeByType', async (req, res) => {
  try {
    const { type } = req.body
    const randomTVAnime = await Anime.findAll({ where: { type: type } })
    if (!randomTVAnime) {
      return res.status(400).json({ error: 'Неверно указан тип аниме' })
    }
    return res.status(200).json(randomTVAnime)
  } catch (e) {
    console.log(e)
    return res.status(400).json({ error: 'Ошибка' })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const anime = await Anime.findOne({ where: { _id: id } })
    if (!anime) {
      return res.status(404).json({ error: 'Такого аниме нету' })
    }
    return res.status(200).json(anime)

  } catch (e) {
    console.log(e)
    return res.status(400).json({ error: 'Ошибка' })
  }
})


module.exports = router