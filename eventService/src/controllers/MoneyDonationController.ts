import bankDetails from "../models/bankDetails";
import moneyDonation, { IMoneyDonation } from "../models/moneyDonation";
const razorpay = require('razorpay');
export default class moneyDonationController {

    public async createmoneyDonation(body: any) {

        const { amount, donorId, email,userId,postId,status,note } = body;

        const order = await razorpay.orders.create({
          amount: amount * 100, // Amount in paise
          currency: 'INR',
          receipt: 'donation_receipt',
        });
    
        // Save donation details to the database
        const donation = new moneyDonation({
          amount,
          donorId,
          postId,
          userId,
          status,
          note,
          paymentId: order.id,
        });
        await donation.save();
        
        return ;

    }

    public async transferMoneyDonation(body: any) {

       
            // Retrieve bank account details from the request
            const { userId } = body;
        
            let bankDetail=await bankDetails.findOne({userId:userId,isDeleted:false}).lean()
            // Find the total donation amount to transfer
            const totalDonationAmount = await moneyDonation.aggregate([
              {
                $group: {
                  _id: null,
                  totalAmount: { $sum: '$amount' },
                },
              },
            ]);
        
            if (totalDonationAmount.length === 0) {
              return ({ error: 'No donations found' });
            }
        
            const amountToTransfer = totalDonationAmount[0].totalAmount;
            const payout = await razorpay.payouts.create({
              account_number: bankDetail,
              account_holder_name: bankDetail,
              account_type: 'bank_account',
              amount: amountToTransfer * 100, // Amount in paise
              currency: 'INR',
              mode: 'manual',
              purpose: 'donation_payout',
            });
        
        
          
        
        return payout;

    }







 



}