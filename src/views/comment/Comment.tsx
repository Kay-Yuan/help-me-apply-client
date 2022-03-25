import {
  Box,
  Button,
  CardContent,
  Typography,
  Card,
  CardActions,
  CircularProgress,
} from "@mui/material";
import CommentService from "@services/comment";
import { useSnackbar } from "notistack";
import React, { useState } from "react";

export default function CommentList({ reload, commentData }) {
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleDeleteComment = (id) => {
    setIsLoading(true);

    try {
      const response = CommentService.deleteCommentById(id);

      enqueueSnackbar("comment deleted!", { variant: "success" });
      reload();
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
    }

    setIsLoading(false);
  };

  return (
    <>
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
      {!isLoading &&
        (commentData.length === 0 ? (
          <Box component="div" mt={2}>
            No comment found
          </Box>
        ) : (
          commentData.map((comment) => (
            <Box sx={{ minWidth: 275, maxWidth: 1500, mt: 4 }}>
              <Card variant="outlined">
                <React.Fragment>
                  <CardContent>
                    <Typography
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      {new Date(comment.dateCreated).toLocaleString()}
                    </Typography>
                    <Typography variant="h5" component="div">
                      {comment.content}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Edit</Button>
                    <Button
                      size="small"
                      color="error"
                      onClick={() => handleDeleteComment(comment.id)}
                    >
                      Delete
                    </Button>
                  </CardActions>
                </React.Fragment>
              </Card>
            </Box>
          ))
        ))}
    </>
  );
}
