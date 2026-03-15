import Application from "../models/Application.model.js";

// APPLY FOR LOAN:
export const applyLoan = async (req, res) => {
    try{
        const {bankId, loanAmount, tenureYears} = req.body;

        const application = await Application.create({
            user: req.user._id,
            bank: bankId,
            loanAmount,
            tenureYears
        });

        res.status(201).json({message: "Application Submitted", application});
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
}


// ADMIN UPDATE APPLICATION STATUS
export const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true,
        runValidators: true
       }
      
    );

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.json({
      message: "Application status updated",
      application,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




// GET USER APPLICATIONS
export const getUserApplications = async (req, res) => {
  try {

    const applications = await Application.find({
      user: req.user._id
    }).populate("bank", "name interestRate");

    res.json(applications);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



//GET ALL APPLICATIONS (ADMIN):
export const getAllApplications = async (req, res) => {
  try{
    const applications = await Application.find()
    .populate("bank", "name interestRate")
    .populate("user", "name email")

    res.json(applications);
  }
  catch(error){
    res.status(500).json({ message: error.message });
  }
}