import STORE from '../STORE'

const GeneratorService = {
    generateAdjective(ingredients) {
        const randomIng = ingredients[Math.floor(Math.random() * ingredients.length)]
        const newArr = ingredients.filter(ing => ing !== randomIng)

        const nextRandomIng = newArr[Math.floor(Math.random() * newArr.length)]

        const { adjectives } = STORE
        const adjectiveArrOne = adjectives[randomIng]
        const adjectiveArrTwo = adjectives[nextRandomIng]

        const firstAdj = adjectiveArrOne[Math.floor(Math.random() * adjectiveArrOne.length)]
        const secondAdj = adjectiveArrTwo[Math.floor(Math.random() * adjectiveArrTwo.length)]

        return `${firstAdj} ${secondAdj}`
    },
    
    generateNoun() {
        const { nouns } = STORE
        return (nouns[Math.floor(Math.random(0) * nouns.length)])
    }
}

export default GeneratorService;