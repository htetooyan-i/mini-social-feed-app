import { NavigatorScreenParams } from "@react-navigation/native";
import { Post } from "../models/Post";

export type RootStackParamList = {
  AuthStack: undefined
  MainStack: undefined
};

export type AuthParamList = {
  Auth: undefined
  ResetPassword: undefined
}

export type RootTabParamList = {
  Home: NavigatorScreenParams<HomeParamList>
  Profile: NavigatorScreenParams<ProfileParamList>
};

export type HomeParamList = {
  Feed: undefined
  CreatePost: undefined
  EditPost: {post: Post, from: string}
  Comments: {postid: String}
}

export type ProfileParamList = {
  ProfilePosts: undefined,
  ChangePassword: undefined
}
