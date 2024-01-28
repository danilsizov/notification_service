const supabase = require('./db_init')

const getCategoryById = async (category_id) => {
    const { data: categories, error } = await supabase
        .from('categories')
        .select("*")
        .eq('id', category_id)
    
    return(categories[0])
}

module.exports = { getCategoryById }