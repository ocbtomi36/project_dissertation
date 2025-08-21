const User = require('../modell/user/userModell');
const LocalityName = require('../modell/adress/localityNameModell');
const StreetType = require('../modell/adress/streetTypeModell');
const Address = require('../modell/adress/adressModell')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async(req,res,next) => {
    try {
        const {given_name, family_name,pin_number, user_role, email, password,locality_name,postal_code,street_name,street_type,house_number} = req.body;
        const hashedPassword = await bcrypt.hash(password,13);
        const hashedPinNumber = await bcrypt.hash(pin_number,13);
        const querryResultLocalityName = await LocalityName.getLocalityNameByLocName(locality_name);
        const querryResultStreetType = await StreetType.getStreetTypes(street_type);
        // localitiynames beszur, lekérdez, ha van akkor id megkap, ha nincs beszur id-t elment
        // streettypest beszur, lekérdez, ha van akkor id megkap, ha nincs beszur it-t elment
        let fkLocalaityName;
        let fkStreetType;
        let fkAddress;
        if(querryResultLocalityName !== null){
            fkLocalaityName = querryResultLocalityName.idlocality_name;
        } else {
            const localitiyName = new LocalityName(locality_name);
            try{
                fkLocalaityName = await localitiyName.saveLocalityName();
            } catch {
                res.status(500).json({ message: error})
            }
        }
        if(querryResultStreetType !== null){
            fkStreetType = querryResultStreetType.idstreet_type;
        } else {
            const streetType = new StreetType(street_type);
            try{
                fkStreetType = await streetType.saveStreetTypes(street_type);
            } catch {
                res.status(500).json({ message: error})
            }
        }
        const address = new Address(postal_code,street_name,house_number,fkLocalaityName,fkStreetType);
        const queryAddress = await address.getAdresses();
        if(queryAddress === null){
            
            const fkAddress = await address.saveAddresses();
            const insertingUser = new User(given_name, family_name,hashedPinNumber, user_role, email,hashedPassword,fkAddress);
            console.log(insertingUser)
            /*await insertingUser.save();
                res.status(201).json({
                message: 'User is Created'})
                */

        } else {
        const fkQuerryAddress = queryAddress.idaddress;
            const insertingUser = new User(given_name, family_name,hashedPinNumber, user_role, email,hashedPassword,fkQuerryAddress);
            await insertingUser.save();
                res.status(201).json({
                message: 'User is Created'})

        }
        // addressses beszur, adatellenőrzés, ok akkor beszúr visszaad id,

        // user beszur user adatvalidálás, majd addressid-val beszur. Azaz melyik felhasználó hol lakaik

    } catch (error) {
        res.status(500).json({ message: error})
    }
        
}
exports.login = async(req,res,next) => {
    try{
    const loadedUser = req.user;
    const token = jwt.sign({
        email: loadedUser.email,
        iduser: loadedUser.iduser,
        role: loadedUser.role
    }, process.env.JWT_SECRET, { expiresIn: '1h'});
    res.status(200).json({token: token, userId: loadedUser.iduser.toString()})
    } catch(error){
        console.log(error)
        res.status(500).json({message: 'An login error occured'})
    }
}