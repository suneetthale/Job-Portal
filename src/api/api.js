import { toast } from "react-toastify";
import { axiosInstance } from "../utils/axiosInstance";

export function getCreatedJobPosts() {
  return axiosInstance.get(`/job_post_details`).then((res) => res.data).catch(err => toast.error(err.message));
}

export function getJobPostData(id) {
  return axiosInstance.get(`/job_post_details/${id}`).then((res) => res.data).catch(err => toast.error(err.message));
}

export function deleteJobPost(id) {
  return axiosInstance
    .delete(`/job_post_details/${id}`)
    .then((res) => res.data).catch(err => toast.error(err.message));
}

export function updateJobPost(id, updatedData) {
  return axiosInstance
    .put(`/job_post_details/${id}`, updatedData)
    .then((res) => res.data).catch(err => toast.error(err.message));
}

export function createJobPost(formData) {
  return axiosInstance
    .post(`/job_post_details`, formData)
    .then((res) => res.data).catch(err => toast.error(err.message));
}
