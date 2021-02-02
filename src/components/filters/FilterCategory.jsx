// react
import React,{useState,useEffect, Fragment } from 'react';
import shopApi from '../../api/shop';
// third-party
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// application
import { ArrowRoundedLeft6x9Svg } from '../../svg';
import { getCategoryParents, url } from '../../services/utils';
import { Check9x7Svg } from '../../svg';

function FilterCategory(props) {
    const { data, onChangeValue,value } = props;
    const [subCategories,setSubCategories]=useState([]);
useEffect(() => {
    shopApi.getCategoryBySlug(data.category).then(x=>{if(!x.subCategories.arrayValue.values)x.subCategories.arrayValue.values=[] ;setSubCategories(x.subCategories.arrayValue.values)});
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

    const categoriesList = subCategories.map((item,index) => {
        let count;
        const itemClasses = classNames('filter-list__item', {
            'filter-list__item--disabled': item.count === 0,
        });
        // const itemClasses = classNames('filter-categories__item', {
        //     'filter-categories__item--current': data.value === item.stringValue,
        // });
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
//         return (
//             <Fragment key={index}>
//                 {/* {getCategoryParents(category).map((parent,index) => (
//                     <li key={index} className="filter-categories__item filter-categories__item--parent">
//                         <ArrowRoundedLeft6x9Svg className="filter-categories__arrow" />
//                         <Link to={url.category(parent)}>{parent.name}</Link>
//                     </li>
//                 ))} */}
//                 <li className={itemClasses}>

// {category.stringValue}
//                     {/* <Link to={url.subCategory(category.stringValue,data.category)}>{category.stringValue}</Link> */}
//                 </li>
//                 {/* {category.children && category.children.map((child) => (
//                     <li key={child.id} className="filter-categories__item filter-categories__item--child">
//                         <Link to={url.category(child)}>{child.name}</Link>
//                     </li>
//                 ))} */}
//             </Fragment>
//         );
    });

    if (data.value) {
        categoriesList.unshift(
            <li key="[shop]" className="filter-categories__item filter-categories__item--parent">
                {/* <ArrowRoundedLeft6x9Svg className="filter-categories__arrow" /> */}
                <Link to={url.catalog()}>All Products</Link>
            </li>,
        );
    }

    return (
        <div className="filter-categories">
            <ul className="filter-categories__list">
                {categoriesList}
            </ul>
        </div>
    );
}

FilterCategory.propTypes = {
    /**
     * Filter object.
     */
    data: PropTypes.object,
};

export default FilterCategory;
