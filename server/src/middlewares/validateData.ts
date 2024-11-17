import {Request,Response,NextFunction} from 'express'
import {ZodError,ZodSchema} from 'zod'

export default function validateData(schema:ZodSchema){
    return (req: Request,res:Response,next:NextFunction) => {
        try {
            schema.parse(req.body);
            next();
        } catch(err){

        }
    }
}