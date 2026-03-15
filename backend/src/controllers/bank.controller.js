import Bank from "../models/Bank.model.js";

//ADD BANK OFFER:
export const addBank = async (req, res) => {
    try{
        const bank = await Bank.create(req.body);

        res.status(201).json({
            message: "Bank Added Successfully",
            bank,
        })

    }
    catch(error){
        res.status(500).json({message: error.message});
    }
}


//GET ALL BANKS:
export const getBanks = async (req, res) => {
    try{
        const banks = await Bank.find();

        res.json(banks);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
}


//UPDATE BANK :
export const updateBank = async (req, res) => {
    try{
        const bank = await Bank.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new : true}
       )
       res.json(bank);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
}


//DELETE BANK:
export const deleteBank = async (req, res) => {
    try{
        const bank = await Bank.findByIdAndDelete(req.params.id);

        if(!bank){
            return res.status(404).json({message: "Bank not found"});
        }

        res.json({message: "Bank Delete Successfully"});
    }
    catch(error){
        req.status(500).json({message: error.message});
    }
} 