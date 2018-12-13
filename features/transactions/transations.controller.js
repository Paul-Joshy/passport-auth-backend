const TransactionModel = require('../../models/Transactions.models');
const to = require('await-to-js').to;
const p = require('../../helpers/props').get;

const createTransaction = async (req, res) => {
    console.log(req);
    
    const {body, user} = req;
    if(body && user){
        let newTransaction = {
            user_id: user.id,
            name: body.transactionName,
            type: body.transactionType,
            amount: body.transactionAmount
        }
        let result = await TransactionModel.create(newTransaction);
        if(result){
            return res.status(200).json(result)
        }
        else{
            return res.status(500).json({error: "Cannot create transactions"})
        }
    }
}

const getUserTransactions = async (req, res) => {
    const {body, user} = req;

    if(body && user){
        let query = p([req.body,"query"], {});
        query.user_id = user.id;
        let [err, body] = await to(TransactionModel.find(query));
        if(err)
            return res.status(500).json({error: "error in getting user transactions"});
        else
            return res.status(200).json(body);
    }
}

const updateUserTransactions = (req, res) => {

}

const deleteUserTransactions = (req, res) => {

}

module.exports = {
    createTransaction,
    getUserTransactions,
    updateUserTransactions,
    deleteUserTransactions
}