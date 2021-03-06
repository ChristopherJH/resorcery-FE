import { FaUserAlt, FaTrashAlt } from "react-icons/fa";
import CommentType from "../types/CommentType";
import RecommendationType from "../types/RecommendationType";
import UserType from "../types/UserType";
import dateFormatter from "../utils/dateFormatter";
import { handleDeleteComment } from "./Comments";

interface CommentProps {
  comment: CommentType;
  signedInUser: UserType;
  setComments: (input: CommentType[]) => void;
  recommendation: RecommendationType;
  comments: CommentType[];
}

export default function Comment(props: CommentProps): JSX.Element {
  return (
    <div className="comment-div">
      <div className="comment-header">
        <div className="d-flex">
          <h5 className="mr-2">
            <FaUserAlt />
          </h5>
          <h5 className="comment-name-rating">
            {props.comment.name}
            {props.comment.is_faculty && " (Faculty)"}
            {props.comment.is_like ? (
              <p className="comment-upvoted ml-2">⬆️</p>
            ) : (
              <p className="comment-downvoted ml-2">⬇️</p>
            )}
          </h5>
        </div>

        {props.signedInUser.user_id === props.comment.user_id && (
          <button
            id="deleteComment"
            className="btn btn-danger delete-comment-button"
            onClick={() => {
              handleDeleteComment(
                props.comment.comment_id,
                props.recommendation.recommendation_id,
                props.setComments
              );
            }}
          >
            <FaTrashAlt />
          </button>
        )}
      </div>
      <h6 className="comment-date">
        <i className="fa fa-calendar-o mr-2"></i>
        {dateFormatter(props.comment.date)}
      </h6>
      <p>{props.comment.body}</p>
      {props.comments.indexOf(props.comment) !== props.comments.length - 1 && (
        <hr
          className="solid
        "
        ></hr>
      )}
    </div>
  );
}
