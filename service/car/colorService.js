const Color = require('../../modell/car/colorModell');

module.exports = class ColorService {

    static async insertColor(color){
        const querryResultColor = await Color.getColorByColor(color);
        if(querryResultColor !== null){
            return querryResultColor.idcolor;
        } else {
            const insertColor = new Color(color);
            try{
                
                const id = await insertColor.saveColor(color);
                console.log(id);
                return id;
            } catch {
                res.status(500).json({ message: error})
            }
        }
    }
}