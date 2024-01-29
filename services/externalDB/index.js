const supabase = require('../../db/db_init')

//Mock external DB
const getUserById = async (user_id) => {
    const { data: users_external, error } = await supabase
        .from('users_external')
        .select("*")
        .eq('id', user_id)
    
    return(users_external[0])
}

module.exports = { getUserById }