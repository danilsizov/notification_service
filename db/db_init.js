const sup = require('@supabase/supabase-js')
require('dotenv').config()

const supabase = sup.createClient(process.env.supabaseUrl, process.env.supabaseKey)

module.exports = supabase