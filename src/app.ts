import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
import router from "./app/routes";
import globalErrorHandler from "./app/middlewars/globalErrorHandler";

const app: Application = express();

// middlewars
app.use(cors())

// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use("/api", router)


app.get("/", (req: Request, res: Response) => {
    res.send({
        message: "Pet-Adoption server is running"
    })
})

app.use(globalErrorHandler)

app.use((req:Request,res:Response,next:NextFunction)=>{
    res.status(404).json({
        success:false,
        message: "Api Not Found",
        error:{
            path:req.originalUrl,
            message:"Your requested path is not found"
        }
    })
})


export default app;