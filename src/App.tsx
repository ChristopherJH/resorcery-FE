import Recommendations from "./components/Recommendations";
import axios from "axios";
import { useState, useEffect } from "react";
import RecommendationType from "./types/RecommendationType";
import TagType from "./types/TagType";
import StageType from "./types/StageType";
import { config } from "dotenv";
import UserType from "./types/UserType";
//import CommentType from "./types/CommentType";
import "./App.css";
import NavigationBar from "./components/NavigationBar";
import SignIn from "./components/SignIn";
import StudyListType from "./types/StudyListType";
import CreateRecommendation from "./components/CreateRecommendation";
import studyListFilter from "./utils/filters/studyListFilter";

config();

const apiBaseURL = process.env.REACT_APP_API_BASE;

function App(): JSX.Element {
  const [recommendations, setRecommendations] = useState<RecommendationType[]>(
    []
  );
  const [tags, setTags] = useState<TagType[]>([]);
  const [users, setUsers] = useState<UserType[]>([]);
  const [stages, setStages] = useState<StageType[]>([]);
  //const [comments, setComments] = useState<CommentType[]>([]);
  const [studyList, setStudyList] = useState<StudyListType[]>([]);
  const [searchText, setSearchText] = useState("");
  const [dropDownValue, setDropDownValue] = useState("");
  const [signedInUser, setSignedInUser] = useState<UserType>({
    name: "guest",
    user_id: 0,
    is_faculty: false,
  });
  const [userStudyList, setUserStudyList] = useState<RecommendationType[]>([]);
  const [studyListClicked, setStudyListClicked] = useState(false);

  useEffect(() => {
    function updateStudyList() {
      setUserStudyList(studyListFilter(studyList, recommendations));
    }
    updateStudyList();
  }, [studyList, recommendations]);

  useEffect(() => {
    getAllData();
  }, []);

  async function getAllData() {
    if (typeof apiBaseURL === "string") {
      const recommendationsResponse = await axios.get(
        `${apiBaseURL}recommendations`
      );
      const tagsResponse = await axios.get(`${apiBaseURL}tags`);
      const userResponse = await axios.get(`${apiBaseURL}users`);
      const stageResponse = await axios.get(`${apiBaseURL}stages`);
      //const commentResponse = await axios.get(`${apiBaseURL}comments`);
      setRecommendations(recommendationsResponse.data.data);
      setTags(tagsResponse.data.data);
      setUsers(userResponse.data.data);
      setStages(stageResponse.data.data);
      //setComments(commentResponse.data.data);
    }
  }

  return (
    <div className="main">
      <div className="header">
        {!studyListClicked ? (
          <h1 id="page-title">✨ Resorcery ✨</h1>
        ) : (
          <h1 id="study-list-title">✨ Spell Book ✨</h1>
        )}
        <div className="user-space">
          <CreateRecommendation
            signedInUser={signedInUser}
            tags={tags}
            stages={stages}
            setRecommendations={setRecommendations}
            recommendations={recommendations}
            setTags={setTags}
          />

          {signedInUser.user_id !== 0 && (
            <h5 id="users-name">👤{signedInUser.name}</h5>
          )}

          <SignIn
            users={users}
            setSignedInUser={setSignedInUser}
            signedInUser={signedInUser}
            studyList={studyList}
            setStudyList={setStudyList}
          />
        </div>
      </div>
      <NavigationBar
        searchText={searchText}
        setSearchText={setSearchText}
        tags={tags}
        dropDownValue={dropDownValue}
        setDropDownValue={setDropDownValue}
        recommendations={recommendations}
        studyList={studyList}
        signedInUser={signedInUser}
        setUserStudyList={setUserStudyList}
        studyListClicked={studyListClicked}
        setStudyListClicked={setStudyListClicked}
      />

      {recommendations.length > 0 && (
        <Recommendations
          recommendations={!studyListClicked ? recommendations : userStudyList}
          tags={tags}
          stages={stages}
          users={users}
          searchText={searchText}
          dropDownValue={dropDownValue}
          signedInUser={signedInUser}
          setRecommendations={setRecommendations}
          studyList={studyList}
          setStudyList={setStudyList}
        />
      )}
      {studyListClicked && userStudyList.length === 0 && (
        <p>You have no items in your study list</p>
      )}
    </div>
  );
}
export default App;
