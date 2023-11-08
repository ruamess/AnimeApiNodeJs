const bcrypt = require('bcryptjs')
const { User, Anime } = require('../models/models')
const Router = require('express')
const sequelize = require('sequelize')
const router = new Router()


router.post('/registration', async (req, res) => {
	try {
		const { login, password } = req.body
		const candidate = await User.findOne({ where: { login } })
		if (!login || !password) {
			return res.status(400).json({ error: 'Неправильный email или password' })
		}
		if (candidate) {
			return res.status(400).json({ error: 'Пользователь с таким email уже существует' })
		}
		const hashPassword = await bcrypt.hash(password, 1)
		await User.create({ login, password: hashPassword })
		return res.status(201).json({ message: true })

	} catch (e) {
		console.log(e)
		return res.status(400).json('Error')
	}
})

router.post('/login', async (req, res) => {
	try {
		const { login, password } = req.body
		const user = await User.findOne({ where: { login } })
		if (!user) {
			return res.status(400).json({ error: 'Пользователь не найден' })
		}
		let comparePassword = bcrypt.compareSync(password, user.password)
		if (!comparePassword) {
			return res.status(400).json({ error: 'Неверный пароль' })
		}
		const userData = {
			id: user.id,
			login: user.login,
			password: user.password,
		}
		return res.status(200).json({ user: userData })
	} catch (e) {
		console.log(e)
		return res.status(400).json('Error')
	}
})

router.post('/getUser', async (req, res) => {
	try {
		const { id } = req.body
		const user = await User.findOne({ where: { id } })
		if (!user) {
			return res.status(200).json({ error: 'Неверный id пользователя' })
		}
		return res.status(200).json(user)
	} catch (e) {
		console.log(e)
		return res.status(400).json({ error: 'Ошибка' })
	}
})




router.post('/addViewed', async (req, res) => {
	try {
		const { userId, animeId } = req.body
		const user = await User.findOne({ where: { id: userId } })
		const anime = await Anime.findOne({ where: { _id: animeId } })
		if (!user) {
			return res.status(400).json({ error: "Пользователя с таким id не существует" })
		}
		else if (!anime) {
			return res.status(400).json({ error: "Аниме с таким id не существует" })
		}
		else if (user.viewed.includes(animeId)) {
			return res.status(400).json({ message: "Аниме уже у вас есть" })
		}
		user.viewed = [...user.viewed, animeId]
		user.save()
		return res.status(200).json({ message: "Аниме успешно добавлено в просмотренные" })
	} catch (e) {
		console.error(e)
		return res.status(200).json({ error: 'Ошибка' })
	}
})

router.delete('/deleteViewed', async (req, res) => {
	try {
		const { userId, animeId } = req.body
		const user = await User.findOne({ where: { id: userId } })
		const anime = await Anime.findOne({ where: { _id: animeId } })
		if (!user) {
			return res.status(400).json({ error: "Пользователя с таким id не существует" })
		} else if (!anime) {
			return res.status(400).json({ error: "Аниме с таким id не существует" })
		} else if (!user.viewed.includes(animeId)) {
			return res.status(400).json({ message: "Аниме не находится в вашем списке просмотренных" })
		}
		user.viewed = user.viewed.filter(viewedAnimeId => viewedAnimeId !== animeId)
		await user.save()

		return res.status(200).json({ message: "Аниме успешно удалено из списка просмотренных" })
	} catch (e) {
		console.error(e)
		return res.status(500).json({ error: 'Ошибка' })
	}
})



router.post('/addPlanned', async (req, res) => {
	try {
		const { userId, animeId } = req.body
		const user = await User.findOne({ where: { id: userId } })
		const anime = await Anime.findOne({ where: { _id: animeId } })
		if (!user) {
			return res.status(400).json({ error: "Пользователя с таким id не существует" })
		}
		else if (!anime) {
			return res.status(400).json({ error: "Аниме с таким id не существует" })
		}
		else if (user.planned.includes(animeId)) {
			return res.status(400).json({ message: "Аниме уже у вас есть" })
		}
		user.planned = [...user.planned, animeId]
		user.save()
		return res.status(200).json({ message: "Аниме успешно добавлено в просмотренные" })
	} catch (e) {
		console.error(e)
		return res.status(200).json({ error: 'Ошибка' })
	}
})



router.delete('/deleteViewed', async (req, res) => {
	try {
		const { userId, animeId } = req.body
		const user = await User.findOne({ where: { id: userId } })
		const anime = await Anime.findOne({ where: { _id: animeId } })
		if (!user) {
			return res.status(400).json({ error: "Пользователя с таким id не существует" })
		} else if (!anime) {
			return res.status(400).json({ error: "Аниме с таким id не существует" })
		} else if (!user.planned.includes(animeId)) {
			return res.status(400).json({ message: "Аниме не находится в вашем списке просмотренных" })
		}
		user.planned = user.viewed.filter(plannedAnimeId => plannedAnimeId !== animeId)
		await user.save()

		return res.status(200).json({ message: "Аниме успешно удалено из списка просмотренных" })
	} catch (e) {
		console.error(e)
		return res.status(500).json({ error: 'Ошибка' })
	}
})


module.exports = router