import { memo, useEffect, useState } from "react";
import {
  Button,
  Box,
  Modal,
  CircularProgress,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import applicationService from "@services/application";
import { useSnackbar } from "notistack";
import { Application } from "@global/application";
import { CommentType } from "@global/comment";
import AddOrUpdateApplicationModal from "./AddOrUpdateApplicationModal";
import commentService from "@services/comment";
import { LoadingButton } from "@mui/lab";
import { CommentList } from "@views/comment";

const CommentListMemo = memo(CommentList);

export default function ApplicationDetail() {
  const [applicationData, setApplicationData] = useState<Application>(null);
  const [commentData, setCommentData] = useState<Comment[]>([]);
  const [commentBuffer, setCommentBuffer] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCommentLoading, setIsCommentLoading] = useState<boolean>(false);
  const { applicationId } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [isOpenDeleteConfirmModal, setIsOpenDeleteConfirmModal] =
    useState(false);
  const [isOpenEditApplicationModal, setIsOpenEditApplicationModal] =
    useState<boolean>(false);
  const [reload, setReload] = useState({});
  const [reloadComment, setReloadComment] = useState({});

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      try {
        const _applicationData = await applicationService.getApplication(
          applicationId
        );
        setApplicationData(_applicationData);
      } catch (error) {
        enqueueSnackbar(error.message, { variant: "error" });
      }

      setIsLoading(false);
    })();
  }, [reload]);

  useEffect(() => {
    (async () => {
      setIsCommentLoading(true);

      try {
        const _comment = await commentService.getCommentsWithAppId(
          applicationId
        );
        console.log(_comment);
        setCommentData(_comment);
      } catch (error) {
        enqueueSnackbar(error.message, { variant: "error" });
      }
      setIsCommentLoading(false);
    })();
  }, [reloadComment]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleDelete = () => {
    setIsOpenDeleteConfirmModal(true);
  };

  const handleOpenEditApplicationModal = () => {
    setIsOpenEditApplicationModal(true);
  };

  const handleCloseEditApplicationModal = () => {
    setIsOpenEditApplicationModal(false);
  };

  const handleAddComment = async () => {
    try {
      setIsCommentLoading(true);

      const response = await commentService.addComment({
        content: commentBuffer,
        applicationId,
      });

      setCommentBuffer("");
      enqueueSnackbar("Comment added successfully", { variant: "success" });
      setReloadComment({});
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
    } finally {
      setIsCommentLoading(false);
    }
  };

  const handleConfirmDelete = () => {
    (async () => {
      await applicationService.deleteApplication(applicationId);
      navigate(-1);

      enqueueSnackbar("Application deleted successfully", {
        variant: "success",
      });
    })();
  };

  const handleClose = () => setIsOpenDeleteConfirmModal(false);

  return (
    <Box p={2}>
      <Box component="span">
        <Button onClick={handleGoBack} variant="outlined">
          Back
        </Button>
      </Box>
      <Box component="span" ml={2}>
        <Button onClick={handleOpenEditApplicationModal} variant="contained">
          Edit
        </Button>
      </Box>
      <Box component="span" ml={2}>
        <Button onClick={handleDelete} variant="contained" color="error">
          Delete
        </Button>
      </Box>

      <Modal
        open={isOpenDeleteConfirmModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box p={2} style={{ marginLeft: "35%", marginTop: "20%" }}>
          <Box component="p" color={"white"} fontSize={30}>
            Do you want to delete this application?
          </Box>
          <Box component="span" ml={12}>
            <Button onClick={handleClose} variant="contained">
              Cancel
            </Button>
          </Box>
          <Box component="span" ml={2}>
            <Button
              onClick={handleConfirmDelete}
              variant="contained"
              color="error"
            >
              Confirm
            </Button>
          </Box>
        </Box>
      </Modal>

      {isLoading && (
        <Box
          component="div"
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="300px"
        >
          <CircularProgress />
        </Box>
      )}

      {!isLoading && (
        <>
          <Box component="h1">
            Create/Last Modified Time:
            {new Date(applicationData?.dateCreated).toLocaleString()}
          </Box>

          {applicationData?.applicationStatus && (
            <Box component="h4">
              Application Status: {applicationData?.applicationStatus}
            </Box>
          )}

          {applicationData?.expectedSalary && (
            <Box component="h4">
              Expected Salary(AUD): {applicationData?.expectedSalary}
            </Box>
          )}

          <TextField
            style={{ background: "white", width: 1000 }}
            label="New Comment"
            multiline
            rows={7}
            placeholder="Type comment here..."
            value={commentBuffer}
            onChange={(e) => setCommentBuffer(e.target.value)}
          />

          <Box component="div" mt={2}>
            <LoadingButton
              loading={isCommentLoading}
              onClick={handleAddComment}
              variant="contained"
            >
              Add Comment
            </LoadingButton>
          </Box>

          <h2 style={{ marginTop: 75 }}>Comment:</h2>

          {isCommentLoading && (
            <Box
              component="div"
              display="flex"
              alignItems="center"
              justifyContent="center"
              height="300px"
            >
              <CircularProgress />
            </Box>
          )}

          {!isCommentLoading && (
            <CommentListMemo
              commentData={commentData}
              reload={() => setReloadComment({})}
            />
          )}

          {isOpenEditApplicationModal && (
            <AddOrUpdateApplicationModal
              applicationData={applicationData}
              onClose={handleCloseEditApplicationModal}
              reload={() => setReload({})}
            />
          )}
        </>
      )}
    </Box>
  );
}
