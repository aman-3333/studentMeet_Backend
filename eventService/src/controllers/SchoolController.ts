import school from "../models/school";
import FuzzySearch from "fuzzy-search";
import { ObjectId } from "mongoose";

import School from "../models/school";

export default class SchoolController {
  //////////////////////////////school///////////////////////////////////////////////////////////

  public async createschool(body: any) {
    let schoolInfo: any;
    schoolInfo = await school.create(body);

    return schoolInfo;
  }

  public async editschool(body: any, schoolId: string) {
    const schoolInfo: any = await school
      .findOneAndUpdate({ _id: schoolId, isDeleted: false }, body, {
        new: true,
      })
      .lean();
    return schoolInfo;
  }

  public async getSchool() {
   

    const schoolList= await school.aggregate([
      {
        $match: {
          isDeleted: false,
        },
      },
      {
        $lookup: {
          localField: "faculty",
          from: "userdetails",
          foreignField: "_id",
          as: "faculty",
        },
      },
      {
        $lookup: {
          localField: "schoolOwnerId",
          from: "school_owners",
          foreignField: "_id",
          as: "schoolOwner",
        },
      },
      { $unwind: { path: '$schoolOwner', preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          localField: "city",
          from: "cities",
          foreignField: "_id",
          as: "city",
        },
      },
      { $unwind: { path: '$city', preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          localField: "state",
          from: "states",
          foreignField: "_id",
          as: "state",
        },
      },
      { $unwind: { path: '$state', preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          localField: "country",
          from: "countries",
          foreignField: "_id",
          as: "country",
        },
      },
      { $unwind: { path: '$country', preserveNullAndEmptyArrays: true } },
    ]);

    return schoolList;
  }
  public async searchschool( searchValue: any) {
    if (searchValue) {
      let schoolList: any = await school.find({
       
        isDeleted: false,
      });
      schoolList = new FuzzySearch(schoolList, ["schoolName"], {
        caseSensitive: false,
      });
      schoolList = schoolList.search(searchValue);
      return schoolList;
    }
  }





  public async getSchoolInfoById(schoolId: any) {
    const schoolInfo: any = await school
      .findOne({ _id: schoolId, isDeleted: false })
      .lean();

    return schoolInfo;
  }

  public async deleteschool(schoolId: any) {
    const schoolInfo: any = await school
      .findOneAndUpdate(
        { _id: schoolId, isDeleted: false },
        { $set: { isDeleted: true } }
      )
      .lean();
    return schoolInfo;
  }

  public async createSchool(body: any) {
    let schoolInfo: any;
    schoolInfo = await School.create(body);

    return schoolInfo;
  }

  public async editSchool(body: any, SchoolId: string) {
    const schoolInfo: any = await School.findOneAndUpdate(
      { _id: SchoolId, isDeleted: false },
      body,
      { new: true }
    ).lean();
    return schoolInfo;
  }


  public async searchSchool(stateId: any, search: any) {
    if (search) {
      let schoolList: any = await School.find({ isDeleted: false });
      schoolList = new FuzzySearch(schoolList, ["SchoolName"], {
        caseSensitive: false,
      });
      schoolList = schoolList.search(search);
      return schoolList;
    }
  }

  public async deleteSchool(SchoolId: any) {
    const schoolInfo: any = await School.findOneAndUpdate(
      { _id: SchoolId, isDeleted: false },
      { $set: { isDeleted: true } }
    ).lean();
    return schoolInfo;
  }
}
