import Hashtag, { IHashtag } from "../models/Hashtag";

export default class HashtagController {

    public async createHashtag(body: any) {
        let HashtagInfo: any;
        if (body.length > 0) {
            HashtagInfo = await Hashtag.create(body);
        }
        return HashtagInfo;
    }

    public async editHashtag(body: IHashtag, HashtagId: string) {
        const HashtagInfo: IHashtag = await Hashtag.findOneAndUpdate({ _id: HashtagId, isDeleted: false }, body, { new: true }).lean();
        return HashtagInfo;
    }

    public async getHashtagList() {
        const HashtagList: IHashtag[] = await Hashtag.find({ isDeleted: false,isActive: true }).sort({totalClick:-1});
        return HashtagList;
    }

    public async getHashtagInfoById(HashtagId: string) {
        const HashtagInfo: IHashtag = await Hashtag.findOne({ _id: HashtagId, isDeleted: false }).lean();
        return HashtagInfo;
    }

    public async deleteHashtag(HashtagId: String,userId:any) {
        const HashtagInfo: IHashtag = await Hashtag.findOneAndUpdate({ _id: HashtagId, isDeleted: false }, { $set: { isDeleted: true,deletedPersonId:userId } }, { new: true }).lean();
        return HashtagInfo;
    }
}