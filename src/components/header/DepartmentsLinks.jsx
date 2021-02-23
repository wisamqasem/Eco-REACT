// react
import React ,{useEffect,useState}from 'react';

// third-party
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'

// application
import Megamenu from './Megamenu';
import DepartmentsLinksMenu from './DepartmentsLinksMenu';
import { ArrowRoundedRight6x9Svg } from '../../svg';

import BlockLoader from '../blocks/BlockLoader';
import shopApi from '../../api/shop';
// data stubs
import departments from '../../data/headerDepartments';
import { url } from '../../services/utils';
import {getCategoriesData} from '../../store/categories/categoriesAction';

function DepartmentsLinks(props) {
    const {  getCategoriesData,departments } = props;
   // const [departments, setDepartments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        let canceled = false;
        setIsLoading(true);
        getCategoriesData();
//console.log("departments : ",departments);
// shopApi.getCategories({limit:20}).then((departments)=>{

// });
        setIsLoading(false);
        return () => {
            canceled = true;
        };
    },[]);
    if (isLoading) {// this is very important to put it after useEffect...........................
        return <BlockLoader />;
    }




    const linksList = departments.map((department, index) => {
        department.submenu=null;
        department.title=department.fields.name.stringValue;
        department.url=department.fields.name.stringValue;


        if(department.fields.subCategories){
        department.submenu=department.fields.subCategories;
        department.submenu.type='menu';
        department.submenu.menu=department.fields.subCategories.arrayValue.values;

        }
        let arrow = null;
        let submenu = null;
        let itemClass = '';

        if (department.submenu) {
            arrow = <ArrowRoundedRight6x9Svg className="departments__link-arrow" />;
        }

        if (department.submenu && department.submenu.type === 'menu') {
            itemClass = 'departments__item--menu';
            submenu = (
                <div className="departments__menu">
                    <DepartmentsLinksMenu items={department.submenu.menu} category={ department.title}/>
                </div>
            );
        }
//${department.submenu.menu.size}
        if (department.submenu && department.submenu.type === 'megamenu') {
            submenu = (
                <div className={`departments__megamenu departments__megamenu--xl`}>
                    <Megamenu menu={department.submenu.menu} location="department" />
                </div>
            );
        }

        return (
            <li key={index} className={`departments__item ${itemClass}`}>
                <Link to={url.category(department.url)}>
                    {department.title}
                    {arrow}
                </Link>
                {submenu}
            </li>
        );
    });

    return (
        <ul className="departments__links">
            {linksList}
        </ul>
    );
}


const mapStateToProps = (state) => {
    return{
        departments : state.categories.categories
    }
  }


const mapDispatchToProps = dispatch => {
  return {
    getCategoriesData: (category) => dispatch(getCategoriesData(category)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DepartmentsLinks)

