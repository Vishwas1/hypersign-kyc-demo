import { configDotenv } from "dotenv";
configDotenv()
export abstract class ProductConfig {
    public static SSI_SECRET_KEY: string | undefined = process.env.SSI_SECRET_KEY
    public static SSI_TENANT_URL: string | undefined = process.env.SSI_TENANT_URL
    public static ENTITY_DEV_DASHBOARD_OAUTH_URL: string  = process.env.ENTITY_DEV_DASHBOARD_OAUTH_URL || "https://api.entity.dashboard.hypersign.id/api/v1/app/oauth"
    public static KYC_SECRET_KEY: string | undefined =  process.env.KYC_SECRET_KEY 
    public static KYC_TENANT_URL: string | undefined = process.env.KYC_TENANT_URL
    public static PORT: string | undefined = process.env.PORT
}



