import axios from "axios";
import { CommentType } from "@global/comment";

const baseUrl = import.meta.env.VITE_API_URL;

const CommentService = {
  getCommentsWithAppId: async (applicationId: string) => {
    const { data } = await axios.get(
      `${baseUrl}/comment/byapplicationid?applicationId=${applicationId}`
    );

    return data;
  },

  //   getComment: async (id: string) => {
  //     const { data } = await axios.get(`${baseUrl}/comment/${id}`);

  //     return data;
  //   },

  addComment: async (newComment: Omit<CommentType, "id" | "dateCreated">) => {
    const { data } = await axios.post(`${baseUrl}/comment/create`, newComment);

    return data;
  },

  //   updateComment: async (
  //     newComment: Omit<Comment, "dateCreated">
  //   ) => {
  //     const { data } = await axios.put(
  //       `${baseUrl}/comment/${newComment.id}`,
  //       newComment
  //     );

  //     return data;
  //   },

    deleteCommentById : async (id: string) => {
      const { data } = await axios.delete(`${baseUrl}/comment/${id}`);

      return data;
    },

  //   commentListsWithCompanyNameJobTitle: async () => {
  //     const { data } = await axios.get(`${baseUrl}/comment/lists`);

  //     return data;
  //   },
};

export default CommentService;
