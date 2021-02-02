// react
import React,{useState,useEffect} from 'react';

// third-party
import classNames from 'classnames';
import PropTypes from 'prop-types';
import shopApi from '../../api/shop';

// application
import { Check9x7Svg } from '../../svg';

function FilterCheck(props) {
    const { data, value, onChangeValue } = props;
const [brands,setBrands]=useState([]);
const [subCategory,setSubCategory]=useState([]);
useEffect(() => {
    shopApi.getCategoryBySlug(data.category).then(x=>{
        if(!x.brands.arrayValue.values)x.brands.arrayValue.values=[] ;setBrands(x.brands.arrayValue.values);
        if(!x.subCategories.arrayValue.values)x.subCategories.arrayValue.values=[] ;setSubCategory(x.subCategories.arrayValue.values);

    });
}, [])





    const updateValue = (newValue) => {
        onChangeValue({ filter: data, value: newValue });
    };

    const handleChange = (event) => {
        if (event.target.checked && !value.includes(event.target.value)) {
            updateValue([...value, event.target.value]);
        }
        if (!event.target.checked && value.includes(event.target.value)) {
            updateValue(value.filter((x) => x !== event.target.value));
        }
    };

const checkList = data.slug=='category' ? subCategory : brands;

    const itemsList = checkList.map((item,index) => {
        let count;

        if (item.count) {
            count = <span className="filter-list__counter">{item.count}</span>;
        }

        const itemClasses = classNames('filter-list__item', {
            'filter-list__item--disabled': item.count === 0,
        });

        return (
            <label key={index} className={itemClasses}>
                <span className="filter-list__input input-check">
                    <span className="input-check__body">
                        <input
                            className="input-check__input"
                            type="checkbox"
                            value={item.stringValue}
                            checked={value.includes(item.stringValue)}
                            disabled={item.count === 0}
                            onChange={handleChange}
                        />
                        <span className="input-check__box" />
                        <Check9x7Svg className="input-check__icon" />
                    </span>
                </span>
                <span className="filter-list__title">{item.stringValue}</span>
                {count}
            </label>
        );
    });

    return (
        <div className="filter-list">
            <div className="filter-list__list">
                {itemsList}
            </div>
        </div>
    );
}

FilterCheck.propTypes = {
    /**
     * Filter object.
     */
    data: PropTypes.object,
    /**
     * Value.
     */
    value: PropTypes.arrayOf(PropTypes.string),
    /**
     * Change value callback.
     */
    onChangeValue: PropTypes.func,
};

export default FilterCheck;
