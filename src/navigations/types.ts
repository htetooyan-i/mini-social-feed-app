import { NavigatorScreenParams } from "@react-navigation/native";
import { Post } from "../models/Post";

export type RootStackParamList = {
  Auth: undefined
  Main: undefined
};

export type RootTabParamList = {
  Home: NavigatorScreenParams<HomeParamList>
  Profile: undefined
};

export type HomeParamList = {
  Feed: undefined
  CreatePost: undefined
  EditPost: {post: Post}
}

export type ProfileParamList = {
  Profile: undefined
}
