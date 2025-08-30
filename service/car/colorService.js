const Color = require('../../modell/car/colorModell');

module.exports = class ColorService {

    static async insertColor(color){
        const querryResultColor = await Color.getColorByColor(color);
        if(querryResultColor !== null){
            return querryResultColor.idcolor;
        } else {
            const insertColor = new Color(color);
            try{
                return await insertColor.saveColor(color);
            } catch {
                res.status(500).json({ message: error})
            }
        }
    }
}