import dotenv from "dotenv"
dotenv.config()

export const ROUTES_MK_API = Object.freeze( {
  // CONFIGURAR IP DO MIKROTIK OU URL
  create_user: `https://${process.env.MIKROTIK_IP}/rest/ip/hotspot/user`,
  run_script: `https://${process.env.MIKROTIK_IP}/rest/system/script/run`

})
