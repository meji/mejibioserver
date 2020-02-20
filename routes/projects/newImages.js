const express = require("express");
const router = express.Router();
const New = require("../../models/Project");
const { isAuthenticated } = require("../../middlewares/authentication");
const path = require("path");
const fs = require("fs");




router.post("/", isAuthenticated, async (req,res)=> {
    const {name} = req.query
    if (!req.files) {
        return res.status(400).json({message: "No se ha enviado ningún archivo"});
    }
    const imageFile = req.files.image;
    const imageFileLogo = req.files.logo

// Creamos una lista con las extensiones validas.
    const validExtensions = ["png", "jpg", "svg", "jpeg", "gif"];

//Dividimos el nombre del archivo extrayendo la extensión del nombre
    const splitedImageFileName = imageFile.name.split(".");
    const splitedImageFileNameLogo = imageFileLogo.name.split(".");

//recogemos la extensión
    const extensionImage = splitedImageFileName[splitedImageFileName.length - 1];
    const extensionImageLogo = splitedImageFileNameLogo[splitedImageFileNameLogo.length - 1];


// comprobamos que la extensión recibida concuera con las extensiones validas
    if (!validExtensions.includes(extensionImage) || !validExtensions.includes(extensionImageLogo))  {
        return res
            .status(422)
            .json({message: "La extensión del archivo no es válida"});
    }

//eliminamos la extensión del array
    splitedImageFileName.pop();
    splitedImageFileNameLogo.pop();

// creamos un nuevo nombre para el guardado del archivo con una id (en este caso le añadimos los milisegundos) y añadimos la extensión
    const fileNameWithId = `${splitedImageFileName}-${new Date().getMilliseconds()}.${extensionImage}`;
    const fileNameWithIdLogo = `${splitedImageFileNameLogo}-${new Date().getMilliseconds()}.${extensionImageLogo}`;

// Creamos el path absoluto donde guardaremos el archivo.
    const pathImage = path.resolve(
        __dirname,
        `../../uploads/projects/${fileNameWithId}`
    );
    const pathImageLogo = path.resolve(
        __dirname,
        `../../uploads/projects/${fileNameWithIdLogo}`
    );

    try {
        // Guardamos el archivo en el path señalado.
        await imageFile.mv(pathImage);
    } catch (error) {
        console.log(error);
        res.status(400).json({error});
    }
    try {
        // Guardamos el archivo Logo en el path señalado.
        await imageFileLogo.mv(pathImageLogo);
    } catch (error) {
        console.log(error);
        res.status(400).json({error});
    }
    try {
        const projectDB = await New.findOneAndUpdate({name}, {img: fileNameWithId, logo: fileNameWithIdLogo})

        // Recogemos el nombre del archivo anterior para poder eliminarlo de la carpeta y construimos el path
        const oldImagePath = path.resolve(
            __dirname,
            `../../uploads/projects/${projectDB.img}`
        );
        const oldImagePathLogo = path.resolve(
            __dirname,
            `../../uploads/projects/${projectDB.logo}`
        );

        // Si existe un archivo en dicho path con ese nombre, lo borramos.
        if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
        if (fs.existsSync(oldImagePathLogo)) fs.unlinkSync(oldImagePathLogo);

        return res.status(200).json({message: "Imagenes subidas correctamente"});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"});
    }
})
module.exports = router;