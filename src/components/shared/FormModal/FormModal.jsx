import React, { useEffect, useState } from "react";
import "./FormModal.css";
import Input from "../Input/Input";
import Button from "../Button/Button";
import Radio from "../Radio/Radio";
import { createJobPost, getJobPostData, updateJobPost } from "../../../api/api";
import { toast } from "react-toastify";
import {
  applyTypeOptions,
  buttonTypes,
  textConstants,
} from "../../../constants/constants";
import { checkIsFormValid, validateFields } from "../../../utils/validations";

function FormModal({ closeModal, editPostId = null, fetchAllJobPosts }) {
  const [form, setForm] = useState({
    job_title: { value: "", error: "" },
    company_name: { value: "", error: "" },
    industry: { value: "", error: "" },
    location: { value: "", error: "" },
    remote_type: { value: "", error: "" },
    experience_min: { value: null, error: "" },
    experience_max: { value: null, error: "" },
    salary_min: { value: null, error: "" },
    salary_max: { value: null, error: "" },
    total_employee: { value: null, error: "" },
    apply_type: { value: "", error: "" },
  });
  const [currentStep, setcurrentStep] = useState(1);

  useEffect(() => {
    if (editPostId) {
      getJobPostData(editPostId).then((data) =>
        setForm({
          job_title: { value: data.job_title, error: "" },
          company_name: { value: data.company_name, error: "" },
          industry: { value: data.industry, error: "" },
          location: { value: data.location, error: "" },
          remote_type: { value: data.remote_type, error: "" },
          experience_min: { value: data.experience_min, error: "" },
          experience_max: { value: data.experience_max, error: "" },
          salary_min: { value: data.salary_min, error: "" },
          salary_max: { value: data.salary_max, error: "" },
          total_employee: { value: data.total_employee, error: "" },
          apply_type: { value: data.apply_type, error: "" },
        })
      );
    }
  }, []);

  const onFieldUpdate = (e, type) => {
    let numberFields = [
      "experience_min",
      "experience_max",
      "salary_min",
      "salary_max",
      "total_employee",
    ];
    let value = numberFields.includes(type) ? +e.target.value : e.target.value;
    let error = validateFields(type, value);
    setForm({ ...form, [type]: { value: e.target.value, error: error } });
  };

  const onClickNext = () => {
    if (checkIsFormValid(form)) {
      if (currentStep === 1) {
        setcurrentStep(2);
      } else {
        let formData = {
          job_title: form.job_title.value,
          company_name: form.company_name.value,
          industry: form.industry.value,
          location: form.location.value,
          remote_type: form.remote_type.value,
          experience_min: form.experience_min.value,
          experience_max: form.experience_max.value,
          salary_min: form.salary_min.value,
          salary_max: form.salary_max.value,
          total_employee: form.total_employee.value,
          apply_type: form.apply_type.value,
        };
        if (editPostId) {
          updateJobPost(editPostId, formData).then((res) => {
            toast.success(textConstants.successMessages.post_updated);
            closeModal();
            fetchAllJobPosts();
          });
        } else {
          createJobPost(formData).then((res) => {
            toast.success(textConstants.successMessages.post_created);
            closeModal();
            fetchAllJobPosts();
          });
        }
      }
    } else {
      toast.error(textConstants.warningMessages.fill_required_fields);
    }
  };

  return (
    <section
      className="dialogue-backdrop"
      onClick={(e) => e.target === e.currentTarget && closeModal()}
    >
      <div className="custom-modal lg:w-6/12 sm:w-8/12">
        <section>
          <section className="flex justify-between items-center mb-6">
            <div className="text-xl font-color">Create a Job</div>
            <div className="text-base font-color">Step {currentStep}</div>
          </section>

          <form className="mb-24">
            {currentStep === 1 ? (
              <section className="flex flex-col gap-6">
                <Input
                  id="job_title"
                  errorMsg={form.job_title.error}
                  label={textConstants.labels.job_title}
                  value={form?.job_title.value}
                  placeholder={textConstants.placeholders.job_title}
                  required={true}
                  onChange={onFieldUpdate}
                />
                <Input
                  id="company_name"
                  errorMsg={form.company_name.error}
                  label={textConstants.labels.company_name}
                  value={form?.company_name.value}
                  placeholder={textConstants.placeholders.company_name}
                  required={true}
                  onChange={onFieldUpdate}
                />
                <Input
                  id="industry"
                  errorMsg={form.industry.error}
                  label={textConstants.labels.industry}
                  value={form?.industry.value}
                  placeholder={textConstants.placeholders.industry}
                  required={true}
                  onChange={onFieldUpdate}
                />
                <section className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-6">
                  <Input
                    id="location"
                    errorMsg={form.location.error}
                    label={textConstants.labels.location}
                    value={form?.location.value}
                    placeholder={textConstants.placeholders.location}
                    onChange={onFieldUpdate}
                  />
                  <Input
                    id="remote_type"
                    errorMsg={form.remote_type.error}
                    label={textConstants.labels.remote_type}
                    value={form?.remote_type.value}
                    placeholder={textConstants.placeholders.remote_type}
                    onChange={onFieldUpdate}
                  />
                </section>
              </section>
            ) : (
              <section className="flex flex-col gap-6">
                <section className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-6">
                  <Input
                    id="experience_min"
                    type="number"
                    errorMsg={form.experience_min.error}
                    label={textConstants.labels.experience_min}
                    value={form?.experience_min.value}
                    placeholder={textConstants.placeholders.experience_min}
                    onChange={onFieldUpdate}
                  />
                  <Input
                    id="experience_max"
                    type="number"
                    errorMsg={form.experience_max.error}
                    label={textConstants.labels.experience_max}
                    value={form?.experience_max.value}
                    placeholder={textConstants.placeholders.experience_max}
                    onChange={onFieldUpdate}
                  />
                </section>
                <section className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-6">
                  <Input
                    id="salary_min"
                    type="number"
                    errorMsg={form.salary_min.error}
                    label={textConstants.labels.salary_min}
                    value={form?.salary_min.value}
                    placeholder={textConstants.placeholders.salary_min}
                    onChange={onFieldUpdate}
                  />
                  <Input
                    id="salary_max"
                    type="number"
                    errorMsg={form.salary_max.error}
                    label={textConstants.labels.salary_max}
                    value={form?.salary_max.value}
                    placeholder={textConstants.placeholders.salary_max}
                    onChange={onFieldUpdate}
                  />
                </section>
                <Input
                  id="total_employee"
                  type="number"
                  errorMsg={form.total_employee.error}
                  label={textConstants.labels.total_employee}
                  value={form?.total_employee.value}
                  placeholder={textConstants.placeholders.total_employee}
                  onChange={onFieldUpdate}
                />
                <Radio
                  id={"apply_type"}
                  label={textConstants.labels.apply_type}
                  onChange={onFieldUpdate}
                  value={form?.apply_type.value}
                  layout={"INLINE"}
                  optionlist={applyTypeOptions}
                />
              </section>
            )}
          </form>

          <section className="flex justify-between">
            <section>
              {currentStep === 2 && (
                <Button
                  title={"Back"}
                  btnType={buttonTypes.secondary}
                  onClick={() => setcurrentStep(1)}
                >
                  Back
                </Button>
              )}
            </section>
            <Button
              title={"Next"}
              btnType={buttonTypes.primary}
              onClick={onClickNext}
            >
              {currentStep === 1 ? "Next" : "Save"}
            </Button>
          </section>
        </section>
      </div>
    </section>
  );
}

export default FormModal;
