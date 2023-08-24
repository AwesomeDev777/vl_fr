import { IncomingForm } from 'formidable'
import { promises as fs } from 'fs'

var mv = require('mv');


export const config = {
    api: {
       bodyParser: false,
    }
};
 
export default async (req, res) => {
    
    const data = await new Promise((resolve, reject) => {
        const form = new IncomingForm()
        form.parse(req, (err, fields, files) => {
            var removePath = `./public/uploads/item_images/${fields.text}`;
            if (err) return reject(err)          
            fs.unlink(removePath, (err) => {
                if(err){
                    console.log(err)            
                    res.status(200).json({error: "Error exists"})
                }
            })  
            res.status(200).json({success: true})
        })
    })
    
}