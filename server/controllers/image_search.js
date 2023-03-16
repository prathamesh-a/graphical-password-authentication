import { nanoid } from 'nanoid';
import { commons } from '../static/message.js';
import { shuffleArray, unsplash } from '../util/util.js';

const search = async (req, res, next) => {

    const { keyword } = req.query
    const pages = 3
    const images = []
    const splitArrays = []

    if (typeof keyword === 'undefined') {
        res.status(500).json({
            message: commons.invalid_params,
            format: "keyword"
        })
        return next()
    }

    for(let i=0; i<pages; i++) {
        const result = await unsplash.search.getPhotos({
            query: keyword,
            perPage: 30,
            orientation: 'landscape'
        })
        const resultsArray = result.response.results
        resultsArray.map(each => {
            images.push({
                id: nanoid(),
                url: each.urls.small
            })
        })
    }

    shuffleArray(images)

    for(let i=0; i<64; i+=16) {
        splitArrays.push(images.slice(i, i+16))
    }

    res.send(splitArrays)
}

export { search }