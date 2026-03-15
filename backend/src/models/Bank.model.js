
// import mongoose from "mongoose";

// const bankSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true
//     },
//     minScore: {
//         type: Number,
//         required: true
//     },
//     minIncome: {
//         type: Number,
//         required: true
//     },
//     interestRate: {
//         type: Number,
//         required: true
//     },
//     processingFee: {
//         type: Number,
//         required: true
//     },
//     maxLoanAmount: {
//         type: Number,
//         required: true
//     },
//     loanTypes: {
//         type: [String],
//         required: true
//     },
// },
//     { timestamps: true }
// );


// export default mongoose.model("Bank", bankSchema);



//UPDATED BANK MODEL:
import mongoose from "mongoose";

const bankSchema = new mongoose.Schema({

name: {
type: String,
required: true
},

logo: {
type: String
},

interestRate: {
type: Number,
required: true
},

minScore: {
type: Number
},

minIncome: {
type: Number
},

maxLoanAmount: {
type: Number
},

loanTypes: {
type: [String]
}

});

export default mongoose.model("Bank", bankSchema);