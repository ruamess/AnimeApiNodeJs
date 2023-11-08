const sequelize = require('../db')
const { DataTypes, STRING, INTEGER } = require('sequelize')

const User = sequelize.define('user', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	login: { type: DataTypes.STRING, unique: true },
	password: { type: DataTypes.STRING },
	viewed: { type: DataTypes.ARRAY(STRING), defaultValue: [] },
	planned: { type: DataTypes.ARRAY(STRING), defaultValue: [] },
	comments: { type: DataTypes.INTEGER },
})

const Anime = sequelize.define('anime', {
	_id: { type: DataTypes.STRING, primaryKey: true },
	title: { type: DataTypes.STRING },
	alternativeTitles: { type: DataTypes.ARRAY(STRING) },
	ranking: { type: DataTypes.INTEGER },
	genres: { type: DataTypes.ARRAY(STRING) },
	episodes: { type: DataTypes.INTEGER },
	hasEpisode: { type: DataTypes.BOOLEAN },
	hasRanking: { type: DataTypes.BOOLEAN },
	image: { type: DataTypes.STRING },
	link: { type: DataTypes.STRING },
	status: { type: DataTypes.STRING },
	synopsis: { type: DataTypes.TEXT },
	thumb: { type: DataTypes.STRING },
	type: { type: DataTypes.STRING },
})


const Comment = sequelize.define('comment', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	animeId: { type: DataTypes.INTEGER },
	userId: { type: DataTypes.INTEGER },
	text: { type: DataTypes.STRING }

})


module.exports = {
	User,
	Anime,
	Comment
}