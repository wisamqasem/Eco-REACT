export const url = {
    home: () => '/',

    catalog: () => '/shop/catalog',

    category: (category) => `/shop/catalog/${category}`,

    subCategory: (subCategory,category) => `/shop/catalog/${category}?filter_category=${subCategory}`,

    product: (product) => `/shop/products/${product.slug['stringValue']}`,

    search : (searchQuery,category)=>searchQuery==''?'':`/search/${searchQuery}/${category}`
};

export function getCategoryParents(category) {
    return category.parent ? [...getCategoryParents(category.parent), category.parent] : [];
}
