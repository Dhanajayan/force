import * as routes from "./routes"
import adminOnly from "desktop/lib/admin_only"
import express from "express"

export const app = express()

app.set("view engine", "jade")
app.set("views", `${__dirname}/components`)
app.get("/react-example", adminOnly, routes.index)
