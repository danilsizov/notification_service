const supabase = require('./db_init')

const getCategoryById = async (category_id) => {
    const { data: categories, error } = await supabase
        .from('categories')
        .select("*")
        .eq('id', category_id)
    
    return(categories[0])
}

//Get all categories except "critical", (id = 1)
const getAllCategories = async () => {
    const { data: categories, error } = await supabase
        .from('categories')
        .select("*")
        .neq('id', 1)
    
    return(categories)
}

module.exports = { getCategoryById, getAllCategories }