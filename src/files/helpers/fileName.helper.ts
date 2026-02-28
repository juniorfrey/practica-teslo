import { v4 as uuid } from "uuid";
export const fileName = (
  req: Express.Request ,
  file: Express.Multer.File, 
  callback: Function
) => {
  if (!file) return callback(new Error("No file uploaded!"), false);

  //const fileName = `${file.originalname.split('.')[0]}-${Date.now()}-nuevo`;
  const fileExtension = file.mimetype.split("/")[1];
  const fileName = `${uuid()}.${fileExtension}`;
  

 
  callback(null, fileName);
};
