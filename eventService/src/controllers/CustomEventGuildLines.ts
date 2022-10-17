import EventGuildLines, { IEventGuildLines } from "../models/CustomEventGuidlines";
import { ICategory } from "../models/Category";
export default class EventGuildLinesController {

    public async createEventGuildLines(body: any) {

        let EventGuildLinesInfo: any;
       
            EventGuildLinesInfo = await EventGuildLines.create(body);
        
        return EventGuildLinesInfo;

    }

    public async editEventGuildLines(body: IEventGuildLines, EventGuildLinesId: string) {
        const EventGuildLinesInfo: IEventGuildLines = await EventGuildLines.findOneAndUpdate({ _id: EventGuildLinesId, isDeleted: false }, body, { new: true }).lean();
        return EventGuildLinesInfo;
    }

    public async getEventGuildLinesList(categoryId:any) {
        const EventGuildLinesList: any = await EventGuildLines.find({categoryId: categoryId, isDeleted: false });
        return EventGuildLinesList;
    }

    public async getEventGuildLinesInfoById(EventGuildLinesId: string) {
        const EventGuildLinesInfo: IEventGuildLines = await EventGuildLines.findOne({ _id: EventGuildLinesId, isDeleted: false }).lean();
        return EventGuildLinesInfo;
    }

    public async deleteEventGuildLines(EventGuildLinesId: String) {
        const EventGuildLinesInfo: IEventGuildLines = await EventGuildLines.findOneAndUpdate({ _id: EventGuildLinesId, isDeleted: false }, { $set: { isDeleted: true } }, { new: true }).lean();
        return EventGuildLinesInfo;
    }
}