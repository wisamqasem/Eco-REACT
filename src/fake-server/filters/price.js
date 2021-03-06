import AbstractFilterBuilder from './abstract';
import productsData from '../database/products';
//import productsData from '../database/Dashboard';

export default class RangeFilterBuilder extends AbstractFilterBuilder {
    min;

    max;

    value;

    test(product) {
        const value = this.extractValue(product);

        return value >= this.value[0] && value <= this.value[1];
    }

    // eslint-disable-next-line class-methods-use-this
    parseValue(value) {
        return value.split('-').map((x) => parseFloat(x));
    }

    makeItems(products, value) {
        this.max = products.reduce(
            (acc, product) => Math.max(acc, this.extractValue(product)),
            0,
        );
        this.min = products.reduce(
            (acc, product) => Math.min(acc, this.extractValue(product)),
            this.max,
        );

        /** Calculates the number of digits for rounding. */
        let digit = Math.max(Math.ceil(this.max).toString().length - 2, 1);

        digit = 10 ** digit;

        this.max = Math.ceil(this.max / digit) * digit;
        this.min = Math.floor(this.min / digit) * digit;
        this.value = [this.min, this.max];

        if (value) {
            this.value = this.parseValue(value);
        }
    }

    // eslint-disable-next-line class-methods-use-this
    calc() { }

    extractValue(product) {
    console.log("🚀 ~ file: price.js ~ line 51 ~ RangeFilterBuilder ~ extractValue ~ product : ", product)

        if (this.slug === 'price') {
            return product.document.fields.price.stringValue;
        }

        throw Error();
    }

    build() {
        return {
            type: 'range',
            slug: this.slug,
            name: this.name,
            min: this.min,
            max: this.max,
            value: this.value,
        };
    }
}
