
// Renderizar vista del panel de  administración
const adminController = (req, res) => {
    const locals = {
        title:  'Administración'
    }
    res.render('dashboard', locals)

}


// Exportación de todos los controladores
module.exports ={
    adminController,
}