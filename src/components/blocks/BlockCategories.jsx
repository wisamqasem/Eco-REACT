// react
import React from 'react';

// third-party
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// application
import BlockHeader from '../shared/BlockHeader';
import {url} from '../../services/utils'


export default function BlockCategories(props) {
    const { title, layout, categories } = props;
  //  console.log("🚀 ~ file: BlockCategories.jsx ~ line 13 ~ BlockCategories ~  categories ",  categories )


    const categoriesList = categories.map((category, index) => {
        category.subcategories=category.fields.subCategories.arrayValue.values.slice(0,5);
        category.url=category.fields.name.stringValue;
        category.image=category.fields.image.stringValue;
        category.title=category.fields.name.stringValue;

        const classes = `block-categories__item category-card category-card--layout--${layout}`;

        const subcategories = category.subcategories.map((sub, subIndex) => {
         sub.title=sub.stringValue;
         sub.url=sub.stringValue;
          return(  <li key={subIndex}>
                  <Link to={url.subCategory(sub.url,category.title)}>{sub.title}</Link>

                  </li>  )
    });

        return (
            <div key={index} className={classes}>
                <div className=" category-card__body">
                    <div className=" category-card__image">
                        <Link to={url.category(category.url)}><img src={category.image} alt="" /></Link>
                    </div>
                    <div className=" category-card__content">
                        <div className=" category-card__name">
                            <Link to={url.category(category.url)}>{category.title}</Link>
                        </div>
                        <ul className="category-card__links">
                            {subcategories}
                        </ul>
                        <div className="category-card__all">
                            <Link to={url.category(category.url)}>Show All</Link>
                        </div>
                        {/* <div className="category-card__products">
                            {`${category.products} Products`}
                        </div> */}
                    </div>
                </div>
            </div>
        );
    });

    return (
        <div className={`block block--highlighted block-categories block-categories--layout--${layout}`}>
            <div className="container">
                <BlockHeader title={title} />

                <div className="block-categories__list">
                    {categoriesList}
                </div>
            </div>
        </div>
    );
}

BlockCategories.propTypes = {
    title: PropTypes.string.isRequired,
    categories: PropTypes.array,
    layout: PropTypes.oneOf(['classic', 'compact']),
};

BlockCategories.defaultProps = {
    categories: [],
    layout: 'classic',
};
