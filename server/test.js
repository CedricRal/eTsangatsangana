const cloudinary = require('cloudinary').v2

cloudinary.config({
  cloud_name: "dbcebkda2",
  api_key: "274284662788553",
  api_secret: "j8mpmKXIDlGU5xBgPK8RJhQhaoE"
})
cloudinary.uploader.destroy("sample", (error, results)=>{
  if(error){
      console.log(error);
  }
  else{
    console.log(results)
  }
})