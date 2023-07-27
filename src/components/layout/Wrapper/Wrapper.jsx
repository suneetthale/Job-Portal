import React, { useEffect, useState } from "react";
import Button from "../../shared/Button/Button";
import "./Wrapper.css";
import { deleteJobPost, getCreatedJobPosts } from "../../../api/api";
import JobCard from "../../shared/JobCard/JobCard";
import FormModal from "../../shared/FormModal/FormModal";
import { toast } from "react-toastify";
import {
  btnTexts,
  buttonTypes,
  textConstants,
} from "../../../constants/constants";

function Wrapper() {
  const [jobPosts, setjobPosts] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editPostId, setEditPostId] = useState(null);

  const fetchAllJobPosts = () => {
    getCreatedJobPosts().then((res) => setjobPosts(res));
  };

  useEffect(() => {
    fetchAllJobPosts();
  }, []);

  const deletePost = (id) => {
    deleteJobPost(id).then((res) => {
      toast.success("post deleted successfully");
      fetchAllJobPosts();
    });
  };

  const closeModal = () => {
    setOpenModal(false);
    setEditPostId(null);
  };

  const editPost = (id) => {
    setOpenModal(true);
    setEditPostId(id);
  };

  return (
    <section className="custom-background">
      <section className="flex text-xl p-4 justify-center items-center custom-header">
        Job Creation Portal
      </section>
      <section className="flex flex-col gap-5 p-5">
        <section>
          <Button
            btnType={buttonTypes.primary}
            onClick={() => setOpenModal(true)}
          >
            {btnTexts.create_job}
          </Button>
        </section>
        <section className="flex flex-col gap-4">
          <section className="text-xl">Created Job Posts</section>
          <section className="grid grid-cols-2 gap-10">
            {jobPosts && jobPosts.length ? (
              jobPosts.map((data, i) => (
                <JobCard
                  key={i}
                  jobData={data}
                  deletePost={deletePost}
                  editPost={editPost}
                ></JobCard>
              ))
            ) : (
              <div>{textConstants.warningMessages.no_posts}</div>
            )}
          </section>
        </section>
      </section>
      {openModal && (
        <FormModal
          closeModal={closeModal}
          fetchAllJobPosts={fetchAllJobPosts}
          editPostId={editPostId}
        />
      )}
    </section>
  );
}

export default Wrapper;
