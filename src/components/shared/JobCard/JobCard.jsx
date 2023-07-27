import React from "react";
import "./JobCard.css";
import { netflix_icon } from "../../../assets";
import Button from "../Button/Button";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import {
  btnTexts,
  buttonTypes,
  jobCardConstants,
  textConstants,
} from "../../../constants/constants";
import { toast } from "react-toastify";

function JobCard({ jobData, deletePost, editPost }) {
  return (
    <section className="px-6 flex justify-between py-4 custom-card">
      <section className="flex gap-2">
        <img className="w-12 h-12" src={netflix_icon}></img>
        <section className="flex flex-col gap-6">
          <section className="font-color">
            <div>{jobData.job_title}</div>
            <div>
              {jobData.company_name} - {jobData.industry}
            </div>
            <div className="place-holder-color">
              {jobData.location} ({jobData.remote_type})
            </div>
          </section>
          <section className="flex flex-col gap-2 font-color">
            <div> {jobCardConstants.part_timings}</div>
            <div>
              {jobCardConstants.experience} ({jobData.experience_min}
              {jobCardConstants.hypen} {jobData.experience_max}{" "}
              {jobCardConstants.years})
            </div>
            <div>
              {jobCardConstants.inr} {jobData.salary_min}
              {jobCardConstants.hypen} {jobData.salary_max}{" "}
              {jobCardConstants.month}
            </div>
            <div>
              {jobData.total_employee} {jobCardConstants.employees}
            </div>
          </section>
          <Button
            onClick={() =>
              toast.success(textConstants.successMessages.job_applied)
            }
            btnType={
              jobData.apply_type === textConstants.applyTypes.quick_apply
                ? buttonTypes.primary
                : buttonTypes.secondary
            }
          >
            {jobData.apply_type === textConstants.applyTypes.quick_apply
              ? btnTexts.apply_now
              : btnTexts.external_apply}
          </Button>
        </section>
      </section>
      <section className=" flex gap-2">
        <PencilIcon
          className="h-6 w-6 font-color cursor-pointer"
          title="edit job post"
          onClick={() => editPost(jobData.id)}
        />
        <TrashIcon
          className="h-6 w-6 error-color cursor-pointer"
          title="delete job post"
          onClick={() => deletePost(jobData.id)}
        />
      </section>
    </section>
  );
}

export default JobCard;
