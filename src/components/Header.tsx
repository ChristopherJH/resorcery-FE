import SignIn from "./SignIn";
import CreateRecommendation from "./CreateRecommendation";
import UserType from "../types/UserType";
import TagType from "../types/TagType";
import StageType from "../types/StageType";
import RecommendationType from "../types/RecommendationType";
import StudyListType from "../types/StudyListType";
import { FaUserAlt } from "react-icons/fa";

interface HeaderProps {
  signedInUser: UserType;
  tags: TagType[];
  stages: StageType[];
  setRecommendations: (input: RecommendationType[]) => void;
  recommendations: RecommendationType[];
  setTags: (input: TagType[]) => void;
  users: UserType[];
  setUsers: (input: UserType[]) => void;
  setSignedInUser: (input: UserType) => void;
  studyList: StudyListType[];
  setStudyList: (input: StudyListType[]) => void;
  studyListClicked: boolean;
  setStudyListClicked: (input: boolean) => void;
}

export function Header(props: HeaderProps): JSX.Element {
  return (
    <div className="header">
      {/* Is the user viewing their study list */}
      {!props.studyListClicked ? (
        <h1 id="page-title">✨ Resorcery ✨</h1>
      ) : (
        <h1 id="study-list-title">✨ Study List ✨</h1>
      )}

      <div className="user-space">
        {props.signedInUser.user_id !== 0 && (
          <div className="d-flex">
            <h5 className="mr-2" id="user-header-icon">
              <FaUserAlt />
            </h5>
            <h5 id="users-name">Hello, {props.signedInUser.name}</h5>
          </div>
        )}
        <CreateRecommendation
          signedInUser={props.signedInUser}
          tags={props.tags}
          stages={props.stages}
          setRecommendations={props.setRecommendations}
          recommendations={props.recommendations}
          setTags={props.setTags}
        />

        <SignIn
          users={props.users}
          setUsers={props.setUsers}
          setSignedInUser={props.setSignedInUser}
          signedInUser={props.signedInUser}
          studyList={props.studyList}
          setStudyList={props.setStudyList}
          setStudyListClicked={props.setStudyListClicked}
        />
      </div>
    </div>
  );
}
