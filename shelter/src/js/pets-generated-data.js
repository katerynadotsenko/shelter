export default class PetsGeneratedData {

    constructor(data) {
        this.data = data;
    }

    shuffle(array) {
        let j, temp;
        for (let i = array.length - 1; i > 0; i--){
            j = Math.floor(Math.random()*(i + 1));
            temp = array[j];
            array[j] = array[i];
            array[i] = temp;
        }
        return array;
    }

    shuffleForPage6(i) {
        const firstPart = this.shuffle(this.data.slice(0, this.data.length - i * 2));
        const secondPart = this.shuffle(this.data.slice(this.data.length - i * 2, this.data.length));
        //console.log("firstPart - ", firstPart);
        //console.log("secondPart - ", secondPart);
        this.data = [...firstPart, ...secondPart];
        return this.data;
    }

    generatePetsData() {
        let generatePetsArray = [];
        for (let i = 0; i <= 5; i++) {
            generatePetsArray.push(...this.shuffleForPage6(i));
        }
        //console.log("generatePetsArray - ", generatePetsArray);
        return generatePetsArray;
    }
    
}