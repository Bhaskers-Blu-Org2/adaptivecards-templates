import { REQUEST_ALL_TAGS_GET, REQUEST_ALL_TAGS_GET_SUCCESS, REQUEST_ALL_TAGS_GET_FAIL, CLEAR_SELECTED_TAGS, REMOVE_SELECTED_TAG, ADD_SELECTED_TAG, TagsAction } from "./types";
import { TagList } from "adaptive-templating-service-typescript-node";
import { IncomingMessage } from "http";
import { RootState } from "../rootReducer";
import { initClientSDK } from "../../utils/TemplateUtil";

export function requestAllTags(): TagsAction {
  return {
    type: REQUEST_ALL_TAGS_GET,
  };
}

export function receiveAllTags(tags: TagList): TagsAction {
  return {
    type: REQUEST_ALL_TAGS_GET_SUCCESS,
    allTags: tags,
  };
}

export function failGetAllTags(error: IncomingMessage): TagsAction {
  return {
    type: REQUEST_ALL_TAGS_GET_FAIL,
    error: error,
  };
}

export function addSelectedTag(tag: string): TagsAction {
  return {
    type: ADD_SELECTED_TAG,
    tag: tag,
  };
}

export function removeSelectedTag(tag: string): TagsAction {
  return {
    type: REMOVE_SELECTED_TAG,
    tag: tag,
  };
}

export function clearSelectedTags(): TagsAction {
  return {
    type: CLEAR_SELECTED_TAGS,
  };
}

export function getAllTags() {
  return function(dispatch: any, getState: () => RootState) {
    dispatch(requestAllTags());
    const api = initClientSDK(dispatch, getState);
    return api
      .allTags()
      .then((response) => {
        if (response.response.statusCode && response.response.statusCode === 200) {
          dispatch(receiveAllTags(response.body));
        } else {
          dispatch(failGetAllTags(response.response));
        }
      })
      .catch((response) => {
        dispatch(failGetAllTags(response.response));
      });
  };
}