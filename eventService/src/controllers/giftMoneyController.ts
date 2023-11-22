import bankDetails from "../models/bankDetails";
import giftMoney, { IGiftMoney } from "../models/giftMoney";
const razorpay = require('razorpay');
const razorpayKey= "rzp_test_sIR02kOhciAGll";
const  razorpaySecret="mg1EJI3f1zr07H6YeRkCF98O";
export default class giftMoneyController {

    public async createOrder(body: any) {
        const { amount, donorId, email,userId,postId,status,note } = body;
        var instance = new razorpay({ key_id: razorpayKey, key_secret: razorpaySecret })
    return    instance.orders.create({
          amount: 2000,
          currency: "INR",
          transfers: [
            {
              account: "acc_N2ytFnw3TUUP0K",
              amount: 2000,
              currency: "INR",
              notes: {
                branch: "Acme Corp Bangalore North",
                name: "Gaurav Kumar"
              },
              linked_account_notes: [
                "branch"
              ],
              on_hold: 1,
              on_hold_until: 1771222870
            }
          ]
        })


        const order = await razorpay.orders.create({
          amount: amount * 100, 
          currency: 'INR',
          receipt: 'donation_receipt',
        });
    

        const donation = new giftMoney({
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


    
    public async transfergiftMoney(body: any) {
            const { userId } = body;
            let bankDetail=await bankDetails.findOne({userId:userId,isDeleted:false}).lean()
            const totalDonationAmount = await giftMoney.aggregate([
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