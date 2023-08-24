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
            const type = files.file.mimetype;
            if (err) return reject(err)

            if(type.indexOf("image") !== -1)
            {
                var newFilename = files.file.newFilename.concat("", files.file.originalFilename.slice(files.file.originalFilename.lastIndexOf(".")));
                var oldPath = files.file.filepath;
                var newPath = `./public/uploads/item_images/${newFilename}`;
                mv(oldPath, newPath, function(err) {
                });
                res.status(200).json({filename: newFilename})
            }else{
                res.status(200).json({error: "Not Image file"})
            }
        })
    })
    
}