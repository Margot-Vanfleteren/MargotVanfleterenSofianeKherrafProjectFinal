const app = Vue.createApp({
    data() {
        return {
            currentSection: 'Crocs',
            ShoeCollection: [],
            stockData: [],
            ArticleIndex: 0,
            total: 0,
            stock: true,
            Name: '',
            Comment: ''
        };
    },
    mounted() {
        Promise.all([
            fetch('./articles.json').then(response => response.json()), // Update file path
            fetch('./stock.json').then(response => response.json())     // Update file path
        ])
        .then(data => {
            this.ShoeCollection = data[0].FeetCollection;
            this.stockData = data[1];
            console.log(this.stockData, this.ShoeCollection)
            this.updateStock();
        })
        .catch(error => console.error('Error loading JSON files:', error));
    },
    methods: {

        switchSection(section) {
            this.currentSection = section;
            this.updateStock();
        },
        nextColor() {
            if (this.ArticleIndex < this.ShoeCollection.length - 1) {
                this.ArticleIndex++;
                this.updateStock();
            }
        },
        prevColor() {
            if (this.ArticleIndex > 0) {
                this.ArticleIndex--;
                this.updateStock();
            }
        },
    

        addValue() {
            if (this.stock) {
                this.total += this.ShoeCollection[this.ArticleIndex][this.currentSection].price;
                console.log(this.currentSection, this.total);
            }
        },
        updateStock() {
            const currentShoe = this.ShoeCollection[this.ArticleIndex];
            const stockElement = this.stockData.stock.find(element => element.StyleName === currentShoe.StyleName);
            this.stock = stockElement ? stockElement[this.currentSection] : false;

            if (this.currentSection === 'FlipFlops') {
                this.stock = stockElement ? stockElement.FlipFlops : false;
            }
        },

        submitFeedback() {
            console.log('Name:', this.Name);
            console.log('Feedback:', this.Comment);
            this.email = '';
            this.feedback = '';
        }
    }
});

app.mount('#app');
