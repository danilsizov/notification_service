const sup = require('@supabase/supabase-js')
require('dotenv').config()

//Init DB
const supabase = sup.createClient(process.env.supabaseUrl, process.env.supabaseKey)

module.exports = supabase